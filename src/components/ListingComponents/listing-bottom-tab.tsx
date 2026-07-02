import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';

export interface BottomTabAction {
  icon: IconProp;
  onPress?: () => void;
}

interface ListingBottomTabProps {
  /** Circular icon-only buttons shown before the primary action. */
  actions?: BottomTabAction[];
  /** Label for the wide primary button. */
  primaryLabel: string;
  /** Optional leading icon for the primary button. */
  primaryIcon?: IconProp;
  onPrimaryPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Reusable floating action bar for the bottom of listing screens. Renders any
 * number of circular icon shortcuts followed by a wide primary button. All
 * content is driven by props so it can be reused across listing flows.
 */
const ListingBottomTab = ({
  actions = [],
  primaryLabel,
  primaryIcon,
  onPrimaryPress,
  style,
}: ListingBottomTabProps) => {
  return (
    <View style={[styles.container, style]}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.85}
          onPress={action.onPress}
          style={styles.circleBtn}
        >
          <Icon name={action.icon} size={18} color={theme.colors.text_color} />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPrimaryPress}
        style={styles.primaryBtn}
      >
        {!!primaryIcon && (
          <Icon name={primaryIcon} size={16} color={theme.colors.text_color} />
        )}
        <Typography size={15} weight={theme.fonts.semiBold}>
          {primaryLabel}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

export default ListingBottomTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
    paddingHorizontal: responsive(16),
    paddingTop: responsive(12),
    paddingBottom: responsive(16),
    borderTopLeftRadius: responsive(24),
    borderTopRightRadius: responsive(24),
    backgroundColor: theme.colors.white_900,
  },
  circleBtn: {
    width: responsive(52),
    height: responsive(52),
    borderRadius: responsive(26),
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white_900,
  },
  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive(8),
    height: responsive(52),
    borderRadius: responsive(26),
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.grey_50,
  },
});
