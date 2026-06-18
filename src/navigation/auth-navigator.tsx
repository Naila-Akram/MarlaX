import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '@theme/index';
import React from 'react';
import { AuthStackParams } from '@utils/types';
import Login from '@screens/auth/login';
import SignupScreen from '@screens/auth/signup';
import OtpScreen from '@screens/auth/otp';
import KycVerification from '@screens/auth/kyc-verification';

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthNavigator = () => (
  <AuthStack.Navigator
    initialRouteName="LoginScreen"
    screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: theme.colors.background,
      },
    }}
  >
    <AuthStack.Screen name="LoginScreen" component={Login} />
    <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
    <AuthStack.Screen name="OTPVerification" component={OtpScreen} />
    <AuthStack.Screen name="KycVerification" component={KycVerification} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
