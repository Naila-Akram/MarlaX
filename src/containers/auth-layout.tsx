import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {ReactNode} from "react";
import {responsive} from "@theme/responsive";
import Icon from "@theme/Icon/icon";
import {faAngleLeft, faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {theme} from "@theme/index";
import Logo from "@assets/images/logo.svg";
import Typography from "@theme/typography/typography";

interface AuthLayoutProps {
  noHeader?: boolean;
  children: ReactNode;
  onPressClose?: () => void;
  title: string;
  backBtn?: boolean;
}

const AuthLayout = ({
  children,
  onPressClose,
  title,
  backBtn,
}: AuthLayoutProps) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentScrollStyles}
      >
      <View>
        {backBtn && (
          <TouchableOpacity
            hitSlop={{
              top: 10,
              bottom: 10,
              right: 10,
              left: 10,
            }}
            style={styles.backBtn}
            onPress={onPressClose}>
            <Icon
              name={faArrowLeft}
              size={16}
              color={theme.colors.text_color}
            />
          </TouchableOpacity>
        )}
        <View style={styles.headerLogoTitle}>
          <Logo width={150} style={{marginBottom: responsive(20)}} />
          <Typography size={24} weight={theme.fonts.regular} align="center">
            {title}
          </Typography>
        </View>
      </View>
      {children}
    </ScrollView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    paddingTop: responsive(15),
    paddingHorizontal: responsive(20),
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLogoTitle: {
    alignItems: "center",
    marginTop: responsive(10),
  },
  contentScrollStyles: {flexGrow: 1, paddingBottom: responsive(30)},
});
