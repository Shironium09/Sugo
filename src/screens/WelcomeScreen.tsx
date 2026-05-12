import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { styles } from './WelcomeScreen.styles';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image?: any;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Welcome to\nSugo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: '2',
    title: 'Convenience\nis the Goal',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    image: require('../assets/onboarding_checkmark.png'),
  },
  {
    id: '3',
    title: 'Guaranteed on\nTrust',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    image: require('../assets/onboarding_handshake.png'),
  },
];

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slideContainer}>
      <Text style={styles.slideTitle}>{item.title}</Text>
      {item.image && (
        <Image source={item.image} style={styles.slideImage} resizeMode="contain" />
      )}
      <Text style={styles.slideDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Sky background section */}
      <ImageBackground
        source={require('../assets/SIDEQUEST_BACKGROUND.png')}
        style={styles.backgroundSection}
        resizeMode="cover"
      >
        {/* Just shows the top of the background image */}
      </ImageBackground>

      {/* Bottom sheet with onboarding content */}
      <View style={styles.bottomSheet}>
        {/* Handle bar */}
        <View style={styles.handle} />

        {/* Swipeable slides */}
        <FlatList
          ref={flatListRef}
          data={SLIDES}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.flatListContent}
        />

        {/* Pagination dots */}
        <View style={styles.paginationContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Get Started button */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.7}
        >
          <Text style={styles.getStartedText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
