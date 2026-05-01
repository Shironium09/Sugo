import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { QuestProvider } from './src/data/questStore';
import { AuthProvider } from './src/data/AuthContext';
import { useFonts, PixelifySans_400Regular } from '@expo-google-fonts/pixelify-sans';
import { IBMPlexMono_400Regular } from '@expo-google-fonts/ibm-plex-mono';
import { VT323_400Regular } from '@expo-google-fonts/vt323';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './src/theme/colors';

export default function App() {
  const [fontsLoaded] = useFonts({
    'PixelifySans-Regular': PixelifySans_400Regular,
    'IBMPlexMono-Regular': IBMPlexMono_400Regular,
    'VT323-Regular': VT323_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.ink }}>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <QuestProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </QuestProvider>
    </AuthProvider>
  );
}
