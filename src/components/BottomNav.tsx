import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationLike = {
  navigate: (screen: keyof RootStackParamList, params?: any) => void;
};

type Props = {
  navigation: NavigationLike;
  active?: 'Home' | 'CreateQuest' | 'Settings';
};

export const BottomNav: React.FC<Props> = ({ navigation, active }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      <TouchableOpacity
        style={[styles.navItem, active === 'Home' ? styles.navItemActive : null]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.navText}>Quests</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, styles.navItemCenter, active === 'CreateQuest' ? styles.navItemActive : null]}
        onPress={() => navigation.navigate('CreateQuest')}
      >
        <Text style={styles.navText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, active === 'Settings' ? styles.navItemActive : null]}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    borderTopWidth: 2,
    borderTopColor: '#1B1F24',
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  navItemCenter: {
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 18,
    backgroundColor: '#EAF3FF',
  },
  navItemActive: {
    backgroundColor: '#E3F7F0',
  },
  navText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 10,
    color: '#1B1F24',
  },
});
