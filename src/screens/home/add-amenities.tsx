import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import BlockButton from '@theme/buttons/block-button';
import Icon from '@theme/Icon/icon';
import ProfileHeader from '@screens/profile/profileHeader';
import Searchbar from '@components/Searchbar/searchbar';
import type { AppScreenProps } from '@utils/types/navigation';

type Props = AppScreenProps<'AddAmenities'>;

// Flat amenity list (category pills intentionally skipped for now).
const AMENITY_OPTIONS = [
  'Broadband Internet Access',
  'Satellite or Cable TV Ready',
  'Business Center or Media Room in Building',
  'Conference Room in Building',
  'Intercom',
  'ATM Machines',
  'Central Air Conditioning',
  'Central Heating',
  'Standby Generator',
  'Elevators / Lift',
  'CCTV Security',
  'Waste Disposal',
  'Swimming Pool',
  'Gym / Fitness Center',
  'Kids Play Area',
  'Parking Spaces',
];

const slug = (s: string) => s.replace(/\s+/g, '-').toLowerCase();

const AddAmenitiesScreen = ({ navigation }: Props) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = AMENITY_OPTIONS.filter(o =>
    o.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const toggle = (name: string) =>
    setSelected(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name],
    );

  const submit = () => {
    if (selected.length === 0) {
      navigation.goBack();
      return;
    }
    // popTo (not navigate) returns to the existing flow screen so its step /
    // form state is preserved — navigate() would push a fresh step-1 instance.
    navigation.popTo('SellProperty', {
      newAmenities: selected.map(name => ({
        id: `am-${slug(name)}`,
        label: name,
        value: '',
      })),
    });
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        title="Feature and Amenities"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.searchWrap}>
        <Searchbar
          value={search}
          onChangeText={setSearch}
          placeholder="Search amenities"
        />
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {filtered.map(option => {
          const checked = selected.includes(option);
          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.7}
              onPress={() => toggle(option)}
              style={styles.row}
            >
              <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                {checked && (
                  <Icon name={faCheck} size={13} color={theme.colors.white_900} />
                )}
              </View>
              <Typography size={16} color={theme.colors.text_color} style={styles.rowLabel}>
                {option}
              </Typography>
            </TouchableOpacity>
          );
        })}

        {filtered.length === 0 && (
          <Typography
            size={15}
            color={theme.colors.text_color_light}
            align="center"
            style={styles.empty}
          >
            No amenities found.
          </Typography>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.btnWrap}>
          <BlockButton
            bgColor={theme.colors.white_900}
            borderColor={theme.colors.borderColor}
            borderWidth={1.5}
            style={styles.actionBtn}
            onPress={() => navigation.goBack()}
          >
            <Typography
              size={16}
              weight={theme.fonts.semiBold}
              color={theme.colors.text_color}
              align="center"
            >
              Cancel
            </Typography>
          </BlockButton>
        </View>

        <View style={styles.btnWrap}>
          <BlockButton
            bgColor={theme.colors.black}
            style={styles.actionBtn}
            onPress={submit}
          >
            <Typography
              size={16}
              weight={theme.fonts.semiBold}
              color={theme.colors.white_900}
              align="center"
            >
              Add Amenities
            </Typography>
          </BlockButton>
        </View>
      </View>
    </View>
  );
};

export default AddAmenitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  searchWrap: {
    paddingHorizontal: responsive(20),
    marginTop: responsive(16),
    marginBottom: responsive(8),
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(8),
    paddingBottom: responsive(24),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(14),
    paddingVertical: responsive(14),
  },
  rowLabel: {
    flex: 1,
  },
  checkbox: {
    width: responsive(24),
    height: responsive(24),
    borderRadius: responsive(7),
    borderWidth: 1.5,
    borderColor: theme.colors.grey_100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white_900,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.black,
    borderColor: theme.colors.black,
  },
  empty: {
    marginTop: responsive(40),
  },
  bottomBar: {
    flexDirection: 'row',
    gap: responsive(12),
    paddingHorizontal: responsive(20),
    paddingTop: responsive(12),
    paddingBottom: responsive(24),
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    backgroundColor: theme.colors.background,
  },
  btnWrap: {
    flex: 1,
  },
  actionBtn: {
    borderRadius: responsive(30),
    paddingVertical: responsive(16),
  },
});
