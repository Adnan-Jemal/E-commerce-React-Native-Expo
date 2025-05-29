import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Tables } from "@/types/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";

const AddToCartBtn = ({ product }: { product: Tables<"products"> | null }) => {
  const [cartProducts, setCartProducts] = useState<Tables<"products">[]>([]);
  const [inCart, setInCart] = useState(false);

  const loadCartItems = async () => {
    try {
      const cartString = await AsyncStorage.getItem("cart");
      const itemsFromStorage = cartString ? JSON.parse(cartString) : [];
      setCartProducts(itemsFromStorage);
    } catch (err) {
      console.error("Error loading cart items:", err);
      setCartProducts([]);
    }
  };

  const addToCart = async () => {
    if (inCart) {
      return;
    }
    try {
      if (cartProducts !== null) {
        await AsyncStorage.setItem(
          "cart",
          JSON.stringify([...cartProducts, product])
        );
      } else {
        await AsyncStorage.setItem("cart", JSON.stringify([product]));
      }
      setInCart(true);
    } catch (e) {
      console.log("Error Adding to cart", e);
    }
  };

  //get current products in cart
  useFocusEffect(
    useCallback(() => {
      loadCartItems();
    }, [])
  );

  //update in cart state
  useEffect(() => {
    if (product && cartProducts.length >= 0) {
      const productIsInCart = cartProducts.some(
        (item) => item.id === product.id
      );
      setInCart(productIsInCart);
    } else {
      setInCart(false);
    }
  }, [product, cartProducts]);

  if (inCart) {
    return (
      <>
        <TouchableOpacity
          onPress={() => router.push("/cart")}
          className="bg-blue-700 p-4 w-[90%] self-center rounded-2xl items-center mt-3 mb-1 disabled:bg-neutral-500 "
        >
          <Text className="text-white text-xl font-semibold">Checkout</Text>
        </TouchableOpacity>
        <Text className="dark:text-white  self-center mb-3 text-sm">
          Product In Cart
        </Text>
      </>
    );
  } else
    return (
      <TouchableOpacity
        disabled={inCart}
        onPress={addToCart}
        className="bg-blue-700 p-4 w-[90%] self-center rounded-2xl items-center my-3 disabled:bg-neutral-500"
      >
        <Text className="text-white text-xl font-semibold">Add to Cart</Text>
      </TouchableOpacity>
    );
};

export default AddToCartBtn;
