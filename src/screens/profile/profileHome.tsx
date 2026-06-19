import React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ProfileHeader from './profileHeader';
import {
  faEnvelope,
  faPhone,
  faChevronRight,
  faBell,
  faGear,
  faCircleQuestion,
  faArrowRightFromBracket,
  faCommentDots,
} from '@fortawesome/pro-regular-svg-icons';
import {
  faCircleCheck,
  faStar,
  faBuilding,
} from '@fortawesome/pro-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import { transparent } from '@utils/helper';
import type { AppScreenProps } from '@utils/types/navigation';

type Props = AppScreenProps<'profileHome'>;

// ─── Menu items ───────────────────────────────────────────────────────────────
type MenuItem = {
  label: string;
  icon: IconProp;
  route: 'MyListings' | 'NotificationSettings' | 'Settings' | 'HelpCenter';
};

const MENU_ITEMS: MenuItem[] = [
  { label: 'My Listings', icon: faBuilding, route: 'MyListings' },
  {
    label: 'Notification Settings',
    icon: faBell,
    route: 'NotificationSettings',
  },
  { label: 'Settings', icon: faGear, route: 'Settings' },
  { label: 'Help Center', icon: faCircleQuestion, route: 'HelpCenter' },
];

const profileHome = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <ProfileHeader title="My Account" onBack={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── User info card ────────────────────────────────────────── */}
        <TouchableOpacity activeOpacity={0.85} style={styles.userCard} onPress={() => navigation.navigate('UserProfile')}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.userAvatar}
          />
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Typography size={16} weight={theme.fonts.bold}>
                Hamza Ali
              </Typography>
              <FontAwesomeIcon
                icon={faCircleCheck}
                size={responsive(16)}
                color={theme.colors.action_blue}
              />
            </View>
            <View style={styles.metaRow}>
              <Icon
                name={faEnvelope}
                size={12}
                color={theme.colors.text_color_light}
              />
              <Typography size={13} color={theme.colors.text_color_light}>
                hamza.ali@gmail.com
              </Typography>
            </View>
            <View style={styles.metaRow}>
              <Icon
                name={faPhone}
                size={12}
                color={theme.colors.text_color_light}
              />
              <Typography size={13} color={theme.colors.text_color_light}>
                +92-300-1234567
              </Typography>
            </View>
          </View>
          <Icon name={faChevronRight} size={14} color={theme.colors.grey_500} />
        </TouchableOpacity>

        {/* ── Sales Manager ─────────────────────────────────────────── */}
        <Typography
          size={18}
          weight={theme.fonts.bold}
          style={styles.sectionTitle}
        >
          Sales Manager
        </Typography>

        <View style={styles.agentCard}>
          <View style={styles.agentTop}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=33' }}
              style={styles.agentAvatar}
            />
            <View style={styles.agentInfo}>
              <Typography size={15} weight={theme.fonts.bold}>
                Bilal Hassan
              </Typography>
              <Typography
                size={13}
                color={theme.colors.text_color_light}
                marginTop={2}
              >
                Senior Property Consultant
              </Typography>
            </View>
            <View style={styles.ratingBadge}>
              <FontAwesomeIcon
                icon={faStar}
                size={responsive(12)}
                color={theme.colors.warning}
              />
              <Typography
                size={13}
                weight={theme.fonts.semiBold}
                style={styles.ratingText}
              >
                4.8
              </Typography>
            </View>
          </View>

          <View style={styles.agentDivider} />

          <View style={styles.agentActions}>
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.callBtn}
              onPress={() => {}}
            >
              <Icon name={faPhone} size={15} color={theme.colors.action_blue} />
              <Typography
                size={14}
                weight={theme.fonts.semiBold}
                color={theme.colors.action_blue}
              >
                Call
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.waBtn}
              onPress={() => {}}
            >
              <Icon
                name={faCommentDots}
                size={15}
                color={theme.colors.Success}
              />
              <Typography
                size={14}
                weight={theme.fonts.semiBold}
                color={theme.colors.Success}
              >
                WhatsApp
              </Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── My Account menu ───────────────────────────────────────── */}
        <Typography
          size={18}
          weight={theme.fonts.bold}
          style={styles.sectionTitle}
        >
          My Account
        </Typography>

        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <View key={item.route}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.menuRow}
                onPress={() => navigation.navigate(item.route)}
              >
                <View style={styles.menuIconBox}>
                  <Icon
                    name={item.icon}
                    size={17}
                    color={theme.colors.action_blue}
                  />
                </View>
                <Typography
                  size={15}
                  weight={theme.fonts.semiBold}
                  style={styles.menuLabel}
                >
                  {item.label}
                </Typography>
                <Icon
                  name={faChevronRight}
                  size={13}
                  color={theme.colors.grey_500}
                />
              </TouchableOpacity>
              {index < MENU_ITEMS.length - 1 && (
                <View style={styles.menuDivider} />
              )}
            </View>
          ))}
        </View>

        {/* ── Logout ────────────────────────────────────────────────── */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.logoutRow}
          onPress={() => {}}
        >
          <View style={styles.logoutIconBox}>
            <Icon
              name={faArrowRightFromBracket}
              size={17}
              color={theme.colors.red}
            />
          </View>
          <Typography
            size={15}
            weight={theme.fonts.semiBold}
            style={styles.menuLabel}
          >
            Logout
          </Typography>
          <Icon name={faChevronRight} size={13} color={theme.colors.grey_500} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default profileHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  // ── Header
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
  // ── Scroll
  scrollContent: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(20),
    paddingBottom: responsive(48),
    gap: responsive(0),
  },
  // ── User card
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: transparent(theme.colors.action_blue, 0.07),
    borderRadius: responsive(16),
    borderWidth: 1,
    borderColor: transparent(theme.colors.action_blue, 0.15),
    padding: responsive(14),
    gap: responsive(12),
    marginBottom: responsive(24),
  },
  userAvatar: {
    width: responsive(58),
    height: responsive(58),
    borderRadius: responsive(29),
    borderWidth: 2,
    borderColor: theme.colors.action_blue,
  },
  userInfo: {
    flex: 1,
    gap: responsive(4),
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(6),
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(6),
  },
  // ── Section title
  sectionTitle: {
    marginBottom: responsive(12),
  },
  // ── Agent card
  agentCard: {
    backgroundColor: theme.colors.card_bg,
    borderRadius: responsive(16),
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    padding: responsive(16),
    marginBottom: responsive(24),
  },
  agentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(12),
  },
  agentAvatar: {
    width: responsive(52),
    height: responsive(52),
    borderRadius: responsive(26),
  },
  agentInfo: {
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(4),
    backgroundColor: transparent(theme.colors.warning, 0.12),
    paddingHorizontal: responsive(10),
    paddingVertical: responsive(5),
    borderRadius: responsive(20),
  },
  ratingText: {
    color: theme.colors.text_color,
  },
  agentDivider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: responsive(14),
  },
  agentActions: {
    flexDirection: 'row',
    gap: responsive(12),
  },
  callBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive(8),
    paddingVertical: responsive(12),
    borderRadius: responsive(30),
    backgroundColor: transparent(theme.colors.action_blue, 0.1),
  },
  waBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive(8),
    paddingVertical: responsive(12),
    borderRadius: responsive(30),
    backgroundColor: transparent(theme.colors.Success, 0.1),
  },
  // ── Menu card
  menuCard: {
    backgroundColor: theme.colors.card_bg,
    borderRadius: responsive(16),
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    overflow: 'hidden',
    marginBottom: responsive(16),
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(16),
    gap: responsive(14),
  },
  menuIconBox: {
    width: responsive(40),
    height: responsive(40),
    borderRadius: responsive(20),
    backgroundColor: transparent(theme.colors.action_blue, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
  },
  menuDivider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginHorizontal: responsive(16),
  },
  // ── Logout
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card_bg,
    borderRadius: responsive(16),
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(16),
    gap: responsive(14),
  },
  logoutIconBox: {
    width: responsive(40),
    height: responsive(40),
    borderRadius: responsive(20),
    backgroundColor: transparent(theme.colors.red, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
