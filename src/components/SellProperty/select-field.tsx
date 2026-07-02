import React, { useState } from 'react';
import {
  View,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { faChevronDown, faCheck } from '@fortawesome/pro-regular-svg-icons';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';

interface SelectFieldProps {
  value?: string;
  placeholder?: string;
  options: string[];
  onChange: (value: string) => void;
  /** Title shown at the top of the options sheet. */
  title?: string;
  /** Style for the trigger (width / flex). */
  style?: StyleProp<ViewStyle>;
}

/**
 * Bordered select that matches the form inputs. Tapping it opens a bottom sheet
 * of options; picking one closes the sheet. Reused for every dropdown in the
 * Sell Property flow (area unit, floor, currency, …).
 */
const SelectField = ({
  value,
  placeholder = 'Select',
  options,
  onChange,
  title,
  style,
}: SelectFieldProps) => {
  const [open, setOpen] = useState(false);

  const pick = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen(true)}
        style={[styles.trigger, style]}
      >
        <Typography
          size={15}
          numberOfLines={1}
          color={value ? theme.colors.text_color : theme.colors.grey_500}
          style={styles.triggerText}
        >
          {value || placeholder}
        </Typography>
        <Icon
          name={faChevronDown}
          size={14}
          color={theme.colors.text_color_light}
        />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet}>
            {!!title && (
              <Typography
                size={16}
                weight={theme.fonts.bold}
                style={styles.sheetTitle}
              >
                {title}
              </Typography>
            )}
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {options.map(option => {
                const selected = option === value;
                return (
                  <TouchableOpacity
                    key={option}
                    activeOpacity={0.7}
                    onPress={() => pick(option)}
                    style={styles.option}
                  >
                    <Typography
                      size={15}
                      weight={
                        selected ? theme.fonts.semiBold : theme.fonts.regular
                      }
                      color={
                        selected ? theme.colors.primary : theme.colors.text_color
                      }
                    >
                      {option}
                    </Typography>
                    {selected && (
                      <Icon name={faCheck} size={15} color={theme.colors.primary} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default SelectField;

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: responsive(8),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    borderRadius: responsive(14),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(15),
    backgroundColor: theme.colors.white_900,
  },
  triggerText: {
    flexShrink: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '60%',
    backgroundColor: theme.colors.white_900,
    borderTopLeftRadius: responsive(24),
    borderTopRightRadius: responsive(24),
    paddingHorizontal: responsive(20),
    paddingTop: responsive(20),
    paddingBottom: responsive(28),
  },
  sheetTitle: {
    marginBottom: responsive(8),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsive(15),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
});
