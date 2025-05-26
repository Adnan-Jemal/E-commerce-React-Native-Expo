import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import { Octicons } from "@expo/vector-icons";

const SearchBar = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="w-full mx-2 self-center px-2 flex-row items-center justify-between border-2 border-neutral-300 dark:border-neutral-700 rounded-2xl ">
      <TextInput
        placeholderTextColor={`${colorScheme == "dark" ? "white" : "black"}`}
        cursorColor={"blue"}
        placeholder="Search..."
        className=" dark:text-white text-black text-lg"
      />
      <TouchableOpacity className="p-2">
        <Octicons
          name="search"
          size={24}
          color={`${colorScheme == "dark" ? "white" : "black"}`}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
