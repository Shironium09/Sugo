import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7BC8E8',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
  },
  topSection: {
    flex: 1,
    paddingTop: 24,
  },
  // Icon at top
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  questIconImg: {
    width: 48,
    height: 48,
  },
  title: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 30,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    color: colors.ink,
    marginBottom: 6,
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    height: 48,
  },
  input: {
    flex: 1,
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: colors.ink,
    paddingVertical: 0,
  },
  locationPinImg: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  errorText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 12,
    color: '#FF4444',
    textAlign: 'center',
    marginTop: 8,
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 16,
  },
  confirmButton: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 48,
    backgroundColor: 'transparent',
  },
  confirmButtonText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
    color: colors.ink,
    textAlign: 'center',
  },
});
