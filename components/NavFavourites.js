import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";
import tailwind from "twrnc";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Misiones 1513, Montevideo, Uruguay",
  },
  {
    id: "133",
    icon: "briefcase",
    location: "Gym",
    destination: "Sauce, Canelones, Uruguay",
  },
  {
    id: "1332",
    icon: "briefcase",
    location: "Gym",
    destination: "Sauce, Canelones, Uruguay",
  },
];
export const NavFavourites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tailwind`bg-gray-200`, { height: 0.85 }]} />
      )}
      renderItem={({ item: { location, icon, destination } }) => (
        <TouchableOpacity style={tailwind`flex-row items-center p-5`}>
          <Icon
            style={tailwind`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tailwind`font-semibold text-lg`}>{location}</Text>
            <Text style={tailwind`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
