import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '@theme/index';
import type { AppStackParams } from '@utils/types';
import TabNavigator from './tab-navigator';
import ViewAllScreen from '@screens/common/view-all';
import UnitDetailScreen from '@screens/home/unit-detail';
import UserProfileScreen from '@screens/profile/user-profile';
import MyListingsScreen from '@screens/profile/my-listings';
import NotificationSettingsScreen from '@screens/profile/notification-settings';
import SettingsScreen from '@screens/profile/settings';
import HelpCenterScreen from '@screens/profile/help-center';
import LiveChatScreen from '@screens/profile/live-chat';
import ComplaintScreen from '@screens/profile/complaint';
import NotificationsScreen from '@screens/notifications/notifications';
import profileHome from '@screens/profile/profileHome';

const AppStack = createNativeStackNavigator<AppStackParams>();

const AppNavigator = () => (
  <AppStack.Navigator
    initialRouteName="MainTabs"
    screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: theme.colors.background,
      },
    }}
  >
    <AppStack.Screen name="MainTabs" component={TabNavigator} />
    <AppStack.Screen name="ViewAll" component={ViewAllScreen} />
    <AppStack.Screen name="UnitDetail" component={UnitDetailScreen} />
    <AppStack.Screen name="profileHome" component={profileHome} />
    <AppStack.Screen name="UserProfile" component={UserProfileScreen} />
    <AppStack.Screen name="MyListings" component={MyListingsScreen} />
    <AppStack.Screen
      name="NotificationSettings"
      component={NotificationSettingsScreen}
    />
    <AppStack.Screen name="Settings" component={SettingsScreen} />
    <AppStack.Screen name="HelpCenter" component={HelpCenterScreen} />
    <AppStack.Screen name="LiveChat" component={LiveChatScreen} />
    <AppStack.Screen name="Complaint" component={ComplaintScreen} />
    <AppStack.Screen name="Notifications" component={NotificationsScreen} />
  </AppStack.Navigator>
);

export default AppNavigator;
