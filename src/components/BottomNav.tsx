import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import { useQuestStore } from '../data/questStore';
import { colors } from '../theme/colors';

type BottomNavNavigation = NativeStackNavigationProp<AppStackParamList>;

type Props = {
  navigation: BottomNavNavigation;
  active?: 'Home' | 'CreateQuest' | 'Settings';
};

export const BottomNav: React.FC<Props> = ({ navigation, active }) => {
  const insets = useSafeAreaInsets();
  const { hasActiveQuest } = useQuestStore();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 2 }]}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons
          name={active === 'Home' ? 'home' : 'home-outline'}
          size={22}
          color={active === 'Home' ? colors.accent : colors.ink}
        />
        <Text style={[styles.navText, active === 'Home' && styles.navTextActive]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItemCenter, hasActiveQuest && styles.navItemCenterLocked]}
        onPress={() => navigation.navigate('CreateQuest')}
      >
        <Ionicons
          name={hasActiveQuest ? 'lock-closed' : 'add'}
          size={hasActiveQuest ? 18 : 26}
          color={colors.ink}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Settings')}
      >
        <Ionicons
          name={active === 'Settings' ? 'person' : 'person-outline'}
          size={22}
          color={active === 'Settings' ? colors.accent : colors.ink}
        />
        <Text style={[styles.navText, active === 'Settings' && styles.navTextActive]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Ensures it stays at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8, // Increased slightly for breathing room
    borderTopWidth: 2,
    borderTopColor: colors.ink,
    backgroundColor: colors.surface,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 16,
    minWidth: 64,
  },
  navItemCenter: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceBlue,
  },
  navItemCenterLocked: {
    opacity: 0.4,
    backgroundColor: colors.surfaceDisabled,
  },
  navText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 11,
    color: colors.ink,
    marginTop: 3,
  },
  navTextActive: {
    color: colors.accent,
  },
});
