import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const urgencyStyles = StyleSheet.create({
  High: { backgroundColor: colors.urgencyHighBgAlt, borderColor: colors.urgencyHighBorder },
  Medium: { backgroundColor: colors.urgencyMediumBg, borderColor: colors.urgencyMediumBorder },
  Low: { backgroundColor: colors.urgencyLowBg, borderColor: colors.urgencyLowBorder },
});

export const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    backgroundColor: colors.surface,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: colors.ink,
    flex: 1,
    marginRight: 8,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
  },
  statusPill: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 9,
    color: colors.ink,
  },
  urgencyPill: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  urgencyText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 9,
    color: colors.ink,
  },
  metaText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 12,
    color: colors.inkMuted,
  },
  requesterText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 10,
    color: colors.inkSubtle,
    marginTop: 4,
  },
  teaserText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 11,
    color: colors.inkMuted,
    marginTop: 8,
    lineHeight: 16,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
  tagBadge: {
    backgroundColor: colors.surfaceTag,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  tagBadgeText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 9,
    color: colors.inkMuted,
  },
});
