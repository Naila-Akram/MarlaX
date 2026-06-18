import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import {responsive} from "@theme/responsive";
import {theme} from "@theme/index";
import {transparent} from "@utils/helper";

interface ButtonProps extends TouchableOpacityProps {
  bgColor?: string;
  sidePadding?: number;
  borderColor?: string;
  borderWidth?: number;
}

const BlockButton = ({
  children,
  bgColor = transparent(theme.colors.primary, 0.1),
  sidePadding,
  borderColor,
  borderWidth,
  style,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.5}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: bgColor,
          paddingHorizontal: sidePadding ? sidePadding : 0,
          borderColor: borderColor || "transparent",
          borderWidth: borderWidth || 0,
        },
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

export default BlockButton;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: responsive(12),
    borderRadius: responsive(12),
    width: "100%",
  },
});
