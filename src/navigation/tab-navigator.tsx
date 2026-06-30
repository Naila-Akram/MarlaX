import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHouse,
  faBriefcase,
  faCreditCard,
  faFileLines,
} from '@fortawesome/pro-light-svg-icons';
import {
  faHouse as faHouseSolid,
  faBriefcase as faBriefcaseSolid,
  faCreditCard as faCreditCardSolid,
  faFileLines as faFileLinesSolid,
} from '@fortawesome/pro-solid-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Header from '@components/Header/header';
import type { BottomTabsStackParams, AppStackParams } from '@utils/types';
import HomeScreen from '@screens/home/home';
import ListingScreen from '@screens/home/listing';
import PaymentsScreen from '@screens/home/payments';
import DocumentsScreen from '@screens/home/documents';

const Tab = createBottomTabNavigator<BottomTabsStackParams>();

const DUMMY_AVATAR = { uri: 'https://i.pravatar.cc/150?img=12' };

// ─── Header config per tab ────────────────────────────────────────────────────
type HeaderConfig =
  | { centerType: 'logo' }
  | { centerType: 'title'; title: string };

const HEADER_CONFIGS: Record<keyof BottomTabsStackParams, HeaderConfig> = {
  HomeScreen: { centerType: 'logo' },
  Listing: { centerType: 'title', title: 'Listings' },
  Payments: { centerType: 'title', title: 'Payments' },
  Documents: { centerType: 'title', title: 'Documents' },
};

// ─── Tab config ───────────────────────────────────────────────────────────────
const TAB_CONFIG: Record<
  keyof BottomTabsStackParams,
  { label: string; icon: any; activeIcon: any; badge?: string }
> = {
  HomeScreen: { label: 'Home', icon: faHouse, activeIcon: faHouseSolid },
  Listing: {
    label: 'Listing',
    icon: faBriefcase,
    activeIcon: faBriefcaseSolid,
    badge: 'New',
  },
  Payments: {
    label: 'Payments',
    icon: faCreditCard,
    activeIcon: faCreditCardSolid,
  },
  Documents: {
    label: 'Documents',
    icon: faFileLines,
    activeIcon: faFileLinesSolid,
  },
};

// ─── Custom tab bar ───────────────────────────────────────────────────────────
const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => (
  <View style={styles.tabBar}>
    {state.routes.map((route, index) => {
      const isFocused = state.index === index;
      const config = TAB_CONFIG[route.name as keyof BottomTabsStackParams];
      const { options } = descriptors[route.key];

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      return (
        <TouchableOpacity
          key={route.key}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          style={[styles.tabItem, isFocused && styles.tabItemActive]}
          activeOpacity={0.8}
        >
          {config.badge && !isFocused && (
            <View style={styles.badgePill}>
              <Typography
                size={9}
                weight={theme.fonts.semiBold}
                color={theme.colors.light}
              >
                {config.badge}
              </Typography>
            </View>
          )}
          <FontAwesomeIcon
            icon={isFocused ? config.activeIcon : config.icon}
            size={responsive(18)}
            color={isFocused ? theme.colors.light : theme.colors.grey_500}
          />
          {isFocused && (
            <Typography
              size={13}
              weight={theme.fonts.semiBold}
              color={theme.colors.light}
              style={styles.tabLabel}
            >
              {config.label}
            </Typography>
          )}
        </TouchableOpacity>
      );
    })}
  </View>
);

// ─── Navigator ────────────────────────────────────────────────────────────────
const TabNavigator = () => {
  const appNav = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const [activeTab, setActiveTab] =
    useState<keyof BottomTabsStackParams>('HomeScreen');

  const headerConfig = HEADER_CONFIGS[activeTab];

  return (
    <View style={styles.wrapper}>
      <Header
        {...headerConfig}
        avatarSource={DUMMY_AVATAR}
        onAvatarPress={() => appNav.navigate('profileHome')}
        onNotificationPress={() => appNav.navigate('Notifications')}
      />
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          listeners={{ focus: () => setActiveTab('HomeScreen') }}
        />
        <Tab.Screen
          name="Listing"
          component={ListingScreen}
          listeners={{ focus: () => setActiveTab('Listing') }}
        />
        <Tab.Screen
          name="Payments"
          component={PaymentsScreen}
          listeners={{ focus: () => setActiveTab('Payments') }}
        />
        <Tab.Screen
          name="Documents"
          component={DocumentsScreen}
          listeners={{ focus: () => setActiveTab('Documents') }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(20),
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.light,
    paddingHorizontal: responsive(12),
    paddingVertical: responsive(10),
    marginHorizontal: responsive(24),
    marginBottom: responsive(28),
    borderRadius: responsive(50),
    elevation: 12,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(10),
    borderRadius: responsive(30),
    minWidth: responsive(44),
    position: 'relative',
  },
  tabItemActive: {
    backgroundColor: theme.colors.black,
  },
  tabLabel: {
    marginLeft: responsive(6),
  },
  badgePill: {
    position: 'absolute',
    top: -responsive(6),
    right: -responsive(4),
    backgroundColor: theme.colors.warning,
    borderRadius: responsive(8),
    paddingHorizontal: responsive(5),
    paddingVertical: responsive(2),
    zIndex: 1,
  },
});
