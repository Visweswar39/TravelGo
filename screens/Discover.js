import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MaterialIcons } from "@expo/vector-icons";
import MenuContainer from "../components/MenuContainer";
import { AntDesign } from "@expo/vector-icons";
import ItemCardContainer from "../components/ItemCardContainer";
import { getPlacesData } from "../api";

const Discover = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [type, setType] = useState("restaurants");
  const [lat,setLat] = useState(null);
  const [lang,setLang] = useState(null);

  const onChangeAddress = async (text) => {
    console.log(text);
    setAddress(text);
    // get host from localhost:19002 above the qrcode
    if (text.length > 2) {
      const endpoint = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=`;
      let res = await fetch(endpoint);
      if (res) {
        let resultData = await res.json();
        setData(resultData.features);
      }
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(()=>{
    setIsLoading(true);
    getPlacesData(lang,lat,type).then(data => {
      setMainData(data);
      setInterval(()=>{
        setIsLoading(false);
        // console.log('hello');
      },2000);
    })
  },[lang,lat,type])

  const getItemText = (item) => {
    let city = item.properties.city;
    let county = item.properties.county;
    let state = item.properties.state;
    let country = item.properties.country;

    return (
      <View style={{ flexDirection: "row", alignItems: "center", padding: 15,  }}>
        <MaterialIcons name={"location-city"} color={"black"} size={30} />
        <View style={{ marginLeft: 10, flexShrink: 1 }}>
          <Text style={{ fontWeight: "700" }}>{county}{}{city?','+city:''}</Text>
          <Text style={{ fontSize: 12 }}>
            {state},{country}
          </Text>
        </View>
      </View>
    );
  };

  function handleOnPress (item) {
    console.log(item.geometry.coordinates);
    setLang(item.geometry.coordinates[0]);
    setLat(item.geometry.coordinates[1]);
    setData([]);
  }

  return (
    <SafeAreaView className="flex-1 relative">
      {/* Top section */}
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className="text-[38px] text-[#0B646B] font-bold">Discover</Text>
          <Text className="text-[34px] text-[#527283] ">the Beauty Today</Text>
        </View>

        <View className="w-14 h-14 rounded-md items-center justify-center">
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover "
          />
        </View>
      </View>

      {/* Auto complete */}
      <View className="flex bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
        <TextInput
          placeholder="search"
          value={address}
          onChangeText={(text) => onChangeAddress(text)}
        />
        <View className="flex">
          {data && data.length > 0 ? (
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Pressable
                  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                  onPress={() => handleOnPress(item)}
                >
                  {getItemText(item)}
                </Pressable>
              )}
              // keyExtractor={(index) => index}
            />
          ) : null}
        </View>
      </View>

      {/* Menu container */}
      {isLoading ? (
        <View className=" flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView>
          {/* Menu containers */}
          <View className="flex-row items-center justify-between px-8 mt-8 ">
            <MenuContainer
              key={"hotel"}
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          {/* Menu items */}
          <View>
            {/* Text section */}
            <View className="flex-row items-center justify-between px-8 mt-8">
              <Text className="text-[#2C7379] text-[24px] font-bold">
                {" "}
                Top Picks{" "}
              </Text>
              <TouchableOpacity className="items-center justify-center space-x-1 flex-row">
                <Text className="text-[#A0C4C7] text-[18px] font-bold">
                  Explore
                </Text>
                <AntDesign name="arrowright" size={24} color="#A0C4C7" />
              </TouchableOpacity>
            </View>

            {/* Items section */}
            <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
              {mainData.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCardContainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                    <Image
                      source={NotFound}
                      className=" w-32 h-32 object-cover"
                    />
                    <Text className="text-2xl text-[#428288] font-semibold">
                      Opps...No Data Found
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
