import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { FilterState, Quest, calculateUrgency, useQuestStore } from '../data/questStore';
import { AppShell } from '../components/AppShell';
import { FilterChips } from '../components/FilterChips';

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

// Explicit map avoids the silent-failure pattern of styles[`urgency${urgency}`]
// If a new UrgencyLevel is ever added, TS will flag this as incomplete.
const urgencyStyles = {
  High: { backgroundColor: '#FFD0D0' },
  Medium: { backgroundColor: '#FFF2B8' },
  Low: { backgroundColor: '#E3F7F0' },
} as const;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { filterQuests } = useQuestStore();
  const [filters, setFilters] = React.useState<FilterState>({ sort: 'recency', tags: [] });

  const sortedQuests = React.useMemo(
    () => filterQuests(filters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters, filterQuests]
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Available Quests</Text>
      <FilterChips filters={filters} onChange={setFilters} />
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No quests yet</Text>
      <Text style={styles.emptyBody}>Create the first quest to start the feed.</Text>
    </View>
  );

  const renderItem = React.useCallback(
    ({ item }: { item: Quest }) => {
      const urgency = calculateUrgency(item.deadline);
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CurrentQuest', { questId: item.id })}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.badges}>
              {urgency && (
                <View style={[styles.urgencyPill, urgencyStyles[urgency]]}>
                  <Text style={styles.urgencyText}>{urgency}</Text>
                </View>
              )}
              <View style={[styles.statusPill, { backgroundColor: statusColor[item.status] }]}>
                <Text style={styles.statusText}>{statusLabel[item.status]}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.metaText}>PHP {item.rewardPhp} - {item.location}</Text>
          <Text style={styles.requesterText}>{item.requesterName}</Text>
          <Text style={styles.teaserText} numberOfLines={2}>
            {item.description}
          </Text>
          {item.tags.length > 0 && (
            <View style={styles.tagRow}>
              {item.tags.map((tag) => (
                <View key={tag} style={styles.tagBadge}>
                  <Text style={styles.tagBadgeText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>
      );
    },
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
            stickyHeaderIndices={[0]}
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
    fontSize: 14,
    color: '#1B1F24',
    textAlign: 'center',
  },
  listPanel: {
    flex: 0.6,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: '#F1F7FF',
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 20,
    marginHorizontal: -20,
  },
  title: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 24,
    color: '#1B1F24',
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
    fontSize: 18,
    marginBottom: 8,
    color: '#1B1F24',
  },
  emptyBody: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 14,
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
    fontSize: 18,
    flex: 1,
    marginRight: 8,
    color: '#1B1F24',
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  urgencyPill: {
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  urgencyHigh: { backgroundColor: '#FFD0D0' },
  urgencyMedium: { backgroundColor: '#FFF2B8' },
  urgencyLow: { backgroundColor: '#E3F7F0' },
  urgencyText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 11,
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
    fontSize: 11,
    color: '#1B1F24',
  },
  metaText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 14,
    color: '#58616B',
    marginBottom: 6,
  },
  requesterText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 13,
    color: '#7A8793',
    marginBottom: 6,
  },
  teaserText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 14,
    color: '#1B1F24',
    lineHeight: 22,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 2,
  },
  tagBadge: {
    borderWidth: 1,
    borderColor: '#A0AEBB',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
    backgroundColor: '#EAF3FF',
  },
  tagBadgeText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 11,
    color: '#3A5070',
  },
});
