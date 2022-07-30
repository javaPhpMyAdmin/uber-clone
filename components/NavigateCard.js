import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tailwind from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../Slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import { NavFavourites } from "./NavFavourites";
import { Icon } from "react-native-elements";

export const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tailwind`flex-1 bg-white`}>
      <Text style={tailwind`text-center py-5 text-xl`}>
        Good Morning, Guess
      </Text>
      <View style={tailwind`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            styles={toInputBoxStyles}
            nearbyPlacesAPI="GooglePlacesSearch"
            enablePoweredByContainer={false}
            minLength={2}
            returnKeyType={"search"}
            debounce={400}
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
          />
        </View>
        <NavFavourites />
      </View>
      <View style={tailwind`py-2 mt-auto border-t border-gray-100 flex-row bg-white justify-evenly`}>
        <TouchableOpacity
          onPress={()=>navigation.navigate('RideOptionsCard')}
          style={tailwind`flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tailwind`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind`flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="white"
            size={16}
          />
          <Text style={tailwind`text-white text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
