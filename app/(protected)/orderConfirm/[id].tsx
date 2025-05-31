import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Octicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Tables } from "@/types/supabase";
import { supabase } from "@/utils/supabase";
import { parseISO, format } from "date-fns";
import { router } from "expo-router";

const orderConfirmationPage = () => {
  const { id } = useLocalSearchParams();
  const [order, setOrder] = useState<Tables<"orders"> | null>(null);
  const [loading, setLoading] = useState(true);
  const orderId = Array.isArray(id) ? id[0] : id;
  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from("orders")
        .select()
        .eq("id", parseInt(orderId))
        .single();

      if (fetchError) throw fetchError;
      if (data) {
        setOrder(data);
      } else {
        console.error("order not found");
      }
    } catch (e) {
      console.error("Failed to fetch order:", e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  if (!order || loading) {
    return (
      <View className="flex-1 dark:bg-neutral-900 items-center justify-center ">
        <ActivityIndicator size={"large"} color={"#1d4ed8"} />
      </View>
    );
  }

  return (
    <SafeAreaView
      edges={["bottom"]}
      className="flex-1 px-8 dark:bg-neutral-900 items-center justify-center gap-6"
    >
      <View className="p-4 items-center gap-4">
        <Feather name="check-circle" size={100} color="#86efac" />
        <Text className="text-3xl mt-8 font-bold mb-2 dark:text-white">
          Thank You For Your Order!
        </Text>

        <Text className="text-xl dark:text-white text-center">
          We're excited to let you know that your order has been successfully
          placed.
        </Text>
      </View>

      {/* Order Summary */}
      <View className="mx-24 my-4 p-4 w-full dark:bg-neutral-800 bg-neutral-300 rounded-xl ">
        <Text className="text-2xl font-semibold dark:text-white text-neutral-800 mb-3">
          Order Summary
        </Text>
        <View className="flex-row justify-between mb-1">
          <Text className="text-neutral-600 text-xl dark:text-neutral-300">
            Order Number:
          </Text>
          <Text className="font-semibold text-xl dark:text-white text-neutral-800">
            {order?.id}XL7613
          </Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-neutral-600 dark:text-neutral-300 text-xl">
            Order Date:
          </Text>
          <Text className="font-semibold dark:text-white text-neutral-800 text-xl">
            {format(parseISO(order.created_at), "MMMM d, yyyy")}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-neutral-600 dark:text-neutral-300 text-xl">
            Order Status:
          </Text>
          <Text className="font-semibold dark:text-white text-neutral-800 capitalize text-xl">
            Pending
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-neutral-600 dark:text-neutral-300 text-xl">
            ordered Products:
          </Text>
          <Text className="font-semibold dark:text-white text-neutral-800 capitalize text-xl">
            {order.ordered_products.length}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-neutral-600 dark:text-neutral-300 text-xl">
            Total:
          </Text>
          <Text className="font-semibold dark:text-white text-neutral-800 capitalize text-xl">
            ${(order.sub_total * 0.15 + order.sub_total).toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.dismissAll()}
        className="bg-blue-700 p-4 w-full mx-6   rounded-2xl items-center mt-2 mb-6"
      >
        <Text className="text-white text-2xl font-semibold">Got it</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default orderConfirmationPage;
