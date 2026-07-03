import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { faImage } from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import Icon from '@theme/Icon/icon';

/**
 * How many times to silently re-request a url before giving up and showing the
 * placeholder. Each retry remounts the image with a cache-busted url so a bad /
 * empty cached response can't keep it blank forever.
 */
const MAX_RETRIES = 3;

/**
 * If a load neither succeeds (`onLoad`) nor fails (`onError`) within this window
 * it has silently stalled — the most common reason a remote image renders
 * "sometimes". We treat the stall as a failure and re-request. Kept generous so
 * a slow-but-valid load on a poor connection isn't cut off prematurely.
 */
const LOAD_TIMEOUT_MS = 8000;

const buildUri = (base: string, attempt: number): string => {
  if (attempt === 0) {
    return base;
  }
  const separator = base.includes('?') ? '&' : '?';
  return `${base}${separator}rn_retry=${attempt}`;
};

export interface RemoteImageProps {
  /** Remote image url. When empty/nullish the placeholder is shown. */
  uri?: string | null;
  /** Container style — put the size and (for children) border radius here. */
  style?: StyleProp<ViewStyle>;
  /** Style applied to the underlying image (e.g. borderRadius). */
  imageStyle?: StyleProp<ImageStyle>;
  resizeMode?: ImageProps['resizeMode'];
  /** Layer content on top of the image (replaces ImageBackground). */
  children?: React.ReactNode;
  /** Show a spinner while the first load is in flight (default true). */
  showLoader?: boolean;
}

/**
 * Reliable replacement for `<Image>` / `<ImageBackground>` with a remote uri.
 *
 * The core RN Image gives no feedback on a failed/slow fetch and never retries,
 * so a transient network or CDN hiccup leaves the view permanently blank — which
 * is why remote images render "sometimes". This wrapper adds a loading spinner,
 * automatic retries with cache-busting, and a graceful placeholder on failure.
 *
 * Pass `children` to layer overlays on top (the old ImageBackground use case).
 */
const RemoteImage: React.FC<RemoteImageProps> = ({
  uri,
  style,
  imageStyle,
  resizeMode = 'cover',
  children,
  showLoader = true,
}) => {
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading',
  );

  // Reset when the source changes (e.g. a recycled FlatList row).
  useEffect(() => {
    setAttempt(0);
    setStatus('loading');
  }, [uri]);

  const handleError = useCallback(() => {
    setAttempt(prev => {
      if (prev < MAX_RETRIES) {
        setStatus('loading');
        return prev + 1;
      }
      setStatus('error');
      return prev;
    });
  }, []);

  // Watchdog: a load that never calls onLoad *or* onError has silently stalled.
  // Re-arm on every (attempt, status) change so each fresh request is watched;
  // onLoad/onError flip `status` away from 'loading' and cancel the timer.
  const errorRef = useRef(handleError);
  errorRef.current = handleError;
  useEffect(() => {
    if (status !== 'loading' || !uri) {
      return;
    }
    const timer = setTimeout(() => errorRef.current(), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [status, attempt, uri]);

  const failed = !uri || status === 'error';

  return (
    <View style={[styles.container, style]}>
      {/* Neutral skeleton behind the image until it paints, so there is always a
          visible loading surface — even where the spinner is disabled. The image
          (absolute-fill, on top) covers it as soon as it decodes. */}
      {!failed && status !== 'loaded' && (
        <View
          style={[StyleSheet.absoluteFill, styles.loadingBg, imageStyle]}
          pointerEvents="none"
        />
      )}

      {failed ? (
        <View style={[StyleSheet.absoluteFill, styles.placeholder, imageStyle]}>
          <Icon name={faImage} size={26} color={theme.colors.grey_500} />
        </View>
      ) : (
        <Image
          key={attempt}
          source={{ uri: buildUri(uri, attempt) }}
          style={[StyleSheet.absoluteFill, imageStyle]}
          resizeMode={resizeMode}
          onLoadStart={() => setStatus('loading')}
          onLoad={() => setStatus('loaded')}
          onError={handleError}
        />
      )}

      {showLoader && status === 'loading' && !failed && (
        <View
          style={[StyleSheet.absoluteFill, styles.center]}
          pointerEvents="none"
        >
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      )}

      {children}
    </View>
  );
};

export default RemoteImage;

const styles = StyleSheet.create({
  // Clip the absolutely-filled image to the container's shape so a rounded
  // `style` (avatars, cards) rounds the image without extra per-call-site work.
  container: {
    overflow: 'hidden',
  },
  loadingBg: {
    backgroundColor: theme.colors.grey_100,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.grey_100,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
