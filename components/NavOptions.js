import {useNavigation} from "@react-navigation/native";
import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import tailwind from "twrnc";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];
export const NavOptions = () => {
  const navigation=useNavigation()
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tailwind`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
          onPress={()=> navigation.navigate(item.screen)}
        >
          <View>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <Text style={tailwind`mt-2 text-lg font-semibold`}>
              {item.title}
            </Text>
            <Icon
              style={tailwind`p-2 bg-black rounded-full w-10 mt-4`}
              type="antdesign"
              name="arrowright"
              color="white"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
