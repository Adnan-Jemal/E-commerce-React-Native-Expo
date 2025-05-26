import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from "@/components/Home/Logo";
import FavoritesBtn from "@/components/Home/FavoritesBtn";
import HomeBanner from "@/components/Home/HomeBanner";
import SearchBar from "@/components/Home/SearchBar";
import { categories } from "@/constants/categories";
import { CategoryIcon } from "@/components/CategoryIocn";

const index = () => {
  return (
    <SafeAreaView className="dark:bg-neutral-900 flex-1 p-4 ">
      <View className=" p-2 flex-row items-center justify-between pt-2">
        <Logo />
        <FavoritesBtn />
      </View>
      <View className="mt-6 gap-8">
        <SearchBar />
        <HomeBanner />
      </View>
      <View className="mt-6 p-2 gap-4">
        <Text className="dark:text-white text-3xl font-bold">Categories</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.category}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row items-center mx-2 bg-white dark:bg-black p-3 rounded-xl gap-2 shadow-sm "
            >
              <CategoryIcon iconData={item.icon} size={28} color="#1d4ed8" />
              <Text className="text-lg dark:text-white">{item.category}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;
