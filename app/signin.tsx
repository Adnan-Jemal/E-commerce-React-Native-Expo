import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import GoogleSignInBtn from "@/components/GoogleSignInBtn";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

const signin = () => {
  return (
    <SafeAreaView className=" flex-1 dark:bg-black  items-center">
      <View className="h-1/2 w-full  mb-4 items-center justify-center">
        <FontAwesome6
          name="store"
          size={78}
          color={"#1d4ed8"}
          className="shadow-md dark:bg-neutral-900 bg-white p-6 rounded-full"
        />
        <View className="flex-row items-end gap-2 mt-4">
          <Text className="font-extrabold text-5xl dark:text-white">ገበያ</Text>
          <Text className=" text-xl self-end text-blue-700">Store</Text>
        </View>
      </View>
      <View className="p-6 h-1/2 dark:bg-neutral-900 bg-white w-full  rounded-t-3xl items-center shadow-lg">
        <Text className="dark:text-white font-bold text-4xl my-2 mt-8">
          Welcome
        </Text>
        <Text className=" dark:text-white text-lg">Login or Signup</Text>
        <View className="w-full dark:bg-white bg-black h-0.5 mt-10"></View>
        <View className="my-auto gap-8 ">
          <GoogleSignInBtn />
          <TouchableOpacity
            className="dark:bg-white bg-black  px-6 py-4 rounded-xl items-center "
            onPress={() =>
              Alert.alert(
                "Oops!",
                "We are having trouble signing you in with Apple right now. You can try again later or use another sign-in method.",
                [{ text: "Got it" }]
              )
            }
          >
            <Text className=" text-white dark:text-black font-bold text-2xl">
              {" "}
              Sign In with Apple
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default signin;
