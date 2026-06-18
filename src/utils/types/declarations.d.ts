declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.mp4";
declare module "*.json";

declare module "text-encoding";
declare module "*.svg" {
  import React from "react";
  import {SvgProps} from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
