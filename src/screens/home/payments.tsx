import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  faCalendarDays,
  faCheck,
  faArrowDownToLine,
  faShareNodes,
} from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import PaymentSheet from '@components/BottomSheets/paymentSheet';
import { transparent } from '@utils/helper';
import type { TabScreenProps } from '@utils/types/navigation';

type Props = TabScreenProps<'Payments'>;

// ─── Types ────────────────────────────────────────────────────────────────────
type PaymentStatus = 'Paid' | 'Overdue' | 'Upcoming';

type PaymentItem = {
  id: string;
  day: string;
  monthYear: string;
  property: string;
  amount: string;
  label: string;
  status: PaymentStatus;
  receipt: string;
  method: string;
  dateTime: string;
};

type FilterTab = { id: string; label: string };

// ─── Data ─────────────────────────────────────────────────────────────────────
const FILTER_TABS: FilterTab[] = [
  { id: 'All',      label: 'All' },
  { id: 'Paid',     label: 'Paid' },
  { id: 'Overdue',  label: 'Overdue' },
  { id: 'Upcoming', label: 'Upcoming' },
];

const DUMMY_PAYMENTS: PaymentItem[] = [
  { id: '1', day: '22', monthYear: 'Mar, 2024', property: 'Bahria Heights Executive', amount: '250,000', label: 'Booking Amount',  status: 'Paid',     receipt: 'RC-72838327', method: 'Bank Transfer', dateTime: '22 Mar 24 at 10:30 am' },
  { id: '2', day: '04', monthYear: 'Jun, 2024', property: 'Apex Apartment',           amount: '125,000', label: 'Installment #1',  status: 'Paid',     receipt: 'RC-84921038', method: 'Online Transfer', dateTime: '04 Jun 24 at 2:15 pm' },
  { id: '3', day: '21', monthYear: 'Sep, 2024', property: 'Smart Residency',          amount: '90,000',  label: 'Installment #4',  status: 'Paid',     receipt: 'RC-93012847', method: 'Bank Transfer', dateTime: '21 Sep 24 at 9:00 am' },
  { id: '4', day: '23', monthYear: 'Dec, 2024', property: 'Smart Residency',          amount: '175,000', label: 'Booking Amount',  status: 'Upcoming', receipt: '',            method: '',              dateTime: '' },
  { id: '5', day: '28', monthYear: 'Mar, 2025', property: 'Bahria Heights Execut...', amount: '65,000',  label: 'Installment #2',  status: 'Upcoming', receipt: '',            method: '',              dateTime: '' },
  { id: '6', day: '10', monthYear: 'Jan, 2025', property: 'Apex Apartment',           amount: '95,000',  label: 'Installment #2',  status: 'Overdue',  receipt: '',            method: '',              dateTime: '' },
];

// ─── Status badge config ──────────────────────────────────────────────────────
const STATUS_CONFIG: Record<PaymentStatus, { color: string; bg: string }> = {
  Paid:     { color: theme.colors.Success,     bg: transparent(theme.colors.Success, 0.1) },
  Upcoming: { color: theme.colors.action_blue, bg: transparent(theme.colors.action_blue, 0.1) },
  Overdue:  { color: theme.colors.red,         bg: transparent(theme.colors.red, 0.1) },
};

// ─── Screen ───────────────────────────────────────────────────────────────────
const PaymentsScreen = ({}: Props) => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedPayment, setSelectedPayment] = useState<PaymentItem | null>(null);
  const sheetRef = useRef<BottomSheetModal>(null);

  const filtered = activeTab === 'All'
    ? DUMMY_PAYMENTS
    : DUMMY_PAYMENTS.filter(p => p.status === activeTab);

  const handleCardPress = (item: PaymentItem) => {
    if (item.status !== 'Paid') return;
    setSelectedPayment(item);
    sheetRef.current?.present();
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<PaymentItem>) => {
    const badge = STATUS_CONFIG[item.status];
    return (
      <TouchableOpacity
        onPress={() => handleCardPress(item)}
        activeOpacity={item.status === 'Paid' ? 0.7 : 1}
      >
        <View style={[styles.card, index === 0 && styles.cardFirst]}>
          {/* Date */}
          <View style={styles.dateCol}>
            <Typography size={22} weight={theme.fonts.bold}>
              {item.day}
            </Typography>
            <Typography size={11} color={theme.colors.text_color_light}>
              {item.monthYear}
            </Typography>
          </View>

          <View style={styles.dividerV} />

          {/* Info */}
          <View style={styles.infoCol}>
            <Typography size={12} color={theme.colors.text_color_light}>
              {item.property}
            </Typography>
            <View style={styles.amountRow}>
              <Typography size={18} weight={theme.fonts.bold}>
                {item.amount}
              </Typography>
              <Typography size={13} weight={theme.fonts.medium} color={theme.colors.text_color_light}>
                {' PKR'}
              </Typography>
            </View>
            <Typography size={12} color={theme.colors.text_color_light}>
              {item.label}
            </Typography>
          </View>

          {/* Status badge */}
          <View style={[styles.badge, { backgroundColor: badge.bg }]}>
            <Typography size={12} weight={theme.fonts.medium} color={badge.color}>
              {item.status}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeader = (
    <View>
      <View style={styles.sectionRow}>
        <Typography size={20} weight={theme.fonts.bold}>
          Payment Schedule
        </Typography>
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} onPress={() => {}}>
          <View style={styles.calendarBtn}>
            <Icon name={faCalendarDays} size={18} color={theme.colors.text_color} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {FILTER_TABS.map(tab => {
          const isActive = tab.id === activeTab;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.75}
              style={[styles.tab, isActive && styles.tabActive]}
            >
              <Typography
                size={14}
                weight={isActive ? theme.fonts.semiBold : theme.fonts.regular}
                color={isActive ? theme.colors.light : theme.colors.text_color_light}
              >
                {tab.label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <PaymentSheet
        bottomSheetRef={sheetRef}
        icon={faCheck}
        iconBgColor={theme.colors.Success}
        title="Payment Paid"
        description="Your payment has been paid successfully."
        amountLabel="Amount Paid"
        amount={selectedPayment?.amount}
        currency="PKR"
        amountBgColor={theme.colors.Success}
        details={
          selectedPayment
            ? [
                { label: 'Property',       value: selectedPayment.property },
                { label: 'Receipt No.',    value: selectedPayment.receipt },
                { label: 'Payment Method', value: selectedPayment.method },
                { label: 'Date and Time',  value: selectedPayment.dateTime },
                { label: 'Status',         value: 'Completed' },
              ]
            : []
        }
        actions={[
          {
            label: 'Download',
            icon: faArrowDownToLine,
            bgColor: theme.colors.grey_50,
            textColor: theme.colors.text_color,
            onPress: () => {},
          },
          {
            label: 'WhatsApp',
            icon: faShareNodes,
            bgColor: transparent(theme.colors.Success, 0.12),
            textColor: theme.colors.Success,
            onPress: () => {},
          },
        ]}
      />
    </View>
  );
};

export default PaymentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingBottom: responsive(120),
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive(20),
    marginBottom: responsive(16),
  },
  calendarBtn: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(10),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: responsive(20),
    marginBottom: responsive(16),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    borderRadius: responsive(30),
    padding: responsive(4),
    backgroundColor: theme.colors.light,
  },
  tab: {
    flex: 1,
    paddingVertical: responsive(9),
    borderRadius: responsive(30),
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: theme.colors.black,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card_bg,
    marginHorizontal: responsive(20),
    marginBottom: responsive(12),
    borderRadius: responsive(14),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(14),
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    gap: responsive(14),
  },
  cardFirst: {
    marginTop: responsive(4),
  },
  dateCol: {
    alignItems: 'center',
    minWidth: responsive(44),
  },
  dividerV: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: theme.colors.divider,
  },
  infoCol: {
    flex: 1,
    gap: responsive(3),
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  badge: {
    paddingHorizontal: responsive(10),
    paddingVertical: responsive(5),
    borderRadius: responsive(20),
    alignItems: 'center',
  },
});
