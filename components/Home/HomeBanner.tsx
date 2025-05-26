import { View } from "react-native";
import React from "react";
import { Image } from "expo-image";

const HomeBanner = () => {
  return (
    <View className="w-full rounded-3xl bg-blue-700 overflow-hidden">
      <Image
        source={require("@/assets/images/home-banner.png")}
        contentFit="contain"
        transition={1000}
        style={{ width: "100%", height: 200 }}
      />
    </View>
  );
};

export default HomeBanner;
