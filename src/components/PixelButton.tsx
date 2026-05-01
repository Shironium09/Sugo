import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface PixelButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
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
  ...rest
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, variantButtonStyles[variant], style]}
      {...rest}
    >
      <Text style={[styles.text, variant === 'ghost' && styles.textGhost]}>
        {title}
      </Text>
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
});
