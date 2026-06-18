import {ImageSourcePropType} from "react-native";

export type FriendObj = {
  id: string;
  name: string;
  img: ImageSourcePropType;
  selected?: boolean;
};
