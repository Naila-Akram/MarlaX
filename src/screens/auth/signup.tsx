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

type Props = AuthScreenProps<'SignupScreen'>;

const SignupScreen = ({ navigation }: Props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
          Create your Account
        </Typography>
        <Typography
          size={14}
          color={theme.colors.text_color_light}
          align="center"
          marginTop={8}
        >
          Join us to access smarter property solutions.
        </Typography>

        {/* Full Name */}
        <InputText
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
          style={styles.inputContainer}
          inputWrapperStyles={styles.inputWrapper}
          inputStyle={styles.inputField}
        />

        {/* Email / Phone Number */}
        <InputText
          placeholder="Email / Phone Number"
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

        {/* Confirm Password */}
        <InputText
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secure
          style={styles.inputContainer}
          inputWrapperStyles={styles.inputWrapper}
          inputStyle={styles.inputField}
        />

        {/* Register Button */}
        <BlockButton
          bgColor={theme.colors.black}
          style={styles.registerBtn}
          onPress={() => navigation.navigate('OTPVerification')}
        >
          <Typography
            size={16}
            weight={theme.fonts.semiBold}
            color={theme.colors.light}
            align="center"
          >
            Register
          </Typography>
        </BlockButton>

        {/* Sign In */}
        <View style={styles.signinRow}>
          <Typography size={14} color={theme.colors.text_color_light}>
            {'Already have an account? '}
          </Typography>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Typography
              size={14}
              weight={theme.fonts.semiBold}
              color={theme.colors.primary}
            >
              Sign in
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

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
  registerBtn: {
    marginTop: responsive(32),
    borderRadius: responsive(30),
  },
  signinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsive(32),
  },
});
