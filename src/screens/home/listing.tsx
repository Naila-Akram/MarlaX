import React, { useState } from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import {
  faHouse,
  faBuilding,
  faMap,
  faHeart,
} from '@fortawesome/pro-regular-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import BlockButton from '@theme/buttons/block-button';
import Icon from '@theme/Icon/icon';
import Searchbar from '@components/Searchbar/searchbar';
import { transparent } from '@utils/helper';
import type { TabScreenProps } from '@utils/types/navigation';

type Props = TabScreenProps<'Listing'>;

// ─── Filter categories ────────────────────────────────────────────────────────
type Category = { id: string; label: string; icon?: IconProp };

const CATEGORIES: Category[] = [
  { id: 'all',       label: 'All' },
  { id: 'house',     label: 'House',     icon: faHouse },
  { id: 'apartment', label: 'Apartment', icon: faBuilding },
  { id: 'plot',      label: 'Plot',      icon: faMap },
];

// ─── Listing cards ────────────────────────────────────────────────────────────
type ListingItem = {
  id: string;
  type: string;
  priceLabel: string;
  priceAmount: string;
  name: string;
  location: string;
  image: { uri: string };
};

const DUMMY_LISTINGS: ListingItem[] = [
  {
    id: '1',
    type: 'House',
    priceLabel: 'PKR',
    priceAmount: '2.5 Crore',
    name: 'Apex Apartment',
    location: 'DHA Phase 5, Lahore.',
    image: { uri: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800' },
  },
  {
    id: '2',
    type: 'Apartment',
    priceLabel: 'PKR',
    priceAmount: '1.8 Crore',
    name: 'Sky Heights',
    location: 'Gulberg III, Lahore.',
    image: { uri: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  },
  {
    id: '3',
    type: 'Plot',
    priceLabel: 'PKR',
    priceAmount: '3.2 Crore',
    name: 'Green Enclave',
    location: 'Bahria Town, Islamabad.',
    image: { uri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
  },
  {
    id: '4',
    type: 'House',
    priceLabel: 'PKR',
    priceAmount: '4.1 Crore',
    name: 'Horizon Villas',
    location: 'Phase 6, Karachi.',
    image: { uri: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
  },
];

const ListingScreen = ({}: Props) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const renderCategory = ({ item }: ListRenderItemInfo<Category>) => {
    const isActive = item.id === activeCategory;
    return (
      <TouchableOpacity
        onPress={() => setActiveCategory(item.id)}
        activeOpacity={0.75}
        style={[styles.chip, isActive && styles.chipActive]}
      >
        {item.icon && (
          <Icon
            name={item.icon}
            size={14}
            color={isActive ? theme.colors.light : theme.colors.text_color}
          />
        )}
        <Typography
          size={14}
          weight={theme.fonts.medium}
          color={isActive ? theme.colors.light : theme.colors.text_color}
        >
          {item.label}
        </Typography>
      </TouchableOpacity>
    );
  };

  const renderListing = ({ item }: ListRenderItemInfo<ListingItem>) => (
    <View style={styles.card}>
      <ImageBackground
        source={item.image}
        style={styles.cardBg}
        imageStyle={styles.cardImage}
      >
        {/* Top row: type badge + heart */}
        <View style={styles.cardTop}>
          <View style={styles.typeBadge}>
            <Typography size={13} weight={theme.fonts.medium} color={theme.colors.text_color}>
              {item.type}
            </Typography>
          </View>
          <TouchableOpacity style={styles.heartBtn} activeOpacity={0.8}>
            <Icon name={faHeart} size={16} color={theme.colors.text_color} />
          </TouchableOpacity>
        </View>

        {/* Bottom overlay */}
        <View style={styles.cardOverlay}>
          <View style={styles.priceRow}>
            <Typography size={14} weight={theme.fonts.medium} color={theme.colors.light}>
              {item.priceLabel}{' '}
            </Typography>
            <Typography size={26} weight={theme.fonts.bold} color={theme.colors.light}>
              {item.priceAmount}
            </Typography>
          </View>
          <Typography size={16} weight={theme.fonts.semiBold} color={theme.colors.light} marginTop={2}>
            {item.name}
          </Typography>
          <Typography size={13} color={theme.colors.light} marginTop={2} style={styles.locationText}>
            {item.location}
          </Typography>

          <BlockButton
            bgColor={theme.colors.light}
            style={styles.lookBtn}
            onPress={() => {}}
          >
            <Typography size={14} weight={theme.fonts.semiBold} align="center">
              Take a look
            </Typography>
          </BlockButton>
        </View>
      </ImageBackground>
    </View>
  );

  const ListHeader = (
    <View>
      <View style={styles.intro}>
        <Typography size={28} weight={theme.fonts.regular} color={theme.colors.text_color}>
          Made for You
        </Typography>
        <Typography size={28} weight={theme.fonts.bold} color={theme.colors.black}>
          Explore Properties
        </Typography>
      </View>

      <Searchbar
        value={search}
        onChangeText={setSearch}
        placeholder="Search Properties"
        style={styles.searchbar}
      />

      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item.id}
        renderItem={renderCategory}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_LISTINGS}
        keyExtractor={item => item.id}
        renderItem={renderListing}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  intro: {
    paddingHorizontal: responsive(20),
    marginTop: responsive(4),
    marginBottom: responsive(16),
  },
  searchbar: {
    marginHorizontal: responsive(20),
    marginBottom: responsive(16),
  },
  categoryList: {
    paddingHorizontal: responsive(20),
    gap: responsive(10),
    paddingBottom: responsive(16),
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(6),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(10),
    borderRadius: responsive(30),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.light,
  },
  chipActive: {
    backgroundColor: theme.colors.black,
    borderColor: theme.colors.black,
  },
  listContent: {
    paddingBottom: responsive(120),
  },
  card: {
    marginHorizontal: responsive(20),
    marginBottom: responsive(16),
    borderRadius: responsive(22),
    overflow: 'hidden',
  },
  cardBg: {
    width: '100%',
    height: responsive(420),
    justifyContent: 'space-between',
  },
  cardImage: {
    borderRadius: responsive(22),
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: responsive(14),
  },
  typeBadge: {
    backgroundColor: theme.colors.light,
    paddingHorizontal: responsive(14),
    paddingVertical: responsive(6),
    borderRadius: responsive(20),
  },
  heartBtn: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(19),
    backgroundColor: transparent(theme.colors.light, 0.9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardOverlay: {
    backgroundColor: transparent('#000000', 0.55),
    padding: responsive(18),
    borderBottomLeftRadius: responsive(22),
    borderBottomRightRadius: responsive(22),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  locationText: {
    opacity: 0.8,
  },
  lookBtn: {
    borderRadius: responsive(30),
    marginTop: responsive(14),
  },
});
