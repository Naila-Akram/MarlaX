import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import ProfileHeader from './profileHeader';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';

import type { AppScreenProps } from '@utils/types/navigation';

type Props = AppScreenProps<'NotificationSettings'>;

type NotifItem = {
  id: string;
  title: string;
  subtitle: string;
};

const NOTIF_ITEMS: NotifItem[] = [
  { id: 'payment',      title: 'Payment Reminders',    subtitle: 'Due dates and overdue alerts' },
  { id: 'construction', title: 'Construction Updates', subtitle: 'Milestone and progress news' },
  { id: 'documents',    title: 'Document Alerts',      subtitle: 'When documents are ready' },
  { id: 'promotions',   title: 'Promotions and Offers', subtitle: 'New projects and offers' },
];

const NotificationSettingsScreen = ({ navigation }: Props) => {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    payment:      true,
    construction: true,
    documents:    true,
    promotions:   false,
  });

  const handleToggle = (id: string) =>
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <View style={styles.container}>
      <ProfileHeader title="Notification Settings" onBack={() => navigation.goBack()} />

      {/* ── Content ────────────────────────────────────────── */}
      <View style={styles.content}>
        <Typography size={20} weight={theme.fonts.bold} style={styles.sectionTitle}>
          Notifications
        </Typography>

        <View style={styles.card}>
          {NOTIF_ITEMS.map((item, index) => (
            <View key={item.id}>
              <View style={styles.row}>
                <View style={styles.textCol}>
                  <Typography size={15} weight={theme.fonts.semiBold}>
                    {item.title}
                  </Typography>
                  <Typography size={13} color={theme.colors.text_color_light} marginTop={3}>
                    {item.subtitle}
                  </Typography>
                </View>
                <Switch
                  value={toggles[item.id]}
                  onValueChange={() => handleToggle(item.id)}
                  trackColor={{
                    false: theme.colors.grey_100,
                    true: theme.colors.action_blue,
                  }}
                  thumbColor={theme.colors.light}
                />
              </View>
              {index < NOTIF_ITEMS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default NotificationSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(14),
    paddingHorizontal: responsive(20),
    paddingBottom: responsive(14),
  },
  backBtn: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(19),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDivider: {
    height: 1,
    backgroundColor: theme.colors.divider,
  },
  content: {
    paddingHorizontal: responsive(20),
    paddingTop: responsive(24),
  },
  sectionTitle: {
    marginBottom: responsive(16),
  },
  card: {
    backgroundColor: theme.colors.card_bg,
    borderRadius: responsive(16),
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(16),
  },
  textCol: {
    flex: 1,
    marginRight: responsive(12),
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginHorizontal: responsive(16),
  },
});
