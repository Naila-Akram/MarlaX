import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { faLocationDot } from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive, SCREEN_WIDTH } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import BlockButton from '@theme/buttons/block-button';
import Icon from '@theme/Icon/icon';
import { transparent } from '@utils/helper';
import RemoteImage from '@components/RemoteImage/remote-image';
import type { AppStackParams, GalleryUnit } from '@utils/types';

type NavProp = NativeStackNavigationProp<AppStackParams>;

type UnitItem = GalleryUnit;

const DUMMY_UNITS: UnitItem[] = [
  {
    id: '1',
    price: 'PKR 1.8 Crore',
    name: 'Curve - Corporate Office',
    location: 'Pine Avenue',
    status: 'Purchased',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800',
    ],
  },
  {
    id: '2',
    price: 'PKR 2.4 Crore',
    name: 'Sky Heights - Tower B',
    location: 'Blue Area',
    status: 'Purchased',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800',
    ],
  },
  {
    id: '3',
    price: 'PKR 1.2 Crore',
    name: 'Green Valley - Block C',
    location: 'DHA Phase 5',
    status: 'Purchased',
    images: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      'https://images.unsplash.com/photo-1512699355324-f07e3106dae5?w=800',
    ],
  },
];

const CARD_WIDTH = SCREEN_WIDTH * 0.56;

const MyUnits = () => {
  const navigation = useNavigation<NavProp>();

  const openDetail = (item: UnitItem) =>
    navigation.navigate('UnitDetail', { unit: item });

  const renderItem = ({ item }: ListRenderItemInfo<UnitItem>) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => openDetail(item)}
    >
      <RemoteImage
        uri={item.images[0]}
        style={styles.cardBg}
        imageStyle={styles.cardImage}
      >
        <View style={styles.overlay}>
          <View style={styles.info}>
            <Typography
              size={20}
              weight={theme.fonts.bold}
              color={theme.colors.light}
            >
              {item.price}
            </Typography>
            <Typography
              size={13}
              weight={theme.fonts.medium}
              color={theme.colors.light}
              marginTop={4}
            >
              {item.name}
            </Typography>
            <View style={styles.locationRow}>
              <Icon name={faLocationDot} size={11} color={theme.colors.light} />
              <Typography
                size={12}
                color={theme.colors.light}
                style={styles.locationText}
              >
                {item.location}
              </Typography>
            </View>
          </View>

          <BlockButton
            bgColor={theme.colors.light}
            style={styles.lookBtn}
            onPress={() => openDetail(item)}
          >
            <Typography size={13} weight={theme.fonts.semiBold} align="center">
              Take a look
            </Typography>
          </BlockButton>
        </View>
      </RemoteImage>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Section header */}
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Typography size={16} weight={theme.fonts.semiBold}>
            My Units
          </Typography>
          <View style={styles.badge}>
            <Typography
              size={11}
              weight={theme.fonts.semiBold}
              color={theme.colors.light}
            >
              {DUMMY_UNITS.length}
            </Typography>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewAll', { title: 'My Units' })}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Typography
            size={13}
            color={theme.colors.primary}
            weight={theme.fonts.medium}
          >
            View All
          </Typography>
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <FlatList
        data={DUMMY_UNITS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        snapToInterval={CARD_WIDTH + responsive(12)}
        decelerationRate="fast"
      />
    </View>
  );
};

export default MyUnits;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: responsive(10),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive(12),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(8),
  },
  badge: {
    backgroundColor: theme.colors.primary,
    borderRadius: responsive(20),
    paddingHorizontal: responsive(8),
    paddingVertical: responsive(2),
    minWidth: responsive(22),
    alignItems: 'center',
  },
  listContent: {
    gap: responsive(12),
    paddingRight: responsive(10),
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: responsive(18),
    overflow: 'hidden',
  },
  cardBg: {
    width: '100%',
    height: responsive(230),
  },
  cardImage: {
    borderRadius: responsive(18),
  },
  overlay: {
    flex: 1,
    backgroundColor: transparent('#000000', 0.38),
    padding: responsive(14),
    justifyContent: 'flex-end',
  },
  info: {
    marginBottom: responsive(12),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(4),
    marginTop: responsive(4),
  },
  locationText: {
    opacity: 0.85,
  },
  lookBtn: {
    borderRadius: responsive(22),
  },
});
