import React from 'react';
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
import { PixelBottomNav } from '../components/PixelBottomNav';
import { useSugo } from '../context/SugoContext';
import { styles } from './CurrentQuestScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'QuestDetail'>;

export const QuestDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { availableQuests, activeQuest, acceptQuest } = useSugo();
  const questId = route.params.questId;
  const quest = availableQuests.find((q) => q.id === questId);

  const handleAccept = () => {
    if (activeQuest) {
      Alert.alert(
        'QUEST IN PROGRESS',
        'You must complete your current quest before accepting a new one.',
        [{ text: 'OK' }],
      );
      return;
    }
    acceptQuest(questId);
    navigation.navigate('CurrentQuest');
  };

  if (!quest) {
    return (
      <View style={styles.questInfoContainer}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <SafeAreaView style={styles.questInfoSafeArea}>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>QUEST NOT FOUND</Text>
            <TouchableOpacity
              style={styles.findButton}
              onPress={() => navigation.navigate('Nearby')}
              activeOpacity={0.7}
            >
              <Text style={styles.findButtonText}>BACK TO NEARBY</Text>
            </TouchableOpacity>
          </View>
          <PixelBottomNav active="NEARBY" />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.questInfoContainer}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.questInfoSafeArea}>
        <ScrollView contentContainerStyle={styles.questInfoContent}>
          <View style={styles.questInfoTopSection}>
            {/* Quest Info Icon */}
            <View style={styles.questInfoIcon}>
              <Image source={require('../assets/pixel_icon_exclamation_1778609201873.png')} style={styles.questIconImg} resizeMode="contain" />
            </View>

            {/* Title */}
            <Text style={styles.questInfoTitle}>QUEST INFO</Text>

            {/* Map */}
            <View style={styles.questInfoMapContainer}>
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
            <View style={styles.questInfoRequesterRow}>
              <Image
                source={require('../assets/pixel_avatar.png')}
                style={styles.questInfoRequesterAvatar}
                resizeMode="cover"
              />
              <Text style={styles.questInfoRequesterName}>{quest.requester}</Text>
            </View>

            {/* Details */}
            <Text style={styles.questInfoDetail}>REQUEST: {quest.request}</Text>
            <Text style={styles.questInfoDetail}>
              LOCATION: {quest.location}
            </Text>
            <Text style={styles.questInfoDetail}>({quest.distance})</Text>
            <Text style={styles.questInfoDetailBold}>
              PAYMENT: PHP {quest.payment}
            </Text>
          </View>

          {/* Accept Button */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAccept}
              activeOpacity={0.7}
            >
              <Text style={styles.acceptButtonText}>ACCEPT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <PixelBottomNav active="NEARBY" />
      </SafeAreaView>
    </View>
  );
};
