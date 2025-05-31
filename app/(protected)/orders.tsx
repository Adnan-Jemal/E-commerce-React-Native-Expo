import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Tables } from "@/types/supabase";
import { Link } from "expo-router";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Tables<"orders">[] | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchOrders = async () => {
    if (!user?.id) {
      setLoading(false);
      throw Error("No user id found");
    }
    try {
      const { data, error } = await supabase
        .from("orders")
        .select()
        .filter("user_id", "eq", user.id);
      if (error) {
        console.log(error.message);
        setLoading(false);
      }
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <View className="flex-1">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View className="w-full h-40 bg-blue-700">
            <Link
              className="text-3xl font-bold dark:text-white"
              href={{ pathname: "/orderConfirm/[id]", params: { id: item.id } }}
            >
              {item.id}
            </Link>
          </View>
        )}
      />
    </View>
  );
};

export default OrdersPage;
