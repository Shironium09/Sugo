import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { PixelBottomNav } from '../components/PixelBottomNav';
import { useSugo } from '../context/SugoContext';
import { styles } from './CreateQuestScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateQuest'>;

export const CreateQuestScreen: React.FC<Props> = ({ navigation }) => {
  const [quest, setQuest] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [reward, setReward] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { createQuest } = useSugo();

  const handleConfirm = () => {
    setError(null);
    if (!quest.trim()) {
      setError('Quest name is required.');
      return;
    }
    if (!description.trim()) {
      setError('Description is required.');
      return;
    }
    if (!location.trim()) {
      setError('Location is required.');
      return;
    }
    const rewardValue = Number(reward);
    if (!Number.isFinite(rewardValue) || rewardValue < 50) {
      setError('Reward must be at least PHP 50.');
      return;
    }

    // Create the quest and add to available quests
    createQuest({
      requester: 'AVRYL ARR.',
      request: quest.trim().toUpperCase(),
      description: description.trim(),
      location: location.trim().toUpperCase(),
      distance: '0KM',
      payment: rewardValue,
    });

    Alert.alert('QUEST CREATED', `Your quest "${quest.trim()}" has been posted!`, [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Home'),
      },
    ]);
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
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.topSection}>
              {/* Quest Icon */}
              <View style={styles.iconContainer}>
                <Image source={require('../assets/pixel_icon_scroll_1778609230685.png')} style={styles.questIconImg} resizeMode="contain" />
              </View>

              {/* Title */}
              <Text style={styles.title}>CREATE QUEST</Text>

              {/* Quest Name Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>QUEST</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={quest}
                    onChangeText={setQuest}
                    placeholder="WALKING THE DOG"
                    placeholderTextColor="#A0AEBB"
                    autoCapitalize="characters"
                  />
                </View>
              </View>

              {/* Description Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>DESCRIPTION</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="WALK THE DOG AS FAR..."
                    placeholderTextColor="#A0AEBB"
                  />
                </View>
              </View>

              {/* Location Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>LOCATION</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="NASIPIT, TALAMBAN"
                    placeholderTextColor="#A0AEBB"
                  />
                  <Image source={require('../assets/pixel_icon_pin_1778609118602.png')} style={styles.locationPinImg} resizeMode="contain" />
                </View>
              </View>

              {/* Reward Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>REWARD (MINIMUM IS PHP 50)</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={reward}
                    onChangeText={setReward}
                    placeholder="150"
                    placeholderTextColor="#A0AEBB"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            {/* Confirm Button */}
            <View style={styles.bottomSection}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
                activeOpacity={0.7}
              >
                <Text style={styles.confirmButtonText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <PixelBottomNav active="HOME" />
      </SafeAreaView>
    </View>
  );
};
