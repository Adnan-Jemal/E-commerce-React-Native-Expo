import FavoritesBtn from "@/components/Home/FavoritesBtn";
import IconBtn from "@/components/profile/IconBtn";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useAuth } from "@/providers/AuthProvider";
import { Tables } from "@/types/supabase";
import { supabase } from "@/utils/supabase";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profilePage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<Tables<"profiles"> | null>();
  const [loading, setLoading] = useState(true);
  async function fetchUserData() {
    if (!user) {
      setLoading(false);
      throw Error("no user found");
    }
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .filter("id", "eq", user.id);
      if (error) throw Error(error.message);
      setUserData(data[0]);
    } catch (err) {
      console.log("Error fetching user", err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);
  if (loading) {
    return (
      <View className="dark:bg-neutral-900 flex-1 items-center justify-center">
        <ActivityIndicator color={"#1d4ed8"} size={"large"} />
      </View>
    );
  }
  return (
    <SafeAreaView
      edges={["left", "right", "top"]}
      className="dark:bg-neutral-900 flex-1 p-4  items-center "
    >
      <View className="py-2 self-center items-center justify-center">
        <Text className="text-4xl font-bold dark:text-white  ">Profile</Text>
      </View>

      <View className="py-6 px-8 mt-16 items-center justify-center rounded-3xl bg-white dark:bg-black flex-row gap-6 mx-4 shadow-md">
        <Image
          source={userData?.avatar_url}
          style={{
            height: 100,
            width: 100,
            borderRadius: 999,
          }}
        />
        <View className="gap-2 items-center">
          <Text className="dark:text-white text-xl">{userData?.full_name}</Text>
          <View className="h-0.5 rounded-full w-full mx-8 bg-neutral-300 dark:bg-neutral-700" />
          <Text className="dark:text-white text-xl">{userData?.email}</Text>
        </View>
      </View>
      <View className="bg-white mt-16 flex-col w-full dark:bg-black rounded-3xl shadow-md p-5 gap-8 items-center justify-center ">
        <View className="flex-row w-full items-stretch ">
          <IconBtn
            icon={<Feather name="check-circle" size={42} color="#1d4ed8" />}
            text="Orders"
            linkTo="../orders"
          />
          <ThemeSwitch />
          <IconBtn
            icon={<Feather name="heart" size={42} color="#1d4ed8" />}
            text="Favorites"
            linkTo="../favorites"
          />
        </View>
        <View className="flex-row justify-stretch">
          <IconBtn
            icon={<Feather name="github" size={42} color="#1d4ed8" />}
            text="Git Hub"
            linkTo="https://github.com/Adnan-Jemal/E-commerce-React-Native-Expo"
          />
          <IconBtn
            icon={<Feather name="linkedin" size={42} color="#1d4ed8" />}
            text="Linked In"
            linkTo="https://www.linkedin.com/in/adnan-jemal/"
          />
        </View>
      </View>

      <TouchableOpacity
        className="px-6 py-4 rounded-2xl my-auto bg-white dark:bg-black shadow-md"
        onPress={() => supabase.auth.signOut()}
      >
        <Text className="text-xl dark:text-white">Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default profilePage;
