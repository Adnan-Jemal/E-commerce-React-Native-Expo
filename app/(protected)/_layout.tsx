import React from "react";
import { router, Stack } from "expo-router";
import { useAuth } from "@/utils/AuthProvider";

const ProtectedLayout = () => {
  const { session, loading } = useAuth();

  if (!session && !loading) router.replace("/signin");
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProtectedLayout;
