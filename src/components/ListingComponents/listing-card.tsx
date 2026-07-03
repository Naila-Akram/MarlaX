import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { faHeart } from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import BlockButton from '@theme/buttons/block-button';
import Icon from '@theme/Icon/icon';
import RemoteImage from '@components/RemoteImage/remote-image';
import { transparent } from '@utils/helper';
import type { AppStackParams, GalleryUnit } from '@utils/types';

export type SaleType = 'direct' | 'bidding';
export type StatusTone = 'warning' | 'success';

export interface MyListing {
  id: string;
  /** Property category, e.g. "Farm House". */
  type: string;
  /** Which listing flow this belongs to. */
  saleType: SaleType;
  /** Auction countdown text, e.g. "Ends in 2 hrs". Omitted for direct sale. */
  statusLabel?: string;
  /** Colour treatment for the status pill (defaults to "warning"). */
  statusTone?: StatusTone;
  /** Currency prefix, e.g. "PKR". */
  priceLabel: string;
  /** Formatted amount, e.g. "3.2 Crore". */
  priceAmount: string;
  /** Headline, e.g. "Farm House for Sale". */
  title: string;
  location: string;
  /** Gallery — the card shows the first, the detail page shows them all. */
  images: string[];
}

interface ListingCardProps {
  item: MyListing;
  /** Show a heart (favourite) button instead of the status pill. */
  showHeart?: boolean;
  onHeartPress?: () => void;
}

const TONES: Record<StatusTone, string> = {
  warning: theme.colors.warning,
  success: theme.colors.Success,
};

// The detail screen (shared with Home's "My Units") takes a GalleryUnit.
const toGalleryUnit = (item: MyListing): GalleryUnit => ({
  id: item.id,
  price: `${item.priceLabel} ${item.priceAmount}`,
  name: item.title,
  location: item.location,
  status: item.statusLabel,
  images: item.images,
});

/**
 * Full-bleed property card used across the listing feeds. Renders the type
 * badge and auction-status pill over the image, with the price, title and a
 * primary action fading in from the bottom overlay.
 */
const ListingCard = ({ item, showHeart, onHeartPress }: ListingCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const tone = TONES[item.statusTone ?? 'warning'];

  const openDetail = () =>
    navigation.navigate('UnitDetail', { unit: toGalleryUnit(item) });

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.95} onPress={openDetail}>
      <RemoteImage
        uri={item.images[0]}
        style={styles.bg}
        imageStyle={styles.image}
      >
        {/* Top row: type badge + status pill */}
        <View style={styles.top}>
          <View style={styles.typeBadge}>
            <Typography
              size={13}
              weight={theme.fonts.medium}
              color={theme.colors.text_color}
            >
              {item.type}
            </Typography>
          </View>
          {showHeart ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onHeartPress}
              style={styles.heartBtn}
            >
              <Icon name={faHeart} size={16} color={theme.colors.text_color} />
            </TouchableOpacity>
          ) : (
            !!item.statusLabel && (
              <View style={[styles.statusPill, { borderColor: tone }]}>
                <View style={[styles.dot, { backgroundColor: tone }]} />
                <Typography size={13} weight={theme.fonts.medium} color={tone}>
                  {item.statusLabel}
                </Typography>
              </View>
            )
          )}
        </View>

        {/* Bottom overlay */}
        <View style={styles.overlay}>
          <View style={styles.priceRow}>
            <Typography size={15} weight={theme.fonts.medium} color={theme.colors.light}>
              {item.priceLabel}{' '}
            </Typography>
            <Typography size={28} weight={theme.fonts.bold} color={theme.colors.light}>
              {item.priceAmount}
            </Typography>
          </View>
          <Typography size={17} weight={theme.fonts.semiBold} color={theme.colors.light} marginTop={2}>
            {item.title}
          </Typography>
          <Typography size={14} color={theme.colors.light} marginTop={2} style={styles.location}>
            {item.location}
          </Typography>

          <BlockButton
            bgColor={theme.colors.light}
            style={styles.detailsBtn}
            onPress={openDetail}
          >
            <Typography size={15} weight={theme.fonts.semiBold} align="center">
              View Details
            </Typography>
          </BlockButton>
        </View>
      </RemoteImage>
    </TouchableOpacity>
  );
};

export default ListingCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: responsive(20),
    marginBottom: responsive(18),
    borderRadius: responsive(22),
    overflow: 'hidden',
  },
  bg: {
    width: '100%',
    height: responsive(400),
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: responsive(22),
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: responsive(14),
  },
  typeBadge: {
    backgroundColor: theme.colors.light,
    paddingHorizontal: responsive(14),
    paddingVertical: responsive(7),
    borderRadius: responsive(20),
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(7),
    backgroundColor: theme.colors.light,
    paddingHorizontal: responsive(12),
    paddingVertical: responsive(7),
    borderRadius: responsive(20),
    borderWidth: 1.5,
  },
  dot: {
    width: responsive(7),
    height: responsive(7),
    borderRadius: responsive(4),
  },
  heartBtn: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(19),
    backgroundColor: theme.colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: transparent('#000000', 0.55),
    padding: responsive(18),
    borderBottomLeftRadius: responsive(22),
    borderBottomRightRadius: responsive(22),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  location: {
    opacity: 0.85,
  },
  detailsBtn: {
    borderRadius: responsive(30),
    marginTop: responsive(16),
  },
});
