// The Food component is similar to the Head component, but we have changed the background color and border radius to make it a circle
import React from "react";
import { View } from "react-native";
export default function Food({ position, size }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: "green",
        position: "absolute",
        left: position[0] * size,
        top: position[1] * size,
        borderRadius: 50
      }}
    ></View>
  );
}