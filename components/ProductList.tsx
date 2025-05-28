import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Tables } from "@/types/supabase";
import { Link } from "expo-router";

const ProductList = ({
  products,
}: {
  products: Tables<"products">[] | null;
}) => {
  return (
    <FlatList
      scrollEnabled={false}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      data={products}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: "/product/[id]",
            params: { id: item.id },
          }}
          asChild
        >
          <TouchableOpacity className=" w-[48%] bg-white dark:bg-black rounded-xl shadow-xs overflow-hidden">
            <Image
              source={item.image_urls[0]}
              style={{ width: "100%", height: 150, borderRadius: 12 }}
              transition={500}
            />
            <View className="p-3 gap-2">
              <Text className="text-xl dark:text-white">{item.name}</Text>
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
            </View>
          </TouchableOpacity>
        </Link>
      )}
      contentContainerStyle={{
        gap: 12,
      }}
      columnWrapperStyle={{ justifyContent: "space-between" }}
    />
  );
};

export default ProductList;
