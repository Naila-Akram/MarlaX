import React, { useState } from 'react';
import {
  View,
  Switch,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { faEye, faEyeSlash } from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import type { AppScreenProps } from '@utils/types/navigation';
import ProfileHeader from './profileHeader';

type Props = AppScreenProps<'Settings'>;

type PasswordField = 'current' | 'new' | 'verify';

const SettingsScreen = ({ navigation }: Props) => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass]         = useState('');
  const [verifyPass, setVerifyPass]   = useState('');
  const [visible, setVisible] = useState<Record<PasswordField, boolean>>({
    current: false,
    new:     false,
    verify:  false,
  });
  const [biometric, setBiometric] = useState(true);

  const toggleVisibility = (field: PasswordField) =>
    setVisible(prev => ({ ...prev, [field]: !prev[field] }));

  const fields: { key: PasswordField; label: string; value: string; onChange: (v: string) => void }[] = [
    { key: 'current', label: 'Current Password',    value: currentPass, onChange: setCurrentPass },
    { key: 'new',     label: 'New Password',         value: newPass,     onChange: setNewPass },
    { key: 'verify',  label: 'Verify New Password',  value: verifyPass,  onChange: setVerifyPass },
  ];

  return (
    <View style={styles.container}>
      <ProfileHeader title="Settings" onBack={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Change Password ─────────────────────────────── */}
        <Typography size={22} weight={theme.fonts.bold} style={styles.sectionTitle}>
          Change Password
        </Typography>

        {fields.map(field => (
          <View key={field.key} style={styles.fieldGroup}>
            <Typography size={14} weight={theme.fonts.medium} style={styles.label}>
              {field.label}
            </Typography>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={field.value}
                onChangeText={field.onChange}
                secureTextEntry={!visible[field.key]}
                placeholderTextColor={theme.colors.text_color_light}
                placeholder="••••••••••••"
              />
              <TouchableOpacity
                onPress={() => toggleVisibility(field.key)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Icon
                  name={visible[field.key] ? faEyeSlash : faEye}
                  size={18}
                  color={theme.colors.text_color_light}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* ── Security ────────────────────────────────────── */}
        <Typography size={22} weight={theme.fonts.bold} style={styles.sectionTitle}>
          Security
        </Typography>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View>
              <Typography size={15} weight={theme.fonts.semiBold}>
                Biometric Login
              </Typography>
              <Typography size={13} color={theme.colors.text_color_light} marginTop={3}>
                Face ID / Fingerprint
              </Typography>
            </View>
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              trackColor={{
                false: theme.colors.grey_100,
                true:  theme.colors.action_blue,
              }}
              thumbColor={theme.colors.light}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  scrollContent: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(24),
    paddingBottom: responsive(60),
  },
  sectionTitle: {
    marginBottom: responsive(20),
  },
  fieldGroup: {
    marginBottom: responsive(20),
  },
  label: {
    marginBottom: responsive(8),
    color: theme.colors.text_color,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    borderRadius: responsive(14),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(14),
    backgroundColor: theme.colors.background,
  },
  input: {
    flex: 1,
    fontSize: responsive(15),
    color: theme.colors.text_color,
    fontFamily: theme.fonts.regular,
    padding: 0,
  },
  card: {
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    borderRadius: responsive(16),
    backgroundColor: theme.colors.card_bg,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(18),
  },
});
