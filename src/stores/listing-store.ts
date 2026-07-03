import { create } from 'zustand';
import type { MyListing } from '@components/ListingComponents/listing-card';

interface ListingState {
  biddingListings: MyListing[];
  directSaleListings: MyListing[];
  /** Adds a listing to the flow matching its saleType (newest first). */
  addListing: (listing: MyListing) => void;
}

const SEED_BIDDING: MyListing[] = [
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
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
    ],
  },
];

const SEED_DIRECT: MyListing[] = [
  {
    id: 'd1',
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
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
  },
  {
    id: 'd2',
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

export const useListingStore = create<ListingState>(set => ({
  biddingListings: SEED_BIDDING,
  directSaleListings: SEED_DIRECT,
  addListing: listing =>
    set(state =>
      listing.saleType === 'bidding'
        ? { biddingListings: [listing, ...state.biddingListings] }
        : { directSaleListings: [listing, ...state.directSaleListings] },
    ),
}));
