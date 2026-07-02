import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { faEye, faEyeSlash } from '@fortawesome/pro-regular-svg-icons';
import ProfileHeader from './profileHeader';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import InputText from '@theme/input/InputText';
import Icon from '@theme/Icon/icon';
import RemoteImage from '@components/RemoteImage/remote-image';
import { transparent } from '@utils/helper';
import type { AppScreenProps } from '@utils/types/navigation';

type Props = AppScreenProps<'UserProfile'>;

const CNIC_FULL   = '35202-12345678-1';
const CNIC_MASKED = '35202-********-1';

const UserProfileScreen = ({ navigation }: Props) => {
  const [fullName, setFullName]       = useState('Hamza Ali');
  const [email, setEmail]             = useState('hamza.ali@gmail.com');
  const [phone, setPhone]             = useState('+92-300-5820147');
  const [cnicVisible, setCnicVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ProfileHeader title="Personal Profile" onBack={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Avatar section ──────────────────────────────────────── */}
        <View style={styles.avatarSection}>
          <RemoteImage
            uri="https://i.pravatar.cc/150?img=12"
            style={styles.avatar}
            showLoader={false}
          />
          <Typography size={18} weight={theme.fonts.bold} marginTop={12}>
            Hamza Ali
          </Typography>
          <Typography size={14} color={theme.colors.text_color_light} marginTop={4}>
            hamza.ali@gmail.com
          </Typography>
        </View>

        {/* ── Personal Details ────────────────────────────────────── */}
        <Typography size={20} weight={theme.fonts.bold} style={styles.sectionTitle}>
          Personal Details
        </Typography>

        <InputText
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.field}
          inputWrapperStyles={styles.inputWrapper}
          inputStyle={styles.inputStyle}
        />

        <InputText
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.field}
          inputWrapperStyles={styles.inputWrapper}
          inputStyle={styles.inputStyle}
        />

        <InputText
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.field}
          inputWrapperStyles={styles.inputWrapper}
          inputStyle={styles.inputStyle}
        />

        {/* ── CNIC (non-editable, custom masking) ─────────────────── */}
        <View style={styles.field}>
          <Typography size={14} weight={theme.fonts.medium}>
            CNIC
          </Typography>
          <View style={styles.cnicWrapper}>
            <TextInput
              value={cnicVisible ? CNIC_FULL : CNIC_MASKED}
              editable={false}
              allowFontScaling={false}
              style={styles.cnicInput}
            />
            <TouchableOpacity
              onPress={() => setCnicVisible(v => !v)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Icon
                name={cnicVisible ? faEyeSlash : faEye}
                size={18}
                color={theme.colors.grey_500}
              />
            </TouchableOpacity>
          </View>
          <Typography size={13} color={theme.colors.action_blue} marginTop={8}>
            CNIC is non-editable. Contact support to update.
          </Typography>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(14),
    paddingHorizontal: responsive(20),
    paddingBottom: responsive(14),
  },
  backBtn: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(19),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDivider: {
    height: 1,
    backgroundColor: theme.colors.divider,
  },
  scrollContent: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(28),
    paddingBottom: responsive(48),
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: responsive(32),
  },
  avatar: {
    width: responsive(96),
    height: responsive(96),
    borderRadius: responsive(48),
    borderWidth: 3,
    borderColor: transparent(theme.colors.action_blue, 0.25),
  },
  sectionTitle: {
    marginBottom: responsive(20),
  },
  field: {
    marginBottom: responsive(16),
  },
  inputWrapper: {
    marginTop: responsive(8),
    height: responsive(54),
    borderRadius: responsive(14),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.light,
  },
  inputStyle: {
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    marginTop: 0,
    fontSize: responsive(15),
    fontFamily: theme.fonts.regular,
  },
  cnicWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: responsive(54),
    borderRadius: responsive(14),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.light,
    paddingHorizontal: responsive(14),
    marginTop: responsive(8),
  },
  cnicInput: {
    flex: 1,
    fontSize: responsive(15),
    fontFamily: theme.fonts.regular,
    color: theme.colors.grey_500,
    padding: 0,
  },
});
