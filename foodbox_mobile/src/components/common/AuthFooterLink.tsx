import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, theme } from '../../theme/theme';
import CustomText from './CustomText';

interface AuthFooterLinkProps {
  text: string;
  linkText: string;
  onLinkPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
}

const AuthFooterLink = ({
  text,
  linkText,
  onLinkPress,
  style,
  textStyle,
  linkStyle,
}: AuthFooterLinkProps) => {
  return (
    <View style={[styles.container, style]}>
      <CustomText variant="button" style={[styles.text, textStyle]}>
        {text}{' '}
      </CustomText>
      <TouchableOpacity activeOpacity={0.7} onPress={onLinkPress}>
        <CustomText variant="button" style={[styles.link, linkStyle]}>
          {linkText}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.textInverse,
    fontFamily: theme.fonts.poppinsRegular,
  },
  link: {
    color: COLORS.textInverse,
    fontFamily: theme.fonts.poppinsBold,
    textDecorationLine: 'underline',
  },
});

export default AuthFooterLink;
