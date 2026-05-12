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
    marginBottom: 32,
  },
  backArrow: {
    width: 36,
    height: 36,
  },
  title: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 40,
    color: '#1B1F24',
    marginBottom: 32,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#1B1F24',
    marginBottom: 8,
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
    height: 50,
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
    marginTop: 8,
    marginBottom: 12,
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
    fontSize: 12,
    color: '#1B1F24',
  },
  signUpRow: {
    marginTop: 4,
  },
  signUpText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    color: '#1B1F24',
  },
  signUpLink: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 13,
    color: '#1B1F24',
    textDecorationLine: 'underline',
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  loginButton: {
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 48,
    backgroundColor: 'transparent',
  },
  loginButtonText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
    color: '#1B1F24',
    textAlign: 'center',
  },
});
