import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { faCircleInfo } from '@fortawesome/pro-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import BlockButton from '@theme/buttons/block-button';
import Dropdown from '@components/Dropdown/dropdown';
import SuccessSheet from '@components/BottomSheets/successSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { AppScreenProps } from '@utils/types/navigation';
import ProfileHeader from './profileHeader';

type Props = AppScreenProps<'Complaint'>;

const CATEGORIES = [
  'Payment Issue',
  'Document Problem',
  'Construction Concern',
  'Agent Complaint',
  'Technical Issue',
  'Other',
];

const ComplaintScreen = ({ navigation }: Props) => {
  const [category, setCategory] = useState<string | null>(null);
  const [subject, setSubject]   = useState('');
  const [message, setMessage]   = useState('');

  const successSheetRef = useRef<BottomSheetModal>(null);

  const handleSubmit = () => {
    successSheetRef.current?.present();
  };

  return (
    <View style={styles.container}>
      <ProfileHeader title="Complaint" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Info banner ─────────────────────────────────── */}
        <View style={styles.banner}>
          <Icon name={faCircleInfo} size={18} color={theme.colors.warning} />
          <Typography size={13} color={theme.colors.text_color} style={styles.bannerText}>
            Our team will acknowledge your complaint within 2 business hours.
          </Typography>
        </View>

        {/* ── Category ────────────────────────────────────── */}
        <Typography size={14} weight={theme.fonts.medium} style={styles.label}>
          Category
        </Typography>
        <Dropdown
          placeholder="Select Category"
          value={category}
          options={CATEGORIES}
          onSelect={setCategory}
          style={styles.dropdown}
        />

        {/* ── Subject ─────────────────────────────────────── */}
        <Typography size={14} weight={theme.fonts.medium} style={styles.label}>
          Subject
        </Typography>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={subject}
            onChangeText={setSubject}
            placeholder="Brief Subject"
            placeholderTextColor={theme.colors.text_color_light}
          />
        </View>

        {/* ── Message ─────────────────────────────────────── */}
        <Typography size={14} weight={theme.fonts.medium} style={styles.label}>
          Message
        </Typography>
        <View style={[styles.inputWrapper, styles.messageWrapper]}>
          <TextInput
            style={[styles.input, styles.messageInput]}
            value={message}
            onChangeText={setMessage}
            placeholder="Describe your issue."
            placeholderTextColor={theme.colors.text_color_light}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* ── Buttons ─────────────────────────────────────── */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.cancelBtn}
            activeOpacity={0.75}
            onPress={() => navigation.goBack()}
          >
            <Typography size={15} weight={theme.fonts.semiBold} align="center">
              Cancel
            </Typography>
          </TouchableOpacity>

          <BlockButton
            bgColor={theme.colors.black}
            style={styles.submitBtn}
            onPress={handleSubmit}
          >
            <Typography size={15} weight={theme.fonts.semiBold} color={theme.colors.light} align="center">
              Submit
            </Typography>
          </BlockButton>
        </View>
      </ScrollView>

      <SuccessSheet
        bottomSheetRef={successSheetRef}
        icon={faCircleCheck}
        iconBgColor={theme.colors.Success}
        title="Complaint Submitted!"
        description="We will respond within 24 - 48 hours."
        buttonLabel="Done"
        onButtonPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default ComplaintScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  scrollContent: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(20),
    paddingBottom: responsive(48),
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: responsive(10),
    backgroundColor: `${theme.colors.warning}18`,
    borderRadius: responsive(12),
    padding: responsive(14),
    marginBottom: responsive(24),
  },
  bannerText: {
    flex: 1,
    lineHeight: responsive(20),
  },
  label: {
    marginBottom: responsive(8),
    color: theme.colors.text_color,
  },
  dropdown: {
    marginBottom: responsive(20),
  },
  inputWrapper: {
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    borderRadius: responsive(12),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(14),
    backgroundColor: theme.colors.background,
    marginBottom: responsive(20),
  },
  input: {
    fontSize: responsive(15),
    color: theme.colors.text_color,
    fontFamily: theme.fonts.regular,
    padding: 0,
  },
  messageWrapper: {
    height: responsive(140),
  },
  messageInput: {
    flex: 1,
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    gap: responsive(12),
    marginTop: responsive(8),
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    borderRadius: responsive(14),
    paddingVertical: responsive(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtn: {
    flex: 1,
    borderRadius: responsive(14),
  },
});
