import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';

interface ListingTopBarProps {
  /** Tab labels rendered left → right. */
  tabs: string[];
  /** Index of the currently selected tab. */
  activeIndex: number;
  /** Notified with the tapped tab's index. */
  onChange: (index: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Reusable segmented tab bar. The selected segment fills with the dark pill and
 * white label; the rest stay muted. Controlled — the parent owns `activeIndex`,
 * so it works for any number of tabs.
 */
const ListingTopBar = ({
  tabs,
  activeIndex,
  onChange,
  style,
}: ListingTopBarProps) => {
  return (
    <View style={[styles.container, style]}>
      {tabs.map((label, index) => {
        const isActive = index === activeIndex;
        return (
          <TouchableOpacity
            key={label}
            activeOpacity={0.85}
            onPress={() => onChange(index)}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <Typography
              size={14}
              weight={isActive ? theme.fonts.semiBold : theme.fonts.medium}
              color={
                isActive ? theme.colors.white_900 : theme.colors.text_color_light
              }
            >
              {label}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ListingTopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: responsive(5),
    borderRadius: responsive(30),
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.white_900,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsive(12),
    borderRadius: responsive(26),
  },
  tabActive: {
    backgroundColor: theme.colors.black,
  },
});
