import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';

/**
 * Temporary body for steps whose UI hasn't been built yet. Each step swaps this
 * out for its real form as we work through the flow.
 */
const StepPlaceholder = ({ title }: { title: string }) => (
  <View style={styles.wrap}>
    <Typography size={20} weight={theme.fonts.bold} align="center">
      {title}
    </Typography>
    <Typography
      size={14}
      color={theme.colors.text_color_light}
      align="center"
      marginTop={8}
    >
      This step's UI is coming next.
    </Typography>
  </View>
);

export default StepPlaceholder;

const styles = StyleSheet.create({
  wrap: {
    paddingTop: responsive(80),
    alignItems: 'center',
  },
});
