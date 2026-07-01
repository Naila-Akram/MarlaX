import React, { useMemo } from 'react';
import { View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  faArrowLeft,
  faRulerCombined,
  faLayerGroup,
  faCar,
  faBuilding,
} from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Icon from '@theme/Icon/icon';
import ImageGallery from '@components/ImageGallery/image-gallery';
import type { PropertyDetailData } from '@components/PropertyDetail/types';
import { transparent } from '@utils/helper';
import type { AppScreenProps } from '@utils/types/navigation';

type Props = AppScreenProps<'UnitDetail'>;

const UnitDetailScreen = ({ navigation, route }: Props) => {
  const insets = useSafeAreaInsets();
  const { unit } = route.params;

  // Compose the sheet content from the unit summary plus richer property info.
  const detail = useMemo<PropertyDetailData>(
    () => ({
      price: unit.price,
      name: unit.name,
      location: unit.location,
      status: unit.status,
      description:
        'A premium commercial space in a prime location, featuring modern ' +
        'architecture, floor-to-ceiling windows and best-in-class finishes — ' +
        'ideal for a corporate headquarters or a flagship retail outlet.',
      features: [
        { icon: faRulerCombined, label: 'Area', value: '1,250 sq.ft' },
        { icon: faLayerGroup, label: 'Floor', value: '3rd' },
        { icon: faCar, label: 'Parking', value: '2 Slots' },
        { icon: faBuilding, label: 'Type', value: 'Office' },
      ],
      amenities: [
        '24/7 Security',
        'High-speed Elevator',
        'Power Backup',
        'Central A/C',
        'Covered Parking',
        'CCTV Surveillance',
      ],
      paymentPlan: [
        { label: 'Down Payment', amount: 'PKR 36 Lac', status: 'paid' },
        { label: 'Installment #1', amount: 'PKR 18 Lac', status: 'paid' },
        { label: 'Installment #2', amount: 'PKR 18 Lac', status: 'due' },
        { label: 'On Possession', amount: 'PKR 1.08 Cr', status: 'upcoming' },
      ],
      agent: {
        name: 'Ahsan Malik',
        role: 'Property Consultant',
        phone: '+92 300 1234567',
      },
    }),
    [unit],
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <ImageGallery images={unit.images} detail={detail} />

      {/* Back button — stays fixed while the details scroll */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={[styles.backBtn, { top: insets.top + responsive(8) }]}
      >
        <Icon name={faArrowLeft} size={18} color={theme.colors.light} />
      </TouchableOpacity>
    </View>
  );
};

export default UnitDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  backBtn: {
    position: 'absolute',
    left: responsive(20),
    width: responsive(40),
    height: responsive(40),
    borderRadius: responsive(20),
    backgroundColor: transparent('#000000', 0.35),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
