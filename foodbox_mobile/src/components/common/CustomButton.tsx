import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Rect,
} from 'react-native-svg';
import { COLORS, RADIUS, SPACING, theme } from '../../theme/theme';
import CustomText from './CustomText';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
  leftIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  colors?: readonly [string, string];
}

const CustomButton = ({
  title,
  variant = 'primary',
  leftIcon,
  style,
  textStyle,
  colors = theme.gradients.primary,
  ...rest
}: CustomButtonProps) => {
  const isPrimary = variant === 'primary';

  const content = (
    <View style={styles.contentContainer}>
      {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
      <CustomText
        variant="button"
        style={[!isPrimary && styles.secondaryText, textStyle]}
      >
        {title}
      </CustomText>
    </View>
  );

  if (isPrimary) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.touchable, style]}
        {...rest}
      >
        <View style={styles.gradientContainer}>
          <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
            <Defs>
              <SvgLinearGradient
                id="btn-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <Stop offset="0%" stopColor={colors[0]} />
                <Stop offset="100%" stopColor={colors[1]} />
              </SvgLinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#btn-grad)" />
          </Svg>
          {content}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.touchable, styles.secondaryTouchable, style]}
      {...rest}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    height: 52,
    borderRadius: RADIUS.RADIUS_12,
    overflow: 'hidden',
    width: '100%',
    marginVertical: SPACING.SPACE_8,
  },
  gradientContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryTouchable: {
    borderWidth: 1.5,
    borderColor: COLORS.primaryDark,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.SPACE_16,
  },
  iconContainer: {
    marginRight: SPACING.SPACE_14,
  },

  secondaryText: {
    color: COLORS.primaryDark,
  },
});

export default CustomButton;
