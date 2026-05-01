import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Quest, calculateUrgency } from '../data/questStore';
import { styles, urgencyStyles } from './QuestCard.styles';

export const statusLabel: Record<Quest['status'], string> = {
  open: 'Open',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

export const statusColor: Record<Quest['status'], string> = {
  open: '#E3F7F0',
  in_progress: '#FFF2B8',
  resolved: '#F0F0F0',
};

interface QuestCardProps {
  quest: Quest;
  onPress: () => void;
  compact?: boolean;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onPress, compact = false }) => {
  const urgency = calculateUrgency(quest.deadline);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={compact ? 1 : undefined}>
          {quest.title}
        </Text>
        <View style={styles.badges}>
          {!compact && urgency && (
            <View style={[styles.urgencyPill, urgencyStyles[urgency]]}>
              <Text style={styles.urgencyText}>{urgency}</Text>
            </View>
          )}
          <View style={[styles.statusPill, { backgroundColor: statusColor[quest.status] }]}>
            <Text style={styles.statusText}>{statusLabel[quest.status]}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.metaText}>PHP {quest.rewardPhp} - {quest.location}</Text>
      
      {!compact && (
        <>
          <Text style={styles.requesterText}>{quest.requesterName}</Text>
          <Text style={styles.teaserText} numberOfLines={2}>
            {quest.description}
          </Text>
          {quest.tags.length > 0 && (
            <View style={styles.tagRow}>
              {quest.tags.map((tag) => (
                <View key={tag} style={styles.tagBadge}>
                  <Text style={styles.tagBadgeText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
