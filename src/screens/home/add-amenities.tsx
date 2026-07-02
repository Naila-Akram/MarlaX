import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import BlockButton from '@theme/buttons/block-button';
import ProfileHeader from '@screens/profile/profileHeader';
import type { AppScreenProps } from '@utils/types/navigation';

type Props = AppScreenProps<'AddAmenities'>;

const AddAmenitiesScreen = ({ navigation }: Props) => {
  // TEMP: proves the add → return round-trip until the real UI lands next step.
  const addSample = () => {
    navigation.navigate('SellProperty', {
      newAmenity: {
        id: `a${Date.now()}`,
        label: 'Internet',
        value: 'Fiber',
      },
    });
  };

  return (
    <View style={styles.container}>
      <ProfileHeader title="Add Amenities" onBack={() => navigation.goBack()} />

      <View style={styles.body}>
        <Typography
          size={16}
          color={theme.colors.text_color_light}
          align="center"
        >
          Add Amenities form coming next.
        </Typography>

        <BlockButton
          bgColor={theme.colors.primary}
          style={styles.sampleBtn}
          onPress={addSample}
        >
          <Typography
            size={15}
            weight={theme.fonts.semiBold}
            color={theme.colors.white_900}
            align="center"
          >
            Add sample amenity (temp)
          </Typography>
        </BlockButton>
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
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive(32),
    gap: responsive(20),
  },
  sampleBtn: {
    borderRadius: responsive(30),
    paddingVertical: responsive(14),
    paddingHorizontal: responsive(24),
    width: undefined,
  },
});
