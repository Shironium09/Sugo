import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
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
    fontSize: 24,
    marginBottom: 20,
    color: colors.ink,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    marginBottom: 8,
    color: colors.ink,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 16,
    color: colors.ink,
    backgroundColor: colors.surface,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  errorText: {
    fontFamily: 'IBMPlexMono-Regular',
    color: colors.error,
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
    color: colors.ink,
    marginBottom: 12,
    textAlign: 'center',
  },
  lockedText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 16,
    color: colors.inkMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
});
