import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import BlockButton from '@theme/buttons/block-button';
import RemoteImage from '@components/RemoteImage/remote-image';
import { transparent } from '@utils/helper';

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
  image: string;
}

interface ListingCardProps {
  item: MyListing;
  onPress?: () => void;
}

const TONES: Record<StatusTone, string> = {
  warning: theme.colors.warning,
  success: theme.colors.Success,
};

/**
 * Full-bleed property card used across the listing feeds. Renders the type
 * badge and auction-status pill over the image, with the price, title and a
 * primary action fading in from the bottom overlay.
 */
const ListingCard = ({ item, onPress }: ListingCardProps) => {
  const tone = TONES[item.statusTone ?? 'warning'];

  return (
    <View style={styles.card}>
      <RemoteImage
        uri={item.image}
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
          {!!item.statusLabel && (
            <View style={[styles.statusPill, { borderColor: tone }]}>
              <View style={[styles.dot, { backgroundColor: tone }]} />
              <Typography size={13} weight={theme.fonts.medium} color={tone}>
                {item.statusLabel}
              </Typography>
            </View>
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
            onPress={onPress}
          >
            <Typography size={15} weight={theme.fonts.semiBold} align="center">
              View Details
            </Typography>
          </BlockButton>
        </View>
      </RemoteImage>
    </View>
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
