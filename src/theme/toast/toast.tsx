import {StyleSheet} from "react-native";
import React from "react";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";
import {responsive} from "@theme/responsive";
import Icon from "@theme/Icon/icon";
import {faCircleCheck, faCircleInfo} from "@fortawesome/pro-light-svg-icons";
import {transparent} from "@utils/helper";
import {theme} from "@theme/index";

const toastConfig = {
  success: (props: BaseToastProps) => {
    return (
      <BaseToast
        {...props}
        text1NumberOfLines={1}
        text2NumberOfLines={2}
        style={[styles.baseToastContainer, styles.successToast]}
        text1Style={styles.text1Style}
        text2Style={styles.text2Style}
        contentContainerStyle={styles.toastContainer}
        renderLeadingIcon={() => (
          <Icon name={faCircleCheck} color={theme.colors.light} size={26} />
        )}
      />
    );
  },
  error: (props: BaseToastProps) => {
    return (
      <ErrorToast
        {...props}
        text1NumberOfLines={1}
        text2NumberOfLines={2}
        style={[styles.baseToastContainer, styles.errorToast]}
        text1Style={styles.text1Style}
        text2Style={styles.text2Style}
        contentContainerStyle={styles.toastContainer}
        renderLeadingIcon={() => (
          <Icon name={faCircleInfo} color={theme.colors.light} size={26} />
        )}
      />
    );
  },
};

const ToastMessage = () => {
  return <Toast position="bottom" config={toastConfig} bottomOffset={0} />;
};

export default ToastMessage;

const styles = StyleSheet.create({
  baseToastContainer: {
    elevation: 10,
    paddingHorizontal: responsive(10),
    height: responsive(70),
    alignItems: "center",
    borderLeftWidth: 10,
  },
  successToast: {
    backgroundColor: theme.colors.primary,
    borderLeftColor: theme.colors.primary,
  },
  errorToast: {
    backgroundColor: theme.colors.red,
    borderLeftColor: theme.colors.red,
  },
  text1Style: {
    fontSize: responsive(14),
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.light,
    marginBottom: responsive(5),
    // lineHeight: responsive(15),
  },
  text2Style: {
    fontSize: responsive(14),
    fontFamily: theme.fonts.regular,
    color: transparent(theme.colors.light, 0.7),
    lineHeight: responsive(15),
  },
  toastContainer: {
    paddingHorizontal: responsive(5),
    paddingLeft: responsive(17),
  },
});
