import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

type ProductDescriptionType = {
  short_description: string;
  description: string;
};

const ProductDescription = ({
  description,
  short_description,
}: ProductDescriptionType) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Text className="dark:text-neutral-300 text-neutral-700 text-2xl mt-6 ">
        Description
      </Text>
      <View className="p-4 mt-2 bg-white dark:bg-black rounded-2xl gap-2 ">
        <Text className="dark:text-white text-md">{short_description}</Text>
        {expanded && (
          <Text className="dark:text-white text-md">{description}</Text>
        )}
        <TouchableOpacity
          onPress={() => setExpanded((prev) => !prev)}
          className=" items-center"
        >
          <Text className="text-blue-700">
            {expanded ? "View Less" : "View More"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProductDescription;
