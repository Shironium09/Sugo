import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { FilterState, Quest, useQuestStore } from '../data/questStore';
import { AppShell } from '../components/AppShell';
import { FilterChips } from '../components/FilterChips';
import { QuestCard } from '../components/QuestCard';
import { CampusMap } from '../components/CampusMap';
import { styles } from './HomeScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { filterQuests } = useQuestStore();
  const [filters, setFilters] = React.useState<FilterState>({ sort: 'recency', tags: [] });
  const [locationFilter, setLocationFilter] = React.useState<string | null>(null);
  const [sortedQuests, setSortedQuests] = React.useState<Quest[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    filterQuests(filters).then(data => {
      if (mounted) {
        setSortedQuests(locationFilter ? data.filter(q => q.location === locationFilter) : data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [filters, filterQuests, locationFilter]);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Available Quests</Text>
      {locationFilter && (
        <View style={styles.locationFilterTag}>
          <Text style={styles.locationFilterText}>{locationFilter}</Text>
          <Text style={styles.clearFilter} onPress={() => setLocationFilter(null)}> x</Text>
        </View>
      )}
      <FilterChips filters={filters} onChange={setFilters} />
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>{locationFilter ? `No quests at ${locationFilter}` : 'No quests yet'}</Text>
      <Text style={styles.emptyBody}>{locationFilter ? 'Try another location or clear the filter.' : 'Create the first quest to start the feed.'}</Text>
      {locationFilter && (
        <Text style={styles.clearFilter} onPress={() => setLocationFilter(null)}>Clear filter</Text>
      )}
    </View>
  );

  const renderItem = React.useCallback(
    ({ item }: { item: Quest }) => (
      <QuestCard
        quest={item}
        onPress={() => navigation.navigate('CurrentQuest', { questId: item.id })}
      />
    ),
    [navigation]
  );

  return (
    <AppShell navigation={navigation} active="Home">
      <View style={styles.content}>
        <View style={styles.mapPanel}>
          <CampusMap onMarkerPress={(location) => setLocationFilter(prev => prev === location ? null : location)} />
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
