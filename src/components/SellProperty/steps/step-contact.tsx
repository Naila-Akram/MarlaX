import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import SelectField from '../select-field';
import { useSellProperty } from '../sell-property-context';

const DIAL_CODES = ['+92', '+1', '+44', '+91', '+971', '+966', '+61', '+880'];

const StepContact = () => {
  const { form, setField } = useSellProperty();

  return (
    <View style={styles.wrap}>
      <Typography size={20} weight={theme.fonts.bold}>
        Contact Information
      </Typography>

      {/* Email */}
      <Typography size={16} weight={theme.fonts.semiBold} style={styles.label}>
        Email
      </Typography>
      <TextInput
        value={form.email}
        onChangeText={t => setField('email', t)}
        placeholder="john@email.com"
        placeholderTextColor={theme.colors.grey_500}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        allowFontScaling={false}
      />

      {/* Phone */}
      <Typography size={16} weight={theme.fonts.semiBold} style={styles.label}>
        Phone
      </Typography>
      <View style={styles.row}>
        <SelectField
          value={form.phoneCode}
          options={DIAL_CODES}
          onChange={v => setField('phoneCode', v)}
          title="Country Code"
          style={styles.codeSelect}
        />
        <TextInput
          value={form.phone}
          onChangeText={t => setField('phone', t)}
          placeholder="300 1234567"
          placeholderTextColor={theme.colors.grey_500}
          keyboardType="phone-pad"
          style={[styles.input, styles.rowInput]}
          allowFontScaling={false}
        />
      </View>

      {/* WhatsApp */}
      <Typography size={16} weight={theme.fonts.semiBold} style={styles.label}>
        WhatsApp
      </Typography>
      <View style={styles.row}>
        <SelectField
          value={form.whatsappCode}
          options={DIAL_CODES}
          onChange={v => setField('whatsappCode', v)}
          title="Country Code"
          style={styles.codeSelect}
        />
        <TextInput
          value={form.whatsapp}
          onChangeText={t => setField('whatsapp', t)}
          placeholder="300 1234567"
          placeholderTextColor={theme.colors.grey_500}
          keyboardType="phone-pad"
          style={[styles.input, styles.rowInput]}
          allowFontScaling={false}
        />
      </View>
    </View>
  );
};

export default StepContact;

const styles = StyleSheet.create({
  wrap: {
    gap: responsive(10),
  },
  label: {
    marginTop: responsive(8),
  },
  input: {
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    borderRadius: responsive(14),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(15),
    fontSize: responsive(15),
    fontFamily: theme.fonts.regular,
    color: theme.colors.text_color,
    backgroundColor: theme.colors.white_900,
  },
  row: {
    flexDirection: 'row',
    gap: responsive(12),
  },
  rowInput: {
    flex: 1,
  },
  codeSelect: {
    width: responsive(110),
  },
});
