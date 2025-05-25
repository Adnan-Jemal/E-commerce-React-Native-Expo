import { GoogleSignin } from "@react-native-google-signin/google-signin";
import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AuthProvider from "@/utils/AuthProvider";

try {
  GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // Optional
    // This is the WEB client ID, not the Android or iOS client ID.
    webClientId:
      "530955358370-pfems9bop51s2rf96ulfngj0v9fd9ut1.apps.googleusercontent.com",
  });
  console.log("Google Sign-In configured successfully.");
} catch (error) {
  console.error("Error configuring Google Sign-In:", error);
}
export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </>
  );
}
