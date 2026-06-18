import {Dimensions} from "react-native";

const {height, width} = Dimensions.get("window");

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const responsive = (value: number) => {
  const reference = 360;
  const result = Math.floor((value * width) / reference);
  return result;
};
