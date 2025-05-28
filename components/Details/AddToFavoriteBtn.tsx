import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/utils/AuthProvider";
import { supabase } from "@/utils/supabase";

const AddToFavoriteBtn = ({
  tintColor,
  productId,
  userId,
}: {
  tintColor: string | undefined;
  productId: string | string[];
  userId: string | undefined;
}) => {
  const [favorited, setFavorited] = useState(false);

  async function isProductFavorited() {
    if (!userId || !productId) {
      return;
    }
    try {
      const { data, error, count } = await supabase
        .from("favorites")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("product_id", productId);

      if (error) throw error;
      setFavorited(!!count);
    } catch (e) {
      console.error("Error checking favorite status:", e);
      return false;
    }
  }

  useEffect(() => {
    isProductFavorited();
  }, [productId]);

  async function addFavorite() {
    if (!userId || !productId) {
      return;
    }
    try {
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: userId, product_id: productId });

      if (error) throw error;
      setFavorited(true);
    } catch (e) {
      console.error("Error adding favorite:", e);
      return { success: false, error: e };
    }
  }
  async function removeFavorite() {
    if (!userId || !productId) {
      return;
    }
    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", productId);

      if (error) throw error;
      setFavorited(false);
    } catch (e) {
      console.error("Error removing favorite:", e);
      return { success: false, error: e };
    }
  }
  return (
    <View>
      {favorited ? (
        <TouchableOpacity onPress={removeFavorite}>
          <Octicons name="heart-fill" size={24} color={"#ef4444"} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={addFavorite}>
          <Octicons name="heart" size={24} color={tintColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddToFavoriteBtn;
