import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { styles } from './SignUpScreen.styles';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeNotifications, setAgreeNotifications] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleVerify = () => {
    navigation.navigate('Verification', { method: 'phone' });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              <View style={styles.topSection}>
                {/* Back Button */}
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.7}
                >
                  <Image
                    source={require('../assets/pixel_back_arrow.png')}
                    style={styles.backArrow}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* Title */}
                <Text style={styles.title}>CREATE AN{'\n'}ACCOUNT</Text>
                <Text style={styles.subtitle}>STEP 1: ACCOUNT</Text>

                {/* Email Field */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>EMAIL</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      placeholder="email@example.com"
                      placeholderTextColor="#A0AEBB"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* Contact Number Field */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>CONTACT NUMBER</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={contactNumber}
                      onChangeText={setContactNumber}
                      placeholder="09XXXXXXXXX"
                      placeholderTextColor="#A0AEBB"
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                {/* Password Field */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>PASSWORD</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="••••••••••••"
                      placeholderTextColor="#A0AEBB"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirm Password Field */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>CONFIRM PASSWORD</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="••••••••••••"
                      placeholderTextColor="#A0AEBB"
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Notifications Checkbox */}
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setAgreeNotifications(!agreeNotifications)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, agreeNotifications && styles.checkboxChecked]}>
                    {agreeNotifications && <Text style={styles.checkboxMark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    I AGREE TO RECEIVING NOTIFICATIONS FROM THE APP
                  </Text>
                </TouchableOpacity>

                {/* Terms Checkbox */}
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setAcceptTerms(!acceptTerms)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
                    {acceptTerms && <Text style={styles.checkboxMark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    I ACCEPT TO THE TERMS AND CONDITIONS
                  </Text>
                </TouchableOpacity>

                {/* Login link */}
                <View style={styles.loginRow}>
                  <Text style={styles.loginText}>
                    ALREADY HAVE AN ACCOUNT?{' '}
                    <Text
                      style={styles.loginLink}
                      onPress={() => navigation.navigate('Login')}
                    >
                      LOGIN
                    </Text>
                  </Text>
                </View>
              </View>

              {/* Bottom Section */}
              <View style={styles.bottomSection}>
                {/* Pagination Dots */}
                <View style={styles.paginationContainer}>
                  <View style={[styles.dot, styles.dotActive]} />
                  <View style={[styles.dot, styles.dotInactive]} />
                </View>

                {/* Verify Button */}
                <TouchableOpacity
                  style={styles.verifyButton}
                  onPress={handleVerify}
                  activeOpacity={0.7}
                >
                  <Text style={styles.verifyButtonText}>VERIFY</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
