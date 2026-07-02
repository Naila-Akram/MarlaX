import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { OTP_TYPE, ScreenTypes } from '.';

// ─── Auth stack ──────────────────────────────────────────────────────────────
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

export type AuthScreenProps<T extends keyof AuthStackParams> =
  NativeStackScreenProps<AuthStackParams, T>;

// ─── App stack ───────────────────────────────────────────────────────────────
export type GalleryUnit = {
  id: string;
  price: string;
  name: string;
  location: string;
  status?: string;
  images: string[];
};

export type AppStackParams = {
  MainTabs: undefined;
  ViewAll: { title: string };
  UnitDetail: { unit: GalleryUnit };
  PaymentMethods: undefined;
  PayViaCheck: undefined;
  PaymentSuccess: undefined;
  profileHome: undefined;
  UserProfile: undefined;
  MyListings: undefined;
  NotificationSettings: undefined;
  Settings: undefined;
  HelpCenter: undefined;
  LiveChat: undefined;
  Complaint: undefined;
  Notifications: undefined;
};

export type AppScreenProps<T extends keyof AppStackParams> =
  NativeStackScreenProps<AppStackParams, T>;

// ─── Bottom tabs ─────────────────────────────────────────────────────────────
export type BottomTabsStackParams = {
  HomeScreen: undefined;
  Listing: undefined;
  Payments: undefined;
  Documents: undefined;
};

export type TabScreenProps<T extends keyof BottomTabsStackParams> =
  BottomTabScreenProps<BottomTabsStackParams, T>;
