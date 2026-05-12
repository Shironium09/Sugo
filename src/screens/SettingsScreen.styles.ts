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
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  // Profile card
  profileCard: {
    alignItems: 'center',
    paddingVertical: 28,
    marginBottom: 12,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.ink,
    overflow: 'hidden',
    marginBottom: 14,
    backgroundColor: '#7BC8E8',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 28,
    color: colors.ink,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: colors.inkMuted,
    marginBottom: 2,
  },
  profileId: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    color: colors.inkSubtle,
  },
  // Stats row
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 18,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 24,
    color: colors.ink,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 12,
    color: colors.inkMuted,
  },
  statDivider: {
    width: 2,
    backgroundColor: colors.ink,
    marginVertical: 4,
  },
  // Menu section
  sectionTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 15,
    color: colors.inkMuted,
    marginBottom: 8,
    marginTop: 8,
    letterSpacing: 1,
  },
  menuCard: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 16,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 24,
    marginRight: 14,
  },
  menuIconImg: {
    width: 36,
    height: 36,
    marginRight: 14,
  },
  menuText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
    color: colors.ink,
    flex: 1,
  },
  menuArrow: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 18,
    color: colors.inkSubtle,
  },
  menuArrowImg: {
    width: 24,
    height: 24,
  },
  // Logout
  logoutButton: {
    borderWidth: 2,
    borderColor: '#FF6B6B',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 8,
    marginBottom: 8,
  },
  logoutText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 18,
    color: '#FF6B6B',
  },
  // History section
  historyTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 18,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 10,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  historyItemLast: {
    borderBottomWidth: 0,
  },
  historyIconImg: {
    width: 32,
    height: 32,
    marginRight: 10,
    marginTop: 1,
  },
  historyText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: colors.ink,
    flex: 1,
    lineHeight: 20,
  },
  emptyText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: colors.inkSubtle,
    textAlign: 'center',
    paddingVertical: 16,
  },
});
