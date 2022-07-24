import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import tw from "twrnc";
import {NavOptions} from '../components'

export const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          source={{ url: "https://links.papareact.com/gzs" }}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
        <NavOptions /> 
      </View>
    </SafeAreaView>
  );
};
