import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import BlockButton from '@theme/buttons/block-button';
import SellPropertyHeader from '@components/SellProperty/sell-property-header';
import SubmitReviewSheet from '@components/SellProperty/submit-review-sheet';
import {
  SellPropertyProvider,
  useSellProperty,
} from '@components/SellProperty/sell-property-context';
import type { SellPropertyForm } from '@components/SellProperty/sell-property-context';
import StepName from '@components/SellProperty/steps/step-name';
import StepLocation from '@components/SellProperty/steps/step-location';
import StepPropertyDetail from '@components/SellProperty/steps/step-property-detail';
import StepFeatures from '@components/SellProperty/steps/step-features';
import StepMedia from '@components/SellProperty/steps/step-media';
import StepContact from '@components/SellProperty/steps/step-contact';
import { useListingStore } from '@stores/listing-store';
import type { MyListing } from '@components/ListingComponents/listing-card';
import type { AppScreenProps } from '@utils/types/navigation';

type Props = AppScreenProps<'SellProperty'>;

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800';

// Map the collected form into a listing card for the My Listings feed.
const buildListing = (form: SellPropertyForm): MyListing => {
  const total = Math.round(
    (parseFloat(form.area) || 0) * (parseFloat(form.price) || 0),
  );
  const amount = total > 0 ? total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : form.price;
  const isBidding = form.listFor === 'bidding';
  const uploaded = (form.images ?? []).map(i => i.uri);
  return {
    id: `listing-${Date.now()}`,
    type: form.propertyType,
    saleType: form.listFor,
    statusLabel: isBidding ? 'Under Review' : undefined,
    statusTone: 'warning',
    priceLabel: form.currency,
    priceAmount: amount || '—',
    title: form.name || form.propertyName || 'New Listing',
    location: form.location,
    images: uploaded.length > 0 ? uploaded : [FALLBACK_IMAGE],
  };
};

// The six wizard steps, in order. Each swaps its placeholder for real UI later.
const STEPS: { title: string; Component: React.ComponentType }[] = [
  { title: 'Name of Listing',      Component: StepName },
  { title: 'Location',             Component: StepLocation },
  { title: 'Property Detail',      Component: StepPropertyDetail },
  { title: 'Features & Amenities', Component: StepFeatures },
  { title: 'Media Gallery',        Component: StepMedia },
  { title: 'Contact Info',         Component: StepContact },
];

const SellPropertyFlow = ({ navigation, route }: Props) => {
  const [step, setStep] = useState(0);
  const { form, addAmenities } = useSellProperty();
  const addListing = useListingStore(s => s.addListing);
  const sheetRef = useRef<BottomSheetModal>(null);

  // The Add Amenities screen returns here with the picked amenities as a param.
  const returnedAmenities = route.params?.newAmenities;
  useEffect(() => {
    if (returnedAmenities?.length) {
      addAmenities(returnedAmenities);
      navigation.setParams({ newAmenities: undefined });
    }
  }, [returnedAmenities, addAmenities, navigation]);

  const isLast = step === STEPS.length - 1;
  const CurrentStep = STEPS[step].Component;

  const handleBack = () => {
    if (step > 0) {
      setStep(s => s - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleNext = () => {
    if (!isLast) {
      setStep(s => s + 1);
    } else {
      sheetRef.current?.present();
    }
  };

  // Publish the listing to the My Listings feed and leave the flow.
  const handleConfirm = () => {
    addListing(buildListing(form));
    sheetRef.current?.dismiss();
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs', params: { screen: 'Listing' } }],
    });
  };

  return (
    <View style={styles.container}>
      <SellPropertyHeader
        title="Sell Property"
        step={step}
        totalSteps={STEPS.length}
        onBack={handleBack}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <CurrentStep />
      </ScrollView>

      <View style={styles.bottomBar}>
        {step > 0 && (
          <View style={styles.btnWrap}>
            <BlockButton
              bgColor={theme.colors.white_900}
              borderColor={theme.colors.borderColor}
              borderWidth={1.5}
              style={styles.actionBtn}
              onPress={handleBack}
            >
              <Typography
                size={16}
                weight={theme.fonts.semiBold}
                color={theme.colors.text_color}
                align="center"
              >
                Back
              </Typography>
            </BlockButton>
          </View>
        )}

        <View style={styles.btnWrap}>
          <BlockButton
            bgColor={theme.colors.black}
            style={styles.actionBtn}
            onPress={handleNext}
          >
            <Typography
              size={16}
              weight={theme.fonts.semiBold}
              color={theme.colors.white_900}
              align="center"
            >
              {isLast ? 'Submit for Review' : 'Next'}
            </Typography>
          </BlockButton>
        </View>
      </View>

      <SubmitReviewSheet bottomSheetRef={sheetRef} onConfirm={handleConfirm} />
    </View>
  );
};

const SellPropertyScreen = (props: Props) => (
  <SellPropertyProvider>
    <SellPropertyFlow {...props} />
  </SellPropertyProvider>
);

export default SellPropertyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(18),
    paddingBottom: responsive(28),
  },
  bottomBar: {
    flexDirection: 'row',
    gap: responsive(12),
    paddingHorizontal: responsive(20),
    paddingTop: responsive(12),
    paddingBottom: responsive(24),
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    backgroundColor: theme.colors.background,
  },
  btnWrap: {
    flex: 1,
  },
  actionBtn: {
    borderRadius: responsive(30),
    paddingVertical: responsive(16),
  },
});
