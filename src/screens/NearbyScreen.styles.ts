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
  // Map section
  mapContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 16,
    overflow: 'hidden',
    height: 220,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapExpandButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapExpandIcon: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: colors.ink,
  },
  // Nearby list
  nearbyContainer: {
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
  nearbyTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 22,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 12,
  },
  nearbyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  nearbyItemLast: {
    borderBottomWidth: 0,
  },
  nearbyIconImg: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginTop: 2,
  },
  nearbyText: {
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
  emptyText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: colors.inkMuted,
    textAlign: 'center',
    paddingVertical: 16,
  },
});
