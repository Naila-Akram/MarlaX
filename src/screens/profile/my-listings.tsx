import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import type { AppScreenProps } from '@utils/types/navigation';
import ProfileHeader from './profileHeader';

type Props = AppScreenProps<'MyListings'>;

const MyListingsScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <ProfileHeader title="My Listings" onBack={() => navigation.goBack()} />
    </View>
  );
};

export default MyListingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
});
