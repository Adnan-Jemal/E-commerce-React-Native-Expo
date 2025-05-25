import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/utils/AuthProvider";
import { ActivityIndicator, View } from "react-native";

const ProtectedLayout = () => {
  const { session, loading } = useAuth();

  if (!session && loading) {
    return (
      <View className="flex-1 items-center justify-center">
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
    </Stack>
  );
};

export default ProtectedLayout;
