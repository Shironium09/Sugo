import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ALL_TAGS, FilterState, QuestTag } from "../data/questStore";
import { colors } from "../theme/colors";

type Props = {
  filters: FilterState;
  onChange: (next: FilterState) => void;
};

export const FilterChips: React.FC<Props> = ({ filters, onChange }) => {
  const [showTags, setShowTags] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, right: 0 });
  const filterButtonRef = useRef<View>(null);

  const toggleSort = () => {
    const nextSort = filters.sort === "recency" ? "urgency" : "recency";
    onChange({ ...filters, sort: nextSort });
  };

  const toggleTag = (tag: QuestTag) => {
    const isActive = filters.tags.includes(tag);
    const nextTags = isActive
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onChange({ ...filters, tags: nextTags });
  };

  const handleFilterPress = () => {
    if (!showTags) {
      // Measure the button's absolute screen position before opening the modal,
      // so we can position the popover card correctly inside the fullscreen overlay.
      filterButtonRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        const windowWidth = Dimensions.get("window").width;
        setPopoverPos({
          top: pageY + height + 8,
          right: windowWidth - pageX - width,
        });
        setShowTags(true);
      });
    } else {
      setShowTags(false);
    }
  };

  const activeTagsCount = filters.tags.length;

  return (
    <View style={styles.container}>
      {/* Sort toggle */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.iconButton}
        onPress={toggleSort}
      >
        <Ionicons
          name={filters.sort === "recency" ? "time" : "flash"}
          size={18}
          color={colors.ink}
        />
      </TouchableOpacity>

      {/* Filter opener — ref'd for absolute position measurement */}
      <TouchableOpacity
        ref={filterButtonRef}
        activeOpacity={0.7}
        style={styles.iconButton}
        onPress={handleFilterPress}
      >
        <Ionicons
          name={activeTagsCount > 0 ? "funnel" : "funnel-outline"}
          size={18}
          color={colors.ink}
        />
        {activeTagsCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{activeTagsCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/*
        Modal-based popover — lifted fully out of the FlatList/sticky header tree.
        This avoids Android z-index/elevation races and iOS overflow clipping issues.
        The backdrop Pressable dismisses the popover on tap outside the card.
      */}
      <Modal
        transparent
        visible={showTags}
        animationType="none"
        onRequestClose={() => setShowTags(false)}
      >
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={() => setShowTags(false)}
        />
        <View
          style={[
            styles.popoverCard,
            { top: popoverPos.top, right: popoverPos.right },
          ]}
        >
          <View style={styles.popoverNub} />
          <View style={styles.popoverHeader}>
            <Text style={styles.popoverTitle}>Filter by Category</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowTags(false)}
            >
              <Ionicons name="close" size={20} color={colors.ink} />
            </TouchableOpacity>
          </View>
          <View style={styles.tagsGrid}>
            {ALL_TAGS.map((tag) => {
              const isActive = filters.tags.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  activeOpacity={0.7}
                  style={[styles.tagChip, isActive && styles.tagChipActive]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text
                    style={[
                      styles.tagChipText,
                      isActive && styles.tagChipTextActive,
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {activeTagsCount > 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.clearButton}
              onPress={() => onChange({ ...filters, tags: [] })}
            >
              <Text style={styles.clearButtonText}>Clear All Filters</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    // No position:"relative" or zIndex needed — popover lives in a Modal now
  },
  iconButton: {
    width: 40, // bumped from 36 — closer to 44px WCAG touch target
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.ink,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: colors.urgencyHighBg,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontFamily: "PixelifySans-Regular",
    fontSize: 11,
    color: colors.ink,
  },
  popoverCard: {
    // Absolute within the Modal's fullscreen transparent view
    position: "absolute",
    width: 260,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.ink,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  popoverNub: {
    position: "absolute",
    top: -7,
    right: 11,
    width: 12,
    height: 12,
    backgroundColor: colors.surface,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.ink,
    transform: [{ rotate: "-45deg" }],
  },
  popoverHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  popoverTitle: {
    fontFamily: "PixelifySans-Regular",
    fontSize: 18,
    color: colors.ink,
  },
  tagsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tagChip: {
    borderWidth: 2,
    borderColor: colors.borderSubtle,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10, // bumped from 6 — meets ~44px vertical tap area
    backgroundColor: colors.surface,
  },
  tagChipActive: {
    borderColor: colors.ink,
    backgroundColor: colors.surfaceBlue,
  },
  tagChipText: {
    fontFamily: "IBMPlexMono-Regular",
    fontSize: 14,
    color: colors.inkMuted,
  },
  tagChipTextActive: {
    color: colors.ink,
  },
  clearButton: {
    marginTop: 16,
    alignItems: "center",
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 12,
    backgroundColor: colors.warning,
  },
  clearButtonText: {
    fontFamily: "PixelifySans-Regular",
    fontSize: 14,
    color: colors.ink,
  },
});
