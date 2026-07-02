import React from 'react';
import { FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import ListingCard from './listing-card';
import type { MyListing } from './listing-card';

// Dummy data — replaced by the API response later.
const DIRECT_SALE_LISTINGS: MyListing[] = [
  {
    id: 'd1',
    type: 'House',
    saleType: 'direct',
    priceLabel: 'PKR',
    priceAmount: '2.5 Crore',
    title: 'Modern House for Sale',
    location: 'DHA Phase 5, Lahore.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
  },
  {
    id: 'd2',
    type: 'Apartment',
    saleType: 'direct',
    priceLabel: 'PKR',
    priceAmount: '1.8 Crore',
    title: 'Sky Apartment for Sale',
    location: 'Gulberg III, Lahore.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
  },
];

/**
 * Direct Sale flow — the list of the user's fixed-price listings. Its own
 * component so it can diverge from the bidding flow as each grows.
 */
const DirectSaleListings = () => {
  const renderItem = ({ item }: ListRenderItemInfo<MyListing>) => (
    <ListingCard item={item} onPress={() => {}} />
  );

  return (
    <FlatList
      style={styles.list}
      data={DIRECT_SALE_LISTINGS}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Typography
          size={15}
          color={theme.colors.text_color_light}
          align="center"
          style={styles.empty}
        >
          No direct sale listings.
        </Typography>
      }
    />
  );
};

export default DirectSaleListings;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    paddingTop: responsive(4),
    paddingBottom: responsive(120),
  },
  empty: {
    marginTop: responsive(40),
  },
});
