import { useCart } from "@/providers/CartProvider";
import { Feather, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  const scheme = useColorScheme();
  const { cartItems } = useCart();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1d4ed8",
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarStyle: {
          backgroundColor: scheme.colorScheme === "dark" ? "#171717" : "white",
          height: 90,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Octicons name="home" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Octicons name="search" size={size} color={color} />
          ),
          tabBarLabel: "Search",
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: false,
          tabBarBadge: cartItems.length > 0 ? cartItems.length : undefined,
          tabBarBadgeStyle: { backgroundColor: "#1d4ed8" },
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="cart-outline"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Cart",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
