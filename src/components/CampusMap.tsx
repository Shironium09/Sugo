import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
  PanResponder,
} from 'react-native';
import { colors } from '../theme/colors';

// ─── Marker Data ─────────────────────────────────────────────────────────────────
// To edit a marker's x/y position, update the values in this array.
// Format: { id, x: percentage_from_left, y: percentage_from_top, label, onPress }
export interface MapMarkerData {
  id: string;
  x: number;
  y: number;
  label: string;
  onPress?: () => void;
}

export const MARKERS: MapMarkerData[] = [
  {
    id: 'marker-1',
    x: 28,
    y: 85,
    label: 'Bunzel Building',
    onPress: () => {
      // TODO: connect to quest detail navigation
    },
  },
  {
    id: 'marker-2',
    x: 45,
    y: 17,
    label: 'JB Library',
    onPress: () => {
      // TODO: connect to quest detail navigation
    },
  },
  {
    id: 'marker-4',
    x: 50,
    y: 60,
    label: 'SMED Building',
    onPress: () => {
      // TODO: connect to quest detail navigation
    },
  },
  {
    id: 'marker-5',
    x: 60,
    y: 25,
    label: 'RH Building',
    onPress: () => {
      // TODO: connect to quest detail navigation
    },
  },
  {
    id: 'marker-6',
    x: 35,
    y: 45,
    label: 'SAFAD',
    onPress: () => {
      // TODO: connect to quest detail navigation
    },
  },
  {
    id: 'marker-7',
    x: 33,
    y: 30,
    label: 'MR Building',
    onPress: () => {
      // TODO: connect to quest detail navigation
    },
  },
  {
    id: 'marker-8',
    x: 58,
    y: 35,
    label: 'PE Building',
    onPress: () => {
      // TODO: connect to quest detail navigation
    },
  },
];

// ─── Zoom/Pan Configuration ─────────────────────────────────────────────────────
const DEFAULT_SCALE = 2;
const MIN_SCALE = 1;
const MAX_SCALE = 5;

// ─── Marker ────────────────────────────────────────────────────────────────────────
interface MapMarkerProps {
  marker: MapMarkerData;
  onPress?: (label: string) => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ marker, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.marker,
        {
          left: `${marker.x}%`,
          top: `${marker.y}%`,
        },
      ]}
      onPress={() => onPress?.(marker.label)}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.markerDot} />
      <Text style={styles.markerLabel}>{marker.label}</Text>
    </TouchableOpacity>
  );
};

// ─── CampusMap ─────────────────────────────────────────────────────────────────
interface CampusMapProps {
  markers?: MapMarkerData[];
  onMarkerPress?: (location: string) => void;
}

export const CampusMap: React.FC<CampusMapProps> = ({ markers = MARKERS, onMarkerPress }) => {
  const scaleValue = React.useRef(new Animated.Value(DEFAULT_SCALE)).current;
  const translateXValue = React.useRef(new Animated.Value(0)).current;
  const translateYValue = React.useRef(new Animated.Value(0)).current;

  const currentScale = React.useRef(DEFAULT_SCALE);
  const currentTranslateX = React.useRef(0);
  const currentTranslateY = React.useRef(0);
  const initialPinchDistance = React.useRef(0);
  const initialPinchScale = React.useRef(DEFAULT_SCALE);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        translateXValue.setOffset(currentTranslateX.current);
        translateYValue.setOffset(currentTranslateY.current);
        translateXValue.setValue(0);
        translateYValue.setValue(0);

        const touches = evt.nativeEvent.touches;
        if (touches.length >= 2) {
          const dx = Math.abs(touches[0].pageX - touches[1].pageX);
          const dy = Math.abs(touches[0].pageY - touches[1].pageY);
          initialPinchDistance.current = Math.sqrt(dx * dx + dy * dy);
          initialPinchScale.current = currentScale.current;
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        const touches = evt.nativeEvent.touches;

        if (touches.length >= 2) {
          const dx = Math.abs(touches[0].pageX - touches[1].pageX);
          const dy = Math.abs(touches[0].pageY - touches[1].pageY);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (initialPinchDistance.current > 0) {
            const rawScale =
              (distance / initialPinchDistance.current) * initialPinchScale.current;
            const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, rawScale));
            scaleValue.setValue(newScale - currentScale.current);
          }
        } else {
          const maxPanX = (currentScale.current - 1) * 200;
          const maxPanY = (currentScale.current - 1) * 150;

          const tx = Math.max(-maxPanX, Math.min(maxPanX, gestureState.dx));
          const ty = Math.max(-maxPanY, Math.min(maxPanY, gestureState.dy));

          translateXValue.setValue(tx);
          translateYValue.setValue(ty);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        scaleValue.flattenOffset();
        translateXValue.flattenOffset();
        translateYValue.flattenOffset();

        currentScale.current = scaleValue.__getValue();
        currentTranslateX.current += gestureState.dx;
        currentTranslateY.current += gestureState.dy;

        if (currentScale.current < MIN_SCALE) {
          currentScale.current = MIN_SCALE;
          Animated.spring(scaleValue, { toValue: MIN_SCALE, useNativeDriver: true }).start();
        } else if (currentScale.current > MAX_SCALE) {
          currentScale.current = MAX_SCALE;
          Animated.spring(scaleValue, { toValue: MAX_SCALE, useNativeDriver: true }).start();
        }

        const maxPanX = (currentScale.current - 1) * 200;
        const maxPanY = (currentScale.current - 1) * 150;
        let snapped = false;

        if (currentTranslateX.current > maxPanX) {
          currentTranslateX.current = maxPanX;
          snapped = true;
        } else if (currentTranslateX.current < -maxPanX) {
          currentTranslateX.current = -maxPanX;
          snapped = true;
        }

        if (currentTranslateY.current > maxPanY) {
          currentTranslateY.current = maxPanY;
          snapped = true;
        } else if (currentTranslateY.current < -maxPanY) {
          currentTranslateY.current = -maxPanY;
          snapped = true;
        }

        if (snapped) {
          Animated.spring(translateXValue, {
            toValue: currentTranslateX.current,
            useNativeDriver: true,
          }).start();
          Animated.spring(translateYValue, {
            toValue: currentTranslateY.current,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const animatedStyle = {
    transform: [
      { translateX: translateXValue },
      { translateY: translateYValue },
      { scale: scaleValue },
    ],
  };

  return (
    <View style={styles.mapContainer}>
      <Animated.View
        style={[styles.gestureContent, animatedStyle]}
        {...panResponder.panHandlers}
      >
        <Image
          source={require('../../assets/map.png')}
          style={styles.mapImage}
          resizeMode="contain"
        />
        {markers.map((marker) => (
          <MapMarker key={marker.id} marker={marker} onPress={onMarkerPress} />
        ))}
      </Animated.View>
    </View>
  );
};

// ─── Styles ────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.ink,
    backgroundColor: colors.surfaceBlueDark,
  },
  gestureContent: {
    flex: 1,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  markerDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.ink,
  },
  markerLabel: {
    marginTop: 2,
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 10,
    color: colors.ink,
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
});
