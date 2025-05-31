import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Tables } from "@/types/supabase";
import { Link } from "expo-router";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Tables<"orders">[] | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchOrders = async () => {
    if (!user?.id) {
      setLoading(false);
      throw Error("No user id found");
    }
    try {
      const { data, error } = await supabase
        .from("orders")
        .select()
        .filter("user_id", "eq", user.id);
      if (error) {
        console.log(error.message);
        setLoading(false);
      }
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 dark:bg-neutral-900 items-center justify-center">
        <ActivityIndicator size={"large"} color={"#1d4ed8"} />
      </View>
    );
  }

  return (
    <View className="dark:bg-neutral-900 flex-1 p-4">
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <Link
              asChild
              href={{ pathname: "/orderConfirm/[id]", params: { id: item.id } }}
            >
          <TouchableOpacity className="w-full flex-row bg-white dark:bg-black my-2 p-6 justify-between items-center rounded-2xl">
            <View className="gap-4">
              <View className="flex-row items-center gap-2">
                <Text className="text-neutral-500">Order ID: </Text>
                <Text className="text-xl dark:text-white">{item.id}XL7613</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text  className="text-neutral-500">Status: </Text>
                <Text className=" text-white bg-blue-700/50 border border-blue-700 px-3 py-1 rounded-full">Pending</Text>
              </View>
            </View>
            <View className="items-center">
              <Text  className="text-neutral-500">SubTotal</Text>
              <Text className="text-3xl dark:text-white">{item.sub_total}</Text>
            </View>
          </TouchableOpacity></Link>
        )}
      />
    </View>
  );
};

export default OrdersPage;
