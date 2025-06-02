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
        px-6 py-4 rounded-xl items-center 
        bg-blue-700
      `}
      onPress={handleGoogleSignIn}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text className=" text-center font-bold text-2xl text-white">
          Sign in with Google
        </Text>
      )}
    </TouchableOpacity>
  );
}
