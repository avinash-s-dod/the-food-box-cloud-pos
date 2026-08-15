import { TextStyle } from 'react-native';

export const FONTS = {
  lobsterRegular: 'Lobster-Regular',
  poppinsRegular: 'Poppins-Regular',
  poppinsMedium: 'Poppins-Medium',
  poppinsSemiBold: 'Poppins-SemiBold',
  poppinsBold: 'Poppins-Bold',
} as const;

export const FONT_SIZES = {
  FONT_10: 10,
  FONT_11: 11,
  FONT_12: 12,
  FONT_13: 13,
  FONT_14: 14,
  FONT_15: 15,
  FONT_16: 16,
  FONT_18: 18,
  FONT_20: 20,
  FONT_24: 24,
  FONT_28: 28,
  FONT_30: 30,
  FONT_32: 32,
} as const;

export const SPACING = {
  SPACE_2: 2,
  SPACE_4: 4,
  SPACE_8: 8,
  SPACE_10: 10,
  SPACE_12: 12,
  SPACE_14: 14,
  SPACE_16: 16,
  SPACE_18: 18,
  SPACE_20: 20,
  SPACE_24: 24,
  SPACE_28: 28,
  SPACE_30: 30,
  SPACE_32: 32,
  SPACE_40: 40,
  SPACE_48: 48,
} as const;

export const RADIUS = {
  RADIUS_4: 4,
  RADIUS_8: 8,
  RADIUS_12: 12,
  RADIUS_16: 16,
  RADIUS_20: 20,
  RADIUS_24: 24,
  RADIUS_30: 30,
  RADIUS_FULL: 999,
} as const;

export const COLORS = {
  primary: '#F27405',
  primaryDark: '#D65524',

  background: '#F6F7FB',
  surface: '#FFFFFF',

  textPrimary: '#242424',
  textSecondary: '#5D5C62',
  textMuted: '#88888B',
  textLabel: '#8C8E94',
  textInverse: '#FFFFFF',

  border: '#C9CAD1',
  separator: '#8D939A',
  borderFocus: '#F27405',

  success: '#3FB765',
  error: '#EF2020',

  disabled: '#CCCCCC',
  disabledText: '#88888B',

  icon: '#86878B',

  rating: '#F27405',
} as const;

export const GRADIENTS = {
  primary: [COLORS.primary, COLORS.primaryDark],
} as const;

const createTextStyle = (
  fontFamily: string,
  fontSize: number,
  color: string,
  lineHeight?: number,
): TextStyle => ({
  fontFamily,
  fontSize,
  color,
  ...(lineHeight ? { lineHeight } : {}),
});

export const TYPOGRAPHY = {
  // Titles

  title: createTextStyle(
    FONTS.poppinsSemiBold,
    FONT_SIZES.FONT_20,
    COLORS.textPrimary,
    0,
  ),

  titleRegular: createTextStyle(
    FONTS.poppinsRegular,
    FONT_SIZES.FONT_20,
    COLORS.textPrimary,
    26,
  ),

  titleBold: createTextStyle(
    FONTS.poppinsBold,
    FONT_SIZES.FONT_20,
    COLORS.textPrimary,
    26,
  ),

  // Subtitles

  subtitle: createTextStyle(
    FONTS.poppinsMedium,
    FONT_SIZES.FONT_14,
    COLORS.textSecondary,
    24,
  ),

  subtitleRegular: createTextStyle(
    FONTS.poppinsRegular,
    FONT_SIZES.FONT_14,
    COLORS.textSecondary,
    24,
  ),

  subtitleBold: createTextStyle(
    FONTS.poppinsBold,
    FONT_SIZES.FONT_14,
    COLORS.textSecondary,
    24,
  ),

  // Headings

  heading: createTextStyle(
    FONTS.poppinsSemiBold,
    FONT_SIZES.FONT_15,
    COLORS.textPrimary,
    22,
  ),

  headingMedium: createTextStyle(
    FONTS.poppinsMedium,
    FONT_SIZES.FONT_15,
    COLORS.textPrimary,
    22,
  ),

  // Body

  body: createTextStyle(
    FONTS.poppinsRegular,
    FONT_SIZES.FONT_12,
    COLORS.textPrimary,
    20,
  ),

  bodyMedium: createTextStyle(
    FONTS.poppinsMedium,
    FONT_SIZES.FONT_12,
    COLORS.textPrimary,
    20,
  ),

  bodySmall: createTextStyle(
    FONTS.poppinsRegular,
    FONT_SIZES.FONT_12,
    COLORS.textSecondary,
    18,
  ),

  bodyXSmall: createTextStyle(
    FONTS.poppinsRegular,
    FONT_SIZES.FONT_10,
    COLORS.textMuted,
    16,
  ),

  // Numerical / Display

  price: createTextStyle(
    FONTS.poppinsSemiBold,
    FONT_SIZES.FONT_16,
    COLORS.primary,
    26,
  ),

  priceLarge: createTextStyle(
    FONTS.poppinsBold,
    FONT_SIZES.FONT_20,
    COLORS.primary,
    32,
  ),

  total: createTextStyle(
    FONTS.poppinsBold,
    FONT_SIZES.FONT_16,
    COLORS.textPrimary,
    26,
  ),

  quantity: createTextStyle(
    FONTS.poppinsMedium,
    FONT_SIZES.FONT_16,
    COLORS.textPrimary,
    26,
  ),

  displayLarge: createTextStyle(
    FONTS.lobsterRegular,
    FONT_SIZES.FONT_24,
    COLORS.primary,
    40,
  ),

  // Form

  inputLabel: createTextStyle(
    FONTS.poppinsRegular,
    FONT_SIZES.FONT_12,
    COLORS.textLabel,
  ),

  inputValue: createTextStyle(
    FONTS.poppinsRegular,
    FONT_SIZES.FONT_12,
    COLORS.textPrimary,
    20,
  ),

  inputPlaceholder: createTextStyle(
    FONTS.poppinsRegular,
    FONT_SIZES.FONT_14,
    COLORS.textMuted,
    20,
  ),

  dropdownLabel: createTextStyle(
    FONTS.poppinsRegular,
    FONT_SIZES.FONT_14,
    COLORS.textPrimary,
    20,
  ),

  dropdownSelected: createTextStyle(
    FONTS.poppinsSemiBold,
    FONT_SIZES.FONT_14,
    COLORS.primary,
    20,
  ),

  helpText: createTextStyle(
    FONTS.poppinsRegular,
    FONT_SIZES.FONT_12,
    COLORS.textMuted,
    18,
  ),

  errorText: createTextStyle(
    FONTS.poppinsRegular,
    FONT_SIZES.FONT_12,
    COLORS.error,
    18,
  ),

  // Components

  button: createTextStyle(
    FONTS.poppinsSemiBold,
    FONT_SIZES.FONT_14,
    COLORS.textInverse,
  ),

  tab: createTextStyle(
    FONTS.poppinsRegular,
    FONT_SIZES.FONT_14,
    COLORS.textSecondary,
    20,
  ),

  tabActive: createTextStyle(
    FONTS.poppinsSemiBold,
    FONT_SIZES.FONT_14,
    COLORS.primary,
    20,
  ),
} as const;

export const theme = {
  colors: COLORS,
  gradients: GRADIENTS,
  spacing: SPACING,
  borderRadius: RADIUS,
  fonts: FONTS,
  fontSizes: FONT_SIZES,
  typography: TYPOGRAPHY,
} as const;

export type Theme = typeof theme;
