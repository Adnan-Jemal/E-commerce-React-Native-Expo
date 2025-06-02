import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Tables } from "@/types/supabase";
import { supabase } from "@/utils/supabase";
import ProductImages from "@/components/Details/ProductImages";
import ProductDescription from "@/components/Details/ProductDescription";
import RecommendedProducts from "@/components/Details/RecommendedProducts";
import ProductInfo from "@/components/Details/ProductInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddToCartBtn from "@/components/Details/AddToCartBtn";

const ProductPage = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Tables<"products"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const productId = Array.isArray(id) ? id[0] : id;
  const fetchProductDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error: fetchError } = await supabase
        .from("products")
        .select()
        .eq("id", parseInt(productId))
        .single();

      if (fetchError) throw fetchError;

      if (data) {
        const { error: viewUpdateErr } = await supabase
          .from("products")
          .update({ views: data.views + 1 })
          .eq("id", data.id);
        if (viewUpdateErr) console.log(viewUpdateErr.message);
        setProduct(data);
      } else {
        setError("Product not found.");
      }
    } catch (e) {
      console.error("Failed to fetch product:", e);
      setError("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center dark:bg-neutral-900">
        <ActivityIndicator color="#1d4ed8" size="large" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center dark:bg-neutral-900">
        <Text className="dark:text-white text-lg p-4">
          {error || "Product not found."}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 relative dark:bg-black ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="dark:bg-neutral-900 flex-1 px-4"
      >
        <ProductImages productImages={product.image_urls} />
        <ProductInfo
          name={product.name}
          category_name={product.category_name}
          stock_quantity={product.stock_quantity}
          price={product.price}
          original_price={product.original_price}
        />
        <ProductDescription
          short_description={product.short_description}
          description={product.description}
        />
        <View className="mb-10 mt-8">
          <RecommendedProducts ProductId={product.id} limit={10} />
        </View>
      </ScrollView>
      {product && <AddToCartBtn product={product} />}
    </SafeAreaView>
  );
};

export default ProductPage;
