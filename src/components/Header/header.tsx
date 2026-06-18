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

type HeaderProps = (CenterLogo | CenterTitle) & {
  avatarSource?: ImageSourcePropType;
  onAvatarPress?: () => void;
  onNotificationPress?: () => void;
};

const Header = ({
  centerType,
  title,
  logoSource,
  avatarSource,
  onAvatarPress,
  onNotificationPress,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onAvatarPress} activeOpacity={0.8}>
        {avatarSource ? (
          <Image source={avatarSource} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        )}
      </TouchableOpacity>

      <View style={styles.center}>
        {centerType === 'logo' ? (
          <Image
            source={logoSource ?? require('../../assets/images/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        ) : (
          <Typography size={18} weight={theme.fonts.semiBold} align="center">
            {title}
          </Typography>
        )}
      </View>

      <TouchableOpacity onPress={onNotificationPress} activeOpacity={0.7} style={styles.bell}>
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
  logo: {
    width: responsive(100),
    height: responsive(36),
  },
  bell: {
    width: responsive(38),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
