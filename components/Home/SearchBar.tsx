import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useColorScheme } from "nativewind";
import { Octicons } from "@expo/vector-icons";

import ProductList from "../ProductList";
import { router } from "expo-router";

type SearchBarTypes = {
  disabled: boolean;
  searchTerm?: string;
  setSearchTerm?: (text: string) => void;
  handleSearch?: () => void;
};
const SearchBar = ({
  disabled = false,
  searchTerm,
  setSearchTerm,
  handleSearch,
}: SearchBarTypes) => {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <View className="flex-row max-w-full w-full mx-2 self-center px-2 gap-2 ">
        <View className=" flex-row items-center justify-between border-2 border-neutral-300 dark:border-neutral-700 rounded-2xl flex-1 ">
          <TextInput
            keyboardType="web-search"
            onSubmitEditing={
              handleSearch ? handleSearch : () => router.push("/search")
            }
            value={searchTerm}
            onChangeText={(text) => setSearchTerm && setSearchTerm(text)}
            placeholderTextColor={`${
              colorScheme == "dark" ? "white" : "black"
            }`}
            maxLength={30}
            readOnly={disabled}
            cursorColor={`${colorScheme == "dark" ? "white" : "black"}`}
            placeholder="Search..."
            className=" dark:text-white text-black text-lg px-4 w-full "
          />
        </View>
        <TouchableOpacity
          onPress={handleSearch ? handleSearch : () => router.push("/search")}
          className="px-4 items-center justify-center   shadow-lg bg-white dark:bg-black rounded-2xl "
        >
          <Octicons
            name="search"
            size={24}
            color={`${colorScheme == "dark" ? "white" : "black"}`}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SearchBar;
