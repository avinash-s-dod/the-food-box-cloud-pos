import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, RADIUS, SPACING, theme } from '../../theme/theme';
import CustomText from './CustomText';
import { EyeIcon } from '../../assets/svg';

interface CustomInputProps extends TextInputProps {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const CustomInput = ({
  label,
  leftIcon,
  rightIcon,
  error,
  containerStyle,
  inputStyle,
  secureTextEntry,
  ...rest
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureTextVisible, setIsSecureTextVisible] = useState(false);

  const showSecureToggle = secureTextEntry;
  const isSecure = secureTextEntry && !isSecureTextVisible;

  return (
    <View style={[styles.outerContainer, containerStyle]}>
      {label && (
        <CustomText variant="inputLabel" style={styles.label}>
          {label}
        </CustomText>
      )}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
            <View style={styles.divider} />
          </View>
        )}

        <TextInput
          {...rest}
          secureTextEntry={isSecure}
          onFocus={e => {
            setIsFocused(true);
            if (rest.onFocus) rest.onFocus(e);
          }}
          onBlur={e => {
            setIsFocused(false);
            if (rest.onBlur) rest.onBlur(e);
          }}
          placeholderTextColor={COLORS.textMuted}
          style={[theme.typography.inputValue, styles.input, inputStyle]}
          returnKeyType='done'
          returnKeyLabel='Done'
        />

        {showSecureToggle ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsSecureTextVisible(!isSecureTextVisible)}
            style={styles.rightIconContainer}
          >
            <EyeIcon
              fill={isSecureTextVisible ? COLORS.primary : COLORS.textMuted}
            />
          </TouchableOpacity>
        ) : (
          rightIcon && (
            <View style={styles.rightIconContainer}>{rightIcon}</View>
          )
        )}
      </View>

      {error && (
        <CustomText variant="errorText" style={styles.errorText}>
          {error}
        </CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
  },
  label: {
    marginBottom: SPACING.SPACE_4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.RADIUS_12,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.SPACE_14,
    height: 52,
    gap: SPACING.SPACE_14,
  },
  inputContainerFocused: {
    borderColor: COLORS.borderFocus,
  },
  inputContainerError: {
    borderColor: COLORS.error,
  },
  leftIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.separator,
    marginLeft: SPACING.SPACE_12,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    color: COLORS.textPrimary,
  },
  rightIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: SPACING.SPACE_8,
  },
  errorText: {
    marginTop: SPACING.SPACE_4,
    color: COLORS.error,
  },
});

export default CustomInput;
