import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList, AppStackParamList } from '@navigation/routes';
import { OTP_TYPE } from './types';

export interface User {
  id: string | number;
  name: string;
  email: string;
  token: string;
  token_expires_at: string;
  rememberMe?: boolean;
  register?: boolean; // true = user still in registration flow
  [key: string]: any;
}

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type AppScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

// Placeholder — expand as tab navigator is added
export type BottomTabsProps<T extends string = string> = {
  navigation: any;
  route: any;
};

export type AuthStackParams = {
  // AuthLanding: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPassword: undefined;
  KycVerification: undefined;
  OTPVerification: {
    type: OTP_TYPE;
    email?: string;
    otp?: number;
    fcmToken?: string | null;
    rememberMe: boolean;
  };
  NewPassword: {
    email: string;
    token?: string;
  };
};

export { OTP_TYPE };
