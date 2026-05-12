import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -60,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 48,
    color: '#1B1F24',
    textAlign: 'center',
    letterSpacing: 4,
  },
  tagline: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 22,
    color: '#1B1F24',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 30,
    paddingHorizontal: 40,
  },
});
