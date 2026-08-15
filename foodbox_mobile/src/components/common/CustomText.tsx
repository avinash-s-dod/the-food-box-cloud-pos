import React from 'react';
import {
  StyleProp,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';

import {theme} from '../../theme/theme';

export type TextVariant =
  | 'title'
  | 'titleRegular'
  | 'titleBold'
  | 'subtitle'
  | 'subtitleRegular'
  | 'subtitleBold'
  | 'heading'
  | 'headingMedium'
  | 'body'
  | 'bodyMedium'
  | 'bodySmall'
  | 'bodyXSmall'
  | 'price'
  | 'priceLarge'
  | 'total'
  | 'quantity'
  | 'displayLarge'
  | 'inputLabel'
  | 'inputValue'
  | 'inputPlaceholder'
  | 'dropdownLabel'
  | 'dropdownSelected'
  | 'helpText'
  | 'errorText'
  | 'button'
  | 'tab'
  | 'tabActive';

interface CustomTextProps extends TextProps {
  variant?: TextVariant;
  style?: StyleProp<TextStyle>;
}

const CustomText = ({
  variant = 'body',
  style,
  children,
  ...rest
}: CustomTextProps) => {
  return (
    <Text
      {...rest}
      style={[theme.typography[variant], style]}>
      {children}
    </Text>
  );
};

export default CustomText;