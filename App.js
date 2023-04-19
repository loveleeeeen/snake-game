import { GameEngine } from "react-native-game-engine"; //In the canvas we will use the GameEngine component with some styling from React Native Game Engine
import React, {useRef, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

import Constants from "./Constants"; //Created this file at the root of the project to store our constant values
import Head from "./components/Head"; //Adding Snake's head to GameEngine
import Food from "./components/Food";
import Tail from "./components/Tail";
import GameLoop from "./systems/GameLoop";

export default function App() {
  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null); //added a red to the game engine using the useRef() REact Hook for later use 
  const [isGameRunning, setIsGameRunning] = useState(true);

  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetGame = () => {
    engine.current.swap({
      head: {
        position: [0, 0],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Head />,
      },
      food: {
        position: [
          randomPositions(0, Constants.GRID_SIZE - 1),
          randomPositions(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Food />,
      },
      tail: {
        size: Constants.CELL_SIZE,
        elements: [],
        renderer: <Tail />,
      },
    });
    setIsGameRunning(true);
  };

  return (
    <View style={styles.canvas}>{/* To make a game we need a canvas or v=container where we will add game objects. To make a canvas we simply add a view component wiht styling */}
      <GameEngine 
        ref={engine}
        style= {{
          width: BoardSize,
          height: BoardSize,
          flex: null,
          backgroundColor: 'white',
        }}
        entities={{ //to add any entity we need to pass an object in the entities props in GameEngine
          head: { //We have passed an object in to the entities prop with the head key
            position: [0,0], //the set of coordinates in which to place the snake head
            size: Constants.CELL_SIZE, //size is the value to set the size of the snake head
            updateFrequency: 10, 
            nextMove: 10, 
            xspeed:0, //xspeed and yspeed are the values that determine the snske movement and direction, and can be 1, 0, or -1. Not that when xspeed is set to 1 or -1, then the value of yspeed must be 0 and vise versa
            yspeed: 0,
            renderer: <Head />, //resposible for rendering the component
          }, 
          food: {
            // To ensure randomness of food position, we have made a randomPositions function with minimum and maximum parameters
            position: [
              randomPositions(0, Constants.GRID_SIZE - 1),
              randomPositions(0, Constants.GRID_SIZE - 1),
            ],
            size: Constants.CELL_SIZE,
            renderer: <Food />,
          },
          tail: {
            size: Constants.CELL_SIZE,
            elements: [],
            renderer: <Tail />,
          },
          // In the tail, we have added an empty array in the initial state, so when the snake eats the food it will store each tail length in the elements: space
        }}
        // To make a game loop, the GameEngine component has a prop called systems that accepts an array of functions
        systems={[GameLoop]}
        running={isGameRunning}
        onEvent={(e) => {
          switch (e) {
            case "game-over":
              alert("Game over!");
              setIsGameRunning(false);
              return;
          }
        }}
      />

      <View style={styles.controlContainer}>
        <View style={styles.controllerRow}>
          <TouchableOpacity onPress={() => engine.current.dispatch("move-up")}>
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current.dispatch("move-left")}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
          <View style={[styles.controlBtn, { backgroundColor: null }]} />
          <TouchableOpacity
            onPress={() => engine.current.dispatch("move-right")}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current.dispatch("move-down")}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
      </View>
      
      {!isGameRunning && (
        <TouchableOpacity onPress={resetGame}>
          <Text
            style={{
              color: "white",
              marginTop: 15,
              fontSize: 22,
              padding: 10,
              backgroundColor: "grey",
              borderRadius: 10
            }}
          >
            Start New Game
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  controlContainer: {
    marginTop: 10,
  },
  controllerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlBtn: {
    backgroundColor: "yellow",
    width: 100,
    height: 100,
  },
});