import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Quest, useQuestStore } from '../data/questStore';
import { AppShell } from '../components/AppShell';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const statusLabel: Record<Quest['status'], string> = {
  open: 'Open',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

const statusColor: Record<Quest['status'], string> = {
  open: '#E3F7F0',
  in_progress: '#FFF2B8',
  resolved: '#F0F0F0',
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { quests } = useQuestStore();

  const availableQuests = React.useMemo(
    () => quests.filter((quest) => quest.status === 'open'),
    [quests]
  );

  const sortedQuests = React.useMemo(
    () => [...availableQuests].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)),
    [availableQuests]
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

  const renderItem = React.useCallback(
    ({ item }: { item: Quest }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CurrentQuest', { questId: item.id })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={[styles.statusPill, { backgroundColor: statusColor[item.status] }]}>
            <Text style={styles.statusText}>{statusLabel[item.status]}</Text>
          </View>
        </View>
        <Text style={styles.metaText}>PHP {item.rewardPhp} - {item.location}</Text>
        <Text style={styles.requesterText}>{item.requesterName}</Text>
        <Text style={styles.teaserText} numberOfLines={2}>
          {item.description}
        </Text>
      </TouchableOpacity>
    ),
    [navigation]
  );

  return (
    <AppShell navigation={navigation} active="Home">
      <View style={styles.content}>
        <View style={styles.mapPanel}>
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
    </AppShell>
  );
};

const styles = StyleSheet.create({
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
