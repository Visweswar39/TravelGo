import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const MenuContainer = ({ title, imageSrc, type, setType }) => {

    const handlePress = () => {
        setType(title.toLowerCase());
    }

    return (
    <TouchableOpacity className="items-center justify-center space-y-2" onPress={handlePress}>
      <View className={`w-24 h-24 p-2 items-center justify-center rounded-full shadow-sm ${type === title.toLowerCase() ? 'bg-gray-200': ''}`}>
        <Image source={imageSrc} className="w-full h-full object-contain"/>
      </View>
      <Text className='text-[#00BCC9] text-lg font-semibold'>{title}</Text>
    </TouchableOpacity>
  );
};

export default MenuContainer;
