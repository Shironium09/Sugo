import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ALL_TAGS, FilterState, QuestTag } from "../data/questStore";

type Props = {
  filters: FilterState;
  onChange: (next: FilterState) => void;
};

export const FilterChips: React.FC<Props> = ({ filters, onChange }) => {
  const [showTags, setShowTags] = useState(false);

  const toggleSort = () => {
    const nextSort = filters.sort === "recency" ? "urgency" : "recency";
    onChange({ ...filters, sort: nextSort });
  };

  const toggleTag = (tag: QuestTag) => {
    const active = filters.tags.includes(tag);
    const next = active
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onChange({ ...filters, tags: next });
  };

  const activeTagsCount = filters.tags.length;

  return (
    <View style={[styles.container, { zIndex: 100 }]}>
      {/* Sort Icon */}
      <TouchableOpacity style={styles.iconButton} onPress={toggleSort}>
        <Ionicons
          name={filters.sort === "recency" ? "time" : "flash"}
          size={18}
          color="#1B1F24"
        />
      </TouchableOpacity>

      {/* Filter Icon */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => setShowTags(!showTags)}
      >
        <Ionicons
          name={activeTagsCount > 0 ? "funnel" : "funnel-outline"}
          size={18}
          color="#1B1F24"
        />
        {activeTagsCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{activeTagsCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Floating Tags Popover */}
      {showTags && (
        <View style={styles.popoverCard}>
          <View style={styles.popoverNub} />
          <View style={styles.popoverHeader}>
            <Text style={styles.popoverTitle}>Filter by Category</Text>
            <TouchableOpacity onPress={() => setShowTags(false)}>
              <Ionicons name="close" size={20} color="#1B1F24" />
            </TouchableOpacity>
          </View>
          <View style={styles.tagsGrid}>
            {ALL_TAGS.map((tag) => {
              const active = filters.tags.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  style={[styles.tagChip, active && styles.tagChipActive]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text
                    style={[
                      styles.tagChipText,
                      active && styles.tagChipTextActive,
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
              style={styles.clearButton}
              onPress={() => onChange({ ...filters, tags: [] })}
            >
              <Text style={styles.clearButtonText}>Clear All Filters</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    position: "relative",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#1B1F24",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#FFD0D0",
    borderWidth: 2,
    borderColor: "#1B1F24",
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontFamily: "PixelifySans-Regular",
    fontSize: 9,
    color: "#1B1F24",
  },
  popoverCard: {
    position: "absolute",
    top: 52,
    right: 0,
    width: 260,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#1B1F24",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#1B1F24",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
    zIndex: 999,
  },
  popoverNub: {
    position: "absolute",
    top: -7,
    right: 11,
    width: 12,
    height: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "#1B1F24",
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
    fontSize: 14,
    color: "#1B1F24",
  },
  tagsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tagChip: {
    borderWidth: 2,
    borderColor: "#D0D8E0",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
  },
  tagChipActive: {
    borderColor: "#1B1F24",
    backgroundColor: "#EAF3FF",
  },
  tagChipText: {
    fontFamily: "IBMPlexMono-Regular",
    fontSize: 11,
    color: "#58616B",
  },
  tagChipTextActive: {
    color: "#1B1F24",
  },
  clearButton: {
    marginTop: 24,
    alignItems: "center",
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: "#1B1F24",
    borderRadius: 12,
    backgroundColor: "#FFF2B8",
  },
  clearButtonText: {
    fontFamily: "PixelifySans-Regular",
    fontSize: 11,
    color: "#1B1F24",
  },
});
