import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';

interface OverViewSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
}

const OverViewSheet: React.FC<OverViewSheetProps> = ({ bottomSheetRef }) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.55}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef as React.RefObject<BottomSheetModal>}
      snapPoints={['50%']}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetView style={styles.container}>
        <Typography size={18} weight={theme.fonts.bold}>
          Portfolio Overview
        </Typography>
        <Typography
          size={14}
          color={theme.colors.text_color_light}
          marginTop={8}
        >
          Detailed breakdown coming soon.
        </Typography>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default OverViewSheet;

const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: responsive(24),
    borderTopRightRadius: responsive(24),
    backgroundColor: theme.colors.light,
  },
  handle: {
    backgroundColor: theme.colors.grey_100,
    width: responsive(40),
  },
  container: {
    paddingHorizontal: responsive(24),
    paddingTop: responsive(16),
    paddingBottom: responsive(36),
  },
});
