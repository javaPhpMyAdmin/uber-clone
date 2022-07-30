import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { View } from "react-native";
import React, { useState } from "react";
import tailwind from "twrnc";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

export const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selectedCar, setSelectedCar] = useState(null);
  return (
    <SafeAreaView style={tailwind`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tailwind`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="font-awesome" />
        </TouchableOpacity>
        <Text style={tailwind`text-center py-5 text-xl`}>Select a Ride</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCar(item)}
            style={tailwind`flex-row justify-between items-center px-10 ${
              item.id === selectedCar?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <View style={tailwind`-ml-6`}>
              <Text style={tailwind`text-xl font-semibold`}>{item.title}</Text>
              <Text>Travel time...</Text>
            </View>
            <Text>US$500</Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={!selectedCar}
          style={tailwind`m-3 bg-black py-3 ${!selectedCar && "bg-gray-300"}`}
        >
          <Text style={tailwind`text-center text-white text-xl`}>
            Choose {selectedCar?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
