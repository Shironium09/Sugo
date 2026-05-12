import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundSection: {
    height: height * 0.22,
    width: width,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingTop: 16,
    alignItems: 'center',
  },
  handle: {
    width: 48,
    height: 5,
    backgroundColor: '#1B1F24',
    borderRadius: 3,
    marginBottom: 24,
  },
  slideContainer: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  slideTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 32,
    color: '#1B1F24',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  slideImage: {
    width: 180,
    height: 180,
    marginVertical: 16,
  },
  slideDescription: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
    color: '#1B1F24',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
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
  getStartedButton: {
    borderWidth: 2,
    borderColor: '#1B1F24',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
  getStartedText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
    color: '#1B1F24',
    textAlign: 'center',
  },
  flatListContent: {
    // No extra padding needed
  },
});
