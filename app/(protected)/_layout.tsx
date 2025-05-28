import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/utils/AuthProvider";
import { ActivityIndicator, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const ProtectedLayout = () => {
  const { session, loading } = useAuth();
  const { colorScheme } = useColorScheme();

  if (!session && loading) {
    return (
      <View className="flex-1 items-center justify-center dark:bg-neutral-900">
        <ActivityIndicator size={"large"} color={"blue"} />
      </View>
    );
  }
  if (!session && !loading) {
    return <Redirect withAnchor={true} href={"/signin"} />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerTitle: "Back",
          headerTintColor: colorScheme == "dark" ? "white" : "black",
          headerRight: ({ tintColor }) => (
            <Octicons name="heart" size={24} color={tintColor} />
          ),
          headerStyle: {
            backgroundColor: colorScheme == "dark" ? "black" : "white",
          },
        }}
      />
    </Stack>
  );
};

export default ProtectedLayout;
