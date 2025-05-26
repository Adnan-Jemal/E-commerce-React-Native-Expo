import { ComponentProps } from "react";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

// A helper type to get the icon names from each library
type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];
type IoniconName = ComponentProps<typeof Ionicons>["name"];
type FontAwesome5IconName = ComponentProps<typeof FontAwesome5>["name"];
type MaterialIconsName = ComponentProps<typeof MaterialIcons>["name"];

export type CategoryType = {
  category: string;
  subcategories: string[];
  icon: {
    name:
      | MaterialIconName
      | IoniconName
      | FontAwesome5IconName
      | MaterialIconsName;
    library:
      | "MaterialCommunityIcons"
      | "Ionicons"
      | "FontAwesome5"
      | "MaterialIcons";
  };
};
