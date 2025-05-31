import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import { ExternalPathString, Link, RelativePathString } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

type iconBtnType = {
  linkTo: RelativePathString | ExternalPathString;
  icon: ReactElement<any, any>;
  text: string;
};

const IconBtn = ({ icon, linkTo, text }: iconBtnType) => {

  return (
    <Link
      href={{
        pathname: linkTo,
      }}
      asChild
    >
      <TouchableOpacity className="flex-col flex-1 items-center mx-2 border-2 dark:border-blue-700/35 border-blue-700/10 px-4 py-3 rounded-3xl gap-2">
        <View className="dark:bg-blue-700/30 bg-blue-700/10 p-2 rounded-2xl">
          {icon}
        </View>
        <Text className="text-lg  dark:text-white">{text}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default IconBtn;
