import React from 'react';
import { FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import ListingCard from './listing-card';
import type { MyListing, SaleType } from './listing-card';

// Public feed — same card as My Listings, but the pill shows the approval
// status instead of an auction timer.
const PUBLIC_LISTINGS: MyListing[] = [
  {
    id: 'pub1',
    type: 'Farm House',
    saleType: 'bidding',
    statusLabel: 'Pending Approval',
    statusTone: 'warning',
    priceLabel: 'PKR',
    priceAmount: '3.2 Crore',
    title: 'Farm House for Sale',
    location: 'Bahria Town, Lahore.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    ],
  },
  {
    id: 'pub2',
    type: 'Farm House',
    saleType: 'bidding',
    statusLabel: 'Approved',
    statusTone: 'success',
    priceLabel: 'PKR',
    priceAmount: '3.2 Crore',
    title: 'Farm House for Sale',
    location: 'Bahria Town, Lahore.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
    ],
  },
  {
    id: 'pub3',
    type: 'House',
    saleType: 'direct',
    priceLabel: 'PKR',
    priceAmount: '2.5 Crore',
    title: 'Modern House for Sale',
    location: 'DHA Phase 5, Lahore.',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    ],
  },
  {
    id: 'pub4',
    type: 'Apartment',
    saleType: 'direct',
    priceLabel: 'PKR',
    priceAmount: '1.8 Crore',
    title: 'Sky Apartment for Sale',
    location: 'Gulberg III, Lahore.',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    ],
  },
];

const PublicListings = ({ saleType }: { saleType: SaleType }) => {
  const data = PUBLIC_LISTINGS.filter(l => l.saleType === saleType);

  const renderItem = ({ item }: ListRenderItemInfo<MyListing>) => (
    <ListingCard item={item} showHeart onHeartPress={() => {}} />
  );

  return (
    <FlatList
      style={styles.list}
      data={data}
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
          No {saleType === 'bidding' ? 'bidding' : 'direct sale'} listings.
        </Typography>
      }
    />
  );
};

export default PublicListings;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    paddingTop: responsive(8),
    paddingBottom: responsive(120),
  },
  empty: {
    marginTop: responsive(40),
  },
});
