import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useAuthStore } from '@stores/app-store';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { faClock } from '@fortawesome/pro-light-svg-icons';
import BlockButton from '@theme/buttons/block-button';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageTakenCard from '@components/Auth/ImageTakenCard';
import SuccessSheet from '@components/BottomSheets/successSheet';

interface PhotoData {
  front: string | null;
  back: string | null;
  selfie: string | null;
}

const KycVerification: React.FC = () => {
  const { signIn } = useAuthStore();
  const [photos, setPhotos] = useState<PhotoData>({
    front: null,
    back: null,
    selfie: null,
  });

  const successSheetRef = useRef<BottomSheetModal>(null);

  const handleImageResponse = (type: keyof PhotoData, response: any) => {
    if (response.didCancel) return;
    if (response.errorCode) {
      Alert.alert('Error', response.errorMessage || 'Something went wrong');
      return;
    }
    if (response.assets && response.assets.length > 0) {
      const uri = response.assets[0].uri;
      setPhotos(prev => ({ ...prev, [type]: uri || null }));
    }
  };

  const takePhoto = (type: keyof PhotoData) => {
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: 1280,
        maxHeight: 960,
        quality: 0.8,
        saveToPhotos: false,
      },
      response => handleImageResponse(type, response),
    );
  };

  const pickFromGallery = (type: keyof PhotoData) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1280,
        maxHeight: 960,
        quality: 0.8,
        selectionLimit: 1,
      },
      response => handleImageResponse(type, response),
    );
  };

  const isComplete = photos.front && photos.back && photos.selfie;

  const handleSubmit = () => {
    if (!isComplete) return;

    const formData = new FormData();
    const appendImage = (key: string, uri: string) => {
      formData.append(key, {
        uri: Platform.OS === 'android' ? 'file://' + uri : uri,
        type: 'image/jpeg',
        name: `${key}.jpg`,
      } as any);
    };

    if (photos.front) appendImage('cnicFront', photos.front);
    if (photos.back) appendImage('cnicBack', photos.back);
    if (photos.selfie) appendImage('selfie', photos.selfie);

    // TODO: call API here
    console.log('Submitting KYC photos:', photos);

    successSheetRef.current?.present();
  };

  const handleContinue = () => {
    successSheetRef.current?.dismiss();
    signIn(null);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Lock icon */}
        <View style={styles.iconOuter}>
          <View style={styles.iconInner}>
            <Image
              source={require('../../assets/images/Lock.png')}
              style={styles.lockIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Title */}
        <Typography
          size={22}
          weight={theme.fonts.bold}
          align="center"
          marginTop={28}
        >
          KYC Verification
        </Typography>

        {/* Subtitle */}
        <View style={styles.subtitleRow}>
          <Typography
            size={14}
            color={theme.colors.text_color_light}
            align="center"
          >
            Required before making transactions
          </Typography>
        </View>

        <View style={styles.innerContainer}>
          <ImageTakenCard
            title="CNIC Front"
            description="Please upload the front side of your CNIC"
            imageUri={photos.front}
            onTakePhoto={() => takePhoto('front')}
            onPickFromGallery={() => pickFromGallery('front')}
          />

          <ImageTakenCard
            title="CNIC Back"
            description="Please upload the back side of your CNIC"
            imageUri={photos.back}
            onTakePhoto={() => takePhoto('back')}
            onPickFromGallery={() => pickFromGallery('back')}
          />

          <ImageTakenCard
            title="Selfie Upload"
            description="Please upload your selfie for verification."
            imageUri={photos.selfie}
            onTakePhoto={() => takePhoto('selfie')}
            onPickFromGallery={() => pickFromGallery('selfie')}
          />

          <BlockButton
            bgColor={isComplete ? theme.colors.black : theme.colors.grey_100}
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={!isComplete}
          >
            <Typography
              size={16}
              weight={theme.fonts.semiBold}
              color={isComplete ? theme.colors.light : theme.colors.grey_500}
              align="center"
            >
              Submit for Verification
            </Typography>
          </BlockButton>
        </View>
      </ScrollView>

      <SuccessSheet
        bottomSheetRef={successSheetRef}
        icon={faClock}
        iconBgColor={theme.colors.warning}
        title="Under Review"
        description="Your KYC documents are being reviewed. This typically takes 24-48 hours."
        buttonLabel="Continue to App"
        onButtonPress={handleContinue}
      />
    </>
  );
};

export default KycVerification;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: responsive(30),
    paddingBottom: responsive(20),
  },
  iconOuter: {
    width: responsive(90),
    height: responsive(90),
    borderRadius: responsive(45),
    backgroundColor: theme.colors.grey_50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInner: {
    width: responsive(64),
    height: responsive(64),
    borderRadius: responsive(32),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    width: responsive(28),
    height: responsive(28),
    tintColor: theme.colors.light,
  },
  subtitleRow: {
    marginTop: responsive(10),
    paddingHorizontal: responsive(16),
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    width: '90%',
    marginTop: responsive(24),
  },
  submitButton: {
    borderRadius: responsive(30),
    marginTop: responsive(8),
  },
});
