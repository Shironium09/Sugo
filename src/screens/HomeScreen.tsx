import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { FilterState, Quest, useQuestStore } from '../data/questStore';
import { AppShell } from '../components/AppShell';
import { FilterChips } from '../components/FilterChips';
import { QuestCard } from '../components/QuestCard';
import { styles } from './HomeScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { filterQuests } = useQuestStore();
  const [filters, setFilters] = React.useState<FilterState>({ sort: 'recency', tags: [] });
  const [sortedQuests, setSortedQuests] = React.useState<Quest[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    filterQuests(filters).then(data => {
      if (mounted) {
        setSortedQuests(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [filters, filterQuests]);

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
