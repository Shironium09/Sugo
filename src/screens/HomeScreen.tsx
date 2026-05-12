import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { PixelBottomNav, SearchProfileHeader } from '../components/PixelBottomNav';
import { useSugo } from '../context/SugoContext';
import { styles } from './HomeScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const { history } = useSugo();

  const displayedHistory = showAll ? history : history.slice(0, 5);

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
          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('CreateQuest')}
            >
              <Image source={require('../assets/pixel_icon_book_1778609189899.png')} style={styles.actionIconImg} resizeMode="contain" />
              <Text style={styles.actionText}>BOOK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Nearby')}
            >
              <Image source={require('../assets/pixel_icon_exclamation_1778609201873.png')} style={styles.actionIconImg} resizeMode="contain" />
              <Text style={styles.actionText}>QUEST</Text>
            </TouchableOpacity>
          </View>

          {/* History Section */}
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>HISTORY</Text>
            {displayedHistory.length === 0 ? (
              <Text style={styles.emptyHistory}>NO HISTORY YET</Text>
            ) : (
              displayedHistory.map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.historyItem,
                    index === displayedHistory.length - 1 && styles.historyItemLast,
                  ]}
                >
                  <Image source={require('../assets/pixel_icon_timer_1778609217507.png')} style={styles.historyIconImg} resizeMode="contain" />
                  <Text style={styles.historyText}>
                    {item.time} | {item.text}
                  </Text>
                </View>
              ))
            )}
            {history.length > 5 && (
              <TouchableOpacity
                style={styles.seeMoreButton}
                activeOpacity={0.7}
                onPress={() => setShowAll(!showAll)}
              >
                <Text style={styles.seeMoreText}>
                  {showAll ? 'SHOW LESS' : 'SEE MORE'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <PixelBottomNav active="HOME" />
      </SafeAreaView>
    </View>
  );
};
