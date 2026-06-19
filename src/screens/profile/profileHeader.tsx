import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';

interface ProfileHeaderProps {
  title: string;
  onBack: () => void;
}

const ProfileHeader = ({ title, onBack }: ProfileHeaderProps) => {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View style={styles.backBtn}>
            <Icon name={faArrowLeft} size={16} color={theme.colors.text_color} />
          </View>
        </TouchableOpacity>
        <Typography size={20} weight={theme.fonts.bold}>
          {title}
        </Typography>
      </View>
      <View style={styles.divider} />
    </>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(14),
    paddingHorizontal: responsive(20),
    paddingBottom: responsive(14),
  },
  backBtn: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(19),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
  },
});
