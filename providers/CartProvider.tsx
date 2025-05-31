import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tables } from "@/types/supabase"; // Assuming your types

type CartContextType = {
  cartItems: Tables<"products">[];
  addToCart: (product: Tables<"products">) => Promise<void>;
  removeFromCart: (productId: number | string) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
  loadingCart: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Tables<"products">[]>([]);
  const [loadingCart, setLoadingCart] = useState(true);

  const loadCartItems = useCallback(async () => {
    setLoadingCart(true);
    try {
      const cartString = await AsyncStorage.getItem("cart");
      const itemsFromStorage = cartString ? JSON.parse(cartString) : [];
      setCartItems(itemsFromStorage);
    } catch (error) {
      console.error("Failed to load cart items from storage", error);
      setCartItems([]);
    } finally {
      setLoadingCart(false);
    }
  }, []);

  useEffect(() => {
    loadCartItems();
  }, [loadCartItems]);

  const updateStorageAndState = async (newCartItems: Tables<"products">[]) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(newCartItems));
      setCartItems(newCartItems);
    } catch (error) {
      console.error("Failed to update cart in storage", error);
    }
  };

  const addToCart = async (product: Tables<"products">) => {
    if (!cartItems.find((item) => item.id === product.id)) {
      const newCartItems = [...cartItems, product];
      await updateStorageAndState(newCartItems);
    }
  };

  const removeFromCart = async (productId: number | string) => {
    const newCartItems = cartItems.filter((item) => item.id !== productId);
    await updateStorageAndState(newCartItems);
  };

  const clearCart = async () => {
    await updateStorageAndState([]);
  };

  const itemCount = cartItems.length;
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        itemCount,
        loadingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
