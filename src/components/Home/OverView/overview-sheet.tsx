import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {
  faChair,
  faBuilding,
  faStore,
} from '@fortawesome/pro-regular-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';

interface OverViewSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
}

type PortfolioItem = {
  id: string;
  icon: IconProp;
  title: string;
  unitPrice: string;
  paid: string;
  pending: string;
};

const PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    icon: faChair,
    title: 'Curve · Corporate Office',
    unitPrice: '1.8 Crore',
    paid: '37 Lacs',
    pending: '1.4 Crore',
  },
  {
    id: '2',
    icon: faBuilding,
    title: 'Sky Tree Tower · Shop',
    unitPrice: '1.2 Crore',
    paid: '25 Lacs',
    pending: '94 Lacs',
  },
  {
    id: '3',
    icon: faStore,
    title: 'Curve · Showroom',
    unitPrice: '4.9 Crore',
    paid: '1 Crore',
    pending: '3.9 Crore',
  },
];

const OverViewSheet: React.FC<OverViewSheetProps> = ({ bottomSheetRef }) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.55}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef as React.RefObject<BottomSheetModal>}
      snapPoints={['75%']}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Typography size={18} weight={theme.fonts.bold}>
          Portfolio Overview
        </Typography>
        <Typography
          size={14}
          color={theme.colors.text_color_light}
          marginTop={4}
        >
          Here's the portfolio breakdown.
        </Typography>

        {PORTFOLIO.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Icon
                  name={item.icon}
                  size={16}
                  color={theme.colors.text_color}
                />
              </View>
              <Typography size={15} weight={theme.fonts.semiBold}>
                {item.title}
              </Typography>
            </View>

            <View style={styles.divider} />

            <View style={styles.statsRow}>
              <View style={styles.statCol}>
                <Typography size={12} color={theme.colors.text_color_light}>
                  Unit Price
                </Typography>
                <Typography
                  size={15}
                  weight={theme.fonts.bold}
                  marginTop={4}
                >
                  {item.unitPrice}
                </Typography>
              </View>
              <View style={styles.statCol}>
                <Typography size={12} color={theme.colors.text_color_light}>
                  Paid
                </Typography>
                <Typography
                  size={15}
                  weight={theme.fonts.bold}
                  marginTop={4}
                >
                  {item.paid}
                </Typography>
              </View>
              <View style={styles.statCol}>
                <Typography size={12} color={theme.colors.text_color_light}>
                  Pending
                </Typography>
                <Typography
                  size={15}
                  weight={theme.fonts.bold}
                  marginTop={4}
                >
                  {item.pending}
                </Typography>
              </View>
            </View>
          </View>
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default OverViewSheet;

const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: responsive(24),
    borderTopRightRadius: responsive(24),
    backgroundColor: theme.colors.light,
  },
  handle: {
    backgroundColor: theme.colors.grey_100,
    width: responsive(40),
  },
  container: {
    paddingHorizontal: responsive(24),
    paddingTop: responsive(16),
    paddingBottom: responsive(36),
  },
  card: {
    backgroundColor: theme.colors.card_bg,
    borderRadius: responsive(16),
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(14),
    marginTop: responsive(16),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
  },
  iconBox: {
    width: responsive(34),
    height: responsive(34),
    borderRadius: responsive(10),
    backgroundColor: theme.colors.icon_bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: responsive(14),
  },
  statsRow: {
    flexDirection: 'row',
  },
  statCol: {
    flex: 1,
  },
});
