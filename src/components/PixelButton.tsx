import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface PixelButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
}

const variantButtonStyles: Record<ButtonVariant, ViewStyle> = {
  // Default CTA — mint green, fully bordered
  primary: {
    backgroundColor: colors.accentMint,
    borderColor: colors.ink,
  },
  // Secondary action — blueprint blue tint
  secondary: {
    backgroundColor: colors.surfaceBlue,
    borderColor: colors.ink,
  },
  // Tertiary / de-emphasized — transparent with muted border
  ghost: {
    backgroundColor: 'transparent',
    borderColor: colors.borderGhost,
  },
};

export const PixelButton: React.FC<PixelButtonProps> = ({
  title,
  style,
  variant = 'primary',
  loading = false,
  disabled,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        variantButtonStyles[variant],
        loading && styles.buttonLoading,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={colors.ink}
          animating={true}
        />
      ) : (
        <Text style={[styles.text, variant === 'ghost' && styles.textGhost, isDisabled && styles.textDisabled]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    minWidth: 150,
    flexDirection: 'row',
    gap: 8,
  },
  buttonLoading: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
    color: colors.ink,
    textAlign: 'center',
  },
  textGhost: {
    color: colors.inkMuted,
  },
  textDisabled: {
    color: colors.inkMuted,
  },
});
