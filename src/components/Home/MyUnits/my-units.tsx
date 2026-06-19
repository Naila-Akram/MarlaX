import React from 'react';
import {
  View,
  FlatList,
  ImageBackground,
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
import type { AppStackParams } from '@utils/types';

type NavProp = NativeStackNavigationProp<AppStackParams>;

type UnitItem = {
  id: string;
  price: string;
  name: string;
  location: string;
  image: { uri: string };
};

const DUMMY_UNITS: UnitItem[] = [
  {
    id: '1',
    price: 'PKR 1.8 Crore',
    name: 'Curve - Corporate Office',
    location: 'Pine Avenue',
    image: { uri: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600' },
  },
  {
    id: '2',
    price: 'PKR 2.4 Crore',
    name: 'Sky Heights - Tower B',
    location: 'Blue Area',
    image: { uri: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600' },
  },
  {
    id: '3',
    price: 'PKR 1.2 Crore',
    name: 'Green Valley - Block C',
    location: 'DHA Phase 5',
    image: { uri: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600' },
  },
];

const CARD_WIDTH = SCREEN_WIDTH * 0.56;

const MyUnits = () => {
  const navigation = useNavigation<NavProp>();

  const renderItem = ({ item }: ListRenderItemInfo<UnitItem>) => (
    <View style={styles.card}>
      <ImageBackground
        source={item.image}
        style={styles.cardBg}
        imageStyle={styles.cardImage}
      >
        <View style={styles.overlay}>
          <View style={styles.info}>
            <Typography size={20} weight={theme.fonts.bold} color={theme.colors.light}>
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
              <Typography size={12} color={theme.colors.light} style={styles.locationText}>
                {item.location}
              </Typography>
            </View>
          </View>

          <BlockButton
            bgColor={theme.colors.light}
            style={styles.lookBtn}
            onPress={() => {}}
          >
            <Typography size={13} weight={theme.fonts.semiBold} align="center">
              Take a look
            </Typography>
          </BlockButton>
        </View>
      </ImageBackground>
    </View>
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
            <Typography size={11} weight={theme.fonts.semiBold} color={theme.colors.light}>
              {DUMMY_UNITS.length}
            </Typography>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewAll', { title: 'My Units' })}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Typography size={13} color={theme.colors.primary} weight={theme.fonts.medium}>
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
