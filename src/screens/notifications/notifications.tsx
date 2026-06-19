import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import {
  faArrowLeft,
  faBuilding,
  faClock,
  faCreditCard,
  faArrowsRotate,
  faHelmetSafety,
  faBullhorn,
} from '@fortawesome/pro-regular-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import { transparent } from '@utils/helper';
import type { AppScreenProps } from '@utils/types/navigation';

type Props = AppScreenProps<'Notifications'>;

type FilterType = 'All' | 'Reminders' | 'Payments' | 'Announcements';

type NotifItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: IconProp;
  iconColor: string;
  section: 'today' | 'last7';
  filter: Exclude<FilterType, 'All'>;
};

const FILTERS: FilterType[] = ['All', 'Reminders', 'Payments', 'Announcements'];

const DUMMY_NOTIFICATIONS: NotifItem[] = [
  {
    id: '1',
    title: 'Commercial Plot',
    description: 'New commercial plot added in Bahria Town. Explore before it\'s gone.',
    time: '6m ago',
    icon: faBuilding,
    iconColor: theme.colors.action_blue,
    section: 'today',
    filter: 'Announcements',
  },
  {
    id: '2',
    title: 'Limited Time Offer',
    description: 'Limited-time payment plan available for selected apartments.',
    time: '6m ago',
    icon: faClock,
    iconColor: theme.colors.warning,
    section: 'today',
    filter: 'Announcements',
  },
  {
    id: '3',
    title: 'Payment Reminder',
    description: 'Your quarterly installment is due in 3 days.',
    time: '6m ago',
    icon: faCreditCard,
    iconColor: theme.colors.red,
    section: 'last7',
    filter: 'Reminders',
  },
  {
    id: '4',
    title: 'Transaction Updates',
    description: 'Payment received successfully for your booking.',
    time: '6m ago',
    icon: faArrowsRotate,
    iconColor: theme.colors.Success,
    section: 'last7',
    filter: 'Payments',
  },
  {
    id: '5',
    title: 'Construction Progress',
    description: 'Development work has started for the commercial block of Bahria Town Sector D.',
    time: '6m ago',
    icon: faHelmetSafety,
    iconColor: theme.colors.warning,
    section: 'last7',
    filter: 'Announcements',
  },
  {
    id: '6',
    title: 'Launch and Promotions',
    description: 'New luxury apartments now open for booking.',
    time: '6m ago',
    icon: faBullhorn,
    iconColor: theme.colors.action_blue,
    section: 'last7',
    filter: 'Announcements',
  },
];

const NotificationsScreen = ({ navigation }: Props) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filtered = DUMMY_NOTIFICATIONS.filter(
    n => activeFilter === 'All' || n.filter === activeFilter,
  );

  const todayItems  = filtered.filter(n => n.section === 'today');
  const last7Items  = filtered.filter(n => n.section === 'last7');
  const hasContent  = filtered.length > 0;

  const renderCard = ({ item }: ListRenderItemInfo<NotifItem>) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.75}>
      <View style={[styles.iconBox, { backgroundColor: transparent(item.iconColor, 0.1) }]}>
        <Icon name={item.icon} size={18} color={item.iconColor} />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Typography size={14} weight={theme.fonts.semiBold} style={styles.cardTitle}>
            {item.title}
          </Typography>
          <Typography size={12} color={theme.colors.text_color_light}>
            {item.time}
          </Typography>
        </View>
        <Typography size={13} color={theme.colors.text_color_light} style={styles.cardDesc}>
          {item.description}
        </Typography>
      </View>
    </TouchableOpacity>
  );

  const ListContent = (
    <>
      {todayItems.length > 0 && (
        <>
          <Typography size={14} weight={theme.fonts.semiBold} style={styles.sectionLabel}>
            Today
          </Typography>
          {todayItems.map(item => renderCard({ item, index: 0, separators: {} as any }))}
        </>
      )}
      {last7Items.length > 0 && (
        <>
          <Typography size={14} weight={theme.fonts.semiBold} style={styles.sectionLabel}>
            Last 7 days
          </Typography>
          {last7Items.map(item => renderCard({ item, index: 0, separators: {} as any }))}
        </>
      )}
    </>
  );

  const EmptyState = (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconOuter}>
        <Icon name={faBullhorn} size={36} color={theme.colors.light} />
      </View>
      <Typography size={20} weight={theme.fonts.bold} marginTop={24} align="center">
        Nothing's happened Yet
      </Typography>
      <Typography
        size={14}
        color={theme.colors.text_color_light}
        align="center"
        marginTop={10}
        style={styles.emptyText}
      >
        When there's activity on your work, this is where we'll let you know. Pull down to refresh any time.
      </Typography>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ── Header ─────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View style={styles.backBtn}>
            <Icon name={faArrowLeft} size={16} color={theme.colors.text_color} />
          </View>
        </TouchableOpacity>
        <Typography size={20} weight={theme.fonts.bold}>
          Notifications
        </Typography>
      </View>
      <View style={styles.headerDivider} />

      {/* ── Filter chips ────────────────────────────────────── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map(f => {
          const isActive = f === activeFilter;
          return (
            <TouchableOpacity
              key={f}
              style={[styles.chip, isActive && styles.chipActive]}
              activeOpacity={0.75}
              onPress={() => setActiveFilter(f)}
            >
              <Typography
                size={14}
                weight={theme.fonts.medium}
                color={isActive ? theme.colors.light : theme.colors.text_color}
              >
                {f}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Mark all as read ────────────────────────────────── */}
      {hasContent && (
        <TouchableOpacity style={styles.markAllRow} activeOpacity={0.7}>
          <Typography size={13} weight={theme.fonts.medium} color={theme.colors.action_blue}>
            Mark all as read
          </Typography>
        </TouchableOpacity>
      )}

      {/* ── Content ─────────────────────────────────────────── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, !hasContent && styles.scrollEmpty]}
      >
        {hasContent ? ListContent : EmptyState}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(14),
    paddingHorizontal: responsive(20),
    paddingBottom: responsive(14),
  },
  backBtn: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(19),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDivider: {
    height: 1,
    backgroundColor: theme.colors.divider,
  },
  filterScroll: {
    flexGrow: 0,
    marginVertical: responsive(14),
  },
  filterRow: {
    paddingHorizontal: responsive(20),
    gap: responsive(10),
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: responsive(18),
    paddingVertical: responsive(8),
    borderRadius: responsive(30),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.light,
  },
  chipActive: {
    backgroundColor: theme.colors.black,
    borderColor: theme.colors.black,
  },
  markAllRow: {
    alignItems: 'flex-end',
    paddingHorizontal: responsive(20),
    marginBottom: responsive(4),
  },
  scrollContent: {
    paddingHorizontal: responsive(20),
    paddingBottom: responsive(40),
  },
  scrollEmpty: {
    flex: 1,
  },
  sectionLabel: {
    color: theme.colors.text_color,
    marginTop: responsive(12),
    marginBottom: responsive(8),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: responsive(12),
    backgroundColor: theme.colors.light,
    borderRadius: responsive(14),
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    padding: responsive(14),
    marginBottom: responsive(10),
  },
  iconBox: {
    width: responsive(40),
    height: responsive(40),
    borderRadius: responsive(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive(4),
  },
  cardTitle: {
    flex: 1,
    marginRight: responsive(8),
  },
  cardDesc: {
    lineHeight: responsive(19),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive(32),
    paddingTop: responsive(80),
  },
  emptyIconOuter: {
    width: responsive(90),
    height: responsive(90),
    borderRadius: responsive(45),
    backgroundColor: theme.colors.action_blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    lineHeight: responsive(22),
  },
});
