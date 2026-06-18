import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {theme} from "@theme/index";
import Icon from "@theme/Icon/icon";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {responsive} from "@theme/responsive";

interface FloatingButtonProps {
  icon: IconProp;
  onPress: () => void;
}

const FloatingButton = ({icon, onPress}: FloatingButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={icon} size={22} color={theme.colors.light} />
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    height: responsive(58),
    width: responsive(58),
    borderRadius: responsive(58) / 2,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: responsive(20),
    bottom: responsive(20),
    zIndex: 99,
    elevation: 10,
  },
});
