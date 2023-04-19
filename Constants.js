// The constant values

import { Dimensions } from "react-native";

export default {
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    GRID_SIZE: 15,
    CELL_SIZE: 20
    // we are making a 15 by 15 grid where our snake will move 
};