import { ActivityIndicator, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/Home/SearchBar";
import VerticalCategoryList from "@/components/search/VerticalCategoryList";
import { Tables } from "@/types/supabase";
import ProductList from "@/components/ProductList";
import { supabase } from "@/utils/supabase";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";

const search = () => {
  const { category: categoryFromParams } = useLocalSearchParams();
  const category = Array.isArray(categoryFromParams)
    ? categoryFromParams[0]
    : categoryFromParams;
  const [searchTerm, setSearchTerm] = useState(category || "");
  const [results, setResults] = useState<Tables<"products">[] | null>(null);
  const [loading, setLoading] = useState(false);
  //update search term every time category changes
  useEffect(() => {
    setSearchTerm(category);
  }, [category]);

  //clear state when navigating to other pages
  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearchTerm("");
        setResults(null);
        setLoading(false);
      };
    }, [])
  );

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setResults(null);
      return;
    }
    setLoading(true);
    try {
      const { data, error: searchError } = await supabase
        .from("products")
        .select("*")
        .or(
          `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category_name.ilike.%${searchTerm}%`
        )
        .limit(10);

      if (searchError) throw searchError;
      setResults(data);
    } catch (e) {
      console.error("Search error:", e);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="dark:bg-neutral-900 flex-1 p-4 pb-0"
    >
      <View className="mx-2 mt-6 mb-2">
        <SearchBar
          disabled={false}
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </View>
      {loading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#1d4ed8" />
        </View>
      )}
      {!loading && results && (
        <View className="flex-1 py-4">
          {results.length == 0 ? (
            <Text className="text-2xl text-center dark:text-white self-center">
              No Products Found
            </Text>
          ) : (
            <ProductList products={results} />
          )}
        </View>
      )}
      {!loading && !results && <VerticalCategoryList />}
    </SafeAreaView>
  );
};

export default search;
