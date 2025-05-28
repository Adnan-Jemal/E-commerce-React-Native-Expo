import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

const ProductImages = ({ productImages }: { productImages: string[] }) => {
  const [index, setIndex] = useState(0);
  return (
    <View>
      <View className="mt-6 relative">
        <Carousel
          loop={false}
          width={width - 20}
          height={300}
          style={{ borderRadius: 14, alignSelf: "center" }}
          defaultIndex={0}
          onSnapToItem={(index) => setIndex(index)}
          data={productImages}
          renderItem={({ item }) => (
            <View className="flex-1 justify-center ">
              <Image
                transition={500}
                // placeholder={require("@/assets/images/placeholder.png")}
                source={item}
                contentFit="cover"
                style={{ width: "100%", height: "100%", borderRadius: 14 }}
              />
            </View>
          )}
        />
        <View
          className="absolute bottom-2 right-1
         bg-black/50 w-14 px-2 py-1 rounded-xl items-center justify-center"
        >
          <Text className="text-lg text-white">
            {index + 1}/{productImages.length}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductImages;
