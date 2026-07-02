import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  faBed,
  faBath,
  faUtensils,
  faCarSide,
  faMinus,
  faPlus,
  faXmark,
} from '@fortawesome/pro-regular-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import { useSellProperty } from '../sell-property-context';
import type { AppStackParams } from '@utils/types/navigation';

type CounterKey = 'bedrooms' | 'bathrooms' | 'kitchens' | 'carParking';

const COUNTERS: { key: CounterKey; label: string; icon: IconProp }[] = [
  { key: 'bedrooms',   label: 'Bedrooms',    icon: faBed },
  { key: 'bathrooms',  label: 'Bathrooms',   icon: faBath },
  { key: 'kitchens',   label: 'Kitchens',    icon: faUtensils },
  { key: 'carParking', label: 'Car Parking', icon: faCarSide },
];

const StepFeatures = () => {
  const nav = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const { form, setField, removeAmenity } = useSellProperty();

  const step = (key: CounterKey, delta: number) =>
    setField(key, Math.max(0, (form[key] ?? 0) + delta));

  return (
    <View style={styles.wrap}>
      <Typography size={20} weight={theme.fonts.bold}>
        Feature and Amenities
      </Typography>

      {/* Counters */}
      <View style={styles.counters}>
        {COUNTERS.map(c => (
          <View key={c.key} style={styles.counterRow}>
            <View style={styles.counterLeft}>
              <Icon name={c.icon} size={20} color={theme.colors.text_color} />
              <Typography size={17} weight={theme.fonts.medium}>
                {c.label}
              </Typography>
            </View>

            <View style={styles.stepper}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => step(c.key, -1)}
                style={styles.stepBtn}
              >
                <Icon name={faMinus} size={16} color={theme.colors.text_color} />
              </TouchableOpacity>
              <Typography
                size={17}
                weight={theme.fonts.semiBold}
                align="center"
                style={styles.count}
              >
                {form[c.key] ?? 0}
              </Typography>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => step(c.key, 1)}
                style={styles.stepBtn}
              >
                <Icon name={faPlus} size={16} color={theme.colors.text_color} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Amenities */}
      <Typography size={20} weight={theme.fonts.bold} style={styles.amenitiesTitle}>
        Amenities
      </Typography>
      <Typography
        size={15}
        color={theme.colors.text_color_light}
        style={styles.amenitiesSub}
      >
        Add additional features e.g. parking spaces, waste disposal, internet etc.
      </Typography>

      <View style={styles.chips}>
        {(form.amenities ?? []).map(a => (
          <View key={a.id} style={styles.chip}>
            <Typography size={14} color={theme.colors.text_color_light}>
              {a.label}:{' '}
            </Typography>
            <Typography size={15} weight={theme.fonts.bold}>
              {a.value}
            </Typography>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => removeAmenity(a.id)}
              style={styles.removeBtn}
            >
              <Icon name={faXmark} size={12} color={theme.colors.text_color_light} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => nav.navigate('AddAmenities')}
        style={styles.addBtn}
      >
        <Icon name={faPlus} size={16} color={theme.colors.text_color} />
        <Typography size={16} weight={theme.fonts.semiBold}>
          Add Amenities
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

export default StepFeatures;

const styles = StyleSheet.create({
  wrap: {
    gap: responsive(6),
  },
  // ── Counters ──────────────────────────────────────────────────────────────
  counters: {
    marginTop: responsive(6),
    gap: responsive(8),
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsive(8),
  },
  counterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(14),
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(6),
  },
  stepBtn: {
    width: responsive(44),
    height: responsive(44),
    borderRadius: responsive(22),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    minWidth: responsive(34),
  },
  // ── Amenities ─────────────────────────────────────────────────────────────
  amenitiesTitle: {
    marginTop: responsive(20),
  },
  amenitiesSub: {
    marginTop: responsive(4),
    marginBottom: responsive(10),
    lineHeight: responsive(21),
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive(12),
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: responsive(16),
    paddingRight: responsive(8),
    paddingVertical: responsive(9),
    borderRadius: responsive(30),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.white_900,
    gap: responsive(6),
  },
  removeBtn: {
    width: responsive(22),
    height: responsive(22),
    borderRadius: responsive(11),
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(8),
    paddingHorizontal: responsive(18),
    paddingVertical: responsive(14),
    borderRadius: responsive(30),
    backgroundColor: theme.colors.grey_50,
    marginTop: responsive(18),
  },
});
