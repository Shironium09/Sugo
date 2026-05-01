import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Quest, useQuestStore } from '../data/questStore';
import { AppShell } from '../components/AppShell';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

const MOCK_USER = {
  name: 'You',
  id: '240000000',
  email: 'you@usc.edu.ph',
};

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

  const historyData: { section: string; data: Quest[] }[] = [
    { section: 'Quests I Posted', data: myPostedHistory },
    { section: 'Quests I Fulfilled', data: myFulfilledHistory },
  ];

  const renderQuestCard = (item: Quest) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => navigation.navigate('CurrentQuest', { questId: item.id })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <View style={[styles.statusPill, { backgroundColor: statusColor[item.status] }]}>
          <Text style={styles.statusText}>{statusLabel[item.status]}</Text>
        </View>
      </View>
      <Text style={styles.metaText}>PHP {item.rewardPhp} - {item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <AppShell navigation={navigation} active="Settings" hideOverlay>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <View>
            {/* Identity Card */}
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

            {/* History sections */}
            {historyData.map(({ section, data }) => (
              <View key={section} style={styles.section}>
                <Text style={styles.sectionTitle}>{section}</Text>
                {data.length === 0 ? (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>Nothing here yet.</Text>
                  </View>
                ) : (
                  data.map(renderQuestCard)
                )}
              </View>
            ))}

            {/* Logout */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => navigation.navigate('Landing')}
            >
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </AppShell>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  identityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
    gap: 14,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#1B1F24',
    backgroundColor: '#EAF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 24,
    color: '#1B1F24',
  },
  identityInfo: {
    flex: 1,
  },
  identityName: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
    color: '#1B1F24',
    marginBottom: 4,
  },
  identityMeta: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 11,
    color: '#58616B',
    lineHeight: 17,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#1B1F24',
    marginBottom: 10,
  },
  card: {
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    color: '#1B1F24',
    flex: 1,
    marginRight: 8,
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
    fontSize: 12,
    color: '#58616B',
  },
  emptyState: {
    borderWidth: 2,
    borderColor: '#D0D8E0',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#F8FBFF',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 13,
    color: '#7A8793',
  },
  logoutButton: {
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#FFF2B8',
    marginTop: 8,
  },
  logoutText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    color: '#1B1F24',
  },
});
