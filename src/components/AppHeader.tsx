import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface AppHeaderProps {
  onBack?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={14} color="#1B1F24" />
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
    borderBottomColor: '#1B1F24',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: '#1B1F24',
    borderRadius: 4,
    backgroundColor: '#FFF2B8',
    alignItems: 'center',
    justifyContent: 'center',
    // no extra margin — flush to the left edge of the padded container
  },
  logoBox: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderWidth: 1.5,
    borderColor: '#1B1F24',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF3FF',
    marginLeft: 'auto', // Pushes the logo to the right side
  },
  logoBoxWithBack: {
    backgroundColor: '#FFFFFF',
  },
  logoText: {
    fontFamily: 'VT323-Regular',
    fontSize: 16,
    color: '#1B1F24',
    letterSpacing: 1,
  },
});
