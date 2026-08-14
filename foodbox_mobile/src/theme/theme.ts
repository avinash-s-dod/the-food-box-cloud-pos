// src/theme/theme.ts

export const colors = {
  primary: '#F27405',
  primaryDark: '#D65524',

  background: '#F6F7FB',
  surface: '#FFFFFF',

  textPrimary: '#111111',
  textSecondary: '#4A4A4A',
  textMuted: '#888888',

  border: '#D9D9D9',

  success: '#3FB765',
  error: '#EF2020',

  rating: '#F27405',
} as const;

export const gradients = {
  primary: ['#F27405', '#D65524'],
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 48,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  fontFamily: {
    primary: 'Poppins',
    display: 'Lobster-Regular',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    display: 32,
  },

  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
} as const;

export const theme = {
  colors,
  gradients,
  spacing,
  borderRadius,
  typography,
} as const;

export type Theme = typeof theme;