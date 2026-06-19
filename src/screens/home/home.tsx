import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import type { TabScreenProps } from '@utils/types/navigation';
import PendingList from '@components/Home/PendingList/pending-list';
import OverView from '@components/Home/OverView/over-view';
import MyUnits from '@components/Home/MyUnits/my-units';
import Recommended from '@components/Home/Recommended/recommended';
import Typography from '@theme/typography/typography';

type Props = TabScreenProps<'HomeScreen'>;

const SECTIONS = [0, 1, 2, 3, 4];

const HomeScreen = ({}: Props) => {
  const renderSection = ({ item }: { item: number }) => {
    switch (item) {
      case 0:
        return <PendingList />;
      case 1:
        return <OverView />;
      case 2:
        return <MyUnits />;
      case 3:
        return <Recommended />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Typography
        size={16}
        color={theme.colors.text_color}
        weight={theme.fonts.semiBold}
      >
        Hello Hamza!
      </Typography>
      <Typography
        size={24}
        color={theme.colors.black}
        weight={theme.fonts.semiBold}
      >
        Good Morning
      </Typography>
      <FlatList
        data={SECTIONS}
        keyExtractor={item => item.toString()}
        renderItem={renderSection}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: responsive(10),
  },
  listContent: {
    paddingTop: responsive(16),
    paddingBottom: responsive(40),
    gap: responsive(20),
  },
});
