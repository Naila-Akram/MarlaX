import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import type { AppScreenProps } from '@utils/types/navigation';

type Props = AppScreenProps<'ViewAll'>;

const ViewAllScreen = ({ navigation, route }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon name={faArrowLeft} size={18} color={theme.colors.text_color} />
        </TouchableOpacity>
        <Typography size={17} weight={theme.fonts.semiBold}>
          {route.params.title}
        </Typography>
        <View style={styles.placeholder} />
      </View>
    </View>
  );
};

export default ViewAllScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive(20),
    paddingBottom: responsive(16),
  },
  placeholder: {
    width: responsive(18),
  },
});
