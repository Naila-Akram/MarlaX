import React from 'react';
import { FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import ListingCard from './listing-card';
import type { MyListing } from './listing-card';

// Dummy data — replaced by the API response later.
const BIDDING_LISTINGS: MyListing[] = [
  {
    id: 'b1',
    type: 'Farm House',
    saleType: 'bidding',
    statusLabel: 'Ends in 2 hrs',
    statusTone: 'warning',
    priceLabel: 'PKR',
    priceAmount: '3.2 Crore',
    title: 'Farm House for Sale',
    location: 'Bahria Town, Lahore.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
  },
  {
    id: 'b2',
    type: 'Farm House',
    saleType: 'bidding',
    statusLabel: 'Starts in 30 mins',
    statusTone: 'success',
    priceLabel: 'PKR',
    priceAmount: '3.2 Crore',
    title: 'Farm House for Sale',
    location: 'Bahria Town, Lahore.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  },
];

/**
 * Bidding flow — the list of the user's auction listings. Kept as its own
 * component because bidding is a distinct flow that will grow its own screens.
 */
const BiddingListings = () => {
  const renderItem = ({ item }: ListRenderItemInfo<MyListing>) => (
    <ListingCard item={item} onPress={() => {}} />
  );

  return (
    <FlatList
      style={styles.list}
      data={BIDDING_LISTINGS}
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
          No bidding listings.
        </Typography>
      }
    />
  );
};

export default BiddingListings;

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
