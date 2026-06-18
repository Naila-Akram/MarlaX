import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '@theme/typography/typography';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import type { TabScreenProps } from '@utils/types/navigation';

type Props = TabScreenProps<'Payments'>;

const PaymentsScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Typography size={20} weight={theme.fonts.bold}>
        Payments
      </Typography>
    </View>
  );
};

export default PaymentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive(24),
  },
});
