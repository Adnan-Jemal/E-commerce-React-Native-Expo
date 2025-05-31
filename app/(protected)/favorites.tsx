import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import { supabase } from "@/utils/supabase";
import { Tables } from "@/types/supabase";
import { useAuth } from "@/providers/AuthProvider";

const FavoritesPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [favoriteProducts, SetFavoriteProducts] = useState<
    Tables<"products">[] | []
  >([]);
  async function getUserFavoriteProducts() {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select(`created_at, products(*)`)
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const favorites: Tables<"products">[] | [] = data
        ? data.map((fav) => fav.products)
        : [];
      SetFavoriteProducts(favorites);
    } catch (e) {
      console.error("Error fetching user favorites:", e);
      return { success: false, error: e };
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUserFavoriteProducts();
  }, []);

  if (!loading && favoriteProducts.length == 0) {
    return (
      <View className="flex-1 dark:bg-neutral-900 p-4 items-center justify-center">
        <Text className="text-2xl dark:text-white">No Favorites Found</Text>
      </View>
    );
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={getUserFavoriteProducts}
          colors={["blue"]}
        />
      }
      className="dark:bg-neutral-900 p-4"
    >
      <ProductList products={favoriteProducts} />
    </ScrollView>
  );
};

export default FavoritesPage;
