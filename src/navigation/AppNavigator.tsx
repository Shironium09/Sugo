import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
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

export type AuthStackParamList = {
  Landing: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  Verification: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Nearby: undefined;
  CurrentQuest: { questId: string };
  CreateQuest: undefined;
  Settings: undefined;
};

// Merged list for backward compatibility across components
export type RootStackParamList = AuthStackParamList & AppStackParamList;

const RootStack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.background },
};

export const AppNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="Nearby" component={NearbyScreen} />
      <RootStack.Screen name="CurrentQuest" component={CurrentQuestScreen} />
      <RootStack.Screen name="CreateQuest" component={CreateQuestScreen} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
      <RootStack.Screen name="Landing" component={LandingScreen} />
      <RootStack.Screen name="Welcome" component={WelcomeScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="SignUp" component={SignUpScreen} />
      <RootStack.Screen name="Verification" component={VerificationScreen} />
    </RootStack.Navigator>
  );
};
