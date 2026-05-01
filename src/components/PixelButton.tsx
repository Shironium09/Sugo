import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface PixelButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
}

const variantButtonStyles: Record<ButtonVariant, ViewStyle> = {
  // Default CTA — mint green, fully bordered
  primary: {
    backgroundColor: '#E3F7F0',
    borderColor: '#1B1F24',
  },
  // Secondary action — blueprint blue tint
  secondary: {
    backgroundColor: '#EAF3FF',
    borderColor: '#1B1F24',
  },
  // Tertiary / de-emphasized — transparent with muted border
  ghost: {
    backgroundColor: 'transparent',
    borderColor: '#A0AEBB',
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
    marginVertical: 8, // corrected from 10 (off 4px grid)
    minWidth: 150,
  },
  text: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
    color: '#1B1F24',
    textAlign: 'center',
  },
  textGhost: {
    color: '#58616B',
  },
});
