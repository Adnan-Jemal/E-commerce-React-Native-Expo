import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { supabase } from "@/utils/supabase"; // Adjust path if needed
import { Tables } from "@/types/supabase"; // Adjust path if needed
import ProductList from "@/components/ProductList"; // Assuming this component is ready to display products

type RecommendedProductsProps = {
  ProductId?: string | number | null; // To exclude the
  limit?: number;
};

const RecommendedProducts = ({
  ProductId,
  limit = 10,
}: RecommendedProductsProps) => {
  const [products, setProducts] = useState<Tables<"products">[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      if (!ProductId) {
        setLoading(false);
        setProducts([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const { data, error: rpcError } = await supabase
          .rpc("get_random_products", {
            limit_count: limit,
          })
          .neq("id", ProductId);

        if (rpcError) throw rpcError;
        setProducts(data || []);
      } catch (e: any) {
        console.error("Failed to fetch recommended products:", e);
        setError(e.message || "Could not load recommendations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, [ProductId, limit]); // Re-fetch if these props change

  if (error) {
    return <Text>Error loading recommendations: {error}</Text>;
  }

  return (
    <View>
      <Text className="dark:text-neutral-300 text-neutral-700 text-2xl mb-3">
        Recommended Products
      </Text>
      {loading && <ActivityIndicator color="#1d4ed8" size="large" />}
      <ProductList products={products} />
    </View>
  );
};

export default RecommendedProducts;
