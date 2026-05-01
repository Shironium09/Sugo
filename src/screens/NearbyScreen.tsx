import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PixelButton } from '../components/PixelButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AppShell } from '../components/AppShell';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Nearby'>;
};

export const NearbyScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <AppShell navigation={navigation} active="Home">
      <View style={styles.content}>
        <Text style={styles.title}>Nearby Screen</Text>
        <PixelButton title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <PixelButton title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontFamily: 'PixelifySans-Regular', fontSize: 16, marginBottom: 20, color: '#1B1F24' },
});
