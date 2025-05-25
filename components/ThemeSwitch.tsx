import { TouchableOpacity } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import { Feather } from "@expo/vector-icons";

const ThemeSwitch = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={()=>toggleColorScheme()}
      className="border-2 border-neutral-500 rounded-xl p-2  items-center justify-center ml-auto"
    >
      {colorScheme === "light" ? (
        <Feather name="moon" size={24} color="black" />
      ) : (
        <Feather name="sun" size={24} color="white" />
      )}
    </TouchableOpacity>
  );
};

export default ThemeSwitch;
