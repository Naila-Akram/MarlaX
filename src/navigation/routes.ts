import {OTP_TYPE} from '@utils/enums';

export type AuthStackParamList = {
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
};

export type AppStackParamList = {
  Home: undefined;
};
