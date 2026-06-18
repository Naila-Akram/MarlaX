import React from 'react';
import {StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {responsive} from '@theme/responsive';
import Animated from 'react-native-reanimated';
import {theme} from '@theme/index';
import {ScrollView} from 'react-native';

type MainLayoutTypes = {
  children: React.ReactNode;
  sidePadding?: boolean;
  scrollEnabled?: boolean;
  noPaddingTop?: boolean;
  marginBottom?: number;
  style?: StyleProp<ViewStyle>;
};

const MainLayout = ({
  children,
  sidePadding,
  scrollEnabled,
  noPaddingTop,
  marginBottom,
  style,
}: MainLayoutTypes) => {
  return scrollEnabled ? (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        style,
        {
          marginBottom: marginBottom ? responsive(marginBottom) : 0,
          paddingHorizontal: sidePadding ? responsive(20) : 0,
        },
      ]}
      contentContainerStyle={{flexGrow: 1}}>
      {children}
    </ScrollView>
  ) : (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          paddingHorizontal: sidePadding ? responsive(20) : 0,
          paddingTop: noPaddingTop ? 0 : responsive(24),
        },
      ]}>
      {children}
    </Animated.View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
});
