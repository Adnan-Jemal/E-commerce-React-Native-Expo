import { View, Text } from 'react-native'
import React from 'react'
import GoogleSignInBtn from '@/components/GoogleSignInBtn'

const signin = () => {
  return (
    <View className='flex-1 items-center justify-center'>
      <GoogleSignInBtn />
    </View>
  )
}

export default signin