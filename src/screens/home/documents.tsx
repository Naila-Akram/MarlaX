import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '@theme/typography/typography';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import type { TabScreenProps } from '@utils/types/navigation';

type Props = TabScreenProps<'Documents'>;

const DocumentsScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Typography size={20} weight={theme.fonts.bold}>
        Documents
      </Typography>
    </View>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive(24),
  },
});
