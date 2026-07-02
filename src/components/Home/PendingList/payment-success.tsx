import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  faCheck,
  faArrowDownToLine,
  faShareNodes,
} from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import BlockButton from '@theme/buttons/block-button';
import { transparent } from '@utils/helper';
import type { AppScreenProps } from '@utils/types/navigation';
import PaymentHeader from './paymentHeader';

const RECEIPT: { label: string; value: string }[] = [
  { label: 'Receipt No.', value: 'RC-72838327' },
  { label: 'Payment Method', value: 'Bank Transfer' },
  { label: 'Date and Time', value: '23 May 26 at 11:40 am' },
  { label: 'Status', value: 'Completed' },
];

const PaymentSuccess = ({
  navigation,
}: AppScreenProps<'PaymentSuccess'>) => {
  return (
    <View style={styles.container}>
      <PaymentHeader
        title="Pay Via Check"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Success badge */}
        <View style={styles.ringOuter}>
          <View style={styles.ringInner}>
            <View style={styles.badge}>
              <View style={styles.badgeInner}>
                <Icon name={faCheck} size={26} color={theme.colors.light} />
              </View>
            </View>
          </View>
        </View>

        <Typography
          size={24}
          weight={theme.fonts.bold}
          align="center"
          marginTop={24}
        >
          Payment Successful!
        </Typography>
        <Typography
          size={15}
          color={theme.colors.text_color_light}
          align="center"
          marginTop={8}
        >
          You will receive a call for confirmation.
        </Typography>

        {/* Receipt card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Typography
              size={16}
              weight={theme.fonts.medium}
              color={theme.colors.light}
              align="center"
            >
              Amount Paid
            </Typography>
            <View style={styles.amountRow}>
              <Typography
                size={16}
                weight={theme.fonts.semiBold}
                color={theme.colors.light}
              >
                PKR{' '}
              </Typography>
              <Typography
                size={28}
                weight={theme.fonts.bold}
                color={theme.colors.light}
              >
                145,728
              </Typography>
            </View>
          </View>

          <View style={styles.cardBody}>
            {RECEIPT.map(row => (
              <View key={row.label} style={styles.receiptRow}>
                <Typography size={15} color={theme.colors.text_color_light}>
                  {row.label}
                </Typography>
                <Typography
                  size={15}
                  weight={theme.fonts.semiBold}
                  align="right"
                  style={styles.receiptValue}
                >
                  {row.value}
                </Typography>
              </View>
            ))}

            <View style={styles.divider} />

            <View style={styles.actionsRow}>
              <BlockButton
                bgColor={theme.colors.action_blue_bg}
                style={styles.actionBtn}
                onPress={() => {}}
              >
                <View style={styles.actionContent}>
                  <Icon
                    name={faArrowDownToLine}
                    size={16}
                    color={theme.colors.action_blue}
                  />
                  <Typography
                    size={15}
                    weight={theme.fonts.semiBold}
                    color={theme.colors.action_blue}
                  >
                    Download
                  </Typography>
                </View>
              </BlockButton>

              <BlockButton
                bgColor={theme.colors.success_green_bg}
                style={styles.actionBtn}
                onPress={() => {}}
              >
                <View style={styles.actionContent}>
                  <Icon
                    name={faShareNodes}
                    size={16}
                    color={theme.colors.success_green}
                  />
                  <Typography
                    size={15}
                    weight={theme.fonts.semiBold}
                    color={theme.colors.success_green}
                  >
                    WhatsApp
                  </Typography>
                </View>
              </BlockButton>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed footer */}
      <View style={styles.footer}>
        <BlockButton
          bgColor={theme.colors.black}
          style={styles.homeBtn}
          onPress={() => navigation.popToTop()}
        >
          <Typography
            size={16}
            weight={theme.fonts.semiBold}
            color={theme.colors.light}
            align="center"
          >
            Back to Home
          </Typography>
        </BlockButton>
      </View>
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  content: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(40),
    paddingBottom: responsive(24),
  },
  ringOuter: {
    alignSelf: 'center',
    width: responsive(150),
    height: responsive(150),
    borderRadius: responsive(75),
    borderWidth: 1,
    borderColor: theme.colors.grey_50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: responsive(118),
    height: responsive(118),
    borderRadius: responsive(59),
    borderWidth: 1,
    borderColor: theme.colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: responsive(88),
    height: responsive(88),
    borderRadius: responsive(44),
    backgroundColor: theme.colors.Success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeInner: {
    width: responsive(58),
    height: responsive(58),
    borderRadius: responsive(29),
    backgroundColor: transparent(theme.colors.light, 0.25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: responsive(16),
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    overflow: 'hidden',
    marginTop: responsive(28),
  },
  cardHeader: {
    backgroundColor: theme.colors.Success,
    paddingVertical: responsive(18),
    alignItems: 'center',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: responsive(4),
  },
  cardBody: {
    backgroundColor: theme.colors.card_bg,
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(14),
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: responsive(12),
    paddingVertical: responsive(10),
  },
  receiptValue: {
    flexShrink: 1,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: responsive(14),
  },
  actionsRow: {
    flexDirection: 'row',
    gap: responsive(12),
  },
  actionBtn: {
    flex: 1,
    borderRadius: responsive(24),
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive(8),
  },
  footer: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(12),
    paddingBottom: responsive(28),
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    backgroundColor: theme.colors.background,
  },
  homeBtn: {
    borderRadius: responsive(30),
    paddingVertical: responsive(16),
  },
});
