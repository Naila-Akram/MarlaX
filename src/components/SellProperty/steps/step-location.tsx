import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { faLocationDot, faArrowRight } from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import { transparent } from '@utils/helper';
import { useSellProperty } from '../sell-property-context';

// Seeded areas — user-typed locations get unshifted to the top of this list
// (later this becomes the API / places response).
const INITIAL_LOCATIONS = [
  'Etihad Town Phase 3',
  'Bahria Town',
  'Union Town',
  'Other',
];

const StepLocation = () => {
  const { form, setField } = useSellProperty();
  const [locations, setLocations] = useState<string[]>(INITIAL_LOCATIONS);
  const [draft, setDraft] = useState('');

  const addLocation = () => {
    const value = draft.trim();
    if (!value) return;
    // Add to the top (skip duplicates) and select it.
    setLocations(prev => (prev.includes(value) ? prev : [value, ...prev]));
    setField('location', value);
    setDraft('');
  };

  return (
    <View style={styles.wrap}>
      <Typography size={20} weight={theme.fonts.bold}>
        Select Location
      </Typography>

      <View style={styles.chips}>
        {locations.map(loc => {
          const active = form.location === loc;
          const tint = active
            ? theme.colors.text_color
            : theme.colors.text_color_light;
          return (
            <TouchableOpacity
              key={loc}
              activeOpacity={0.8}
              onPress={() => setField('location', loc)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Icon name={faLocationDot} size={16} color={tint} />
              <Typography
                size={15}
                weight={active ? theme.fonts.semiBold : theme.fonts.medium}
                color={tint}
              >
                {loc}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>

      <Typography size={16} weight={theme.fonts.semiBold} style={styles.label}>
        Address
      </Typography>
      {/* Type an address and tap the arrow (or press done) to add it on top. */}
      <View style={styles.inputRow}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={addLocation}
          placeholder="Enter complete address"
          placeholderTextColor={theme.colors.grey_500}
          returnKeyType="done"
          style={styles.input}
          allowFontScaling={false}
        />
        <TouchableOpacity
          onPress={addLocation}
          activeOpacity={0.8}
          style={styles.addBtn}
        >
          <Icon name={faArrowRight} size={16} color={theme.colors.white_900} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StepLocation;

const styles = StyleSheet.create({
  wrap: {
    gap: responsive(14),
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive(12),
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(8),
    paddingHorizontal: responsive(18),
    paddingVertical: responsive(14),
    borderRadius: responsive(30),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.white_900,
  },
  chipActive: {
    borderColor: theme.colors.text_color,
    backgroundColor: transparent(theme.colors.primary, 0.05),
  },
  label: {
    marginTop: responsive(4),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(8),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    borderRadius: responsive(14),
    paddingLeft: responsive(16),
    paddingRight: responsive(6),
    backgroundColor: theme.colors.white_900,
  },
  input: {
    flex: 1,
    paddingVertical: responsive(15),
    fontSize: responsive(15),
    fontFamily: theme.fonts.regular,
    color: theme.colors.text_color,
    padding: 0,
  },
  addBtn: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(19),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black,
  },
});
