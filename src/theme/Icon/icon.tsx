import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from "@fortawesome/react-native-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {responsive} from "@theme/responsive";

type IconType = {
  name: IconProp;
  size: number;
  color: string;
  style?: FontAwesomeIconStyle;
};

const Icon = ({name, size, color, style}: IconType) => {
  return (
    <FontAwesomeIcon
      icon={name}
      size={responsive(size)}
      color={color}
      style={style}
    />
  );
};

export default Icon;
