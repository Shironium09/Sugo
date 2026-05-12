import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { PixelBottomNav, SearchProfileHeader } from '../components/PixelBottomNav';
import { useSugo } from '../context/SugoContext';
import { styles } from './CurrentQuestScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'CurrentQuest'>;

export const CurrentQuestScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { activeQuest, completeQuest } = useSugo();

  const handleComplete = () => {
    Alert.alert(
      'COMPLETE QUEST',
      'Are you sure you want to mark this quest as complete?',
      [
        { text: 'CANCEL', style: 'cancel' },
        {
          text: 'COMPLETE',
          onPress: () => {
            completeQuest();
          },
        },
      ],
    );
  };

  // Active quest view
  if (activeQuest) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <SafeAreaView style={styles.safeArea}>
          <SearchProfileHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Quest Info Header */}
            <View style={styles.questInfoHeaderContainer}>
              <Image source={require('../assets/pixel_icon_exclamation_1778609201873.png')} style={styles.questIconImg} resizeMode="contain" />
              <Text style={styles.questInfoHeader}>QUEST INFO</Text>
            </View>

            {/* Map */}
            <View style={styles.mapContainer}>
              <Image
                source={require('../assets/pixel_map.png')}
                style={styles.mapImage}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.mapExpandButton} activeOpacity={0.7}>
                <Text style={styles.mapExpandIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Requester */}
            <Text style={styles.sectionLabel}>REQUESTER</Text>
            <View style={styles.requesterRow}>
              <Image
                source={require('../assets/pixel_avatar.png')}
                style={styles.requesterAvatar}
                resizeMode="cover"
              />
              <Text style={styles.requesterName}>{activeQuest.requester}</Text>
            </View>

            {/* Request Details */}
            <Text style={styles.sectionLabel}>REQUESTED</Text>
            <Text style={styles.detailValue}>"{activeQuest.request}"</Text>

            <Text style={styles.sectionLabel}>LOCATION</Text>
            <Text style={styles.detailValue}>
              {activeQuest.location} ({activeQuest.distance})
            </Text>

            <Text style={styles.sectionLabel}>PAYMENT</Text>
            <Text style={styles.detailValue}>PHP {activeQuest.payment}</Text>

            {/* Complete Button */}
            <View style={styles.bottomSection}>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={handleComplete}
                activeOpacity={0.7}
              >
                <Text style={styles.completeButtonText}>MARK COMPLETE</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <PixelBottomNav active="CURRENT" />
        </SafeAreaView>
      </View>
    );
  }

  // Empty state - no active quest
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>
        <SearchProfileHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            YOU HAVE NO{'\n'}ONGOING QUEST{'\n'}RIGHT NOW!
          </Text>

          <TouchableOpacity
            style={styles.findButton}
            onPress={() => navigation.navigate('Nearby')}
            activeOpacity={0.7}
          >
            <Text style={styles.findButtonText}>FIND</Text>
          </TouchableOpacity>
        </View>

        <PixelBottomNav active="CURRENT" />
      </SafeAreaView>
    </View>
  );
};
