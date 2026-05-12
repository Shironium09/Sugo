import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { PixelBottomNav, SearchProfileHeader } from '../components/PixelBottomNav';
import { useSugo } from '../context/SugoContext';
import { styles } from './NearbyScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Nearby'>;

export const NearbyScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { availableQuests } = useSugo();

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
          {/* Map Section */}
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

          {/* Nearby Quests List */}
          <View style={styles.nearbyContainer}>
            <Text style={styles.nearbyTitle}>NEARBY</Text>
            {availableQuests.length === 0 ? (
              <Text style={styles.emptyText}>NO QUESTS AVAILABLE NEARBY</Text>
            ) : (
              availableQuests.map((quest, index) => (
                <TouchableOpacity
                  key={quest.id}
                  style={[
                    styles.nearbyItem,
                    index === availableQuests.length - 1 && styles.nearbyItemLast,
                  ]}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('QuestDetail', { questId: quest.id })
                  }
                >
                  <Image source={require('../assets/pixel_icon_timer_1778609217507.png')} style={styles.nearbyIconImg} resizeMode="contain" />
                  <Text style={styles.nearbyText}>
                    {quest.distance} | QUEST "{quest.request}" IS AVAILABLE
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>

        <PixelBottomNav active="NEARBY" />
      </SafeAreaView>
    </View>
  );
};
