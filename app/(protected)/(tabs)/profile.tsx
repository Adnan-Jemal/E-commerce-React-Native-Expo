import ThemeSwitch from "@/components/ThemeSwitch";
import { Tables } from "@/supabase";
import { useAuth } from "@/utils/AuthProvider";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profilePage = () => {
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
      <Text>profilePage</Text>
      <ThemeSwitch />
      <TouchableOpacity onPress={() => supabase.auth.signOut()}>
        <Text>Log out</Text>
      </TouchableOpacity>
      <Text> {user?.user_metadata.full_name}</Text>
    </SafeAreaView>
  );
};

export default profilePage;
