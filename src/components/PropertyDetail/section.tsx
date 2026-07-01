import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** Titled, divider-separated block used to lay out the detail sheet. */
const Section = ({ title, children, style }: SectionProps) => (
  <View style={[styles.section, style]}>
    <Typography size={15} weight={theme.fonts.semiBold} style={styles.title}>
      {title}
    </Typography>
    {children}
  </View>
);

export default Section;

const styles = StyleSheet.create({
  section: {
    marginTop: responsive(20),
    paddingTop: responsive(20),
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  title: {
    marginBottom: responsive(12),
  },
});
