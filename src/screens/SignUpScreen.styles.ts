import { StyleSheet } from 'react-native';

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
    paddingHorizontal: 32,
    justifyContent: 'space-between',
  },
  topSection: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  backArrow: {
    width: 36,
    height: 36,
  },
  title: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 36,
    color: '#1B1F24',
    marginBottom: 4,
    lineHeight: 42,
  },
  subtitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 18,
    color: '#1B1F24',
    marginBottom: 20,
    opacity: 0.85,
  },
  fieldContainer: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    color: '#1B1F24',
    marginBottom: 6,
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    height: 48,
  },
  input: {
    flex: 1,
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#1B1F24',
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 8,
  },
  eyeIcon: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 18,
    color: '#1B1F24',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#7ED9B8',
  },
  checkboxMark: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 12,
    color: '#1B1F24',
  },
  checkboxLabel: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 11,
    color: '#1B1F24',
    flex: 1,
  },
  loginRow: {
    marginTop: 8,
  },
  loginText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    color: '#1B1F24',
  },
  loginLink: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    color: '#1B1F24',
    textDecorationLine: 'underline',
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotActive: {
    backgroundColor: '#1B1F24',
  },
  dotInactive: {
    backgroundColor: '#C0C0C0',
  },
  verifyButton: {
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 48,
    backgroundColor: 'transparent',
  },
  verifyButtonText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
    color: '#1B1F24',
    textAlign: 'center',
  },
});
