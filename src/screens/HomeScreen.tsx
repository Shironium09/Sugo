import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { PixelButton } from '../components/PixelButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <PixelButton title="Go to Create Quest" onPress={() => navigation.navigate('CreateQuest')} />
      <PixelButton title="Go to Nearby" onPress={() => navigation.navigate('Nearby')} />
      <PixelButton title="Go to Current Quest" onPress={() => navigation.navigate('CurrentQuest')} />
      <PixelButton title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  title: { fontFamily: 'PressStart2P-Regular', fontSize: 16, marginBottom: 20 },
});
