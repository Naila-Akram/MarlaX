import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { theme } from '@theme/index';
import Icon from '@theme/Icon/icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { responsive } from '@theme/responsive';

interface FloatingButtonProps {
  icon: IconProp;
  onPress: () => void;
}

const FloatingButton = ({ icon, onPress, ...props }: FloatingButtonProps) => {
  return (
    <TouchableOpacity {...props} style={styles.container} onPress={onPress}>
      <Icon name={icon} size={22} color={theme.colors.light} />
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    height: responsive(40),
    width: responsive(40),
    borderRadius: responsive(58) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    right: responsive(10),
    zIndex: 99,
    borderColor: theme.colors.light,
    borderWidth: 1,
  },
});
