import React, { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/pro-regular-svg-icons';
import {
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';

interface DropdownProps {
  placeholder?: string;
  value: string | null;
  options: string[];
  onSelect: (value: string) => void;
  style?: object;
}

const Dropdown = ({
  placeholder = 'Select an option',
  value,
  options,
  onSelect,
  style,
}: DropdownProps) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [search, setSearch] = useState('');

  const filtered = options.filter(o =>
    o.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (item: string) => {
    onSelect(item);
    sheetRef.current?.dismiss();
    setSearch('');
  };

  const renderOption = ({ item }: ListRenderItemInfo<string>) => {
    const isSelected = item === value;
    return (
      <TouchableOpacity
        style={[styles.option, isSelected && styles.optionSelected]}
        activeOpacity={0.7}
        onPress={() => handleSelect(item)}
      >
        <Typography
          size={15}
          weight={isSelected ? theme.fonts.semiBold : theme.fonts.regular}
          color={isSelected ? theme.colors.text_color : theme.colors.text_color}
        >
          {item}
        </Typography>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.trigger, style]}
        activeOpacity={0.75}
        onPress={() => sheetRef.current?.present()}
      >
        <Typography
          size={15}
          color={value ? theme.colors.text_color : theme.colors.text_color_light}
          style={styles.triggerText}
        >
          {value ?? placeholder}
        </Typography>
        <Icon name={faChevronDown} size={14} color={theme.colors.text_color_light} />
      </TouchableOpacity>

      <BottomSheetModal
        ref={sheetRef}
        enableDynamicSizing
        enablePanDownToClose
        backgroundStyle={styles.sheetBg}
        handleIndicatorStyle={styles.sheetHandle}
      >
        <BottomSheetView style={styles.sheetContent}>
          {/* Search */}
          <View style={styles.searchWrapper}>
            <Icon name={faMagnifyingGlass} size={16} color={theme.colors.grey_500} />
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Search Category"
              placeholderTextColor={theme.colors.grey_500}
            />
          </View>

          {/* Options */}
          <FlatList
            data={filtered}
            keyExtractor={item => item}
            renderItem={renderOption}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            keyboardShouldPersistTaps="handled"
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    borderRadius: responsive(12),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(14),
    backgroundColor: theme.colors.background,
  },
  triggerText: {
    flex: 1,
  },
  sheetBg: {
    backgroundColor: theme.colors.light,
    borderRadius: responsive(28),
  },
  sheetHandle: {
    backgroundColor: theme.colors.grey_100,
    width: responsive(40),
  },
  sheetContent: {
    paddingHorizontal: responsive(20),
    paddingBottom: responsive(36),
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    borderRadius: responsive(12),
    paddingHorizontal: responsive(14),
    paddingVertical: responsive(12),
    marginBottom: responsive(8),
    backgroundColor: theme.colors.background,
  },
  searchInput: {
    flex: 1,
    fontSize: responsive(14),
    color: theme.colors.text_color,
    fontFamily: theme.fonts.regular,
    padding: 0,
  },
  list: {
    maxHeight: responsive(300),
  },
  option: {
    paddingVertical: responsive(14),
    paddingHorizontal: responsive(8),
    borderRadius: responsive(8),
  },
  optionSelected: {
    backgroundColor: theme.colors.grey_50,
  },
});
