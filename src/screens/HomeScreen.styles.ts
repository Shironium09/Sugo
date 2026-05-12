import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  // Action buttons
  actionContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 16,
    backgroundColor: colors.surface,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  actionIconImg: {
    width: 56,
    height: 56,
  },
  actionText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 22,
    color: colors.ink,
  },
  // History section
  historyContainer: {
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 16,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    marginBottom: 8,
  },
  historyTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 22,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  historyItemLast: {
    borderBottomWidth: 0,
  },
  historyIconImg: {
    width: 36,
    height: 36,
    marginRight: 10,
    marginTop: 0,
  },
  historyText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    color: colors.ink,
    flex: 1,
    lineHeight: 20,
  },
  seeMoreButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  seeMoreText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: colors.ink,
    textDecorationLine: 'underline',
  },
  emptyHistory: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: colors.inkMuted,
    textAlign: 'center',
    paddingVertical: 16,
  },
});
