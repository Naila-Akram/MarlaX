import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { faMagnifyingGlass } from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Icon from '@theme/Icon/icon';

type SearchbarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
};

const Searchbar = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  style,
}: SearchbarProps) => {
  return (
    <View style={[styles.container, style]}>
      <Icon name={faMagnifyingGlass} size={16} color={theme.colors.grey_500} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.grey_500}
        style={styles.input}
        allowFontScaling={false}
      />
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.grey_50,
    borderRadius: responsive(30),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(12),
    gap: responsive(10),
  },
  input: {
    flex: 1,
    fontSize: responsive(14),
    fontFamily: theme.fonts.regular,
    color: theme.colors.text_color,
    padding: 0,
  },
});
