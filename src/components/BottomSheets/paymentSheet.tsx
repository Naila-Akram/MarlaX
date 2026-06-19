import React, { useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import { transparent } from '@utils/helper';

export type DetailRow = {
  label: string;
  value: string;
};

export type SheetAction = {
  label: string;
  icon: IconProp;
  bgColor: string;
  textColor: string;
  onPress: () => void;
};

interface PaymentSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  // Icon
  icon: IconProp;
  iconBgColor?: string;
  // Header text
  title: string;
  description?: string;
  // Amount block (optional)
  amountLabel?: string;
  amount?: string;
  currency?: string;
  amountBgColor?: string;
  // Detail rows
  details?: DetailRow[];
  // Action buttons
  actions?: SheetAction[];
}

const PaymentSheet: React.FC<PaymentSheetProps> = ({
  bottomSheetRef,
  icon,
  iconBgColor = theme.colors.Success,
  title,
  description,
  amountLabel,
  amount,
  currency = 'PKR',
  amountBgColor = theme.colors.Success,
  details = [],
  actions = [],
}) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef as React.RefObject<BottomSheetModal>}
      enableDynamicSizing
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon */}
        <View style={[styles.iconOuter, { backgroundColor: transparent(iconBgColor, 0.12) }]}>
          <View style={[styles.iconInner, { backgroundColor: iconBgColor }]}>
            <FontAwesomeIcon icon={icon} size={responsive(28)} color={theme.colors.light} />
          </View>
        </View>

        {/* Title + description */}
        <Typography size={20} weight={theme.fonts.bold} align="center" marginTop={16}>
          {title}
        </Typography>
        {description ? (
          <Typography
            size={14}
            color={theme.colors.text_color_light}
            align="center"
            marginTop={6}
            style={styles.description}
          >
            {description}
          </Typography>
        ) : null}

        {/* Amount block */}
        {amount ? (
          <View style={[styles.amountBlock, { backgroundColor: amountBgColor }]}>
            {amountLabel ? (
              <Typography size={13} color={theme.colors.light} align="center" weight={theme.fonts.medium}>
                {amountLabel}
              </Typography>
            ) : null}
            <View style={styles.amountRow}>
              <Typography size={16} color={theme.colors.light} weight={theme.fonts.medium}>
                {currency}{' '}
              </Typography>
              <Typography size={28} color={theme.colors.light} weight={theme.fonts.bold}>
                {amount}
              </Typography>
            </View>
          </View>
        ) : null}

        {/* Detail rows */}
        {details.length > 0 && (
          <View style={styles.detailsCard}>
            {details.map((row, index) => (
              <View key={index}>
                <View style={styles.detailRow}>
                  <Typography size={13} color={theme.colors.text_color_light} style={styles.detailLabel}>
                    {row.label}
                  </Typography>
                  <Typography size={13} weight={theme.fonts.semiBold} style={styles.detailValue}>
                    {row.value}
                  </Typography>
                </View>
                {index < details.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        )}

        {/* Action buttons */}
        {actions.length > 0 && (
          <View style={styles.actionsRow}>
            {actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress}
                activeOpacity={0.75}
                style={[styles.actionBtn, { backgroundColor: action.bgColor }]}
              >
                <FontAwesomeIcon icon={action.icon} size={responsive(15)} color={action.textColor} />
                <Typography size={14} weight={theme.fonts.semiBold} color={action.textColor}>
                  {action.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </BottomSheetScrollView>
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
    alignItems: 'center',
    paddingHorizontal: responsive(24),
    paddingTop: responsive(12),
    paddingBottom: responsive(36),
  },
  iconOuter: {
    width: responsive(100),
    height: responsive(100),
    borderRadius: responsive(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsive(8),
  },
  iconInner: {
    width: responsive(70),
    height: responsive(70),
    borderRadius: responsive(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    maxWidth: '85%',
  },
  amountBlock: {
    width: '100%',
    borderRadius: responsive(14),
    paddingVertical: responsive(16),
    paddingHorizontal: responsive(20),
    alignItems: 'center',
    marginTop: responsive(20),
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: responsive(4),
  },
  detailsCard: {
    width: '100%',
    borderRadius: responsive(14),
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    marginTop: responsive(16),
    overflow: 'hidden',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(13),
  },
  detailLabel: {
    flex: 1,
  },
  detailValue: {
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginHorizontal: responsive(16),
  },
  actionsRow: {
    flexDirection: 'row',
    gap: responsive(12),
    width: '100%',
    marginTop: responsive(20),
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive(8),
    paddingVertical: responsive(13),
    borderRadius: responsive(30),
  },
});
