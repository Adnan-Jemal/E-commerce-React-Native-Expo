import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const FavoritesBtn = () => {
  const { colorScheme } = useColorScheme();
  return (
    <TouchableOpacity className="border-2 border-neutral-300 dark:border-neutral-700 rounded-xl p-2  items-center justify-center ml-auto">
      <MaterialCommunityIcons
        name="heart-multiple-outline"
        size={24}
        color={`${colorScheme == "dark" ? "white" : "black"}`}
      />
    </TouchableOpacity>
  );
};

export default FavoritesBtn;
