import {Text, TextProps} from "react-native";
import React from "react";
import {theme} from "@theme/index";
import {responsive} from "@theme/responsive";

interface TypographyTypes extends TextProps {
  size?: number;
  color?: string;
  weight?: string;
  flexWrap?: string;
  align?: "left" | "auto" | "center" | "right";
  marginTop?: number;
  lineHeight?: number;
  spacing?: number;
}

const Typography = ({
  children,
  size = 16,
  flexWrap = "wra",
  color = theme.colors.text_color,
  weight = theme.fonts.regular,
  align = "left",
  marginTop = 0,
  lineHeight,
  style,
  spacing = 0,
  ...props
}: TypographyTypes) => {
  return (
    <Text
      allowFontScaling={false}
      {...props}
      style={[
        {
          fontSize: size,
          flexWrap: flexWrap ? "wrap" : undefined,
          color: color,
          fontFamily: weight,
          textAlign: align,
          marginTop: responsive(marginTop),
          lineHeight: lineHeight,
          letterSpacing: responsive(spacing),
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default Typography;
