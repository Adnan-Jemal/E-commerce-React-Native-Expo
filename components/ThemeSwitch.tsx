import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import { Feather } from "@expo/vector-icons";

const ThemeSwitch = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <TouchableOpacity
      onPress={() => toggleColorScheme()}
      className="flex-col flex-1 items-center mx-2 border-2 dark:border-blue-700/35 border-blue-700/10 px-4 py-3 rounded-3xl gap-2 "
    >
      <View className="dark:bg-blue-700/30 bg-blue-700/10 p-2 rounded-2xl">
        {colorScheme === "light" ? (
          <Feather name="moon" size={42} color="#1d4ed8" />
        ) : (
          <Feather name="sun" size={42} color="#1d4ed8" />
        )}
      </View>
      {colorScheme === "light" ? (
        <Text className="text-lg dark:text-white">Dark</Text>
      ) : (
        <Text className="text-lg dark:text-white">Light</Text>
      )}
    </TouchableOpacity>
  );
};

export default ThemeSwitch;
