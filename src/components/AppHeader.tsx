import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme/colors';

interface AppHeaderProps {
  onBack?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={16} color={colors.ink} />
        </TouchableOpacity>
      )}
      <View style={[styles.logoBox, onBack && styles.logoBoxWithBack]}>
        <Text style={styles.logoText}>Sugo</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: colors.ink,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 32,
    height: 32,
    borderWidth: 1.5,
    borderColor: colors.ink,
    borderRadius: 6,
    backgroundColor: colors.warning,
    alignItems: 'center',
    justifyContent: 'center',
    // hitSlop provides extra 8px tap area on all sides
  },
  logoBox: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderWidth: 1.5,
    borderColor: colors.ink,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceBlue,
    marginLeft: 'auto', // Pushes the logo to the right side
  },
  logoBoxWithBack: {
    backgroundColor: colors.surface,
  },
  logoText: {
    fontFamily: 'VT323-Regular',
    fontSize: 24,
    color: colors.ink,
    letterSpacing: 1,
  },
});
