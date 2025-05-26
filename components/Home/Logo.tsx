import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'

const Logo = () => {
  return (
    <View className="flex-row gap-2">
          <FontAwesome6 name="store" size={38} color="#1d4ed8" />
          <View className=" items-end justify-center flex-row gap-1">
            <Text className="font-extrabold text-4xl dark:text-white">ገበያ</Text>
            <Text className=" text-blue-700">Store</Text>
          </View>
        </View>
  )
}

export default Logo