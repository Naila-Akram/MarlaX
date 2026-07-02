import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';

interface SellPropertyHeaderProps {
  title: string;
  /** Zero-based index of the active step. */
  step: number;
  totalSteps: number;
  onBack: () => void;
}

/**
 * Shared header for the Sell Property wizard: circular back button, title, a
 * "N of total" pill, and a segmented progress bar that fills up to the active
 * step. Rendered once by the flow container so every step reuses it.
 */
const SellPropertyHeader = ({
  title,
  step,
  totalSteps,
  onBack,
}: SellPropertyHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.backBtn}
        >
          <Icon name={faArrowLeft} size={16} color={theme.colors.text_color} />
        </TouchableOpacity>

        <Typography size={22} weight={theme.fonts.bold} style={styles.title}>
          {title}
        </Typography>

        <View style={styles.stepPill}>
          <Typography
            size={13}
            weight={theme.fonts.medium}
            color={theme.colors.text_color_light}
          >
            {step + 1} of {totalSteps}
          </Typography>
        </View>
      </View>

      <View style={styles.progress}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <View
            key={i}
            style={[styles.segment, i <= step && styles.segmentActive]}
          />
        ))}
      </View>
    </View>
  );
};

export default SellPropertyHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsive(20),
    paddingBottom: responsive(6),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(14),
  },
  backBtn: {
    width: responsive(44),
    height: responsive(44),
    borderRadius: responsive(22),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
  },
  stepPill: {
    backgroundColor: theme.colors.grey_50,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    paddingHorizontal: responsive(12),
    paddingVertical: responsive(6),
    borderRadius: responsive(20),
  },
  progress: {
    flexDirection: 'row',
    gap: responsive(6),
    marginTop: responsive(20),
  },
  segment: {
    flex: 1,
    height: responsive(6),
    borderRadius: responsive(3),
    backgroundColor: theme.colors.grey_100,
  },
  segmentActive: {
    backgroundColor: theme.colors.black,
  },
});
