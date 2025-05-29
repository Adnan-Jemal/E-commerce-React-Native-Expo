import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Image } from "expo-image";
import { FontAwesome6, Octicons } from "@expo/vector-icons";
import { Tables } from "@/types/supabase";

type CartItemListType = {
  cartItems: Tables<"products">[] | [];
  removeCartItem: (productId: number) => void;
};

const CartItemList = ({ cartItems, removeCartItem }: CartItemListType) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={() => (
        <View className="mt-60 self-center w-full text-center items-center justify-center">
          <Text className="text-xl dark:text-white text-center">Your Cart is Empty!</Text>
        </View>
      )}
      data={cartItems}
      renderItem={({ item }) => (
        <View className="self-center max-w-[95%] flex-row bg-white dark:bg-black p-2 rounded-3xl shadow-xs overflow-hidden">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id },
              })
            }
            className="w-[40%]"
          >
            <Image
              source={item.image_urls[0]}
              style={{ width: "100%", height: 125, borderRadius: 16 }}
              transition={500}
            />
          </TouchableOpacity>

          <View className="p-3 flex-1 gap-2">
            <Link
              href={{
                pathname: "/product/[id]",
                params: { id: item.id },
              }}
              numberOfLines={1}
              className="text-xl dark:text-white"
            >
              {item.name}
            </Link>
            <View className="flex-row gap-3 items-center justify-start">
              <Text
                numberOfLines={2}
                className="font-semibold text-2xl dark:text-white"
              >
                ${item.price}
              </Text>
              {item.original_price && (
                <Text className="font-semibold text-xl text-neutral-500 line-through">
                  ${item.original_price.toFixed()}
                </Text>
              )}
            </View>

            <View className="flex-row justify-between">
              <View className="flex-row gap-2 border-2 border-neutral-300 dark:border-neutral-700 rounded-xl py-1 px-2 w-fit items-center ">
                <FontAwesome6 name="boxes-stacked" size={22} color="#1d4ed8" />
                <Text className="dark:text-white text-md">
                  {item.stock_quantity} In Stock
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => removeCartItem(item.id)}
                className="py-2 px-3 bg-red-400 rounded-xl"
              >
                <Octicons name="trash" size={23} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      contentContainerStyle={{
        gap: 12,
        paddingVertical: 26,
      }}
    />
  );
};

export default CartItemList;
