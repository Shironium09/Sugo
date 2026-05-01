import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { QuestProvider } from './src/data/questStore';
import { useFonts, PixelifySans_400Regular } from '@expo-google-fonts/pixelify-sans';
import { IBMPlexMono_400Regular } from '@expo-google-fonts/ibm-plex-mono';
import { VT323_400Regular } from '@expo-google-fonts/vt323';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [fontsLoaded] = useFonts({
    'PixelifySans-Regular': PixelifySans_400Regular,
    'IBMPlexMono-Regular': IBMPlexMono_400Regular,
    'VT323-Regular': VT323_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F1F7FF', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#1B1F24' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <QuestProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </QuestProvider>
  );
}
