import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PixelButton } from '../components/PixelButton';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Quest, useQuestStore } from '../data/questStore';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const statusLabel: Record<Quest['status'], string> = {
  open: 'Open',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { quests } = useQuestStore();
  const [isCurrentExpanded, setIsCurrentExpanded] = React.useState(false);

  const availableQuests = React.useMemo(
    () => quests.filter((quest) => quest.status !== 'resolved'),
    [quests]
  );

  const sortedQuests = React.useMemo(
    () => [...availableQuests].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)),
    [availableQuests]
  );

  const currentQuest = React.useMemo(
    () => sortedQuests.find((quest) => quest.status === 'in_progress') ?? null,
    [sortedQuests]
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Available Quests</Text>
        <Text style={styles.sortText}>Sort: Newest</Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No quests yet</Text>
      <Text style={styles.emptyBody}>Create the first quest to start the feed.</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Quest }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CurrentQuest', { questId: item.id })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{statusLabel[item.status]}</Text>
        </View>
      </View>
      <Text style={styles.metaText}>PHP {item.rewardPhp} - {item.location}</Text>
      <Text style={styles.requesterText}>{item.requesterName} - {item.requesterId}</Text>
      <Text style={styles.teaserText} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View style={styles.content}>
        <View style={styles.mapPanel}>
          <View style={styles.currentQuestSection}>
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
                {currentQuest ? (
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
                ) : (
                  <Text style={styles.currentQuestEmpty}>
                    No active quest yet. Claim one from the feed or create a new quest.
                  </Text>
                )}
              </View>
            )}
          </View>
          <View style={styles.mapSurface}>
            <Text style={styles.mapLabel}>Minimal Campus Map (Mock)</Text>
          </View>
        </View>
        <View style={styles.listPanel}>
          <FlatList<Quest>
            data={sortedQuests}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
      <BottomNav navigation={navigation} active="Home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F7FF',
  },
  content: {
    flex: 1,
  },
  mapPanel: {
    flex: 0.4,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#EAF3FF',
    borderBottomWidth: 2,
    borderBottomColor: '#1B1F24',
  },
  currentQuestSection: {
    marginBottom: 12,
  },
  mapSurface: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 16,
    backgroundColor: '#DDEBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapLabel: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 11,
    color: '#1B1F24',
    textAlign: 'center',
  },
  currentQuestPill: {
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#FFF2B8',
    width: '100%',
  },
  currentQuestPillTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 12,
    color: '#1B1F24',
    marginBottom: 4,
  },
  currentQuestPillHint: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 11,
    color: '#58616B',
  },
  currentQuestExpanded: {
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  currentQuestTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    marginBottom: 6,
    color: '#1B1F24',
  },
  currentQuestMeta: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 13,
    color: '#58616B',
    marginBottom: 6,
  },
  currentQuestBody: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 13,
    color: '#1B1F24',
    lineHeight: 20,
    marginBottom: 10,
  },
  currentQuestEmpty: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 13,
    color: '#58616B',
    lineHeight: 20,
  },
  listPanel: {
    flex: 0.6,
  },
  listContent: {
    padding: 20,
  },
  header: {
    marginBottom: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 18,
    color: '#1B1F24',
  },
  sortText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 11,
    color: '#58616B',
  },
  emptyState: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1B1F24',
    backgroundColor: '#FFFFFF',
  },
  emptyTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    marginBottom: 8,
    color: '#1B1F24',
  },
  emptyBody: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 13,
    color: '#58616B',
  },
  card: {
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  cardTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    flex: 1,
    marginRight: 8,
    color: '#1B1F24',
  },
  statusPill: {
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#E3F7F0',
  },
  statusText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 9,
    color: '#1B1F24',
  },
  metaText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 13,
    color: '#58616B',
    marginBottom: 6,
  },
  requesterText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 12,
    color: '#7A8793',
    marginBottom: 6,
  },
  teaserText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 13,
    color: '#1B1F24',
    lineHeight: 20,
  },
});
