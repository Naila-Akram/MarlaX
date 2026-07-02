import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  faLayerPlus,
  faBadgePercent,
  faGavel,
  faBarsFilter,
} from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import BlockButton from '@theme/buttons/block-button';
import Icon from '@theme/Icon/icon';
import Header from '@components/Header/header';
import Searchbar from '@components/Searchbar/searchbar';
import RemoteImage from '@components/RemoteImage/remote-image';
import ListingTopBar from '@components/ListingComponents/listing-top-bar';
import DirectSaleListings from '@components/ListingComponents/direct-sale-listings';
import BiddingListings from '@components/ListingComponents/bidding-listings';
import { transparent } from '@utils/helper';
import type { AppStackParams, TabScreenProps } from '@utils/types/navigation';

type Props = TabScreenProps<'Listing'>;

const AVATAR = { uri: 'https://i.pravatar.cc/150?img=12' };
const SEGMENTS = ['Public', 'My Listings'];
const FLOWS = ['Direct Sale', 'Bidding'];
const FLOW_ICONS = [faBadgePercent, faGavel];

// Images fanned out behind the empty-state copy.
const STACK_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
];

const ListingScreen = ({}: Props) => {
  const appNav = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const [segment, setSegment] = useState(1);
  const [flow, setFlow] = useState(1); // 0 = Direct Sale, 1 = Bidding
  const [search, setSearch] = useState('');

  // TEMP dev switch — flip empty ⇄ populated until the API is wired in.
  const [hasListings, setHasListings] = useState(true);

  const goToSell = () => appNav.navigate('SellProperty');

  // ── My Listings — populated ────────────────────────────────────────────────
  const renderPopulated = () => (
    <View style={styles.body}>
      <View style={styles.searchRow}>
        <Searchbar
          value={search}
          onChangeText={setSearch}
          placeholder="Search Properties"
          style={styles.searchbar}
        />
        <TouchableOpacity
          onPress={goToSell}
          activeOpacity={0.8}
          style={styles.iconBtn}
        >
          <Icon name={faLayerPlus} size={18} color={theme.colors.text_color} />
        </TouchableOpacity>
      </View>

      <View style={styles.switcherRow}>
        <ListingTopBar
          tabs={FLOWS}
          icons={FLOW_ICONS}
          activeIndex={flow}
          onChange={setFlow}
          style={styles.switcher}
        />
        <TouchableOpacity activeOpacity={0.8} style={styles.iconBtn}>
          <Icon name={faBarsFilter} size={18} color={theme.colors.text_color} />
        </TouchableOpacity>
      </View>

      {flow === 0 ? <DirectSaleListings /> : <BiddingListings />}
    </View>
  );

  // ── My Listings — empty ────────────────────────────────────────────────────
  const renderEmpty = () => (
    <View style={styles.emptyWrap}>
      <View style={styles.stack}>
        <View style={[styles.stackCard, styles.stackLeft]}>
          <RemoteImage
            uri={STACK_IMAGES[0]}
            style={styles.stackImage}
            imageStyle={styles.stackImageInner}
            showLoader={false}
          />
        </View>
        <View style={[styles.stackCard, styles.stackRight]}>
          <RemoteImage
            uri={STACK_IMAGES[2]}
            style={styles.stackImage}
            imageStyle={styles.stackImageInner}
            showLoader={false}
          />
        </View>
        <View style={[styles.stackCard, styles.stackFront]}>
          <RemoteImage
            uri={STACK_IMAGES[1]}
            style={styles.stackImage}
            imageStyle={styles.stackImageInner}
            showLoader={false}
          />
        </View>
      </View>

      <Typography
        size={28}
        weight={theme.fonts.bold}
        color={theme.colors.black}
        align="center"
      >
        No listings yet
      </Typography>
      <Typography
        size={15}
        color={theme.colors.text_color_light}
        align="center"
        style={styles.emptySubtitle}
      >
        Your listings will appear here. Add a property for sale and make it
        visible to thousands of potential buyers.
      </Typography>

      <BlockButton
        bgColor={theme.colors.primary}
        style={styles.sellBtn}
        onPress={goToSell}
      >
        <Icon name={faLayerPlus} size={18} color={theme.colors.white_900} />
        <Typography
          size={16}
          weight={theme.fonts.semiBold}
          color={theme.colors.white_900}
        >
          Sell Property
        </Typography>
      </BlockButton>
    </View>
  );

  const renderMyListings = () => (
    <View style={styles.myListings}>
      {hasListings ? renderPopulated() : renderEmpty()}

      {/* TEMP: remove once listings come from the API. */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setHasListings(v => !v)}
        style={styles.devPill}
      >
        <Typography
          size={12}
          weight={theme.fonts.medium}
          color={theme.colors.white_900}
        >
          Dev: {hasListings ? 'Populated' : 'Empty'}
        </Typography>
      </TouchableOpacity>
    </View>
  );

  // ── Public tab (placeholder for now) ───────────────────────────────────────
  const renderPublic = () => (
    <View style={styles.placeholder}>
      <Typography
        size={16}
        color={theme.colors.text_color_light}
        align="center"
      >
        Public listings coming soon.
      </Typography>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        centerType="segment"
        segmentTabs={SEGMENTS}
        segmentActiveIndex={segment}
        onSegmentChange={setSegment}
        avatarSource={AVATAR}
        onAvatarPress={() => appNav.navigate('profileHome')}
        onNotificationPress={() => appNav.navigate('Notifications')}
      />

      {segment === 0 ? renderPublic() : renderMyListings()}
    </View>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  myListings: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  // ── Populated: search + flow switcher ───────────────────────────────────────
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
    paddingHorizontal: responsive(20),
    marginTop: responsive(4),
    marginBottom: responsive(14),
  },
  searchbar: {
    flex: 1,
  },
  iconBtn: {
    width: responsive(48),
    height: responsive(48),
    borderRadius: responsive(16),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white_900,
  },
  switcherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
    paddingHorizontal: responsive(20),
    marginBottom: responsive(16),
  },
  switcher: {
    flex: 1,
  },
  // ── Empty state ────────────────────────────────────────────────────────────
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive(32),
    paddingBottom: responsive(80),
  },
  stack: {
    width: '100%',
    height: responsive(340),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive(12),
  },
  stackCard: {
    position: 'absolute',
    width: responsive(196),
    height: responsive(258),
    borderRadius: responsive(22),
    borderWidth: responsive(6),
    borderColor: theme.colors.white_900,
    backgroundColor: theme.colors.white_900,
    overflow: 'hidden',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  stackImage: {
    width: '100%',
    height: '100%',
  },
  stackImageInner: {
    borderRadius: responsive(16),
  },
  stackLeft: {
    zIndex: 1,
    transform: [
      { translateX: -responsive(58) },
      { translateY: responsive(24) },
      { rotate: '-13deg' },
    ],
  },
  stackRight: {
    zIndex: 1,
    transform: [
      { translateX: responsive(58) },
      { translateY: responsive(24) },
      { rotate: '13deg' },
    ],
  },
  stackFront: {
    zIndex: 2,
    transform: [{ translateY: -responsive(10) }],
  },
  emptySubtitle: {
    marginTop: responsive(12),
    lineHeight: responsive(22),
  },
  sellBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive(10),
    borderRadius: responsive(30),
    paddingVertical: responsive(16),
    marginTop: responsive(32),
  },
  // ── Public placeholder ─────────────────────────────────────────────────────
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive(32),
  },
  // ── TEMP dev switch ─────────────────────────────────────────────────────────
  devPill: {
    position: 'absolute',
    right: responsive(20),
    bottom: responsive(100),
    backgroundColor: transparent(theme.colors.black, 0.8),
    paddingHorizontal: responsive(14),
    paddingVertical: responsive(8),
    borderRadius: responsive(20),
    zIndex: 20,
  },
});
