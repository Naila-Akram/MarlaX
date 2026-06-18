import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Typography from '@theme/typography/typography';
import BlockButton from '@theme/buttons/block-button';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import type { AuthScreenProps } from '@utils/types/navigation';
import InputText from '@theme/input/InputText';
import { useAuthStore } from '@stores/app-store';

type Props = AuthScreenProps<'LoginScreen'>;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useAuthStore(state => state.signIn);

  const handleLogin = () => {
    signIn(null);
  };
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Header */}
        <Typography size={24} weight={theme.fonts.bold} align="center">
          Sign in to your Account
        </Typography>
        <Typography
          size={14}
          color={theme.colors.text_color_light}
          align="center"
          marginTop={8}
        >
          Enter your email and password to login
        </Typography>

        {/* Email */}
        <InputText
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.inputContainer}
          inputWrapperStyles={styles.inputWrapper}
          inputStyle={styles.inputField}
        />

        {/* Password */}
        <InputText
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secure
          style={styles.inputContainer}
          inputWrapperStyles={styles.inputWrapper}
          inputStyle={styles.inputField}
        />

        {/* Forgot Password */}
        <TouchableOpacity
          style={styles.forgotRow}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Typography
            size={14}
            color={theme.colors.primary}
            weight={theme.fonts.medium}
          >
            Forgot Password?
          </Typography>
        </TouchableOpacity>

        {/* Login Button */}
        <BlockButton
          bgColor={theme.colors.black}
          style={styles.loginBtn}
          onPress={handleLogin}
        >
          <Typography
            size={16}
            weight={theme.fonts.semiBold}
            color={theme.colors.light}
            align="center"
          >
            Login
          </Typography>
        </BlockButton>

        {/* Or Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Typography
            size={14}
            color={theme.colors.text_color_light}
            style={styles.dividerLabel}
          >
            Or
          </Typography>
          <View style={styles.dividerLine} />
        </View>

        {/* Google */}
        <BlockButton
          bgColor={theme.colors.light}
          borderColor={theme.colors.borderColor}
          borderWidth={1}
          style={styles.socialBtn}
          onPress={() => {}}
        >
          <View style={styles.socialRow}>
            <Image
              source={require('../../assets/images/google.png')}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Typography
              size={15}
              weight={theme.fonts.medium}
              color={theme.colors.text_color}
            >
              Continue with Google
            </Typography>
          </View>
        </BlockButton>

        {/* Facebook */}
        <BlockButton
          bgColor={theme.colors.light}
          borderColor={theme.colors.borderColor}
          borderWidth={1}
          style={[styles.socialBtn, styles.facebookBtn]}
          onPress={() => {}}
        >
          <View style={styles.socialRow}>
            <Image
              source={require('../../assets/images/Facebook_icon.png')}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Typography
              size={15}
              weight={theme.fonts.medium}
              color={theme.colors.text_color}
            >
              Continue with Facebook
            </Typography>
          </View>
        </BlockButton>

        {/* Sign Up */}
        <View style={styles.signupRow}>
          <Typography size={14} color={theme.colors.text_color_light}>
            {"Don't have an account? "}
          </Typography>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Typography
              size={14}
              weight={theme.fonts.semiBold}
              color={theme.colors.primary}
            >
              Sign up
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: responsive(24),
    paddingTop: responsive(48),
    paddingBottom: responsive(32),
  },
  logo: {
    width: responsive(160),
    height: responsive(60),
    alignSelf: 'center',
    marginBottom: responsive(28),
  },
  inputContainer: {
    marginTop: responsive(16),
  },
  inputWrapper: {
    marginTop: 0,
    backgroundColor: theme.colors.grey_50,
    borderRadius: responsive(14),
  },
  inputField: {
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    marginTop: 0,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: responsive(10),
  },
  loginBtn: {
    marginTop: responsive(24),
    borderRadius: responsive(30),
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsive(24),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.borderColor,
  },
  dividerLabel: {
    marginHorizontal: responsive(12),
  },
  socialBtn: {
    borderRadius: responsive(30),
  },
  facebookBtn: {
    marginTop: responsive(12),
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive(10),
  },
  socialIcon: {
    width: responsive(22),
    height: responsive(22),
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsive(32),
  },
});
