import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface PixelButtonProps extends TouchableOpacityProps {
  title: string;
}

export const PixelButton: React.FC<PixelButtonProps> = ({ title, style, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    minWidth: 150,
  },
  text: {
    fontFamily: 'PressStart2P-Regular',
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
  },
});
