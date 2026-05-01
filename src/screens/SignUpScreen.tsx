import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PixelButton } from '../components/PixelButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up Screen</Text>
      <PixelButton title="Go to Verification" onPress={() => navigation.navigate('Verification')} />
      <PixelButton title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F7FF', justifyContent: 'center', alignItems: 'center' },
  title: { fontFamily: 'PixelifySans-Regular', fontSize: 16, marginBottom: 20, color: '#1B1F24' },
});
