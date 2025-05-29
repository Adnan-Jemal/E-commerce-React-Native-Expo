import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";

import { categories } from "@/constants/categories";
import { CategoryIcon } from "../CategoryIcon";
import { Link } from "expo-router";

const VerticalCategoryList = () => {
  return (
    <>
      <FlatList
        numColumns={1}
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.category}
        contentContainerStyle={{ rowGap: 6, paddingVertical: 18 }}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/search",
              params: { category: item.category },
            }} asChild
          >
            <TouchableOpacity className="flex-row  items-center mx-2 bg-white dark:bg-black p-4 rounded-xl gap-4 shadow-sm">
              <View className="dark:bg-blue-700/30 bg-blue-700/10 p-2 rounded-xl">
                <CategoryIcon iconData={item.icon} size={28} color="#1d4ed8" />
              </View>
              <Text className="text-lg dark:text-white">{item.category}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </>
  );
};

export default VerticalCategoryList;
