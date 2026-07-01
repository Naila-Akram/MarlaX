import React from 'react';
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
} from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import Section from './section';
import FeatureTile from './feature-tile';
import type { PaymentStatus, PropertyDetailData } from './types';

interface PropertyDetailProps {
  data: PropertyDetailData;
  style?: StyleProp<ViewStyle>;
  /** Called when the contact/call action is pressed. */
  onContact?: () => void;
}

const PAYMENT_DOT: Record<PaymentStatus, string> = {
  paid: theme.colors.success_green,
  due: theme.colors.warning,
  upcoming: theme.colors.grey_100,
};

/**
 * Reusable property information panel. Renders a summary header (price, name,
 * location, status) followed by any of the optional sections that have data.
 *
 * It intentionally renders plain content (no scroll view) so it can be dropped
 * inside a bottom sheet, a ScrollView, or a plain screen by the consumer.
 */
const PropertyDetail = ({ data, style, onContact }: PropertyDetailProps) => {
  const { price, name, location, status } = data;

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

      {/* Feature grid */}
      {!!data.features?.length && (
        <View style={styles.featureRow}>
          {data.features.map(feature => (
            <FeatureTile key={feature.label} {...feature} />
          ))}
        </View>
      )}

      {/* Description */}
      {!!data.description && (
        <Section title="Description">
          <Typography
            size={14}
            color={theme.colors.text_color_light}
            lineHeight={responsive(22)}
          >
            {data.description}
          </Typography>
        </Section>
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

      {/* Payment plan */}
      {!!data.paymentPlan?.length && (
        <Section title="Payment Plan">
          {data.paymentPlan.map(milestone => (
            <View key={milestone.label} style={styles.payRow}>
              <View style={styles.payLeft}>
                <View
                  style={[
                    styles.payDot,
                    { backgroundColor: PAYMENT_DOT[milestone.status ?? 'upcoming'] },
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

      {/* Agent */}
      {!!data.agent && (
        <Section title="Contact">
          <View style={styles.agentRow}>
            <View style={styles.avatar}>
              {data.agent.avatar ? (
                <Image source={{ uri: data.agent.avatar }} style={styles.avatarImg} />
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
    </View>
  );
};

export default PropertyDetail;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(4),
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
