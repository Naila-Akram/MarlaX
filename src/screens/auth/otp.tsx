import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
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

type Props = AuthScreenProps<'OTPVerification'>;

const TIMER_START = 60;
const OTP_LENGTH = 6;

const OtpScreen = ({ navigation, route }: Props) => {
  const { email = 'hamza.ali@gmail.com' } = route.params ?? {};

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_START);
  const inputRefs = useRef<(TextInput | null)[]>(Array(OTP_LENGTH).fill(null));

  const isComplete = otp.every(d => d !== '');

  useEffect(() => {
    if (timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit) {
      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
        setActiveIndex(index + 1);
      } else {
        inputRefs.current[index]?.blur();
        navigation.navigate('KycVerification');
      }
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      const next = [...otp];
      next[index - 1] = '';
      setOtp(next);
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimeLeft(TIMER_START);
    setActiveIndex(0);
    inputRefs.current[0]?.focus();
    console.log('Resend OTP pressed');
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
        {/* Lock icon */}
        <View style={styles.iconOuter}>
          <View style={styles.iconInner}>
            <Image
              source={require('../../assets/images/Lock.png')}
              style={styles.lockIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Title */}
        <Typography
          size={22}
          weight={theme.fonts.bold}
          align="center"
          marginTop={28}
        >
          OTP Code Verification
        </Typography>

        {/* Subtitle */}
        <View style={styles.subtitleRow}>
          <Typography
            size={14}
            color={theme.colors.text_color_light}
            align="center"
          >
            {'Verify your identity by entering the code sent '}
          </Typography>
          <Typography
            size={14}
            weight={theme.fonts.semiBold}
            color={theme.colors.text_color}
            align="center"
          >
            {`${email}.`}
          </Typography>
        </View>

        {/* OTP boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              style={[
                styles.otpBox,
                activeIndex === index && styles.otpBoxActive,
              ]}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              onFocus={() => setActiveIndex(index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Continue button */}
        <BlockButton
          bgColor={isComplete ? theme.colors.black : theme.colors.grey_100}
          style={styles.continueBtn}
          onPress={() => isComplete && navigation.navigate('KycVerification')}
          disabled={!isComplete}
        >
          <Typography
            size={16}
            weight={theme.fonts.semiBold}
            color={isComplete ? theme.colors.light : theme.colors.grey_500}
            align="center"
          >
            Continue
          </Typography>
        </BlockButton>

        {/* Timer / Resend */}
        <View style={styles.resendRow}>
          <Typography size={14} color={theme.colors.text_color_light}>
            {"Didn't receive the email?  "}
          </Typography>
          {timeLeft > 0 ? (
            <Typography
              size={14}
              weight={theme.fonts.semiBold}
              color={theme.colors.primary}
            >
              {formatTime(timeLeft)}
            </Typography>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Typography
                size={14}
                weight={theme.fonts.semiBold}
                color={theme.colors.primary}
              >
                Resend code
              </Typography>
            </TouchableOpacity>
          )}
        </View>

        {/* Back to sign up */}
        <TouchableOpacity
          style={styles.backRow}
          onPress={() => navigation.navigate('SignupScreen')}
        >
          <Typography
            size={14}
            weight={theme.fonts.medium}
            color={theme.colors.text_color}
          >
            {'← Back to sign up'}
          </Typography>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: responsive(24),
    paddingTop: responsive(60),
    paddingBottom: responsive(32),
  },
  iconOuter: {
    width: responsive(90),
    height: responsive(90),
    borderRadius: responsive(45),
    backgroundColor: theme.colors.grey_50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInner: {
    width: responsive(64),
    height: responsive(64),
    borderRadius: responsive(32),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    width: responsive(28),
    height: responsive(28),
    tintColor: theme.colors.light,
  },
  subtitleRow: {
    marginTop: responsive(10),
    paddingHorizontal: responsive(16),
    alignItems: 'center',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: responsive(10),
    marginTop: responsive(32),
    marginBottom: responsive(28),
  },
  otpBox: {
    width: responsive(46),
    height: responsive(52),
    borderRadius: responsive(10),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    textAlign: 'center',
    fontSize: responsive(20),
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text_color,
    backgroundColor: theme.colors.light,
  },
  otpBoxActive: {
    borderColor: theme.colors.primary,
  },
  continueBtn: {
    width: '100%',
    borderRadius: responsive(30),
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive(24),
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive(24),
  },
});
