import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import { Quest, useQuestStore } from '../data/questStore';
import { AppHeader } from './AppHeader';
import { BottomNav } from './BottomNav';
import { PixelButton } from './PixelButton';
import { colors } from '../theme/colors';

type AppShellNavigation = NativeStackNavigationProp<AppStackParamList>;

type Props = {
  navigation: AppShellNavigation;
  active?: 'Home' | 'CreateQuest' | 'Settings';
  children: React.ReactNode;
  hideOverlay?: boolean;
  onBack?: () => void;
};

export const AppShell: React.FC<Props> = ({ navigation, active, children, hideOverlay = false, onBack }) => {
  const { quests } = useQuestStore();
  const [isCurrentExpanded, setIsCurrentExpanded] = React.useState(false);

  const currentQuest = React.useMemo(
    () => quests.find((quest: Quest) => quest.status === 'in_progress') ?? null,
    [quests]
  );

  React.useEffect(() => {
    if (!currentQuest) setIsCurrentExpanded(false);
  }, [currentQuest]);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader onBack={onBack} />
      <View style={styles.body}>
        {children}
        {!hideOverlay && currentQuest && (
          <View style={styles.currentQuestOverlay} pointerEvents="box-none">
            <TouchableOpacity
              style={styles.currentQuestPill}
              onPress={() => setIsCurrentExpanded((prev) => !prev)}
            >
              <Text style={styles.currentQuestPillTitle}>Current Quest</Text>
              <Text style={styles.currentQuestPillHint}>
                {isCurrentExpanded ? 'Tap to collapse' : 'Tap to expand'}
              </Text>
            </TouchableOpacity>
            {isCurrentExpanded && (
              <View style={styles.currentQuestExpanded}>
                <>
                  <Text style={styles.currentQuestTitle}>{currentQuest.title}</Text>
                  <Text style={styles.currentQuestMeta}>
                    PHP {currentQuest.rewardPhp} - {currentQuest.location}
                  </Text>
                  <Text style={styles.currentQuestBody} numberOfLines={2}>
                    {currentQuest.description}
                  </Text>
                  <PixelButton
                    title="Open Current Quest"
                    onPress={() => navigation.navigate('CurrentQuest', { questId: currentQuest.id })}
                  />
                </>
              </View>
            )}
          </View>
        )}
      </View>
      <BottomNav navigation={navigation} active={active} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    position: 'relative',
  },
  currentQuestOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 4,
  },
  currentQuestPill: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 0,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 242, 184, 0.9)',
  },
  currentQuestPillTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 12,
    color: colors.ink,
    marginBottom: 4,
  },
  currentQuestPillHint: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 11,
    color: colors.inkMuted,
  },
  currentQuestExpanded: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: 20,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: colors.ink,
    borderRadius: 0,
  },
  currentQuestTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    marginBottom: 6,
    color: colors.ink,
  },
  currentQuestMeta: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 13,
    color: colors.inkMuted,
    marginBottom: 6,
  },
  currentQuestBody: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 13,
    color: colors.ink,
    lineHeight: 20,
    marginBottom: 10,
  },
});
