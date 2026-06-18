import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OTP_TYPE, ScreenTypes } from '.';
export type AuthStackParams = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPassword: undefined;
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
  KycVerification: undefined;
};

export type BottomTabsStackParams = {
  HomeScreen: undefined;
  Listing: undefined;
  Payments: undefined;
  Documents: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParams> =
  NativeStackScreenProps<AuthStackParams, T>;
