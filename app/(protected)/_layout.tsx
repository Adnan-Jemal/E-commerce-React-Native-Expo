import React from "react";
import {
  Redirect,
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { useAuth } from "@/utils/AuthProvider";
import { ActivityIndicator, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import AddToFavoriteBtn from "@/components/Details/AddToFavoriteBtn";

const ProtectedLayout = () => {
  const { session, loading } = useAuth();
  const { colorScheme } = useColorScheme();
  const { id } = useGlobalSearchParams();

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
            <AddToFavoriteBtn
              productId={id}
              userId={session?.user.id}
              tintColor={tintColor}
            />
          ),
          headerStyle: {
            backgroundColor: colorScheme == "dark" ? "black" : "white",
          },
        }}
      />
      <Stack.Screen
        name="favorites"
        options={{
          headerTitle: "Favorites",
          headerTintColor: colorScheme == "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: colorScheme == "dark" ? "black" : "white",
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default ProtectedLayout;
