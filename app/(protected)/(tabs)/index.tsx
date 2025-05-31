import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/Home/Logo";
import FavoritesBtn from "@/components/Home/FavoritesBtn";
import HomeBanner from "@/components/Home/HomeBanner";
import SearchBar from "@/components/Home/SearchBar";
import HorizontalCategoryList from "@/components/Home/HorizontalCategoryList";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Tables } from "@/types/supabase";

import ProductList from "@/components/ProductList";
import { Link } from "expo-router";

const index = () => {
  const [popularProducts, setPopularProducts] = useState<
    Tables<"products">[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  async function fetchPopularProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select()
      .order("views", { ascending: false })
      .limit(10);
    setPopularProducts(data);
    setLoading(false);
    if (error) {
      console.log(error.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchPopularProducts();
  }, []);

  return (
    <SafeAreaView
      edges={["left", "right", "top"]}
      className="dark:bg-neutral-900 flex-1 px-4 "
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" p-2 flex-row items-center justify-between pt-2">
          <Logo />
          <FavoritesBtn />
        </View>
        <View className="mt-6 gap-8">
          <Link href={"/search"}>
            <SearchBar disabled />
          </Link>

          <HomeBanner />
        </View>
        <View className="mt-4 p-2 gap-4">
          <Text className="dark:text-white text-3xl font-bold">Categories</Text>
          <HorizontalCategoryList />
        </View>
        <View className="mt-4 p-2 gap-4 w-full">
          <Text className="dark:text-white text-3xl font-bold">Popular</Text>
          {loading ? (
            <ActivityIndicator color="#1d4ed8" />
          ) : (
            <ProductList products={popularProducts} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
