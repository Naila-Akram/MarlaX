import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  faComments,
  faEnvelope,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/pro-regular-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import type { AppScreenProps } from '@utils/types/navigation';
import ProfileHeader from './profileHeader';

type Props = AppScreenProps<'HelpCenter'>;

type ActionCard = {
  label: string;
  icon: IconProp;
  route: 'LiveChat' | 'Complaint';
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const ACTION_CARDS: ActionCard[] = [
  { label: 'Live Chat', icon: faComments,  route: 'LiveChat' },
  { label: 'Complaint', icon: faEnvelope,  route: 'Complaint' },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    question: 'How do I make a payment?',
    answer: 'Go to the Payments tab, select your installment and tap "Pay Now" to complete your payment securely.',
  },
  {
    id: '2',
    question: 'How do I track my construction progress?',
    answer: 'Visit the My Units section on the Home screen. Each unit card shows live construction milestones and progress updates.',
  },
  {
    id: '3',
    question: 'What if I miss an installment?',
    answer: 'A late fee may apply. Please contact your sales manager or reach out via Live Chat to arrange an alternative payment schedule.',
  },
  {
    id: '4',
    question: 'What are the KYC requirements?',
    answer: 'You will need a valid CNIC, proof of address, and a recent passport-sized photo. Upload them through the KYC Verification screen.',
  },
];

const HelpCenterScreen = ({ navigation }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFaq = (id: string) =>
    setExpandedId(prev => (prev === id ? null : id));

  return (
    <View style={styles.container}>
      <ProfileHeader title="Help Center" onBack={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Action cards ────────────────────────────────── */}
        <View style={styles.actionRow}>
          {ACTION_CARDS.map(card => (
            <TouchableOpacity
              key={card.route}
              style={styles.actionCard}
              activeOpacity={0.75}
              onPress={() => navigation.navigate(card.route)}
            >
              <Icon name={card.icon} size={24} color={theme.colors.text_color} />
              <Typography size={15} weight={theme.fonts.semiBold} marginTop={10}>
                {card.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── FAQ ─────────────────────────────────────────── */}
        <Typography size={22} weight={theme.fonts.bold} style={styles.faqTitle}>
          Frequently Asked Questions
        </Typography>

        {FAQ_ITEMS.map(item => {
          const isOpen = expandedId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              style={styles.faqCard}
              onPress={() => toggleFaq(item.id)}
            >
              <View style={styles.faqRow}>
                <Typography
                  size={15}
                  weight={theme.fonts.medium}
                  style={styles.faqQuestion}
                >
                  {item.question}
                </Typography>
                <Icon
                  name={isOpen ? faChevronUp : faChevronDown}
                  size={14}
                  color={theme.colors.text_color_light}
                />
              </View>
              {isOpen && (
                <Typography
                  size={13}
                  color={theme.colors.text_color_light}
                  style={styles.faqAnswer}
                >
                  {item.answer}
                </Typography>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HelpCenterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  scrollContent: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(24),
    paddingBottom: responsive(60),
  },
  actionRow: {
    flexDirection: 'row',
    gap: responsive(14),
    marginBottom: responsive(28),
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    borderRadius: responsive(16),
    padding: responsive(18),
    justifyContent: 'flex-start',
  },
  faqTitle: {
    marginBottom: responsive(16),
  },
  faqCard: {
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    borderRadius: responsive(14),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(16),
    marginBottom: responsive(12),
    backgroundColor: theme.colors.background,
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    flex: 1,
    marginRight: responsive(12),
  },
  faqAnswer: {
    marginTop: responsive(12),
    lineHeight: responsive(20),
  },
});
