import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 24,
    marginBottom: 8,
    color: colors.ink,
  },
  subTitle: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 14,
    color: colors.inkMuted,
    marginBottom: 12,
  },
  bodyText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 15,
    color: colors.ink,
    lineHeight: 22,
  },
  section: {
    marginTop: 18,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.ink,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    marginBottom: 8,
    color: colors.ink,
  },
  metaText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 14,
    color: colors.inkMuted,
    marginBottom: 6,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.ink,
    marginRight: 8,
  },
  stepDotDone: {
    backgroundColor: colors.ink,
  },
  stepDotPending: {
    backgroundColor: colors.surface,
  },
  stepText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 14,
    color: colors.ink,
  },
  actions: {
    marginTop: 18,
    marginBottom: 8,
  },
  resolvedBadge: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.accentMint,
    alignItems: 'center',
  },
  resolvedText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: colors.ink,
  },
  claimLockedNotice: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.warning,
  },
  claimLockedText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 14,
    color: colors.inkMuted,
    lineHeight: 20,
  },
  notFoundWrapper: {
    flex: 1,
    paddingTop: 20,
  },
  notFoundCard: {
    padding: 20,
    margin: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.ink,
    backgroundColor: colors.surface,
  },
});
