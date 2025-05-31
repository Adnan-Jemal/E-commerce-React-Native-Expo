import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useForm } from "react-hook-form";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useCallback, useEffect, useState } from "react";
import { Tables } from "@/types/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router, useFocusEffect } from "expo-router";
import { Image } from "expo-image";
import { FontAwesome6 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "@/providers/CartProvider";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/utils/supabase";

type CheckoutFormData = {
  fullName: string;
  phoneNumber: string;
  country: string;
  stateCity: string;
  address: string;
};

const checkoutPage = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      fullName: user?.user_metadata.full_name || "",
      phoneNumber: "",
      country: "Ethiopia",
      stateCity: "",
      address: "",
    },
  });
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    cartItems.forEach(({ price }) => setSubTotal((prev) => prev + price));
  }, [cartItems]);

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      if (!user?.id) {
        setSubmitting(false);
        throw new Error("User ID is required to place an order.");
      }
      setSubmitting(true);
      const newOrder = await supabase
        .from("orders")
        .insert({
          full_name: data.fullName,
          phone_number: data.phoneNumber,
          country: data.country,
          state_city: data.stateCity,
          address: data.address,
          ordered_products: cartItems.map((i) => i.id),
          user_id: user.id,
          sub_total: subTotal,
        })
        .select();
      if (newOrder.data) {
        clearCart();

        router.push({
          pathname: "/orderConfirm/[id]",
          params: { id: newOrder.data[0].id },
        });
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      edges={["left", "right"]}
      className=" dark:bg-neutral-900 flex-1 p-4"
    >
      <ScrollView className=" mb-8 flex-1 dark:bg-neutral-900 gap-6">
        <CheckoutForm control={control} errors={errors} />

        <View className=" w-full gap-3 px-6 py-4 my-4  bg-white dark:bg-black rounded-2xl">
          <FlatList
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            data={cartItems}
            renderItem={({ item }) => (
              <View className=" w-full flex-row p-2  gap-4 rounded-3xl items-center ">
                <Image
                  source={item.image_urls[0]}
                  style={{ width: "25%", height: 75, borderRadius: 16 }}
                  transition={500}
                />
                <View className="flex-1 ">
                  <Text numberOfLines={2} className="text-xl dark:text-white">
                    {item.name}
                  </Text>
                </View>
                <View>
                  <Text className="text-2xl dark:text-white ">
                    ${item.price}
                  </Text>
                </View>
              </View>
            )}
            contentContainerStyle={{
              gap: 8,
              paddingVertical: 8,
            }}
          />
          <View className="h-0.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />

          <View className="flex-row justify-between items-center px-2">
            <Text className="dark:text-white text-xl">
              SubTotal ({cartItems.length})
            </Text>
            <Text className="dark:text-white text-2xl font-semibold ">
              ${subTotal.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between items-center px-2">
            <Text className="dark:text-white text-xl">Tax (15%)</Text>
            <Text className="dark:text-white text-2xl font-semibold ">
              ${(subTotal * 0.15).toFixed(2)}
            </Text>
          </View>
          <View className="h-0.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <View className="flex-row justify-between items-center px-2">
            <Text className="dark:text-white text-2xl font-bold">Total</Text>
            <Text className="dark:text-white text-2xl font-bold ">
              ${(subTotal * 0.15 + subTotal).toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          disabled={submitting}
          onPress={handleSubmit(onSubmit)}
          className={`bg-blue-700 p-4 w-full   rounded-2xl items-center mt-2 mb-6`}
        >
          {submitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-xl font-semibold">
              Place Order
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default checkoutPage;
