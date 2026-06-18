import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  faBuilding,
  faChartLine,
  faCircleCheck,
  faHourglass,
  faArrowUpRight,
} from '@fortawesome/pro-regular-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import OverViewSheet from './overview-sheet';

type StatRow = {
  id: string;
  icon: IconProp;
  label: string;
  value: string;
};

const STATS: StatRow[] = [
  { id: '1', icon: faBuilding,     label: 'Unit Purchased',   value: '03' },
  { id: '2', icon: faChartLine,    label: 'Total Investment',  value: 'PKR 2.8 Crore' },
  { id: '3', icon: faCircleCheck,  label: 'Total Paid',        value: 'PKR 2.1 Crore' },
  { id: '4', icon: faHourglass,    label: 'Pending',           value: 'PKR 0.7 Crore' },
];

const OverView = () => {
  const sheetRef = useRef<BottomSheetModal>(null);

  return (
    <View style={styles.card}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <Typography size={16} weight={theme.fonts.semiBold}>
          Portfolio Overview
        </Typography>
        <TouchableOpacity
          onPress={() => sheetRef.current?.present()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon name={faArrowUpRight} size={16} color={theme.colors.text_color} />
        </TouchableOpacity>
      </View>

      {/* Stat rows */}
      {STATS.map((stat, index) => (
        <View key={stat.id}>
          <View style={styles.statRow}>
            <View style={styles.iconBox}>
              <Icon name={stat.icon} size={18} color={theme.colors.primary} />
            </View>
            <Typography
              size={14}
              color={theme.colors.text_color_light}
              style={styles.label}
            >
              {stat.label}
            </Typography>
            <Typography size={15} weight={theme.fonts.semiBold}>
              {stat.value}
            </Typography>
          </View>
          {index < STATS.length - 1 && <View style={styles.divider} />}
        </View>
      ))}

      <OverViewSheet bottomSheetRef={sheetRef} />
    </View>
  );
};

export default OverView;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card_bg,
    borderRadius: responsive(16),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(14),
    marginHorizontal: responsive(10),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive(14),
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsive(12),
    gap: responsive(12),
  },
  iconBox: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(10),
    backgroundColor: theme.colors.icon_bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
  },
});
