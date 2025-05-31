import CartItemList from "@/components/cart/CartItemList";
import { useCart } from "@/providers/CartProvider";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const cart = () => {
  const { cartItems, loadingCart, removeFromCart } = useCart();
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    cartItems.forEach(({ price }) => setSubTotal((prev) => prev + price));
  }, [cartItems]);

  return (
    <SafeAreaView
      edges={["left", "right", "top"]}
      className="dark:bg-neutral-900 flex-1 justify-center "
    >
      <View className="py-2 self-center items-center justify-center">
        <Text className="text-4xl font-bold dark:text-white  ">Cart</Text>
      </View>
      {loadingCart ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#1d4ed8" />
        </View>
      ) : (
        <CartItemList cartItems={cartItems} removeCartItem={removeFromCart} />
      )}

      {cartItems.length > 0 && (
        <View className="my-4 w-[90%] self-center justify-center gap-2 ">
          <View className="flex-row justify-between items-center px-2">
            <Text className="dark:text-white text-xl">
              SubTotal ({cartItems.length} products):
            </Text>
            <Text className="dark:text-white text-2xl font-bold">
              ${subTotal.toFixed(2)}
            </Text>
          </View>
          <Link href={"/checkout"} asChild>
            <TouchableOpacity
              className={`bg-blue-700 p-4 w-full   rounded-2xl items-center my-2`}
            >
              <Text className="text-white text-xl font-semibold">
                Continue to checkout
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </SafeAreaView>
  );
};

export default cart;
