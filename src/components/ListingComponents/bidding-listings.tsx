import React from 'react';
import { FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import ListingCard from './listing-card';
import type { MyListing } from './listing-card';
import { useListingStore } from '@stores/listing-store';

/**
 * Bidding flow — the user's auction listings, read from the shared store so
 * newly submitted bids appear here. Kept as its own component because bidding
 * is a distinct flow that will grow its own screens.
 */
const BiddingListings = () => {
  const listings = useListingStore(s => s.biddingListings);

  const renderItem = ({ item }: ListRenderItemInfo<MyListing>) => (
    <ListingCard item={item} />
  );

  return (
    <FlatList
      style={styles.list}
      data={listings}
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
