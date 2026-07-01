import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import type { PropertyFeature } from './types';

/** Compact icon + value + label tile used in the feature grid. */
const FeatureTile = ({ icon, label, value }: PropertyFeature) => (
  <View style={styles.tile}>
    <View style={styles.iconBox}>
      <Icon name={icon} size={15} color={theme.colors.primary} />
    </View>
    <Typography size={13} weight={theme.fonts.semiBold} align="center">
      {value}
    </Typography>
    <Typography
      size={11}
      color={theme.colors.text_color_light}
      align="center"
      marginTop={2}
    >
      {label}
    </Typography>
  </View>
);

export default FeatureTile;

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: responsive(12),
    borderRadius: responsive(14),
    backgroundColor: theme.colors.grey_50,
  },
  iconBox: {
    width: responsive(34),
    height: responsive(34),
    borderRadius: responsive(17),
    backgroundColor: theme.colors.icon_bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive(8),
  },
});
