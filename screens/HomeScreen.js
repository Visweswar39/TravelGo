import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        })
    },)
  return (
    <SafeAreaView className="bg-white flex-1 relative">
        {/* First Section */}
        <View className='flex-row px-6 mt-8 bg-red-300 space-x-2'>
            <View>
                <Text className ="text-red-900">Go</Text>
            </View>

            <Text>Travel</Text>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen;