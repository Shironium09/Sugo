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
          <Ionicons name="arrow-back" size={20} color="#1B1F24" />
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#1B1F24',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 34,
    height: 34,
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 17,
    backgroundColor: '#FFF2B8', // distinct warm background
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 8,
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
    fontSize: 22,
    color: '#1B1F24',
    letterSpacing: 1,
  },
});
