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
import { styles } from './SignUpStep2Screen.styles';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUpStep2'>;
};

export const SignUpStep2Screen: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const handleFinish = () => {
    // For prototype, navigate directly to Home
    navigation.navigate('Home');
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
                <Text style={styles.subtitle}>STEP 2: VERIFICATION</Text>

                {/* Full Name Field */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>FULL NAME</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={firstName}
                      onChangeText={setFirstName}
                      placeholder="Juan Dela Cruz"
                      placeholderTextColor="#A0AEBB"
                      autoCapitalize="words"
                    />
                  </View>
                  <View style={[styles.inputContainer, { marginTop: 8 }]}>
                    <TextInput
                      style={styles.input}
                      value={lastName}
                      onChangeText={setLastName}
                      placeholder="Last Name"
                      placeholderTextColor="#A0AEBB"
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                {/* Birthdate Field */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>BIRTHDATE</Text>
                  <View style={styles.birthdateRow}>
                    <View style={[styles.birthdateField]}>
                      <View style={styles.inputContainerSmall}>
                        <TextInput
                          style={styles.inputSmall}
                          value={birthDay}
                          onChangeText={setBirthDay}
                          placeholder="DD"
                          placeholderTextColor="#A0AEBB"
                          keyboardType="number-pad"
                          maxLength={2}
                        />
                      </View>
                    </View>
                    <View style={[styles.birthdateField]}>
                      <View style={styles.inputContainerSmall}>
                        <TextInput
                          style={styles.inputSmall}
                          value={birthMonth}
                          onChangeText={setBirthMonth}
                          placeholder="MM"
                          placeholderTextColor="#A0AEBB"
                          keyboardType="number-pad"
                          maxLength={2}
                        />
                      </View>
                    </View>
                    <View style={[styles.birthdateField]}>
                      <View style={styles.inputContainerSmall}>
                        <TextInput
                          style={styles.inputSmall}
                          value={birthYear}
                          onChangeText={setBirthYear}
                          placeholder="YYYY"
                          placeholderTextColor="#A0AEBB"
                          keyboardType="number-pad"
                          maxLength={4}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                {/* Document Upload Section */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.documentsLabel}>SUBMIT IMPORTANT DOCUMENTS</Text>
                  <Text style={styles.documentItem}>■ VALID ID</Text>
                  <Text style={styles.documentItem}>■ NBI CLEARANCE</Text>
                  <Text style={styles.documentItem}>■ POLICE CLEARANCE</Text>

                  <TouchableOpacity style={styles.uploadArea} activeOpacity={0.7}>
                    <Image
                      source={require('../assets/pixel_upload.png')}
                      style={styles.uploadIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.noteText}>
                  VERIFICATION MAY TAKE UP TO 24 HOURS
                </Text>
              </View>

              {/* Bottom Section */}
              <View style={styles.bottomSection}>
                {/* Pagination Dots */}
                <View style={styles.paginationContainer}>
                  <View style={[styles.dot, styles.dotInactive]} />
                  <View style={[styles.dot, styles.dotActive]} />
                </View>

                {/* Finish Button */}
                <TouchableOpacity
                  style={styles.finishButton}
                  onPress={handleFinish}
                  activeOpacity={0.7}
                >
                  <Text style={styles.finishButtonText}>FINISH</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
