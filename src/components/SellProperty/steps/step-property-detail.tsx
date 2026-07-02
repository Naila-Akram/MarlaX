import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { faSparkles } from '@fortawesome/pro-solid-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import SelectField from '../select-field';
import { useSellProperty } from '../sell-property-context';

const AREA_UNITS = ['Sq. ft.', 'Sq. yd.', 'Sq. m.', 'Marla', 'Kanal'];
const FLOORS = [
  'Basement', 'Ground Floor', '1st Floor', '2nd Floor',
  '3rd Floor', '4th Floor', '5th Floor', 'Top Floor',
];
const CURRENCIES = ['PKR', 'USD', 'AED', 'GBP', 'EUR', 'SAR'];

/** Group digits with commas, e.g. 3251000 → "3,251,000". */
const withCommas = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const StepPropertyDetail = () => {
  const { form, setField } = useSellProperty();

  // Total = area × price per unit (live, never hard-coded).
  const total = Math.round((parseFloat(form.area) || 0) * (parseFloat(form.price) || 0));

  return (
    <View style={styles.wrap}>
      <Typography size={20} weight={theme.fonts.bold} style={styles.heading}>
        Property Details
      </Typography>

      {/* Property Name */}
      <Typography size={16} weight={theme.fonts.semiBold} style={styles.label}>
        Property Name
      </Typography>
      <TextInput
        value={form.propertyName}
        onChangeText={t => setField('propertyName', t)}
        placeholder="Enter property name"
        placeholderTextColor={theme.colors.grey_500}
        style={styles.input}
        allowFontScaling={false}
      />

      {/* Area + unit */}
      <Typography size={16} weight={theme.fonts.semiBold} style={styles.label}>
        Area
      </Typography>
      <View style={styles.row}>
        <TextInput
          value={form.area}
          onChangeText={t => setField('area', t)}
          placeholder="Enter Area"
          placeholderTextColor={theme.colors.grey_500}
          keyboardType="numeric"
          style={[styles.input, styles.rowInput]}
          allowFontScaling={false}
        />
        <SelectField
          value={form.areaUnit}
          options={AREA_UNITS}
          onChange={v => setField('areaUnit', v)}
          title="Select Unit"
          style={styles.unitSelect}
        />
      </View>

      {/* Floor */}
      <Typography size={16} weight={theme.fonts.semiBold} style={styles.label}>
        Floor
      </Typography>
      <SelectField
        value={form.floor}
        placeholder="Select Floor"
        options={FLOORS}
        onChange={v => setField('floor', v)}
        title="Select Floor"
      />

      {/* Price per unit + currency */}
      <Typography size={16} weight={theme.fonts.semiBold} style={styles.label}>
        Price per {form.areaUnit}
      </Typography>
      <View style={styles.row}>
        <TextInput
          value={form.price}
          onChangeText={t => setField('price', t)}
          placeholder="Enter Price"
          placeholderTextColor={theme.colors.grey_500}
          keyboardType="numeric"
          style={[styles.input, styles.rowInput]}
          allowFontScaling={false}
        />
        <SelectField
          value={form.currency}
          options={CURRENCIES}
          onChange={v => setField('currency', v)}
          title="Select Currency"
          style={styles.unitSelect}
        />
      </View>

      {/* Total + AI suggestion */}
      <View style={styles.totalBox}>
        <View style={styles.totalRow}>
          <Typography size={16} color={theme.colors.text_color_light}>
            Total Price
          </Typography>
          <Typography size={24} weight={theme.fonts.bold}>
            {withCommas(total)}
          </Typography>
        </View>
        <View style={styles.aiRow}>
          <Icon name={faSparkles} size={18} color={theme.colors.primary} />
          <Typography size={14} color={theme.colors.text_color} style={styles.aiText}>
            AI Suggestion: Average Price{' '}
            <Typography size={14} weight={theme.fonts.bold}>
              Rs 25,000,000
            </Typography>{' '}
            for{' '}
            <Typography size={14} weight={theme.fonts.bold}>
              2250 Sq. ft.
            </Typography>{' '}
            in this area
          </Typography>
        </View>
      </View>

      {/* Details */}
      <Typography size={16} weight={theme.fonts.semiBold} style={styles.label}>
        Details
      </Typography>
      <TextInput
        value={form.details}
        onChangeText={t => setField('details', t)}
        placeholder="Enter Details"
        placeholderTextColor={theme.colors.grey_500}
        multiline
        style={[styles.input, styles.textarea]}
        allowFontScaling={false}
      />
    </View>
  );
};

export default StepPropertyDetail;

const styles = StyleSheet.create({
  wrap: {
    gap: responsive(10),
  },
  heading: {
    marginBottom: responsive(4),
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
  unitSelect: {
    width: responsive(128),
  },
  textarea: {
    minHeight: responsive(120),
    paddingTop: responsive(15),
    textAlignVertical: 'top',
  },
  // ── Total + AI suggestion ─────────────────────────────────────────────────
  totalBox: {
    backgroundColor: theme.colors.action_blue_bg,
    borderRadius: responsive(18),
    padding: responsive(8),
    gap: responsive(4),
    marginTop: responsive(6),
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white_900,
    borderRadius: responsive(12),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(16),
  },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: responsive(10),
    paddingHorizontal: responsive(12),
    paddingVertical: responsive(10),
  },
  aiText: {
    flex: 1,
    lineHeight: responsive(20),
  },
});
