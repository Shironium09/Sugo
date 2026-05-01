import React from "react";
import { View, Text, ScrollView } from "react-native";
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
import { styles } from "./CurrentQuestScreen.styles";

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
  const [loadingAction, setLoadingAction] = React.useState<string | null>(null);

  const handleAction = async (
    actionId: string,
    actionFn: () => Promise<void>,
  ) => {
    try {
      setLoadingAction(actionId);
      await actionFn();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAction(null);
    }
  };
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
                title={
                  loadingAction === "claim" ? "Claiming..." : "Claim Quest"
                }
                onPress={() =>
                  handleAction("claim", () => claimQuest(quest.id))
                }
                disabled={loadingAction !== null}
              />
            ))}

          {quest.status === "in_progress" && !quest.fulfillerDone && (
            <PixelButton
              title={loadingAction === "markDone" ? "Updating..." : "Mark Done"}
              onPress={() => handleAction("markDone", () => markDone(quest.id))}
              disabled={loadingAction !== null}
            />
          )}

          {quest.status === "in_progress" &&
            quest.fulfillerDone &&
            !quest.requesterConfirmed && (
              <PixelButton
                title={
                  loadingAction === "confirm"
                    ? "Confirming..."
                    : "Confirm Resolved"
                }
                onPress={() =>
                  handleAction("confirm", () => confirmResolved(quest.id))
                }
                disabled={loadingAction !== null}
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
