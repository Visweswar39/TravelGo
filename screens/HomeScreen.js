import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeroImage } from "../assets";
import * as Animatable from "react-native-animatable";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <SafeAreaView className="bg-white flex-1 relative">
      {/* First Section */}
      <View className="flex-row px-6 mt-8 items-center space-x-2">
        <View className="w-16 h-16 bg-black rounded-full items-center justify-center">
          <Text className="text-[#00BCC9] text-3xl font-semibold">Go</Text>
        </View>

        <Text className="text-[#2A2B4B] text-3xl font-semibold">Travel</Text>
      </View>

      {/* second section */}
      <View className="px-6 mt-8 space-y-3">
        <Text className="text-[#3C6072] text-[40px]">Enjoy the Trip with</Text>
        <Text className="text-[#00BCC9] text-[36px] font-bold">
          Good Moments
        </Text>
        <Text className="text-[#3C6072] text-base">
          Escape the ordinary, embrace the extraordinary. Your next adventure
          awaits !!
        </Text>
      </View>

      {/* circle section */}
      <View className="w-[380px] h-[380px] bg-[#00BCC9] rounded-full absolute bottom-12 -right-48" />
      <View className="w-[380px] h-[380px] bg-[#E99265] rounded-full absolute -bottom-16 -left-48" />

      {/* Image container */}
      <View className="flex-1 relative items-center justify-center px-3 mt-5">
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={HeroImage}
          className="w-full h-full object-cover"
        />
        {/* GO button */}
        <View className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center">
          <TouchableOpacity onPress={()=>navigation.navigate('Discover')}>
            <Animatable.View animation='pulse' easing='ease-in-out' iterationCount={'infinite'} className="w-20 h-20 bg-[#00BCC9] rounded-full items-center justify-center">
              <Text className="text-gray-50 text-[36px] font-semibold">Go</Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
