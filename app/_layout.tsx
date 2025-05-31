import { GoogleSignin } from "@react-native-google-signin/google-signin";
import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { CartProvider } from "@/providers/CartProvider";
import AuthProvider from "@/providers/AuthProvider";
try {
  GoogleSignin.configure({
    webClientId:
      "530955358370-pfems9bop51s2rf96ulfngj0v9fd9ut1.apps.googleusercontent.com",
  });
} catch (error) {
  console.error("Error configuring Google Sign-In:", error);
}
export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Stack>
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </CartProvider>
      </AuthProvider>
    </>
  );
}
