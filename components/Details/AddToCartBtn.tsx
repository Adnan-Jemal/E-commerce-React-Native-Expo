import { Text, TouchableOpacity } from "react-native";
import { Tables } from "@/types/supabase";
import { router } from "expo-router";
import { useCart } from "@/providers/CartProvider";

const AddToCartBtn = ({ product }: { product: Tables<"products"> }) => {
  const { cartItems, addToCart } = useCart();
  const inCart = cartItems.find((item) => item.id === product?.id);

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
        onPress={() => addToCart(product)}
        className="bg-blue-700 p-4 w-[90%] self-center rounded-2xl items-center my-3 disabled:bg-neutral-500"
      >
        <Text className="text-white text-xl font-semibold">Add to Cart</Text>
      </TouchableOpacity>
    );
};

export default AddToCartBtn;
