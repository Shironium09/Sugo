import React, { useState, useRef } from 'react';
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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { styles } from './VerificationScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Verification'>;

export const VerificationScreen: React.FC<Props> = ({ navigation, route }) => {
  const method = route.params?.method ?? 'phone';
  const [verifyMethod, setVerifyMethod] = useState<'phone' | 'email'>(method);
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleProceed = () => {
    navigation.navigate('SignUpStep2');
  };

  const toggleMethod = () => {
    setVerifyMethod(verifyMethod === 'phone' ? 'email' : 'phone');
    setCode(['', '', '', '']);
  };

  const maskedContact =
    verifyMethod === 'phone' ? '096*********' : 'avr*****@gmail.com';

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

                {/* Envelope Icon */}
                <View style={styles.envelopeContainer}>
                  <Image
                    source={require('../assets/pixel_envelope.png')}
                    style={styles.envelopeIcon}
                    resizeMode="contain"
                  />
                </View>

                {/* Title */}
                <Text style={styles.title}>
                  VERIFY WITH{'\n'}YOUR {verifyMethod === 'phone' ? 'NUMBER' : 'EMAIL'}
                </Text>

                {/* Description */}
                <Text style={styles.description}>
                  A MESSAGE HAS BEEN SENT TO{'\n'}
                  {maskedContact}, PLEASE ENTER THE{'\n'}
                  CODE GIVEN TO PROCEED WITH THE{'\n'}REGISTRATION
                </Text>

                {/* Code Input */}
                <View style={styles.codeContainer}>
                  {code.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                      style={styles.codeInput}
                      value={digit}
                      onChangeText={(text) => handleCodeChange(text, index)}
                      onKeyPress={({ nativeEvent }) =>
                        handleKeyPress(nativeEvent.key, index)
                      }
                      keyboardType="number-pad"
                      maxLength={1}
                      selectTextOnFocus
                    />
                  ))}
                </View>

                {/* Resend / Switch */}
                <View style={styles.resendContainer}>
                  <Text style={styles.resendText}>
                    DID NOT RECEIVE?{' '}
                    <Text style={styles.resendLink}>RESEND</Text>
                  </Text>
                  <Text style={styles.switchText}>OR</Text>
                  <TouchableOpacity onPress={toggleMethod}>
                    <Text style={styles.switchLink}>
                      USE {verifyMethod === 'phone' ? 'EMAIL' : 'PHONE NUMBER'} INSTEAD
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bottom Section */}
              <View style={styles.bottomSection}>
                <TouchableOpacity
                  style={styles.proceedButton}
                  onPress={handleProceed}
                  activeOpacity={0.7}
                >
                  <Text style={styles.proceedButtonText}>PROCEED</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
