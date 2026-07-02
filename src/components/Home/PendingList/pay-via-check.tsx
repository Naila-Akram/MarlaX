import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Clipboard,
} from 'react-native';
import {
  faCopy,
  faCircleCheck,
  faArrowUpFromBracket,
} from '@fortawesome/pro-regular-svg-icons';
import { launchCamera } from 'react-native-image-picker';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import BlockButton from '@theme/buttons/block-button';
import InputText from '@theme/input/InputText';
import type { AppScreenProps } from '@utils/types/navigation';
import PaymentHeader from './paymentHeader';

// Bank the user is paying to — static display details.
const BANK_INFO: { label: string; value: string }[] = [
  { label: 'Bank Name', value: 'Meezan Bank' },
  { label: 'Bank Account Number', value: '22080110911815' },
  { label: 'Bank Account Name', value: 'Bahria Town Lhr' },
];

const fileNameFromUri = (uri: string): string => {
  const name = uri.split('/').pop() ?? uri;
  return name.length > 28 ? `${name.slice(0, 25)}...` : name;
};

const PayViaCheck = ({ navigation }: AppScreenProps<'PayViaCheck'>) => {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [chequeNumber, setChequeNumber] = useState('');
  const [receipt, setReceipt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    Clipboard.setString(
      BANK_INFO.map(row => `${row.label}: ${row.value}`).join('\n'),
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleCapture = () => {
    launchCamera(
      { mediaType: 'photo', quality: 0.8, saveToPhotos: false },
      response => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Something went wrong');
          return;
        }
        const asset = response.assets?.[0];
        if (asset?.uri) setReceipt(asset.fileName ?? asset.uri);
      },
    );
  };

  return (
    <View style={styles.container}>
      <PaymentHeader
        title="Pay Via Check"
        onBack={() => navigation.goBack()}
        onClose={() => navigation.popToTop()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Beneficiary bank details */}
        <View style={styles.bankCard}>
          {BANK_INFO.map(row => (
            <View key={row.label} style={styles.bankRow}>
              <Typography size={15} color={theme.colors.text_color_light}>
                {row.label}
              </Typography>
              <Typography
                size={15}
                weight={theme.fonts.semiBold}
                align="right"
                style={styles.bankValue}
              >
                {row.value}
              </Typography>
            </View>
          ))}

          <BlockButton
            bgColor={theme.colors.light}
            borderColor={theme.colors.borderColor}
            borderWidth={1}
            style={styles.pillBtn}
            onPress={handleCopy}
          >
            <View style={styles.btnRow}>
              <Icon
                name={copied ? faCircleCheck : faCopy}
                size={16}
                color={copied ? theme.colors.success_green : theme.colors.text_color}
              />
              <Typography size={15} weight={theme.fonts.medium}>
                {copied ? 'Copied!' : 'Copy Details'}
              </Typography>
            </View>
          </BlockButton>
        </View>

        {/* Payment details form */}
        <Typography
          size={22}
          weight={theme.fonts.bold}
          style={styles.sectionTitle}
        >
          Enter payment details
        </Typography>

        <InputText
          label="Bank Account Name"
          placeholder="Ahmad Qureshi"
          value={accountName}
          onChangeText={setAccountName}
          style={styles.field}
        />
        <InputText
          label="Bank Account Number"
          placeholder="1900102354687"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="number-pad"
          style={styles.field}
        />
        <InputText
          label="Cheque Number"
          placeholder="029481"
          value={chequeNumber}
          onChangeText={setChequeNumber}
          keyboardType="number-pad"
          style={styles.field}
        />

        {/* Receipt upload */}
        <Typography
          size={14}
          weight={theme.fonts.medium}
          style={styles.field}
        >
          Receipt Image
        </Typography>
        <BlockButton
          bgColor={theme.colors.background}
          borderColor={theme.colors.borderColor}
          borderWidth={1}
          style={styles.pillBtn}
          onPress={handleCapture}
        >
          <View style={styles.btnRow}>
            <Icon
              name={faArrowUpFromBracket}
              size={16}
              color={theme.colors.text_color}
            />
            <Typography size={15} weight={theme.fonts.medium}>
              Upload Receipt
            </Typography>
          </View>
        </BlockButton>

        {Boolean(receipt) && (
          <Typography
            size={13}
            weight={theme.fonts.medium}
            color={theme.colors.success_green}
            numberOfLines={1}
            marginTop={8}
          >
            {fileNameFromUri(receipt!)}
          </Typography>
        )}

        <Typography
          size={13}
          color={theme.colors.text_color_light}
          marginTop={8}
        >
          Pdf, Png, Jpeg formats, up to 10MB
        </Typography>
      </ScrollView>

      {/* Fixed footer */}
      <View style={styles.footer}>
        <BlockButton
          bgColor={theme.colors.black}
          style={styles.confirmBtn}
          onPress={() => navigation.navigate('PaymentSuccess')}
        >
          <Typography
            size={16}
            weight={theme.fonts.semiBold}
            color={theme.colors.light}
            align="center"
          >
            Confirm Payment
          </Typography>
        </BlockButton>
      </View>
    </View>
  );
};

export default PayViaCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  content: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(20),
    paddingBottom: responsive(24),
  },
  bankCard: {
    backgroundColor: theme.colors.icon_bg,
    borderRadius: responsive(16),
    padding: responsive(16),
  },
  bankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: responsive(12),
    paddingVertical: responsive(8),
  },
  bankValue: {
    flexShrink: 1,
  },
  pillBtn: {
    borderRadius: responsive(28),
    marginTop: responsive(12),
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive(10),
  },
  sectionTitle: {
    marginTop: responsive(28),
  },
  field: {
    marginTop: responsive(18),
  },
  footer: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(12),
    paddingBottom: responsive(28),
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    backgroundColor: theme.colors.background,
  },
  confirmBtn: {
    borderRadius: responsive(30),
    paddingVertical: responsive(16),
  },
});
