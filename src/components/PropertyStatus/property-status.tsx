import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import RemoteImage from '@components/RemoteImage/remote-image';
import { transparent } from '@utils/helper';
import type { GalleryUnit } from '@utils/types';

type PriceRow = { label: string; amount: string; badge?: string };
type TimelineState = 'done' | 'current' | 'future';
type TimelineStep = {
  title: string;
  date?: string;
  badge?: string;
  state: TimelineState;
};

const CONSTRUCTION_PROGRESS = 30;

const TIMELINE: TimelineStep[] = [
  { title: 'Booking',            date: '15 Mar 2024', state: 'done' },
  { title: 'KYC Verified',       date: '15 Mar 2024', state: 'done' },
  { title: 'Agreement Signed',   date: '20 Mar 2024', state: 'done' },
  { title: 'Under Construction', badge: 'Finishing',  state: 'current' },
  { title: 'Possession',         date: '31 Dec 2026', state: 'future' },
];

const DOT_COLOR: Record<TimelineState, string> = {
  done: theme.colors.Success,
  current: theme.colors.warning,
  future: theme.colors.grey_100,
};

// Split "PKR 2.5 Crore" into a small prefix + bold amount.
const Amount = ({ value }: { value: string }) => {
  const parts = value.split(' ');
  const hasPrefix = parts[0].toUpperCase() === 'PKR';
  return (
    <View style={styles.amount}>
      {hasPrefix && (
        <Typography size={13} color={theme.colors.text_color_light}>
          PKR{' '}
        </Typography>
      )}
      <Typography size={18} weight={theme.fonts.bold}>
        {hasPrefix ? parts.slice(1).join(' ') : value}
      </Typography>
    </View>
  );
};

const PropertyStatus = ({ unit }: { unit: GalleryUnit }) => {
  const priceRows: PriceRow[] = [
    { label: 'Base Price', amount: unit.price },
    { label: 'Down Payment', badge: '20%', amount: 'PKR 50 Lacs' },
    { label: 'Installments', badge: '30', amount: 'PKR 3 Lacs' },
    { label: 'Balloon Payment', badge: '5', amount: 'PKR 12 Lacs' },
    { label: 'Possession Payment', amount: 'PKR 50 Lacs' },
  ];
  const thumbs = unit.images.slice(0, 4);

  return (
    <View style={styles.wrap}>
      {/* ── Price Breakdown ─────────────────────────────────────────────── */}
      <Typography size={20} weight={theme.fonts.bold} style={styles.heading}>
        Price Breakdown
      </Typography>
      {priceRows.map(row => (
        <View key={row.label} style={styles.priceRow}>
          <View style={styles.priceLabel}>
            <Typography size={15} color={theme.colors.text_color_light}>
              {row.label}
            </Typography>
            {!!row.badge && (
              <View style={styles.smallBadge}>
                <Typography size={12} weight={theme.fonts.medium} color={theme.colors.text_color_light}>
                  {row.badge}
                </Typography>
              </View>
            )}
          </View>
          <Amount value={row.amount} />
        </View>
      ))}

      {/* ── Construction Updates ────────────────────────────────────────── */}
      <View style={styles.sectionHead}>
        <Typography size={20} weight={theme.fonts.bold}>
          Construction Updates
        </Typography>
        <TouchableOpacity activeOpacity={0.7}>
          <Typography size={14} weight={theme.fonts.medium} color={theme.colors.primary}>
            View Details
          </Typography>
        </TouchableOpacity>
      </View>

      <View style={styles.progressCard}>
        <View style={styles.progressTop}>
          <Typography size={15} color={theme.colors.text_color_light}>
            Progress
          </Typography>
          <Typography size={17} weight={theme.fonts.bold}>
            {CONSTRUCTION_PROGRESS}%
          </Typography>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${CONSTRUCTION_PROGRESS}%` }]} />
        </View>
      </View>

      <View style={styles.thumbs}>
        {thumbs.map((uri, i) => {
          const isLast = i === thumbs.length - 1;
          return (
            <View key={i} style={styles.thumb}>
              <RemoteImage
                uri={uri}
                style={styles.thumbImg}
                imageStyle={styles.thumbRadius}
                showLoader={false}
              />
              {isLast && (
                <View style={styles.thumbOverlay}>
                  <Typography size={13} weight={theme.fonts.semiBold} color={theme.colors.white_900}>
                    +5 more
                  </Typography>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* ── Status Timeline ─────────────────────────────────────────────── */}
      <Typography size={20} weight={theme.fonts.bold} style={styles.heading}>
        Status Timeline
      </Typography>
      <View style={styles.timeline}>
        {TIMELINE.map((step, i) => {
          const isLast = i === TIMELINE.length - 1;
          return (
            <View key={step.title} style={styles.timelineRow}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.dot,
                    step.state === 'future'
                      ? styles.dotFuture
                      : { backgroundColor: DOT_COLOR[step.state] },
                  ]}
                />
                {!isLast && <View style={styles.timelineLine} />}
              </View>

              <View style={styles.timelineContent}>
                <Typography size={16} weight={theme.fonts.semiBold}>
                  {step.title}
                </Typography>
                {step.badge ? (
                  <View style={styles.stepBadge}>
                    <Typography size={12} weight={theme.fonts.medium} color={theme.colors.text_color_light}>
                      {step.badge}
                    </Typography>
                  </View>
                ) : (
                  <Typography size={13} color={theme.colors.text_color_light} marginTop={2}>
                    {step.date}
                  </Typography>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PropertyStatus;

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: responsive(20),
    paddingBottom: responsive(32),
  },
  heading: {
    marginTop: responsive(20),
    marginBottom: responsive(8),
  },
  // ── Price breakdown ─────────────────────────────────────────────────────
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsive(10),
  },
  priceLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(8),
  },
  smallBadge: {
    backgroundColor: theme.colors.grey_50,
    borderRadius: responsive(20),
    paddingHorizontal: responsive(9),
    paddingVertical: responsive(2),
  },
  amount: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  // ── Construction ────────────────────────────────────────────────────────
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsive(24),
    marginBottom: responsive(12),
  },
  progressCard: {
    backgroundColor: theme.colors.grey_50,
    borderRadius: responsive(16),
    padding: responsive(16),
  },
  progressTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsive(12),
  },
  progressTrack: {
    height: responsive(8),
    borderRadius: responsive(4),
    backgroundColor: theme.colors.grey_100,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: responsive(4),
    backgroundColor: theme.colors.primary,
  },
  thumbs: {
    flexDirection: 'row',
    gap: responsive(10),
    marginTop: responsive(14),
  },
  thumb: {
    flex: 1,
    height: responsive(78),
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    borderRadius: responsive(12),
  },
  thumbRadius: {
    borderRadius: responsive(12),
  },
  thumbOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: responsive(12),
    backgroundColor: transparent('#000000', 0.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ── Timeline ────────────────────────────────────────────────────────────
  timeline: {
    marginTop: responsive(4),
  },
  timelineRow: {
    flexDirection: 'row',
    gap: responsive(14),
  },
  timelineLeft: {
    width: responsive(16),
    alignItems: 'center',
  },
  dot: {
    width: responsive(14),
    height: responsive(14),
    borderRadius: responsive(7),
    marginTop: responsive(3),
  },
  dotFuture: {
    backgroundColor: theme.colors.white_900,
    borderWidth: 2,
    borderColor: theme.colors.grey_100,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: theme.colors.divider,
    marginTop: responsive(4),
  },
  timelineContent: {
    flex: 1,
    paddingBottom: responsive(22),
  },
  stepBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.grey_50,
    borderRadius: responsive(6),
    paddingHorizontal: responsive(10),
    paddingVertical: responsive(3),
    marginTop: responsive(6),
  },
});
