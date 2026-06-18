import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '@theme/index';
import type { AppStackParams } from '@utils/types';
import TabNavigator from './tab-navigator';
import ViewAllScreen from '@screens/common/view-all';

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
  </AppStack.Navigator>
);

export default AppNavigator;
