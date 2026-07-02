import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import {
  faMoneyCheckPen,
  faBuildingColumns,
  faChevronRight,
} from '@fortawesome/pro-regular-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import type { AppScreenProps } from '@utils/types/navigation';
import PaymentHeader from './paymentHeader';

type PaymentMethod = {
  id: string;
  label: string;
  // A method shows either a FontAwesome icon or a brand logo image.
  icon?: IconProp;
  logo?: ImageSourcePropType;
};

const METHODS: PaymentMethod[] = [
  { id: 'check', icon: faMoneyCheckPen, label: 'Via Check' },
  { id: 'transfer', icon: faBuildingColumns, label: 'Online Transfer' },
  {
    id: 'jazzcash',
    logo: require('../../../assets/images/Jaz.png'),
    label: 'JazzCash',
  },
  {
    id: 'easypaisa',
    logo: require('../../../assets/images/EasyPaisa.png'),
    label: 'EasyPaisa',
  },
];

const PaymentMethods = ({ navigation }: AppScreenProps<'PaymentMethods'>) => {
  const handleSelect = (id: string) => {
    if (id === 'check') {
      navigation.navigate('PayViaCheck');
    }
    // Online Transfer / JazzCash / EasyPaisa screens are not built yet.
  };

  return (
    <View style={styles.container}>
      <PaymentHeader
        title="Select payment method"
        onBack={() => navigation.goBack()}
        onClose={() => navigation.popToTop()}
      />

      <View style={styles.list}>
        {METHODS.map(method => (
          <TouchableOpacity
            key={method.id}
            activeOpacity={0.7}
            style={styles.card}
            onPress={() => handleSelect(method.id)}
          >
            <View style={styles.iconCircle}>
              {method.logo ? (
                <Image
                  source={method.logo}
                  style={styles.logo}
                  resizeMode="contain"
                />
              ) : (
                <Icon
                  name={method.icon!}
                  size={18}
                  color={theme.colors.text_color}
                />
              )}
            </View>
            <Typography
              size={16}
              weight={theme.fonts.medium}
              style={styles.label}
            >
              {method.label}
            </Typography>
            <Icon
              name={faChevronRight}
              size={16}
              color={theme.colors.text_color_light}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  list: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(20),
    gap: responsive(16),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(14),
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    borderRadius: responsive(16),
    backgroundColor: theme.colors.card_bg,
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(18),
  },
  iconCircle: {
    width: responsive(44),
    height: responsive(44),
    borderRadius: responsive(22),
    backgroundColor: theme.colors.icon_bg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: responsive(26),
    height: responsive(26),
  },
  label: {
    flex: 1,
  },
});
