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
    backgroundColor: '#E3F7F0',
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    minWidth: 150,
  },
  text: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 12,
    color: '#1B1F24',
    textAlign: 'center',
  },
});
