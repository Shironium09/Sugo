import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AppHeader: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}
    >
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>ICON</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#1B1F24',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  logoBox: {
    width: 42,
    height: 42,
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF3FF',
  },
  logoText: {
    fontFamily: 'VT323-Regular',
    fontSize: 14,
    color: '#1B1F24',
  },
});
