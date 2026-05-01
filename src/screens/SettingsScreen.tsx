import React from 'react';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Quest, useQuestStore } from '../data/questStore';
import { AppShell } from '../components/AppShell';
import { QuestCard } from '../components/QuestCard';
import { styles } from './SettingsScreen.styles';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

const MOCK_USER = {
  name: 'You',
  id: '240000000',
  email: 'you@usc.edu.ph',
};

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { quests } = useQuestStore();

  // Quests this user posted (resolved only = history)
  const myPostedHistory = React.useMemo(
    () => quests.filter((q) => q.requesterId === MOCK_USER.id && q.status === 'resolved'),
    [quests]
  );

  // Quests this user fulfilled (resolved only = history)
  const myFulfilledHistory = React.useMemo(
    () => quests.filter((q) => q.fulfillerName === MOCK_USER.name && q.status === 'resolved'),
    [quests]
  );

  const historyData: { title: string; data: Quest[] }[] = [
    { title: 'Quests I Posted', data: myPostedHistory },
    { title: 'Quests I Fulfilled', data: myFulfilledHistory },
  ];

  const renderQuestCard = ({ item }: { item: Quest }) => (
    <QuestCard
      quest={item}
      onPress={() => navigation.navigate('CurrentQuest', { questId: item.id })}
      compact
    />
  );

  return (
    <AppShell navigation={navigation} active="Settings" hideOverlay>
      <SectionList
        sections={historyData}
        keyExtractor={(item) => item.id}
        renderItem={renderQuestCard}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        renderSectionFooter={({ section: { data } }) => (
          <View style={styles.section}>
            {data.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Nothing here yet.</Text>
              </View>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.identityCard}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>{MOCK_USER.name[0]}</Text>
            </View>
            <View style={styles.identityInfo}>
              <Text style={styles.identityName}>{MOCK_USER.name}</Text>
              <Text style={styles.identityMeta}>{MOCK_USER.email}</Text>
              <Text style={styles.identityMeta}>ID: {MOCK_USER.id}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.navigate('Landing')}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
      />
    </AppShell>
  );
};
