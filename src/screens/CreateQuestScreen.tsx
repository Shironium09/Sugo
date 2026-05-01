import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PixelButton } from '../components/PixelButton';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useQuestStore } from '../data/questStore';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateQuest'>;

export const CreateQuestScreen: React.FC<Props> = ({ navigation }) => {
  const { createQuest } = useQuestStore();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [rewardPhp, setRewardPhp] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = () => {
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

    createQuest({
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
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
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
        <PixelButton title="Back to Feed" onPress={() => navigation.navigate('Home')} />
      </ScrollView>
      <BottomNav navigation={navigation} active="CreateQuest" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F7FF',
  },
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
    fontSize: 16,
    marginBottom: 20,
    color: '#1B1F24',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 10,
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
    fontSize: 12,
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
    fontSize: 12,
  },
});
