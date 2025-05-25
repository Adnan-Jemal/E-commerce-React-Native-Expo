import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "nativewind";
import { useAuth } from "@/utils/AuthProvider";
import { supabase } from "@/utils/supabase";

const index = () => {
  const { setColorScheme } = useColorScheme();
  const { user } = useAuth();

  return (
    <View className="dark:bg-neutral-800 flex-1">
      <Text className="text-4xl text-red-800  ">
        Hello e-commerce lets goooooooooo
      </Text>
    
      <TouchableOpacity onPress={() => supabase.auth.signOut()}>
        <Text>Log out</Text>
      </TouchableOpacity>
      <Text> {user?.user_metadata.full_name}</Text>

      <TouchableOpacity onPress={() => setColorScheme("dark")}>
        <Text className="dark:text-white">DarkMode</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setColorScheme("light")}>
        <Text className="dark:text-white">light Mode</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
