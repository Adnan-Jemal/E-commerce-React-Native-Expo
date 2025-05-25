import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../utils/supabase";
import { router } from "expo-router";

export default function GoogleSignInBtn() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data?.idToken) {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data?.idToken,
        });

        if (error) throw error;
        router.replace("/");
      } else {
        throw new Error("No ID token present!");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Cancelled", "You cancelled the login flow.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("In Progress", "Sign in is already in progress.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Error", "Play services not available or outdated.");
      } else {
        console.error("An unknown error occurred:", error);
        Alert.alert(
          "Error",
          "An error occurred during sign-in. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      className={`
        flex-row items-center justify-center rounded-xl px-5 py-3  shadow-md w-full
        bg-blue-700
      `}
      onPress={handleGoogleSignIn}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <View className="flex-row items-center">
          {/* <Image
            source={require("../assets/images/google-icon.png")} // <-- Make sure path is correct
            className="w-6 h-6 mr-[15px]" // using arbitrary value for specific margin
          /> */}
          <Text className="text-white text-xl font-semibold">
            Sign in with Google
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
