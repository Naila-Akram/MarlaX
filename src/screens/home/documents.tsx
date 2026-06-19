import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import {
  faFileLines,
  faEye,
  faCommentDots,
} from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import Searchbar from '@components/Searchbar/searchbar';
import { transparent } from '@utils/helper';
import type { TabScreenProps } from '@utils/types/navigation';

type Props = TabScreenProps<'Documents'>;

// ─── Types ────────────────────────────────────────────────────────────────────
type DocCategory = 'All' | 'Legal' | 'Contract' | 'Receipt';

type DocumentItem = {
  id: string;
  title: string;
  type: DocCategory;
  property: string;
  date: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const FILTER_TABS: DocCategory[] = ['All', 'Legal', 'Contract', 'Receipt'];

const DUMMY_DOCUMENTS: DocumentItem[] = [
  { id: '1', title: 'Allotment Letter',          type: 'Legal',    property: 'Summit Heights',    date: '15 Mar 2026' },
  { id: '2', title: 'Booking Agreement',          type: 'Contract', property: '9H Apartments',    date: '23 Mar 2026' },
  { id: '3', title: 'Payment Receipt - 6th I...', type: 'Receipt',  property: 'Apex Apartment',   date: '11 Apr 2026' },
  { id: '4', title: 'Payment Receipt - 5th I...', type: 'Legal',    property: 'Smart Residency',  date: '07 Feb 2026' },
  { id: '5', title: 'WHT 236C – FY 24-25',        type: 'Contract', property: 'Bahria Heights...', date: '24 Aug 2025' },
];

// ─── Screen ───────────────────────────────────────────────────────────────────
const DocumentsScreen = ({}: Props) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<DocCategory>('All');

  const filtered = DUMMY_DOCUMENTS.filter(doc => {
    const matchesTab = activeTab === 'All' || doc.type === activeTab;
    const matchesSearch =
      search.trim() === '' ||
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.property.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const renderItem = ({ item }: ListRenderItemInfo<DocumentItem>) => (
    <View style={styles.card}>
      {/* Doc icon */}
      <View style={styles.docIconBox}>
        <Icon name={faFileLines} size={20} color={theme.colors.action_blue} />
      </View>

      {/* Info */}
      <View style={styles.infoCol}>
        <Typography size={15} weight={theme.fonts.semiBold} numberOfLines={1}>
          {item.title}
        </Typography>
        <View style={styles.metaRow}>
          <Typography size={12} color={theme.colors.text_color_light}>
            {item.type}
          </Typography>
          <View style={styles.metaDivider} />
          <Typography size={12} color={theme.colors.text_color_light} style={styles.metaProperty}>
            {item.property}
          </Typography>
        </View>
        <Typography size={12} color={theme.colors.text_color_light} marginTop={2}>
          {item.date}
        </Typography>
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.viewBtn} activeOpacity={0.7} onPress={() => {}}>
          <Icon name={faEye} size={17} color={theme.colors.text_color} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.waBtn} activeOpacity={0.7} onPress={() => {}}>
          <Icon name={faCommentDots} size={17} color={theme.colors.Success} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ListHeader = (
    <View>
      <Searchbar
        value={search}
        onChangeText={setSearch}
        placeholder="Search documents..."
        style={styles.searchbar}
      />

      {/* Filter chips */}
      <FlatList
        data={FILTER_TABS}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipList}
        renderItem={({ item }) => {
          const isActive = item === activeTab;
          return (
            <TouchableOpacity
              onPress={() => setActiveTab(item)}
              activeOpacity={0.75}
              style={[styles.chip, isActive && styles.chipActive]}
            >
              <Typography
                size={14}
                weight={isActive ? theme.fonts.semiBold : theme.fonts.regular}
                color={isActive ? theme.colors.light : theme.colors.text_color}
              >
                {item}
              </Typography>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchbar: {
    marginHorizontal: responsive(20),
    marginBottom: responsive(16),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.background,
  },
  chipList: {
    paddingHorizontal: responsive(20),
    gap: responsive(10),
    paddingBottom: responsive(16),
  },
  chip: {
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(10),
    borderRadius: responsive(30),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.light,
  },
  chipActive: {
    backgroundColor: theme.colors.black,
    borderColor: theme.colors.black,
  },
  listContent: {
    paddingBottom: responsive(120),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card_bg,
    marginHorizontal: responsive(20),
    marginBottom: responsive(12),
    borderRadius: responsive(16),
    padding: responsive(16),
    borderWidth: 1,
    borderColor: theme.colors.card_border,
    gap: responsive(12),
  },
  docIconBox: {
    width: responsive(46),
    height: responsive(46),
    borderRadius: responsive(12),
    backgroundColor: transparent(theme.colors.action_blue, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive(3),
    gap: responsive(6),
  },
  metaDivider: {
    width: 1,
    height: responsive(11),
    backgroundColor: theme.colors.grey_100,
  },
  metaProperty: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: responsive(8),
  },
  viewBtn: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(19),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.light,
  },
  waBtn: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(19),
    backgroundColor: transparent(theme.colors.Success, 0.12),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
