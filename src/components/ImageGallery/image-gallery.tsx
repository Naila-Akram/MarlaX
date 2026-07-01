import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { theme } from '@theme/index';
import { responsive, SCREEN_HEIGHT } from '@theme/responsive';
import PropertyDetail from '@components/PropertyDetail/property-detail';
import type { PropertyDetailData } from '@components/PropertyDetail/types';

// Height of the image area when the detail content scrolls beneath it.
const DEFAULT_MEDIA_HEIGHT = Math.round(SCREEN_HEIGHT * 0.6);

export interface ImageGalleryProps {
  /** Ordered list of image uris. The first is shown initially, the rest live in the rail. */
  images: string[];
  style?: StyleProp<ViewStyle>;
  /** Corner radius for the main image (0 for full-bleed screens). */
  borderRadius?: number;
  /** Image to show first (defaults to 0). */
  initialIndex?: number;
  /** Toggle the side thumbnail rail. */
  showThumbnails?: boolean;
  /** Notified whenever the visible image changes. */
  onIndexChange?: (index: number) => void;
  /**
   * When provided, the property details render below the images and the whole
   * screen scrolls vertically. Leave undefined for a plain image viewer.
   */
  detail?: PropertyDetailData;
  /** Called when the detail's contact action is pressed. */
  onContact?: () => void;
  /** Height of the image area when `detail` is present. */
  mediaHeight?: number;
  /** Overlay content (captions, badges…) rendered above the image. */
  children?: React.ReactNode;
}

/**
 * Swipeable image viewer with a floating vertical thumbnail rail.
 *
 * Swiping left/right pages through the images and wraps around seamlessly
 * (last → first and back) by padding the list with clones of the end images.
 * When `detail` is passed, the images sit at a fixed height and the property
 * information scrolls in beneath them. Reusable across screens — pass
 * `children` to layer screen-specific UI on top of the image.
 */
const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  style,
  borderRadius = 0,
  initialIndex = 0,
  showThumbnails = true,
  onIndexChange,
  detail,
  onContact,
  mediaHeight = DEFAULT_MEDIA_HEIGHT,
  children,
}) => {
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(initialIndex);
  const listRef = useRef<FlatList<string>>(null);

  const count = images.length;
  const loop = count > 1;

  // Pad with a clone of the last image at the start and the first at the end so
  // paging off either edge lands on an identical frame we can silently jump from.
  const data = useMemo(
    () => (loop ? [images[count - 1], ...images, images[0]] : images),
    [images, loop, count],
  );

  // Real image `i` sits at list position `i + 1` once the clones are added.
  const toPosition = useCallback((i: number) => (loop ? i + 1 : i), [loop]);

  const changeActive = useCallback(
    (i: number) => {
      setActive(i);
      onIndexChange?.(i);
    },
    [onIndexChange],
  );

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const w = e.nativeEvent.layout.width;
      if (w > 0 && w !== width) {
        setWidth(w);
      }
    },
    [width],
  );

  const onMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!width) {
        return;
      }
      const page = Math.round(e.nativeEvent.contentOffset.x / width);
      if (!loop) {
        changeActive(page);
        return;
      }
      if (page === 0) {
        // Landed on the clone of the last image → jump to the real one.
        listRef.current?.scrollToOffset({ offset: count * width, animated: false });
        changeActive(count - 1);
      } else if (page === count + 1) {
        // Landed on the clone of the first image → jump to the real one.
        listRef.current?.scrollToOffset({ offset: width, animated: false });
        changeActive(0);
      } else {
        changeActive(page - 1);
      }
    },
    [width, loop, count, changeActive],
  );

  const goTo = useCallback(
    (i: number) => {
      if (!width) {
        return;
      }
      listRef.current?.scrollToOffset({
        offset: toPosition(i) * width,
        animated: true,
      });
      changeActive(i);
    },
    [width, toPosition, changeActive],
  );

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <Image
        source={{ uri: item }}
        style={[styles.image, { width, borderRadius }]}
        resizeMode="cover"
      />
    ),
    [width, borderRadius],
  );

  const media = (
    <View
      style={[styles.media, detail ? { height: mediaHeight } : [styles.fill, style]]}
      onLayout={handleLayout}
    >
      {width > 0 && (
        <FlatList
          ref={listRef}
          data={data}
          keyExtractor={(_, i) => String(i)}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          initialScrollIndex={toPosition(initialIndex)}
          onMomentumScrollEnd={onMomentumEnd}
        />
      )}

      {/* Screen-specific overlay (captions, badges…) */}
      {children}

      {/* Floating thumbnail rail */}
      {showThumbnails && loop && width > 0 && (
        <View style={styles.railWrap} pointerEvents="box-none">
          {images.map((uri, i) => {
            const isActive = i === active;
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.85}
                onPress={() => goTo(i)}
                style={[styles.thumb, isActive && styles.thumbActive]}
              >
                <Image
                  source={{ uri }}
                  style={styles.thumbImg}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );

  // Plain image viewer — fills its parent.
  if (!detail) {
    return media;
  }

  // Images + scrollable property details.
  return (
    <ScrollView
      style={[styles.scroll, style]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {media}
      <View style={styles.detailWrap}>
        <View style={styles.grabber} />
        <PropertyDetail data={detail} onContact={onContact} />
      </View>
    </ScrollView>
  );
};

export default ImageGallery;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  media: {
    overflow: 'hidden',
    backgroundColor: theme.colors.black,
  },
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.light,
  },
  scrollContent: {
    flexGrow: 1,
  },
  image: {
    height: '100%',
  },
  railWrap: {
    position: 'absolute',
    right: responsive(12),
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    gap: responsive(10),
  },
  thumb: {
    width: responsive(58),
    height: responsive(52),
    borderRadius: responsive(12),
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
    backgroundColor: theme.colors.grey_1000,
  },
  thumbActive: {
    borderColor: theme.colors.primary,
    transform: [{ scale: 1.06 }],
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    borderRadius: responsive(10),
  },
  detailWrap: {
    flex: 1,
    marginTop: -responsive(20),
    paddingTop: responsive(12),
    paddingBottom: responsive(40),
    borderTopLeftRadius: responsive(24),
    borderTopRightRadius: responsive(24),
    backgroundColor: theme.colors.light,
  },
  grabber: {
    alignSelf: 'center',
    width: responsive(40),
    height: responsive(5),
    borderRadius: responsive(3),
    backgroundColor: theme.colors.grey_100,
    marginBottom: responsive(6),
  },
});
