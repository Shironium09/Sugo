import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { PixelButton } from '../components/PixelButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateQuest'>;
};

export const CreateQuestScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Quest Screen</Text>
      <PixelButton title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <PixelButton title="Go to Nearby" onPress={() => navigation.navigate('Nearby')} />
      <PixelButton title="Go to Current Quest" onPress={() => navigation.navigate('CurrentQuest')} />
      <PixelButton title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  title: { fontFamily: 'PressStart2P-Regular', fontSize: 16, marginBottom: 20, textAlign: 'center' },
});
