import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import BlockButton from '@theme/buttons/block-button';
import { transparent } from '@utils/helper';

interface SubmitReviewSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  /** Fired when the user confirms — publishes the listing and leaves the flow. */
  onConfirm: () => void;
}

/**
 * Success confirmation shown after "Submit for Review". Confirming publishes the
 * new listing and takes the user to their listings.
 */
const SubmitReviewSheet = ({ bottomSheetRef, onConfirm }: SubmitReviewSheetProps) => {
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
      enableDynamicSizing
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.iconCircle}>
          <FontAwesomeIcon
            icon={faCircleCheck}
            size={responsive(52)}
            color={theme.colors.Success}
          />
        </View>

        <Typography
          size={22}
          weight={theme.fonts.bold}
          align="center"
          style={styles.title}
        >
          Submitted for Review
        </Typography>
        <Typography
          size={15}
          color={theme.colors.text_color_light}
          align="center"
          style={styles.subtitle}
        >
          Your property listing has been submitted. We'll review it and publish
          it to buyers shortly.
        </Typography>

        <BlockButton
          bgColor={theme.colors.black}
          style={styles.button}
          onPress={onConfirm}
        >
          <Typography
            size={16}
            weight={theme.fonts.semiBold}
            color={theme.colors.white_900}
            align="center"
          >
            View My Listings
          </Typography>
        </BlockButton>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default SubmitReviewSheet;

const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: responsive(28),
    borderTopRightRadius: responsive(28),
    backgroundColor: theme.colors.white_900,
  },
  handle: {
    backgroundColor: theme.colors.grey_100,
    width: responsive(40),
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: responsive(28),
    paddingTop: responsive(16),
    paddingBottom: responsive(40),
  },
  iconCircle: {
    width: responsive(96),
    height: responsive(96),
    borderRadius: responsive(48),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: transparent(theme.colors.Success, 0.12),
    marginBottom: responsive(20),
  },
  title: {
    marginBottom: responsive(8),
  },
  subtitle: {
    lineHeight: responsive(22),
    marginBottom: responsive(28),
  },
  button: {
    borderRadius: responsive(30),
    paddingVertical: responsive(16),
  },
});
