import React from "react";
import {
  Redirect,
  Stack,
  useGlobalSearchParams,
  // useLocalSearchParams, // Not used in this specific snippet, can be removed if not used elsewhere
} from "expo-router";
import { ActivityIndicator, View } from "react-native";
// import { Octicons } from "@expo/vector-icons"; // Not directly used in layout options
import { useColorScheme } from "nativewind";
import AddToFavoriteBtn from "@/components/Details/AddToFavoriteBtn"; // Ensure this path is correct
import { useAuth } from "@/providers/AuthProvider"; // Ensure this path is correct

const ProtectedLayout = () => {
  const { session, loading } = useAuth();
  const { colorScheme } = useColorScheme();
  const { id: idFromParams } = useGlobalSearchParams();
  let singleProductId: string | undefined = undefined;
  if (Array.isArray(idFromParams)) {
    singleProductId = idFromParams[0];
  } else if (typeof idFromParams === "string") {
    singleProductId = idFromParams;
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center dark:bg-neutral-900">
        <ActivityIndicator size={"large"} color={"blue"} />
      </View>
    );
  }

  if (!session) {
    return <Redirect href={"/signin"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerTitle: "Back",
          headerTintColor: colorScheme === "dark" ? "white" : "black",
          headerRight: ({ tintColor }) => (
            <AddToFavoriteBtn
              userId={session.user.id}
              productId={singleProductId}
              tintColor={tintColor}
            />
          ),
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "black" : "white",
          },
        }}
      />
      <Stack.Screen
        name="favorites"
        options={{
          headerTitle: "Favorites",
          headerTintColor: colorScheme === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "black" : "white",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          headerTitle: "Checkout",
          headerTintColor: colorScheme === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "black" : "white",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          headerTitle: "Orders",
          headerTintColor: colorScheme === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "black" : "white",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="orderConfirm/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ProtectedLayout;
