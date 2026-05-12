import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';

type NavTab = 'HOME' | 'NEARBY' | 'CURRENT' | 'ACCOUNT';

interface Props {
  active: NavTab;
}

export const PixelBottomNav: React.FC<Props> = ({ active }) => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const tabs: { key: NavTab; icon: any; label: string }[] = [
    { key: 'HOME', icon: require('../assets/pixel_icon_home_1778609099460.png'), label: 'HOME' },
    { key: 'NEARBY', icon: require('../assets/pixel_icon_pin_1778609118602.png'), label: 'NEARBY' },
    { key: 'CURRENT', icon: require('../assets/pixel_icon_list_1778609134999.png'), label: 'CURRENT' },
    { key: 'ACCOUNT', icon: require('../assets/pixel_icon_person_1778609151153.png'), label: 'ACCOUNT' },
  ];

  const handlePress = (tab: NavTab) => {
    if (tab === active) return;
    switch (tab) {
      case 'HOME':
        navigation.navigate('Home');
        break;
      case 'NEARBY':
        navigation.navigate('Nearby');
        break;
      case 'CURRENT':
        navigation.navigate('CurrentQuest');
        break;
      case 'ACCOUNT':
        navigation.navigate('Settings');
        break;
    }
  };

  return (
    <View style={[navStyles.bottomNav, { paddingBottom: insets.bottom + 4 }]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={navStyles.navItem}
          onPress={() => handlePress(tab.key)}
        >
          <Image
            source={tab.icon}
            style={[
              navStyles.navIconImg,
              active === tab.key && navStyles.navIconImgActive,
            ]}
            resizeMode="contain"
          />
          <Text
            style={[
              navStyles.navLabel,
              active === tab.key && navStyles.navLabelActive,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

interface SearchProfileHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
}

export const SearchProfileHeader: React.FC<SearchProfileHeaderProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <>
      {/* Search Bar */}
      <View style={navStyles.searchContainer}>
        <View style={navStyles.searchBar}>
          <TextInput
            style={navStyles.searchInput}
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="SEARCH FOR SERVICES NEAR YOU"
            placeholderTextColor="#A0AEBB"
          />
          <Image
            source={require('../assets/pixel_icon_search_1778609165442.png')}
            style={navStyles.searchIconImg}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Profile Section */}
      <View style={navStyles.profileSection}>
        <Image
          source={require('../assets/pixel_avatar.png')}
          style={navStyles.avatar}
          resizeMode="cover"
        />
        <View style={navStyles.profileInfo}>
          <Text style={navStyles.profileName}>JOHN DOE.</Text>
          <Text style={navStyles.profileExp}>EXP: 2769</Text>
        </View>
      </View>
    </>
  );
};

const navStyles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
    borderTopWidth: 2,
    borderTopColor: colors.ink,
    backgroundColor: colors.surface,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 60,
  },
  navIconImg: {
    width: 40,
    height: 40,
    marginBottom: 2,
  },
  navIconImgActive: {
    opacity: 0.5,
  },
  navLabel: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 10,
    color: colors.ink,
  },
  navLabelActive: {
    color: '#7ED9B8',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 20,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    color: colors.ink,
    paddingVertical: 0,
  },
  searchIconImg: {
    width: 32,
    height: 32,
    marginLeft: 8,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#7BC8E8',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 14,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 20,
    color: colors.ink,
  },
  profileExp: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: colors.ink,
    opacity: 0.8,
  },
});
