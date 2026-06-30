import React, { useCallback, useEffect, useState } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import { faBookmark } from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive, SCREEN_WIDTH } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import BlockButton from '@theme/buttons/block-button';
import FloatingButton from '@theme/buttons/floating-button';
import { transparent } from '@utils/helper';

type PendingItem = {
  id: string;
  installment: string;
  daysLeft: number;
  amount: string;
  currency: string;
  property: string;
  image: { uri: string };
};

const DUMMY_DATA: PendingItem[] = [
  {
    id: '1',
    installment: 'Installment #2',
    daysLeft: 8,
    amount: '60,000',
    currency: 'PKR',
    property: 'Smart Residency',
    image: {
      uri: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600',
    },
  },
  {
    id: '2',
    installment: 'Installment #3',
    daysLeft: 15,
    amount: '75,000',
    currency: 'PKR',
    property: 'Blue Hills',
    image: {
      uri: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=600',
    },
  },
  {
    id: '3',
    installment: 'Installment #1',
    daysLeft: 3,
    amount: '45,000',
    currency: 'PKR',
    property: 'Green Valley',
    image: {
      uri: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=600',
    },
  },
  {
    id: '4',
    installment: 'Installment #1',
    daysLeft: 3,
    amount: '45,000',
    currency: 'PKR',
    property: 'Green Valley',
    image: {
      uri: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=600',
    },
  },
];

const CARD_WIDTH = SCREEN_WIDTH - responsive(20);
const CARD_HEIGHT = responsive(230);
const STACK_INSET = responsive(10);
const STACK_PEEK = responsive(15);
// Deepest visible stack slot (0 = front). Cards further back share this slot.
const MAX_SLOT = 2;

const FLY_DURATION = 260;
const SETTLE_DURATION = 300;
const SWIPE_THRESHOLD = responsive(60);

type SwipeCardProps = {
  item: PendingItem;
  slotIndex: number;
  total: number;
  onSwipe: (id: string) => void;
};

const SwipeCard = ({ item, slotIndex, total, onSwipe }: SwipeCardProps) => {
  const isFront = slotIndex === 0;
  // Visual stack slot (clamped), horizontal drag (translateX), and the
  // exit flip (0 = flat, 0.5 = edge-on, 1 = flat again at the back).
  const slot = useSharedValue(Math.min(slotIndex, MAX_SLOT));
  const drag = useSharedValue(0);
  const flip = useSharedValue(0);
  const dir = useSharedValue(1);

  useEffect(() => {
    // Every card eases to its new stack slot: the swiped card recedes to the
    // back while the cards behind it move forward.
    slot.value = withTiming(Math.min(slotIndex, MAX_SLOT), {
      duration: SETTLE_DURATION,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotIndex]);

  const handleSwipe = useCallback(() => {
    onSwipe(item.id);
  }, [item.id, onSwipe]);

  const pan = usePanGesture({
    enabled: isFront,
    // Activate only on horizontal drags and bail on vertical ones so the
    // parent (vertical) list keeps scrolling normally.
    activeOffsetX: [-10, 10],
    failOffsetY: [-12, 12],
    onUpdate: event => {
      'worklet';
      drag.value = event.translationX;
    },
    onDeactivate: event => {
      'worklet';
      const shouldFly =
        Math.abs(event.translationX) > SWIPE_THRESHOLD ||
        Math.abs(event.velocityX) > 900;
      if (shouldFly) {
        dir.value = (event.translationX || event.velocityX) > 0 ? 1 : -1;
        // Settle the horizontal drag, then flip the card away. The reorder
        // fires at the half-way point (edge-on, invisible) so swapping the
        // card to the back of the stack is never seen.
        drag.value = withTiming(0, { duration: FLY_DURATION });
        flip.value = 0;
        flip.value = withSequence(
          withTiming(0.5, { duration: FLY_DURATION / 2 }, finished => {
            if (finished) {
              scheduleOnRN(handleSwipe);
            }
          }),
          withTiming(1, { duration: FLY_DURATION / 2 }),
        );
      } else {
        drag.value = withSpring(0, { damping: 18, stiffness: 180 });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const s = slot.value;
    // 0 -> flat, 0.5 -> edge-on (90deg), 1 -> flat again, turning toward the
    // swipe direction so it reads as flipping to the back.
    const rotateY = interpolate(flip.value, [0, 0.5, 1], [0, dir.value * 90, 0]);
    return {
      width: CARD_WIDTH - STACK_INSET * 2 * s,
      left: STACK_INSET * s,
      transform: [
        { perspective: 1000 },
        { translateX: drag.value },
        { translateY: -(STACK_PEEK * s) },
        { rotateY: `${rotateY}deg` },
      ],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[styles.stackCard, { zIndex: total - slotIndex }, animatedStyle]}
      >
        <ImageBackground source={item.image} style={styles.cardBg}>
          {isFront && (
            <View style={styles.overlay}>
              <View style={styles.sliderWrapper}>
                <View style={styles.sliderLine} />
              </View>

              <View style={styles.badge}>
                <Typography
                  size={16}
                  color={theme.colors.light}
                  weight={theme.fonts.medium}
                >
                  {item.installment} · {item.daysLeft} days left
                </Typography>
                <FloatingButton icon={faBookmark} onPress={() => {}} />
              </View>

              <View style={styles.info}>
                <Typography
                  size={30}
                  weight={theme.fonts.bold}
                  color={theme.colors.light}
                >
                  {item.amount} {item.currency}
                </Typography>
                <Typography
                  size={14}
                  color={theme.colors.light}
                  weight={theme.fonts.medium}
                  marginTop={4}
                >
                  {item.property}
                </Typography>
              </View>

              <View style={styles.buttonRow}>
                <BlockButton
                  bgColor={theme.colors.light}
                  style={styles.btn}
                  onPress={() => {}}
                >
                  <Typography
                    size={16}
                    weight={theme.fonts.medium}
                    align="center"
                  >
                    Pay Now
                  </Typography>
                </BlockButton>
                <BlockButton
                  bgColor={theme.colors.black}
                  style={styles.btn}
                  onPress={() => {}}
                >
                  <Typography
                    size={16}
                    weight={theme.fonts.medium}
                    color={theme.colors.light}
                    align="center"
                  >
                    Payment Plan
                  </Typography>
                </BlockButton>
              </View>
            </View>
          )}
        </ImageBackground>
      </Animated.View>
    </GestureDetector>
  );
};

const PendingList = () => {
  const [items] = useState(DUMMY_DATA);
  // Stacking order (front -> back) tracked by id so each card keeps its
  // identity (and shared values) across reorders.
  const [order, setOrder] = useState(() => DUMMY_DATA.map(item => item.id));

  const handleSwipe = useCallback((id: string) => {
    setOrder(prev => [...prev.filter(itemId => itemId !== id), id]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.stackContainer}>
        {/* Render back-to-front (front declared last) so the front card paints
            on top — paint order is reliable across platforms, zIndex isn't. */}
        {[...items]
          .sort((a, b) => order.indexOf(b.id) - order.indexOf(a.id))
          .map(item => (
            <SwipeCard
              key={item.id}
              item={item}
              slotIndex={order.indexOf(item.id)}
              total={items.length}
              onSwipe={handleSwipe}
            />
          ))}
      </View>
    </View>
  );
};

export default PendingList;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: responsive(10),
  },
  stackContainer: {
    height: CARD_HEIGHT + STACK_PEEK * MAX_SLOT,
  },
  stackCard: {
    position: 'absolute',
    bottom: 0,
    height: CARD_HEIGHT,
    borderTopLeftRadius: responsive(20),
    borderTopRightRadius: responsive(20),
    overflow: 'hidden',
  },
  cardBg: {
    width: '100%',
    height: CARD_HEIGHT,
    justifyContent: 'flex-end',
  },

  overlay: {
    flex: 1,
    backgroundColor: transparent('#000000', 0.45),
    padding: responsive(10),
    justifyContent: 'space-between',
  },
  badge: {
    paddingVertical: responsive(5),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginBottom: responsive(4),
  },
  buttonRow: {
    flexDirection: 'row',
    gap: responsive(10),
  },
  btn: {
    flex: 1,
    borderRadius: responsive(24),
  },
  sliderWrapper: {
    alignItems: 'center',
  },
  sliderLine: {
    width: responsive(56),
    height: responsive(6),
    borderRadius: responsive(20),
    backgroundColor: transparent(theme.colors.light, 0.6),
  },
});
