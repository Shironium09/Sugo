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
import { useAuth } from '../data/AuthContext';

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

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.background },
};

export const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <AppStack.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Nearby" component={NearbyScreen} />
      <AppStack.Screen name="CurrentQuest" component={CurrentQuestScreen} />
      <AppStack.Screen name="CreateQuest" component={CreateQuestScreen} />
      <AppStack.Screen name="Settings" component={SettingsScreen} />
    </AppStack.Navigator>
  ) : (
    <AuthStack.Navigator screenOptions={screenOptions} initialRouteName="Landing">
      <AuthStack.Screen name="Landing" component={LandingScreen} />
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="Verification" component={VerificationScreen} />
    </AuthStack.Navigator>
  );
};
