import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CAMPUS_LOCATIONS } from '../data/questStore';
import { colors } from '../theme/colors';

interface LocationPickerProps {
  value: string;
  onChange: (location: string) => void;
  placeholder?: string;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  value,
  onChange,
  placeholder = 'Select location',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (location: string) => {
    onChange(location);
    setIsOpen(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.trigger} onPress={() => setIsOpen(true)} activeOpacity={0.7}>
        <Text style={value ? styles.triggerText : styles.triggerPlaceholder}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={colors.ink} />
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setIsOpen(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setIsOpen(false)}>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Select Location</Text>
            <FlatList
              data={CAMPUS_LOCATIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, value === item && styles.optionSelected]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.optionText, value === item && styles.optionTextSelected]}>
                    {item}
                  </Text>
                  {value === item && (
                    <Ionicons name="checkmark" size={20} color={colors.accentMint} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.surface,
  },
  triggerText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 16,
    color: colors.ink,
  },
  triggerPlaceholder: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 16,
    color: '#7A8793',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  panel: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 16,
    width: '100%',
    maxHeight: 400,
    paddingVertical: 16,
  },
  panelTitle: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 20,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGhost,
  },
  optionSelected: {
    backgroundColor: '#E3F7F0',
  },
  optionText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 16,
    color: colors.ink,
  },
  optionTextSelected: {
    fontWeight: '600',
  },
});