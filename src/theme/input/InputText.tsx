import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import {
  faEye,
  faEyeSlash,
  faMagnifyingGlass,
  faXmark,
} from '@fortawesome/pro-regular-svg-icons';

import Typography from '@theme/typography/typography';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Icon from '@theme/Icon/icon';
import { transparent } from '@utils/helper';

interface InputProps extends TextInputProps {
  label?: string;
  style?: StyleProp<ViewStyle>;
  secure?: boolean;
  inputWrapperStyles?: StyleProp<ViewStyle>;
  lableStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  errorText?: string;
  withIcon?: boolean;
  clearInput?: boolean;
  characterCount?: boolean;
  clearInputPress?: () => void;
}

const InputText = ({
  label,
  style,
  lableStyle,
  secure,
  inputWrapperStyles,
  errorText,
  inputStyle,
  withIcon,
  clearInput,
  clearInputPress,
  characterCount,
  ...props
}: InputProps) => {
  const [secureText, setSecureText] = useState(secure);

  return (
    <View style={style}>
      {Boolean(label) && (
        <>
          <Typography style={lableStyle} weight={theme.fonts.medium} size={14}>
            {label}
          </Typography>
        </>
      )}
      <View
        style={[
          styles.inputWrapper,
          inputWrapperStyles,
          props.multiline && styles.multiLineWrapperStyles,
        ]}
      >
        {withIcon && (
          <View
            style={{
              position: 'absolute',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              left: responsive(12),
            }}
          >
            <Icon
              name={faMagnifyingGlass}
              color={theme.colors.grey_500}
              size={responsive(16)}
              style={styles.leftIcon}
            />
          </View>
        )}
        <TextInput
          style={[
            styles.inputStyle,
            inputStyle,
            withIcon && styles.inputWithIcon,
            props.multiline && [
              styles.multilineInput,
              {
                paddingTop: characterCount ? responsive(20) : responsive(12),
              },
            ],
          ]}
          placeholderTextColor={transparent(theme.colors.text_color_light, 0.5)}
          secureTextEntry={secureText}
          textAlignVertical={props.multiline ? 'top' : 'auto'}
          {...props}
        />
        {secure && (
          <TouchableOpacity
            hitSlop={{
              top: responsive(10),
              bottom: responsive(10),
              left: responsive(10),
              right: responsive(10),
            }}
            style={styles.passwordEye}
            onPress={() => setSecureText(!secureText)}
          >
            <Icon
              name={secureText ? faEyeSlash : faEye}
              color={theme.colors.text_color}
              size={16}
            />
          </TouchableOpacity>
        )}
        {clearInput && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              right: responsive(12),
            }}
            onPress={clearInputPress}
          >
            <Icon
              style={{ top: responsive(3) }}
              name={faXmark}
              color={theme.colors.text_color}
              size={16}
            />
          </TouchableOpacity>
        )}
      </View>
      {Boolean(errorText) && (
        <Typography
          weight={theme.fonts.semiBold}
          size={12}
          color={theme.colors.red}
          style={styles.helperText}
        >
          {errorText}
        </Typography>
      )}
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    height: '100%',
    borderRadius: responsive(16),
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    paddingHorizontal: responsive(12),
    marginTop: responsive(6),
    fontSize: responsive(16),
    color: theme.colors.text_color,
  },
  inputWithIcon: {
    paddingLeft: responsive(40),
  },
  inputWrapper: {
    width: '100%',
    height: responsive(48),
    position: 'relative',
    justifyContent: 'center',
    marginTop: responsive(6),
    alignItems: 'center',
    flexDirection: 'row',
  },
  passwordEye: {
    position: 'absolute',
    right: responsive(15),
  },
  leftIcon: {
    // top: responsive(3),
  },
  helperText: {
    marginTop: responsive(4),
    marginLeft: responsive(8),
  },
  multiLineWrapperStyles: {
    height: responsive(120),
  },
  multilineInput: {
    height: '100%',
    paddingBottom: responsive(12),
  },
});
