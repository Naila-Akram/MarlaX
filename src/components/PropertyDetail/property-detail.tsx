import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  faLocationDot,
  faCircleCheck,
  faPhone,
  faFileLines,
  faReceipt,
  faSquarePlus,
} from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import ListingTopBar from '@components/ListingComponents/listing-top-bar';
import ListingBottomTab from '@components/ListingComponents/listing-bottom-tab';
import Section from './section';
import FeatureTile from './feature-tile';
import type { PaymentStatus, PropertyDetailData } from './types';

interface PropertyDetailProps {
  data: PropertyDetailData;
  style?: StyleProp<ViewStyle>;
  /** Called when the contact/call action is pressed. */
  onContact?: () => void;
  /** Called when the "List for Resale" action is pressed. */
  onListResale?: () => void;
}

const PAYMENT_DOT: Record<PaymentStatus, string> = {
  paid: theme.colors.success_green,
  due: theme.colors.warning,
  upcoming: theme.colors.grey_100,
};

const TABS = ['Property Details', 'Property Status'];

/**
 * Reusable property information panel. Renders a summary header (price, name,
 * location, status) followed by any of the optional sections that have data.
 *
 * It intentionally renders plain content (no scroll view) so it can be dropped
 * inside a bottom sheet, a ScrollView, or a plain screen by the consumer.
 */
const PropertyDetail = ({
  data,
  style,
  onContact,
  onListResale,
}: PropertyDetailProps) => {
  const { price, name, location, status } = data;
  const [tab, setTab] = useState(0);

  return (
    <View style={[styles.container, style]}>
      {/* Summary — also serves as the collapsed peek inside the gallery sheet */}
      <View style={styles.headerTop}>
        <Typography size={26} weight={theme.fonts.bold}>
          {price}
        </Typography>
        {!!status && (
          <View style={styles.statusBadge}>
            <Typography
              size={12}
              weight={theme.fonts.semiBold}
              color={theme.colors.success_green}
            >
              {status}
            </Typography>
          </View>
        )}
      </View>

      <Typography size={16} weight={theme.fonts.medium} marginTop={8}>
        {name}
      </Typography>
      <View style={styles.locationRow}>
        <Icon name={faLocationDot} size={12} color={theme.colors.text_color_light} />
        <Typography size={13} color={theme.colors.text_color_light}>
          {location}
        </Typography>
      </View>

      {/* Segmented tabs */}
      <ListingTopBar
        tabs={TABS}
        activeIndex={tab}
        onChange={setTab}
        style={styles.tabs}
      />

      {tab === 0 ? (
        <>
          {/* Feature grid */}
          {!!data.features?.length && (
            <View style={styles.featureRow}>
              {data.features.map(feature => (
                <FeatureTile key={feature.label} {...feature} />
              ))}
            </View>
          )}

          {/* Amenities */}
          {!!data.amenities?.length && (
            <Section title="Amenities">
              <View style={styles.amenityWrap}>
                {data.amenities.map(amenity => (
                  <View key={amenity} style={styles.amenityChip}>
                    <Icon
                      name={faCircleCheck}
                      size={12}
                      color={theme.colors.success_green}
                    />
                    <Typography size={13} color={theme.colors.text_color}>
                      {amenity}
                    </Typography>
                  </View>
                ))}
              </View>
            </Section>
          )}

          {/* Developed by / agent */}
          {!!data.agent && (
            <Section title="Developed By">
              <View style={styles.agentRow}>
                <View style={styles.avatar}>
                  {data.agent.avatar ? (
                    <Image
                      source={{ uri: data.agent.avatar }}
                      style={styles.avatarImg}
                    />
                  ) : (
                    <Typography
                      size={18}
                      weight={theme.fonts.bold}
                      color={theme.colors.primary}
                    >
                      {data.agent.name.charAt(0)}
                    </Typography>
                  )}
                </View>
                <View style={styles.agentInfo}>
                  <Typography size={15} weight={theme.fonts.semiBold}>
                    {data.agent.name}
                  </Typography>
                  {!!data.agent.role && (
                    <Typography
                      size={12}
                      color={theme.colors.text_color_light}
                      marginTop={2}
                    >
                      {data.agent.role}
                    </Typography>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={onContact}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Icon name={faPhone} size={16} color={theme.colors.light} />
                </TouchableOpacity>
              </View>
            </Section>
          )}

          {/* Overview */}
          {!!data.description && (
            <Section title="Overview">
              <Typography
                size={14}
                color={theme.colors.text_color_light}
                lineHeight={responsive(22)}
              >
                {data.description}
              </Typography>
            </Section>
          )}
        </>
      ) : (
        <>
          {/* Payment plan */}
          {!!data.paymentPlan?.length && (
            <Section title="Payment Plan">
              {data.paymentPlan.map(milestone => (
                <View key={milestone.label} style={styles.payRow}>
                  <View style={styles.payLeft}>
                    <View
                      style={[
                        styles.payDot,
                        {
                          backgroundColor:
                            PAYMENT_DOT[milestone.status ?? 'upcoming'],
                        },
                      ]}
                    />
                    <Typography size={14} color={theme.colors.text_color}>
                      {milestone.label}
                    </Typography>
                  </View>
                  <Typography size={14} weight={theme.fonts.semiBold}>
                    {milestone.amount}
                  </Typography>
                </View>
              ))}
            </Section>
          )}
        </>
      )}

      {/* Bottom action bar */}
      <ListingBottomTab
        actions={[{ icon: faFileLines }, { icon: faReceipt }]}
        primaryIcon={faSquarePlus}
        primaryLabel="List for Resale"
        onPrimaryPress={onListResale}
        style={styles.bottomBar}
      />
    </View>
  );
};

export default PropertyDetail;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(4),
  },
  tabs: {
    marginTop: responsive(20),
    marginBottom: responsive(4),
  },
  bottomBar: {
    marginTop: responsive(24),
    marginHorizontal: -responsive(20),
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: responsive(12),
  },
  statusBadge: {
    backgroundColor: theme.colors.success_green_bg,
    borderRadius: responsive(20),
    paddingHorizontal: responsive(12),
    paddingVertical: responsive(6),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(5),
    marginTop: responsive(8),
  },
  featureRow: {
    flexDirection: 'row',
    gap: responsive(10),
    marginTop: responsive(20),
  },
  amenityWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive(8),
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(6),
    paddingHorizontal: responsive(12),
    paddingVertical: responsive(8),
    borderRadius: responsive(20),
    backgroundColor: theme.colors.grey_50,
  },
  payRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsive(10),
  },
  payLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
  },
  payDot: {
    width: responsive(9),
    height: responsive(9),
    borderRadius: responsive(5),
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(12),
  },
  avatar: {
    width: responsive(46),
    height: responsive(46),
    borderRadius: responsive(23),
    backgroundColor: theme.colors.icon_bg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  agentInfo: {
    flex: 1,
  },
  callBtn: {
    width: responsive(42),
    height: responsive(42),
    borderRadius: responsive(21),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
