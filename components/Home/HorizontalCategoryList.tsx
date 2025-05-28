import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { categories } from "@/constants/categories";
import { CategoryIcon } from "@/components/CategoryIocn";

const HorizontalCategoryList = () => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={(item) => item.category}
      renderItem={({ item }) => (
        <TouchableOpacity className="flex-col  items-center mx-2 bg-white dark:bg-black px-4 py-3 rounded-xl gap-2 shadow-sm">
          <View className="dark:bg-blue-700/30 bg-blue-700/10 p-2 rounded-xl">
            <CategoryIcon iconData={item.icon} size={28} color="#1d4ed8" />
          </View>

          <Text className="text-lg dark:text-white">{item.category}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default HorizontalCategoryList;
