import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  pick,
  types,
  isErrorWithCode,
  errorCodes,
} from '@react-native-documents/picker';
import {
  faImage,
  faVideo,
  faFileArrowUp,
  faFileLines,
  faPlay,
  faXmark,
} from '@fortawesome/pro-regular-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import RemoteImage from '@components/RemoteImage/remote-image';
import { useSellProperty } from '../sell-property-context';
import type { MediaAsset, DocAsset } from '../sell-property-context';

const MAX_IMAGES = 5;
const MAX_VIDEOS = 2;
const MAX_DOCS = 10;

// Pull the 11-char video id out of the common YouTube url shapes.
const youTubeId = (url: string): string | null => {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
  );
  return m ? m[1] : null;
};

// Remote (http) previews use RemoteImage; picked local files use plain Image.
const Thumb = ({ uri }: { uri: string }) =>
  uri.startsWith('http') ? (
    <RemoteImage
      uri={uri}
      style={styles.thumb}
      imageStyle={styles.thumbImg}
      showLoader={false}
    />
  ) : (
    <Image source={{ uri }} style={[styles.thumb, styles.thumbImg]} />
  );

const StepMedia = () => {
  const { form, updateField } = useSellProperty();
  const [videoLink, setVideoLink] = useState('');

  const images = form.images ?? [];
  const videos = form.videos ?? [];
  const documents = form.documents ?? [];

  const pickImages = () => {
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return;
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: remaining, quality: 0.8 },
      res => {
        if (res.didCancel || res.errorCode) return;
        const picked: MediaAsset[] = (res.assets ?? [])
          .map(a => a.uri)
          .filter((u): u is string => !!u)
          .map((uri, i) => ({ id: `img-${Date.now()}-${i}`, uri }));
        if (picked.length) {
          updateField('images', prev => [...prev, ...picked].slice(0, MAX_IMAGES));
        }
      },
    );
  };

  const addVideo = () => {
    const link = videoLink.trim();
    if (!link) return;
    if (videos.length >= MAX_VIDEOS) {
      Alert.alert('Limit reached', `You can add up to ${MAX_VIDEOS} videos.`);
      return;
    }
    const id = youTubeId(link);
    if (!id) {
      Alert.alert('Invalid link', 'Please paste a valid YouTube video link.');
      return;
    }
    if (videos.some(v => v.id === `vid-${id}`)) {
      setVideoLink('');
      return;
    }
    updateField('videos', prev => [
      ...prev,
      { id: `vid-${id}`, uri: link, thumb: `https://img.youtube.com/vi/${id}/hqdefault.jpg` },
    ]);
    setVideoLink('');
  };

  const pickDocuments = async () => {
    if (documents.length >= MAX_DOCS) return;
    try {
      const results = await pick({
        allowMultiSelection: true,
        type: [
          types.pdf, types.doc, types.docx,
          types.xls, types.xlsx, types.csv, types.plainText,
        ],
      });
      const docs: DocAsset[] = results
        .filter(r => !!r.uri)
        .map((r, i) => ({
          id: `doc-${Date.now()}-${i}`,
          name: r.name ?? 'Document',
          uri: r.uri,
        }));
      if (docs.length) {
        updateField('documents', prev => [...prev, ...docs].slice(0, MAX_DOCS));
      }
    } catch (err) {
      if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) return;
      Alert.alert('Error', 'Could not pick the document.');
    }
  };

  const removeImage = (id: string) =>
    updateField('images', prev => prev.filter(x => x.id !== id));
  const removeVideo = (id: string) =>
    updateField('videos', prev => prev.filter(x => x.id !== id));
  const removeDocument = (id: string) =>
    updateField('documents', prev => prev.filter(x => x.id !== id));

  const Section = ({
    icon,
    title,
    count,
    max,
    onSelect,
  }: {
    icon: IconProp;
    title: string;
    count: number;
    max: number;
    onSelect?: () => void;
  }) => (
    <View style={styles.sectionHead}>
      <Icon name={icon} size={22} color={theme.colors.text_color} />
      <View style={styles.sectionInfo}>
        <Typography size={17} weight={theme.fonts.semiBold}>
          {title}
        </Typography>
        <Typography size={13} color={theme.colors.text_color_light} marginTop={2}>
          {count}/{max} added
        </Typography>
      </View>
      {!!onSelect && (
        <TouchableOpacity activeOpacity={0.85} onPress={onSelect} style={styles.selectBtn}>
          <Typography size={15} weight={theme.fonts.semiBold}>
            Select File
          </Typography>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.wrap}>
      <Typography size={20} weight={theme.fonts.bold}>
        Media Gallery
      </Typography>

      {/* Images */}
      <Section
        icon={faImage}
        title="Upload Images"
        count={images.length}
        max={MAX_IMAGES}
        onSelect={pickImages}
      />
      {images.length > 0 && (
        <View style={styles.tiles}>
          {images.map(img => (
            <View key={img.id} style={styles.tile}>
              <Thumb uri={img.uri} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => removeImage(img.id)}
                style={styles.tileRemove}
              >
                <Icon name={faXmark} size={11} color={theme.colors.white_900} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <View style={styles.divider} />

      {/* Videos — YouTube links */}
      <Section
        icon={faVideo}
        title="Add Videos"
        count={videos.length}
        max={MAX_VIDEOS}
      />
      <Typography size={15} color={theme.colors.text_color_light} style={styles.videoHint}>
        Upload videos to YouTube and share the link below.
      </Typography>
      <View style={styles.videoInputRow}>
        <TextInput
          value={videoLink}
          onChangeText={setVideoLink}
          onSubmitEditing={addVideo}
          placeholder="Paste link to add video"
          placeholderTextColor={theme.colors.grey_500}
          autoCapitalize="none"
          returnKeyType="done"
          style={styles.videoInput}
          allowFontScaling={false}
        />
        <TouchableOpacity activeOpacity={0.85} onPress={addVideo} style={styles.addVideoBtn}>
          <Typography size={15} weight={theme.fonts.semiBold}>
            Add Video
          </Typography>
        </TouchableOpacity>
      </View>
      {videos.length > 0 && (
        <View style={styles.tiles}>
          {videos.map(vid => (
            <View key={vid.id} style={styles.tile}>
              {vid.thumb ? <Thumb uri={vid.thumb} /> : <View style={styles.videoBlank} />}
              <View style={styles.playOverlay}>
                <Icon name={faPlay} size={14} color={theme.colors.white_900} />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => removeVideo(vid.id)}
                style={styles.tileRemove}
              >
                <Icon name={faXmark} size={11} color={theme.colors.white_900} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <View style={styles.divider} />

      {/* Documents — picked from the phone */}
      <Section
        icon={faFileArrowUp}
        title="Upload Files"
        count={documents.length}
        max={MAX_DOCS}
        onSelect={pickDocuments}
      />
      {documents.length > 0 && (
        <View style={styles.docs}>
          {documents.map(doc => (
            <View key={doc.id} style={styles.docRow}>
              <View style={styles.docIcon}>
                <Icon name={faFileLines} size={15} color={theme.colors.text_color_light} />
              </View>
              <Typography size={15} numberOfLines={1} style={styles.docName}>
                {doc.name}
              </Typography>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => removeDocument(doc.id)}
                style={styles.docRemove}
              >
                <Icon name={faXmark} size={13} color={theme.colors.text_color_light} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default StepMedia;

const TILE = responsive(104);

const styles = StyleSheet.create({
  wrap: {
    gap: responsive(4),
  },
  // ── Section header ──────────────────────────────────────────────────────────
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(12),
    marginTop: responsive(18),
  },
  sectionInfo: {
    flex: 1,
  },
  selectBtn: {
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(12),
    borderRadius: responsive(30),
    backgroundColor: theme.colors.grey_50,
  },
  // ── Videos ──────────────────────────────────────────────────────────────────
  videoHint: {
    marginTop: responsive(10),
    lineHeight: responsive(21),
  },
  videoInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
    marginTop: responsive(10),
  },
  videoInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    borderRadius: responsive(14),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(15),
    fontSize: responsive(15),
    fontFamily: theme.fonts.regular,
    color: theme.colors.text_color,
    backgroundColor: theme.colors.white_900,
  },
  addVideoBtn: {
    paddingHorizontal: responsive(18),
    paddingVertical: responsive(15),
    borderRadius: responsive(14),
    backgroundColor: theme.colors.grey_50,
  },
  // ── Thumbnails ──────────────────────────────────────────────────────────────
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive(10),
    marginTop: responsive(14),
  },
  tile: {
    width: TILE,
    height: TILE - responsive(12),
  },
  thumb: {
    width: '100%',
    height: '100%',
    borderRadius: responsive(14),
  },
  thumbImg: {
    borderRadius: responsive(14),
  },
  videoBlank: {
    width: '100%',
    height: '100%',
    borderRadius: responsive(14),
    backgroundColor: theme.colors.grey_100,
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileRemove: {
    position: 'absolute',
    top: responsive(6),
    right: responsive(6),
    width: responsive(22),
    height: responsive(22),
    borderRadius: responsive(11),
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ── Divider ─────────────────────────────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginTop: responsive(18),
  },
  // ── Documents ───────────────────────────────────────────────────────────────
  docs: {
    gap: responsive(10),
    marginTop: responsive(14),
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(12),
    paddingHorizontal: responsive(12),
    paddingVertical: responsive(10),
    borderRadius: responsive(30),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.white_900,
  },
  docIcon: {
    width: responsive(36),
    height: responsive(36),
    borderRadius: responsive(18),
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docName: {
    flex: 1,
  },
  docRemove: {
    width: responsive(28),
    height: responsive(28),
    borderRadius: responsive(14),
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
