import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faIdCard,
  faCheckCircle,
  faCamera,
  faImages,
} from '@fortawesome/pro-light-svg-icons';
import { theme } from '@theme/index';
import Typography from '@theme/typography/typography';
import { responsive } from '@theme/responsive';

interface UploadCardProps {
  title: string;
  description: string;
  imageUri: string | null;
  onTakePhoto: () => void;
  onPickFromGallery: () => void;
}

const getFileName = (uri: string): string => {
  const name = uri.split('/').pop() ?? uri;
  return name.length > 32 ? name.substring(0, 29) + '...' : name;
};

const ImageTakenCard: React.FC<UploadCardProps> = ({
  title,
  description,
  imageUri,
  onTakePhoto,
  onPickFromGallery,
}) => {
  const uploaded = Boolean(imageUri);

  return (
    <View style={styles.card}>
      {/* Header: icon + text */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, uploaded && styles.iconSuccess]}>
          <FontAwesomeIcon
            icon={uploaded ? faCheckCircle : faIdCard}
            size={responsive(22)}
            color={
              uploaded
                ? theme.colors.success_green
                : theme.colors.grey_500
            }
          />
        </View>

        <View style={styles.textContainer}>
          <Typography
            size={15}
            weight={theme.fonts.semiBold}
            color={theme.colors.text_color}
          >
            {title}
          </Typography>
          <Typography
            size={12}
            color={theme.colors.text_color_light}
          >
            {description}
          </Typography>
          {imageUri ? (
            <Typography
              size={11}
              weight={theme.fonts.medium}
              color={theme.colors.success_green}
            >
              {getFileName(imageUri)}
            </Typography>
          ) : null}
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
          <FontAwesomeIcon
            icon={faCamera}
            size={responsive(14)}
            color={theme.colors.action_blue}
          />
          <Typography
            size={13}
            weight={theme.fonts.semiBold}
            color={theme.colors.action_blue_dark}
          >
            {'  Take Photo'}
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onPickFromGallery}>
          <FontAwesomeIcon
            icon={faImages}
            size={responsive(14)}
            color={theme.colors.action_blue}
          />
          <Typography
            size={13}
            weight={theme.fonts.semiBold}
            color={theme.colors.action_blue_dark}
          >
            {'  From Gallery'}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageTakenCard;

const styles = StyleSheet.create({
  card: {
    height: responsive(165),
    backgroundColor: theme.colors.card_bg,
    borderRadius: responsive(14),
    paddingHorizontal: responsive(14),
    paddingVertical: responsive(14),
    marginBottom: responsive(12),
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    justifyContent: 'space-between',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: responsive(44),
    height: responsive(44),
    borderRadius: responsive(10),
    backgroundColor: theme.colors.icon_bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive(12),
  },
  iconSuccess: {
    backgroundColor: theme.colors.success_green_bg,
  },
  textContainer: {
    flex: 1,
    gap: responsive(3),
  },
  buttonRow: {
    flexDirection: 'row',
    gap: responsive(10),
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsive(10),
    borderRadius: responsive(8),
    borderWidth: 1.5,
    borderColor: theme.colors.action_blue_border,
    backgroundColor: theme.colors.action_blue_bg,
  },
});
