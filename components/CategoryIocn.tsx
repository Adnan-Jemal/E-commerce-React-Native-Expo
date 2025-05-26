import React from "react";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { CategoryType } from "@/types/categoryTypes";

type CategoryIconProps = {
  iconData: CategoryType["icon"];
  size?: number;
  color?: string;
};

const IconLibraries = {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  MaterialIcons
};

export const CategoryIcon = ({
  iconData,
  size = 24,
  color = "black",
}: CategoryIconProps) => {
  const IconComponent = IconLibraries[iconData.library];

  // Return the correct icon component with the specified props
  return (
    <IconComponent name={iconData.name as any} size={size} color={color} />
  );
};
