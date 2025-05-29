import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { Link, router, useFocusEffect } from "expo-router";
import { Tables } from "@/types/supabase";
import { FontAwesome6, Octicons } from "@expo/vector-icons";
import CartItemList from "@/components/cart/CartItemList";

const cart = () => {
  const [cartItems, setCartItems] = useState<Tables<"products">[] | []>([]);
  const [loading, setLoading] = useState(true);

  const loadCartItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("cart");
      setCartItems(jsonValue ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log("Error Loading Cart Items", e);
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (productId: number) => {
    const removedCart = cartItems.filter((p) => p.id != productId);
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(removedCart));
      loadCartItems();
    } catch (error) {
      console.log("Error removing cart item", error);
    }
  };

  //get current products in cart
  useFocusEffect(
    useCallback(() => {
      loadCartItems();
    }, [])
  );

  return (
    <SafeAreaView
      edges={["left", "right", "top"]}
      className="dark:bg-neutral-900 flex-1 justify-center "
    >
      <View className="py-2 self-center items-center justify-center">
        <Text className="text-4xl font-bold dark:text-white  ">Cart</Text>
      </View>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#1d4ed8" />
        </View>
      ) : (
        <CartItemList cartItems={cartItems} removeCartItem={removeCartItem} />
      )}

      {cartItems.length > 0 && (
        <TouchableOpacity
          className={`bg-blue-700 p-4 w-[90%] self-center rounded-2xl items-center my-4`}
        >
          <Text className="text-white text-xl font-semibold">Checkout</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default cart;
