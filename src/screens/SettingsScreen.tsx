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
import { styles } from './SettingsScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const MOCK_USER = {
  name: 'AVRYL ARR.',
  email: 'avryl@usc.edu.ph',
  id: '240001234',
  exp: 2769,
  questsCompleted: 12,
  questsPosted: 8,
  rating: 4.8,
};

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { history } = useSugo();

  const recentHistory = history.slice(0, 5);

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
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../assets/pixel_avatar.png')}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.profileName}>{MOCK_USER.name}</Text>
            <Text style={styles.profileEmail}>{MOCK_USER.email}</Text>
            <Text style={styles.profileId}>ID: {MOCK_USER.id}</Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{MOCK_USER.exp}</Text>
              <Text style={styles.statLabel}>EXP</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{MOCK_USER.questsCompleted}</Text>
              <Text style={styles.statLabel}>COMPLETED</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{MOCK_USER.questsPosted}</Text>
              <Text style={styles.statLabel}>POSTED</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{MOCK_USER.rating}</Text>
              <Text style={styles.statLabel}>RATING</Text>
            </View>
          </View>

          {/* Menu - Account */}
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <Image source={require('../assets/pixel_icon_person_1778609151153.png')} style={styles.menuIconImg} resizeMode="contain" />
              <Text style={styles.menuText}>EDIT PROFILE</Text>
              <Image source={require('../assets/pixel_icon_arrow_right_1778609246785.png')} style={styles.menuArrowImg} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <Text style={styles.menuIcon}>🔒</Text>
              <Text style={styles.menuText}>CHANGE PASSWORD</Text>
              <Image source={require('../assets/pixel_icon_arrow_right_1778609246785.png')} style={styles.menuArrowImg} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.menuItem, styles.menuItemLast]}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>📱</Text>
              <Text style={styles.menuText}>VERIFICATION</Text>
              <Image source={require('../assets/pixel_icon_arrow_right_1778609246785.png')} style={styles.menuArrowImg} resizeMode="contain" />
            </TouchableOpacity>
          </View>

          {/* Menu - Activity */}
          <Text style={styles.sectionTitle}>ACTIVITY</Text>
          <View style={styles.menuCard}>
            <View style={{ paddingTop: 12 }}>
              <Text style={styles.historyTitle}>RECENT ACTIVITY</Text>
            </View>
            {recentHistory.length === 0 ? (
              <Text style={styles.emptyText}>NO ACTIVITY YET</Text>
            ) : (
              recentHistory.map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.historyItem,
                    index === recentHistory.length - 1 && styles.historyItemLast,
                  ]}
                >
                  <Image source={require('../assets/pixel_icon_timer_1778609217507.png')} style={styles.historyIconImg} resizeMode="contain" />
                  <Text style={styles.historyText}>
                    {item.time} | {item.text}
                  </Text>
                </View>
              ))
            )}
          </View>

          {/* Menu - More */}
          <Text style={styles.sectionTitle}>MORE</Text>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <Text style={styles.menuIcon}>❓</Text>
              <Text style={styles.menuText}>HELP & SUPPORT</Text>
              <Image source={require('../assets/pixel_icon_arrow_right_1778609246785.png')} style={styles.menuArrowImg} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <Image source={require('../assets/pixel_icon_scroll_1778609230685.png')} style={styles.menuIconImg} resizeMode="contain" />
              <Text style={styles.menuText}>TERMS OF SERVICE</Text>
              <Image source={require('../assets/pixel_icon_arrow_right_1778609246785.png')} style={styles.menuArrowImg} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.menuItem, styles.menuItemLast]}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>ℹ️</Text>
              <Text style={styles.menuText}>ABOUT SUGO</Text>
              <Image source={require('../assets/pixel_icon_arrow_right_1778609246785.png')} style={styles.menuArrowImg} resizeMode="contain" />
            </TouchableOpacity>
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.navigate('Landing')}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>LOG OUT</Text>
          </TouchableOpacity>
        </ScrollView>

        <PixelBottomNav active="ACCOUNT" />
      </SafeAreaView>
    </View>
  );
};
