import { Text, View } from "react-native";
import React from "react";
import { MyMap, RideOptionsCard, NavigateCard } from "../components";
import tailwind from "twrnc";
import { createStackNavigator } from "@react-navigation/stack";

export const MapScreen = () => {
  const Stack = createStackNavigator();
  return (
    <View>
      <View style={tailwind`h-1/2`}>
        <MyMap />
      </View>
      <View style={tailwind`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};
