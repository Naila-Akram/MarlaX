import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { faBell } from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import RemoteImage from '@components/RemoteImage/remote-image';
import ListingTopBar from '@components/ListingComponents/listing-top-bar';

type CenterLogo = {
  centerType: 'logo';
  logoSource?: ImageSourcePropType;
  title?: never;
};

type CenterTitle = {
  centerType: 'title';
  title: string;
  logoSource?: never;
};

type CenterSegment = {
  centerType: 'segment';
  /** Segment labels rendered left → right. */
  segmentTabs: string[];
  /** Index of the currently selected segment. */
  segmentActiveIndex: number;
  /** Notified with the tapped segment's index. */
  onSegmentChange: (index: number) => void;
  title?: never;
  logoSource?: never;
};

type HeaderProps = (CenterLogo | CenterTitle | CenterSegment) & {
  avatarSource?: ImageSourcePropType;
  onAvatarPress?: () => void;
  onNotificationPress?: () => void;
};

const Header = (props: HeaderProps) => {
  const { avatarSource, onAvatarPress, onNotificationPress } = props;
  // Remote avatars ({ uri }) go through RemoteImage for retry/placeholder;
  // local sources (require) keep using the plain Image.
  const avatarUri =
    avatarSource && typeof avatarSource === 'object' && !Array.isArray(avatarSource)
      ? (avatarSource as { uri?: string }).uri
      : undefined;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onAvatarPress} activeOpacity={0.8}>
        {avatarUri ? (
          <RemoteImage uri={avatarUri} style={styles.avatar} showLoader={false} />
        ) : avatarSource ? (
          <Image source={avatarSource} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        )}
      </TouchableOpacity>

      <View style={styles.center}>
        {props.centerType === 'logo' ? (
          <Image
            source={props.logoSource ?? require('../../assets/images/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        ) : props.centerType === 'segment' ? (
          <ListingTopBar
            tabs={props.segmentTabs}
            activeIndex={props.segmentActiveIndex}
            onChange={props.onSegmentChange}
            style={styles.segment}
          />
        ) : (
          <Typography size={18} weight={theme.fonts.semiBold} align="center">
            {props.title}
          </Typography>
        )}
      </View>

      <TouchableOpacity
        onPress={onNotificationPress}
        activeOpacity={0.7}
        style={styles.bell}
      >
        <Icon name={faBell} size={20} color={theme.colors.text_color} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(12),
    backgroundColor: theme.colors.background,
  },
  avatar: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(19),
    borderWidth: 1.5,
    borderColor: theme.colors.secondary,
  },
  avatarPlaceholder: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(19),
    backgroundColor: theme.colors.grey_100,
    borderWidth: 1.5,
    borderColor: theme.colors.secondary,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: responsive(12),
  },
  segment: {
    alignSelf: 'stretch',
  },
  logo: {
    width: responsive(100),
    height: responsive(36),
  },
  bell: {
    width: responsive(38),
    height: responsive(38),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    borderRadius: responsive(19),
  },
});
