import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

type ProductInfoType = {
  name: string;
  category_name: string;
  stock_quantity: number;
  price: number;
  original_price: number | null;
};

const ProductInfo = ({
  name,
  category_name,
  stock_quantity,
  price,
  original_price,
}: ProductInfoType) => {
  return (
    <View className="mt-6 bg-white dark:bg-black p-4 rounded-2xl">
      <Text className="dark:text-white font-semibold text-4xl">{name}</Text>
      <View className="flex-row gap-4 mt-4 ">
        <Link
          href={{
            pathname: "/search",
            params: { category: category_name },
          }}
          asChild
        >
          <TouchableOpacity className="flex-row gap-2 border-2 border-neutral-300 dark:border-neutral-700 rounded-xl py-1 px-2 ">
            <Ionicons name="grid" size={22} color="#1d4ed8" />
            <Text className="dark:text-white text-md">{category_name}</Text>
          </TouchableOpacity>
        </Link>
        <View className="flex-row gap-2 border-2 border-neutral-300 dark:border-neutral-700 rounded-xl py-1 px-2 ">
          <FontAwesome6 name="boxes-stacked" size={22} color="#1d4ed8" />
          <Text className="dark:text-white text-md">
            {stock_quantity} In Stock
          </Text>
        </View>
      </View>
      <View className="flex-row mt-5 gap-4 items-baseline">
        <Text className="dark:text-white text-4xl ">${price?.toFixed(2)}</Text>
        {original_price && (
          <Text className="text-neutral-500 text-2xl line-through">
            ${original_price.toFixed(2)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProductInfo;
