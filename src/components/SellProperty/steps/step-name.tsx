import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {
  faBadgePercent,
  faGavel,
  faHouse,
  faUpRightAndDownLeftFromCenter,
  faBuildingColumns,
} from '@fortawesome/pro-regular-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import { transparent } from '@utils/helper';
import {
  useSellProperty,
  type ListFor,
  type PropertyCategory,
} from '../sell-property-context';

// ─── Static options ───────────────────────────────────────────────────────────
const LIST_FOR: { id: ListFor; label: string; icon: IconProp }[] = [
  { id: 'direct',  label: 'Direct Sale', icon: faBadgePercent },
  { id: 'bidding', label: 'Bidding',     icon: faGavel },
];

const CATEGORIES: {
  id: PropertyCategory;
  label: string;
  subtitle?: string;
  icon: IconProp;
}[] = [
  { id: 'home',       label: 'Home',       subtitle: 'Residential', icon: faHouse },
  { id: 'plots',      label: 'Plots',      icon: faUpRightAndDownLeftFromCenter },
  { id: 'commercial', label: 'Commercial', icon: faBuildingColumns },
];

const PROPERTY_TYPES: Record<PropertyCategory, string[]> = {
  home: [
    'Residential', 'Flat', 'House', 'Room', 'Lower Portion', 'Upper Portion',
    'Guest House', 'Pent House', 'Hostel', 'Hotel Suites', 'Farm House', 'Annexe',
  ],
  plots: [
    'Residential Plot', 'Commercial Plot', 'Agricultural Land',
    'Industrial Land', 'Plot File', 'Plot Form',
  ],
  commercial: [
    'Office', 'Shop', 'Warehouse', 'Factory', 'Building', 'Plaza',
  ],
};

const StepName = () => {
  const { form, setField } = useSellProperty();
  const types = PROPERTY_TYPES[form.category] ?? [];

  const selectCategory = (id: PropertyCategory) => {
    setField('category', id);
    // Reset the sub-type to the first valid option for the new category.
    setField('propertyType', PROPERTY_TYPES[id][0]);
  };

  return (
    <View style={styles.wrap}>
      {/* Name of Listing */}
      <Typography size={16} weight={theme.fonts.semiBold} style={styles.label}>
        Name of Listing
      </Typography>
      <TextInput
        value={form.name}
        onChangeText={t => setField('name', t)}
        placeholder="Enter name of listing"
        placeholderTextColor={theme.colors.grey_500}
        style={styles.input}
        allowFontScaling={false}
      />

      {/* List for */}
      <Typography size={16} weight={theme.fonts.semiBold} style={styles.label}>
        List for
      </Typography>
      <View style={styles.listForRow}>
        {LIST_FOR.map(opt => {
          const active = form.listFor === opt.id;
          const tint = active ? theme.colors.text_color : theme.colors.text_color_light;
          return (
            <TouchableOpacity
              key={opt.id}
              activeOpacity={0.8}
              onPress={() => setField('listFor', opt.id)}
              style={[styles.listForPill, active && styles.listForPillActive]}
            >
              <Icon name={opt.icon} size={16} color={tint} />
              <Typography size={15} weight={theme.fonts.semiBold} color={tint}>
                {opt.label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Select Property Type */}
      <Typography size={16} weight={theme.fonts.semiBold} style={styles.label}>
        Select Property Type
      </Typography>
      <View style={styles.categoryRow}>
        {CATEGORIES.map(cat => {
          const active = form.category === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.85}
              onPress={() => selectCategory(cat.id)}
              style={[styles.categoryCard, active && styles.categoryCardActive]}
            >
              <Icon name={cat.icon} size={22} color={theme.colors.text_color} />
              <View>
                <Typography size={16} weight={theme.fonts.semiBold}>
                  {cat.label}
                </Typography>
                {!!cat.subtitle && (
                  <Typography size={13} color={theme.colors.text_color_light} marginTop={2}>
                    {cat.subtitle}
                  </Typography>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Sub-type chips */}
      <View style={styles.chipsBox}>
        {types.map(type => {
          const active = form.propertyType === type;
          return (
            <TouchableOpacity
              key={type}
              activeOpacity={0.8}
              onPress={() => setField('propertyType', type)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Typography
                size={14}
                weight={active ? theme.fonts.semiBold : theme.fonts.medium}
                color={active ? theme.colors.text_color : theme.colors.text_color_light}
              >
                {type}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default StepName;

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
  // ── List for ────────────────────────────────────────────────────────────────
  listForRow: {
    flexDirection: 'row',
    gap: responsive(12),
  },
  listForPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive(8),
    paddingVertical: responsive(16),
    borderRadius: responsive(30),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.white_900,
  },
  listForPillActive: {
    borderColor: theme.colors.text_color,
    backgroundColor: transparent(theme.colors.primary, 0.05),
  },
  // ── Category cards ──────────────────────────────────────────────────────────
  categoryRow: {
    flexDirection: 'row',
    gap: responsive(12),
  },
  categoryCard: {
    flex: 1,
    height: responsive(120),
    justifyContent: 'space-between',
    padding: responsive(14),
    borderRadius: responsive(16),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.white_900,
  },
  categoryCardActive: {
    borderColor: theme.colors.text_color,
    backgroundColor: transparent(theme.colors.primary, 0.05),
  },
  // ── Sub-type chips ──────────────────────────────────────────────────────────
  chipsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive(10),
    backgroundColor: theme.colors.grey_50,
    borderRadius: responsive(18),
    padding: responsive(14),
    marginTop: responsive(4),
  },
  chip: {
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(11),
    borderRadius: responsive(30),
    borderWidth: 1.5,
    borderColor: theme.colors.white_900,
    backgroundColor: theme.colors.white_900,
  },
  chipActive: {
    borderColor: theme.colors.text_color,
  },
});
