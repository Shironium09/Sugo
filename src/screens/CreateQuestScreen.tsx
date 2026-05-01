import * as React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PixelButton } from '../components/PixelButton';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useQuestStore } from '../data/questStore';
import { AppShell } from '../components/AppShell';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateQuest'>;

export const CreateQuestScreen: React.FC<Props> = ({ navigation }) => {
  const { quests, createQuest, activeQuest, hasActiveQuest } = useQuestStore();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [rewardPhp, setRewardPhp] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    if (!description.trim()) {
      setError('Description is required.');
      return;
    }

    if (!location.trim()) {
      setError('Location is required.');
      return;
    }

    const rewardValue = Number(rewardPhp);
    if (!Number.isFinite(rewardValue) || rewardValue <= 0) {
      setError('Reward must be a number greater than 0.');
      return;
    }

    const newId = createQuest({
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      rewardPhp: rewardValue,
    });

    setTitle('');
    setDescription('');
    setLocation('');
    setRewardPhp('');
    setError(null);
    navigation.navigate('CurrentQuest', { questId: newId });
  };

  if (hasActiveQuest) {
    return (
      <AppShell navigation={navigation} active="CreateQuest">
        <View style={styles.lockedContainer}>
          <Ionicons name="lock-closed" size={48} color="#1B1F24" style={{ marginBottom: 16 }} />
          <Text style={styles.lockedTitle}>Quest in Progress</Text>
          <Text style={styles.lockedText}>
            You must resolve your current quest before you can request a new one. This ensures everyone gets their tasks done!
          </Text>
          {activeQuest && (
            <PixelButton
              title="View Current Quest"
              onPress={() => navigation.navigate('CurrentQuest', { questId: activeQuest.id })}
              style={styles.viewQuestButton}
            />
          )}
        </View>
      </AppShell>
    );
  }

  return (
    <AppShell navigation={navigation} active="CreateQuest">
      <ScrollView contentContainerStyle={styles.content}>
        <PixelButton title="Back" onPress={() => navigation.goBack()} style={styles.backButton} />
        <Text style={styles.title}>Create Quest</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Print thesis pages"
            placeholderTextColor="#7A8793"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="What needs to be done?"
            placeholderTextColor="#7A8793"
            style={[styles.input, styles.textArea]}
            multiline
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Main Library"
            placeholderTextColor="#7A8793"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Reward (PHP)</Text>
          <TextInput
            value={rewardPhp}
            onChangeText={setRewardPhp}
            placeholder="50"
            placeholderTextColor="#7A8793"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <PixelButton title="Create Quest" onPress={handleSubmit} />
        <PixelButton variant="ghost" title="Back to Feed" onPress={() => navigation.navigate('Home')} />
      </ScrollView>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    minWidth: 0,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 24, // bumped from 16 — clear dominance over label (12) and input (12)
    marginBottom: 20,
    color: '#1B1F24',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14, // raised from 12
    marginBottom: 8,
    color: '#1B1F24',
  },
  input: {
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 16,
    color: '#1B1F24',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  errorText: {
    fontFamily: 'IBMPlexMono-Regular',
    color: '#B42318',
    marginBottom: 12,
    fontSize: 14,
  },
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  viewQuestButton: {
    marginTop: 24,
    alignSelf: 'stretch',
  },
  lockedTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 24,
    color: '#1B1F24',
    marginBottom: 12,
    textAlign: 'center',
  },
  lockedText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 16,
    color: '#58616B',
    textAlign: 'center',
    lineHeight: 24,
  },
});
