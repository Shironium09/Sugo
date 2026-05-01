import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { PixelButton } from '../components/PixelButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Nearby'>;
};

export const NearbyScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View style={styles.content}>
        <Text style={styles.title}>Nearby Screen</Text>
        <PixelButton title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <PixelButton title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
      <BottomNav navigation={navigation} active="Home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F7FF' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontFamily: 'PixelifySans-Regular', fontSize: 16, marginBottom: 20, color: '#1B1F24' },
});
