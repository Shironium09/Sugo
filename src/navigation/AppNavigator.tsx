import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LandingScreen } from '../screens/LandingScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { VerificationScreen } from '../screens/VerificationScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { NearbyScreen } from '../screens/NearbyScreen';
import { CurrentQuestScreen } from '../screens/CurrentQuestScreen';
import { CreateQuestScreen } from '../screens/CreateQuestScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

export type RootStackParamList = {
  Landing: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  Verification: undefined;
  Home: undefined;
  Nearby: undefined;
  CurrentQuest: { questId: string };
  CreateQuest: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F1F7FF' },
      }}
      initialRouteName="Landing"
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Nearby" component={NearbyScreen} />
      <Stack.Screen name="CurrentQuest" component={CurrentQuestScreen} />
      <Stack.Screen name="CreateQuest" component={CreateQuestScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
