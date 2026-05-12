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
    flexGrow: 1,
    paddingBottom: 16,
  },
  questInfoHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 4,
    gap: 8,
  },
  questInfoHeader: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 26,
    color: '#5CC6D0',
  },
  questIconImg: {
    width: 28,
    height: 28,
  },
  // Map section
  mapContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
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
  // Requester section
  sectionLabel: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 22,
    color: '#5CC6D0',
    textAlign: 'center',
    marginBottom: 8,
  },
  requesterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 10,
  },
  requesterAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  requesterName: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 20,
    color: colors.ink,
  },
  detailValue: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 22,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 12,
  },
  // Quest Info standalone (from Nearby)
  questInfoContainer: {
    flex: 1,
    backgroundColor: '#7BC8E8',
  },
  questInfoSafeArea: {
    flex: 1,
  },
  questInfoContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
  },
  questInfoTopSection: {
    flex: 1,
    paddingTop: 16,
  },
  questInfoIcon: {
    alignItems: 'center',
    marginBottom: 16,
  },
  questInfoTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 28,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 16,
  },
  questInfoMapContainer: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 16,
    overflow: 'hidden',
    height: 180,
    marginBottom: 20,
    position: 'relative',
  },
  questInfoRequesterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 10,
  },
  questInfoRequesterAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  questInfoRequesterName: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 18,
    color: colors.ink,
  },
  questInfoDetail: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 20,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 28,
  },
  questInfoDetailBold: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 20,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 28,
  },
  acceptButton: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 48,
    backgroundColor: 'transparent',
  },
  acceptButtonText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
    color: colors.ink,
    textAlign: 'center',
  },
  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 28,
    color: colors.ink,
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 32,
  },
  findButton: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 48,
    backgroundColor: 'transparent',
  },
  findButtonText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
    color: colors.ink,
    textAlign: 'center',
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 16,
  },
  // Not found
  notFoundWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  notFoundText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 20,
    color: colors.ink,
    textAlign: 'center',
  },
  completeButton: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 48,
    backgroundColor: '#7ED9B8',
  },
  completeButtonText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
    color: colors.ink,
    textAlign: 'center',
  },
});
