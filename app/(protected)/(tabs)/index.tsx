import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { useAuth } from "@/utils/AuthProvider";
import { supabase } from "@/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Tables } from "@/supabase";

const index = () => {
  const { user } = useAuth();
  const [data, setData] = useState<Tables<"profiles">[] | null>();
  async function fetchUserData() {
    const { data, error } = await supabase.from("profiles").select();
    setData(data);
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <SafeAreaView className="dark:bg-neutral-900 flex-1">
      <Text className="text-4xl text-blue-700 ">
        Hello e-commerce lets ssssssssss goooooooooo {data && data[0]?.full_name}
      </Text>
      <ThemeSwitch />
      <TouchableOpacity onPress={() => supabase.auth.signOut()}>
        <Text>Log out</Text>
      </TouchableOpacity>
      <Text> {user?.user_metadata.full_name}</Text>
    </SafeAreaView>
  );
};

export default index;
