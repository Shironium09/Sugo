import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PixelButton } from "../components/PixelButton";
import { RootStackParamList } from "../navigation/AppNavigator";
import {
  PaymentStatus,
  Quest,
  useQuestStore,
  VerificationStatus,
} from "../data/questStore";
import { AppShell } from "../components/AppShell";

type Props = NativeStackScreenProps<RootStackParamList, "CurrentQuest">;

const verificationLabel: Record<VerificationStatus, string> = {
  not_started: "Not started",
  pending: "Pending",
  verified: "Verified",
};

const paymentLabel: Record<PaymentStatus, string> = {
  not_started: "Not started",
  pending: "Pending",
  paid: "Paid",
};

export const CurrentQuestScreen: React.FC<Props> = ({ navigation, route }) => {
  const { quests, claimQuest, markDone, confirmResolved } = useQuestStore();
  const quest = React.useMemo(
    () => quests.find((item: Quest) => item.id === route.params.questId),
    [quests, route.params.questId],
  );

  const hasActiveQuest = React.useMemo(
    () => quests.some((q) => q.status === "in_progress"),
    [quests],
  );

  const progressSteps = React.useMemo(
    () => [
      { id: "posted", label: "Request posted", done: true },
      { id: "claimed", label: "Quest claimed", done: quest?.status !== "open" },
      {
        id: "in_progress",
        label: "Task in progress",
        done: quest?.status !== "open",
      },
      {
        id: "fulfiller_done",
        label: "Fulfiller marked done",
        done: quest?.fulfillerDone,
      },
      {
        id: "requester_confirmed",
        label: "Requester confirmed",
        done: quest?.requesterConfirmed,
      },
    ],
    [quest],
  );

  if (!quest) {
    return (
      <AppShell
        navigation={navigation}
        active="Home"
        hideOverlay
        onBack={() => navigation.goBack()}
      >
        <View style={styles.notFoundWrapper}>
          <View style={styles.notFoundCard}>
            <Text style={styles.title}>Quest not found</Text>
            <Text style={styles.bodyText}>
              Head back to the feed and pick another quest.
            </Text>
          </View>
        </View>
      </AppShell>
    );
  }

  return (
    <AppShell
      navigation={navigation}
      active="Home"
      hideOverlay
      onBack={() => navigation.goBack()}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{quest.title}</Text>
        <Text style={styles.subTitle}>
          PHP {quest.rewardPhp} - {quest.location}
        </Text>
        <Text style={styles.bodyText}>{quest.description}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          <Text style={styles.metaText}>
            Quest: {quest.status.replace("_", " ")}
          </Text>
          <Text style={styles.metaText}>
            Verification: {verificationLabel[quest.verificationStatus]}
          </Text>
          <Text style={styles.metaText}>
            Payment: {paymentLabel[quest.paymentStatus]}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completion</Text>
          <Text style={styles.metaText}>
            Fulfiller done: {quest.fulfillerDone ? "Yes" : "No"}
          </Text>
          <Text style={styles.metaText}>
            Requester confirmed: {quest.requesterConfirmed ? "Yes" : "No"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress Steps (Mock)</Text>
          {progressSteps.map((step, index) => (
            <View key={step.id} style={styles.stepRow}>
              <View
                style={[
                  styles.stepDot,
                  step.done ? styles.stepDotDone : styles.stepDotPending,
                ]}
              />
              <Text style={styles.stepText}>
                {index + 1}. {step.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          {quest.status === "open" &&
            (hasActiveQuest ? (
              <View style={styles.claimLockedNotice}>
                <Text style={styles.claimLockedText}>
                  You already have an active quest. Resolve it before claiming
                  another.
                </Text>
              </View>
            ) : (
              <PixelButton
                title="Claim Quest"
                onPress={() => claimQuest(quest.id)}
              />
            ))}

          {quest.status === "in_progress" && !quest.fulfillerDone && (
            <PixelButton title="Mark Done" onPress={() => markDone(quest.id)} />
          )}

          {quest.status === "in_progress" &&
            quest.fulfillerDone &&
            !quest.requesterConfirmed && (
              <PixelButton
                title="Confirm Resolved"
                onPress={() => confirmResolved(quest.id)}
              />
            )}

          {quest.status === "resolved" && (
            <View style={styles.resolvedBadge}>
              <Text style={styles.resolvedText}>Quest resolved</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  title: {
    fontFamily: "PixelifySans-Regular",
    fontSize: 24,
    marginBottom: 8,
    color: "#1B1F24",
  },
  subTitle: {
    fontFamily: "IBMPlexMono-Regular",
    fontSize: 14,
    color: "#58616B",
    marginBottom: 12,
  },
  bodyText: {
    fontFamily: "IBMPlexMono-Regular",
    fontSize: 15,
    color: "#1B1F24",
    lineHeight: 22,
  },
  section: {
    marginTop: 18,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#1B1F24",
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontFamily: "PixelifySans-Regular",
    fontSize: 14,
    marginBottom: 8,
    color: "#1B1F24",
  },
  metaText: {
    fontFamily: "IBMPlexMono-Regular",
    fontSize: 14,
    color: "#58616B",
    marginBottom: 6,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#1B1F24",
    marginRight: 8,
  },
  stepDotDone: {
    backgroundColor: "#1B1F24",
  },
  stepDotPending: {
    backgroundColor: "#FFFFFF",
  },
  stepText: {
    fontFamily: "IBMPlexMono-Regular",
    fontSize: 14,
    color: "#1B1F24",
  },
  actions: {
    marginTop: 18,
    marginBottom: 8,
  },
  resolvedBadge: {
    borderWidth: 2,
    borderColor: "#1B1F24",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#E3F7F0",
    alignItems: "center",
  },
  resolvedText: {
    fontFamily: "PixelifySans-Regular",
    fontSize: 14,
    color: "#1B1F24",
  },
  claimLockedNotice: {
    borderWidth: 2,
    borderColor: "#1B1F24",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FFF2B8",
  },
  claimLockedText: {
    fontFamily: "IBMPlexMono-Regular",
    fontSize: 14,
    color: "#58616B",
    lineHeight: 20,
  },
  notFoundWrapper: {
    flex: 1,
    paddingTop: 20,
  },
  notFoundCard: {
    padding: 20,
    margin: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#1B1F24",
    backgroundColor: "#FFFFFF",
  },
});
