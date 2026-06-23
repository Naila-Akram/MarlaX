import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
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
];

const CARD_WIDTH = SCREEN_WIDTH - responsive(20);
const CARD_HEIGHT = responsive(210);
const STACK_INSET = responsive(10);
const STACK_PEEK = responsive(10);

// Width and left offset for each stack position (0=front, 1=middle, 2+=back)
const getStackStyle = (index: number) => {
  const i = Math.min(index, 2);
  return {
    width: CARD_WIDTH - STACK_INSET * 2 * i,
    left: STACK_INSET * i,
    top: STACK_PEEK * i,
    zIndex: 3 - i,
    paddingBottom: i === 1 ? responsive(10) : i === 2 ? responsive(20) : 0,
  };
};

const PendingList = () => {
  const [items] = useState(DUMMY_DATA);

  const renderCard = (item: PendingItem, index: number) => {
    const stackStyle = getStackStyle(index);
    const isFront = index === 0;

    if (!isFront) {
      return (
        <View key={item.id} style={[styles.stackCard, stackStyle]}>
          <ImageBackground
            source={item.image}
            style={styles.cardBg}
            imageStyle={styles.cardImage}
          />
        </View>
      );
    }

    return (
      <View key={item.id} style={[styles.stackCard, stackStyle]}>
        <ImageBackground
          source={item.image}
          style={styles.cardBg}
          imageStyle={styles.cardImage}
        >
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
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.stackContainer}>
        {/* Render back-to-front so the front card sits on top */}
        {[...items].reverse().map((item, reversedIndex) => {
          const index = items.length - 1 - reversedIndex;
          return renderCard(item, index);
        })}
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
    height: CARD_HEIGHT + STACK_PEEK * 2,
  },
  stackCard: {
    position: 'absolute',
    borderTopLeftRadius: responsive(20),
    borderTopRightRadius: responsive(20),
    overflow: 'hidden',
  },
  card: {
    width: CARD_WIDTH,
    borderTopLeftRadius: responsive(30),
    borderTopRightRadius: responsive(30),
    overflow: 'hidden',
  },
  cardBg: {
    height: responsive(230),
    justifyContent: 'flex-end',
  },
  cardImage: {
    borderRadius: responsive(20),
  },
  overlay: {
    flex: 1,
    backgroundColor: transparent('#000000', 0.45),
    padding: responsive(16),
    justifyContent: 'space-between',
  },
  badge: {
    paddingVertical: responsive(5),
    borderRadius: responsive(20),
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
    marginBottom: responsive(8),
  },
  sliderLine: {
    width: responsive(56),
    height: responsive(6),
    borderRadius: responsive(20),
    backgroundColor: transparent(theme.colors.light, 0.6),
  },
});
