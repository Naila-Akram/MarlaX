import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import Typography from '@theme/typography/typography';
import BlockButton from '@theme/buttons/block-button';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import { transparent } from '@utils/helper';

interface SuccessSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  icon: IconProp;
  iconBgColor: string;
  title: string;
  description: string;
  buttonLabel?: string;
  onButtonPress?: () => void;
}

const SuccessSheet: React.FC<SuccessSheetProps> = ({
  bottomSheetRef,
  icon,
  iconBgColor,
  title,
  description,
  buttonLabel,
  onButtonPress,
}) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.55}
        pressBehavior="none"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef as React.RefObject<BottomSheetModal>}
      snapPoints={['45%']}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetView style={styles.container}>
        {/* Icon circles */}
        <View
          style={[
            styles.iconOuter,
            { backgroundColor: transparent(iconBgColor, 0.12) },
          ]}
        >
          <View style={[styles.iconInner, { backgroundColor: iconBgColor }]}>
            <FontAwesomeIcon
              icon={icon}
              size={responsive(28)}
              color={theme.colors.light}
            />
          </View>
        </View>

        {/* Title */}
        <Typography
          size={20}
          weight={theme.fonts.bold}
          align="center"
          marginTop={20}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          size={14}
          color={theme.colors.text_color_light}
          align="center"
          marginTop={8}
          style={styles.description}
        >
          {description}
        </Typography>

        {/* Optional button */}
        {buttonLabel && onButtonPress && (
          <BlockButton
            bgColor={theme.colors.black}
            style={styles.button}
            onPress={onButtonPress}
          >
            <Typography
              size={16}
              weight={theme.fonts.semiBold}
              color={theme.colors.light}
              align="center"
            >
              {buttonLabel}
            </Typography>
          </BlockButton>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default SuccessSheet;

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
    alignItems: 'center',
    paddingHorizontal: responsive(28),
    paddingTop: responsive(12),
    paddingBottom: responsive(36),
  },
  iconOuter: {
    width: responsive(100),
    height: responsive(100),
    borderRadius: responsive(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsive(8),
  },
  iconInner: {
    width: responsive(70),
    height: responsive(70),
    borderRadius: responsive(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    width: '100%',
  },
  button: {
    width: '100%',
    borderRadius: responsive(30),
    marginTop: responsive(28),
  },
});
