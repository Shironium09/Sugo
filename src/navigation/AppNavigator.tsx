import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { LandingScreen } from '../screens/LandingScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { SignUpStep2Screen } from '../screens/SignUpStep2Screen';
import { VerificationScreen } from '../screens/VerificationScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { NearbyScreen } from '../screens/NearbyScreen';
import { CurrentQuestScreen } from '../screens/CurrentQuestScreen';
import { QuestDetailScreen } from '../screens/QuestDetailScreen';
import { CreateQuestScreen } from '../screens/CreateQuestScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

export type AuthStackParamList = {
  Landing: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  SignUpStep2: undefined;
  Verification: { method?: 'phone' | 'email' };
};

export type AppStackParamList = {
  Home: undefined;
  Nearby: undefined;
  CurrentQuest: undefined;
  QuestDetail: { questId: string };
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
    <RootStack.Navigator screenOptions={screenOptions} initialRouteName="Landing">
      {/* Auth Flow */}
      <RootStack.Screen name="Landing" component={LandingScreen} />
      <RootStack.Screen name="Welcome" component={WelcomeScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="SignUp" component={SignUpScreen} />
      <RootStack.Screen name="SignUpStep2" component={SignUpStep2Screen} />
      <RootStack.Screen name="Verification" component={VerificationScreen} />
      {/* Main App */}
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="Nearby" component={NearbyScreen} />
      <RootStack.Screen name="CurrentQuest" component={CurrentQuestScreen} />
      <RootStack.Screen name="QuestDetail" component={QuestDetailScreen} />
      <RootStack.Screen name="CreateQuest" component={CreateQuestScreen} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
    </RootStack.Navigator>
  );
};
