// The Tail component is tricky
/*
When the snake eats the food, we will add an element in the snake body so that our snake 
will grow. These elements will pass into the Tail component, which will indicate that it must get larger.

We will loop through all the elements to create the while snake body, append it, and then
render.
*/
import React from "react";
import { View } from "react-native";
import Constants from "../../Constants";
export default function Tail({ elements, position, size }) {
  const tailList = elements.map((el, idx) => (
    <View
      key={idx}
      style={{
        width: size,
        height: size,
        position: "absolute",
        left: el[0] * size,
        top: el[1] * size,
        backgroundColor: "red",
      }}
    />
  ));
  return (
    <View
      style={{
        width: Constants.GRID_SIZE * size,
        height: Constants.GRID_SIZE * size,
      }}
    >
      {tailList}
    </View>
  );
}
