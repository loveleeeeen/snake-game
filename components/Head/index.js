import React from "react";
import { View } from "react-native";
export default function Head({ position, size }) {
  return (
    <View
      style={{ //This will render a sqaure 
        width: size,
        height: size,
        backgroundColor: "red",
        position: "absolute", // using absolute to easily move the head
        left: position[0] * size,
        top: position[1] * size,
      }}
    ></View>
  );
} 