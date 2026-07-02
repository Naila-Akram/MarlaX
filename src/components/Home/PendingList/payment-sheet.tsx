import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  faMoneyBill,
  faRulerCombined,
  faTag,
} from '@fortawesome/pro-regular-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import BlockButton from '@theme/buttons/block-button';
import RemoteImage from '@components/RemoteImage/remote-image';
import { transparent } from '@utils/helper';
import type { AppStackParams } from '@utils/types';

type NavProp = NativeStackNavigationProp<AppStackParams>;

interface PaymentSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
}

type DetailRow = {
  id: string;
  icon: IconProp;
  label: string;
  currency?: string;
  value: string;
};

const DETAILS: DetailRow[] = [
  {
    id: '1',
    icon: faMoneyBill,
    label: 'Price',
    currency: 'PKR',
    value: '1.8 Crore',
  },
  { id: '2', icon: faRulerCombined, label: 'Size', value: '828 Sq. ft.' },
  {
    id: '3',
    icon: faTag,
    label: 'Price per sq. ft.',
    currency: 'PKR',
    value: '3,000',
  },
];

const PaymentSheet: React.FC<PaymentSheetProps> = ({ bottomSheetRef }) => {
  const navigation = useNavigation<NavProp>();

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

  const handleSelectPaymentMethod = useCallback(() => {
    // Close the sheet before leaving the home page so it isn't left open
    // underneath the payment methods screen when the user navigates back.
    bottomSheetRef.current?.dismiss();
    navigation.navigate('PaymentMethods');
  }, [bottomSheetRef, navigation]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef as React.RefObject<BottomSheetModal>}
      enableDynamicSizing
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.card}>
          {/* Unit header */}
          <View style={styles.cardHeader}>
            <RemoteImage
              uri="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=200"
              style={styles.thumb}
              showLoader={false}
            />
            <View style={styles.headerText}>
              <Typography size={17} weight={theme.fonts.bold}>
                Curve
              </Typography>
              <Typography
                size={13}
                color={theme.colors.text_color_light}
                marginTop={2}
              >
                Corporate Office #2L, 4th floor
              </Typography>
            </View>
          </View>

          {/* Detail rows */}
          {DETAILS.map(row => (
            <View key={row.id} style={styles.detailRow}>
              <Icon
                name={row.icon}
                size={15}
                color={theme.colors.text_color_light}
              />
              <Typography
                size={14}
                color={theme.colors.text_color_light}
                style={styles.detailLabel}
              >
                {row.label}
              </Typography>
              <View style={styles.valueWrap}>
                {row.currency && (
                  <Typography size={14} color={theme.colors.text_color_light}>
                    {row.currency}{' '}
                  </Typography>
                )}
                <Typography size={14} weight={theme.fonts.semiBold}>
                  {row.value}
                </Typography>
              </View>
            </View>
          ))}

          {/* Installment highlight */}
          <View style={styles.installmentBox}>
            <View>
              <Typography size={12} color={theme.colors.text_color_light}>
                Installment #4
              </Typography>
              <Typography size={14} weight={theme.fonts.semiBold} marginTop={2}>
                Amount to Pay Now
              </Typography>
            </View>
            <Typography size={16} weight={theme.fonts.bold}>
              PKR 145,728
            </Typography>
          </View>
        </View>

        <BlockButton
          bgColor={theme.colors.black}
          style={styles.selectBtn}
          onPress={handleSelectPaymentMethod}
        >
          <Typography
            size={16}
            weight={theme.fonts.medium}
            color={theme.colors.light}
            align="center"
          >
            Select Payment Method
          </Typography>
        </BlockButton>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default PaymentSheet;

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
    paddingHorizontal: responsive(20),
    paddingTop: responsive(8),
    paddingBottom: responsive(36),
  },
  card: {
    backgroundColor: theme.colors.card_bg,
    borderRadius: responsive(16),
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    padding: responsive(16),
    marginTop: responsive(12),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(12),
    marginBottom: responsive(6),
  },
  thumb: {
    width: responsive(44),
    height: responsive(44),
    borderRadius: responsive(12),
    backgroundColor: theme.colors.icon_bg,
  },
  headerText: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
    paddingVertical: responsive(10),
  },
  detailLabel: {
    flex: 1,
  },
  valueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  installmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: transparent(theme.colors.grey_500, 0.12),
    borderRadius: responsive(14),
    paddingHorizontal: responsive(14),
    paddingVertical: responsive(12),
    marginTop: responsive(10),
  },
  selectBtn: {
    borderRadius: responsive(28),
    marginTop: responsive(16),
  },
});
