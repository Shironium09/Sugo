import React from 'react';

export type QuestStatus = 'open' | 'in_progress' | 'resolved';
export type VerificationStatus = 'not_started' | 'pending' | 'verified';
export type PaymentStatus = 'not_started' | 'pending' | 'paid';
export type QuestTag = 'Printing' | 'Food' | 'Queue' | 'Admin' | 'Other';
export type UrgencyLevel = 'High' | 'Medium' | 'Low' | null;

export const ALL_TAGS: QuestTag[] = ['Printing', 'Food', 'Queue', 'Admin', 'Other'];

export type Quest = {
  id: string;
  title: string;
  description: string;
  location: string;
  rewardPhp: number;
  status: QuestStatus;
  requesterName: string;
  requesterId: string;
  fulfillerName: string | null;
  fulfillerDone: boolean;
  requesterConfirmed: boolean;
  verificationStatus: VerificationStatus;
  paymentStatus: PaymentStatus;
  tags: QuestTag[];
  deadline: string | null; // ISO string
  createdAt: string;
  updatedAt: string;
};

export type CreateQuestInput = {
  title: string;
  description: string;
  location: string;
  rewardPhp: number;
  tags: QuestTag[];
  deadline: string | null;
};

/** Maps time-to-deadline to urgency tier. Returns null if no deadline. */
export const calculateUrgency = (deadline: string | null): UrgencyLevel => {
  if (!deadline) return null;
  const msRemaining = Date.parse(deadline) - Date.now();
  if (msRemaining <= 0) return 'High';
  const hoursRemaining = msRemaining / (1000 * 60 * 60);
  if (hoursRemaining < 1) return 'High';
  if (hoursRemaining < 4) return 'Medium';
  return 'Low';
};

export type FilterState = {
  sort: 'recency' | 'urgency';
  tags: QuestTag[];
};

type QuestStore = {
  quests: Quest[];
  /** The currently in-progress quest claimed by the user, or null if none. */
  activeQuest: Quest | null;
  /** True when any quest has status 'in_progress'. Derived from activeQuest. */
  hasActiveQuest: boolean;
  createQuest: (input: CreateQuestInput) => Promise<string>;
  claimQuest: (questId: string) => Promise<void>;
  markDone: (questId: string) => Promise<void>;
  confirmResolved: (questId: string) => Promise<void>;
  filterQuests: (filters: FilterState) => Promise<Quest[]>;
};

const QuestStoreContext = React.createContext<QuestStore | undefined>(undefined);

import { AsyncStorageQuestRepository } from './AsyncStorageQuestRepository';

export const QuestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quests, setQuests] = React.useState<Quest[]>([]);
  
  const repo = React.useMemo(() => new AsyncStorageQuestRepository(), []);

  const refreshQuests = React.useCallback(async () => {
    const data = await repo.getQuests();
    setQuests(data);
  }, [repo]);

  React.useEffect(() => {
    refreshQuests();
  }, [refreshQuests]);

  const createQuest = React.useCallback(async (input: CreateQuestInput) => {
    const newId = await repo.createQuest(input);
    await refreshQuests();
    return newId;
  }, [repo, refreshQuests]);

  const claimQuest = React.useCallback(async (questId: string) => {
    await repo.claimQuest(questId);
    await refreshQuests();
  }, [repo, refreshQuests]);

  const markDone = React.useCallback(async (questId: string) => {
    await repo.markDone(questId);
    await refreshQuests();
  }, [repo, refreshQuests]);

  const confirmResolved = React.useCallback(async (questId: string) => {
    await repo.confirmResolved(questId);
    await refreshQuests();
  }, [repo, refreshQuests]);

  const filterQuests = React.useCallback(async (filters: FilterState): Promise<Quest[]> => {
    return repo.filterQuests(filters);
  }, [repo]);

  const value = React.useMemo(() => {
    const activeQuest = quests.find((q) => q.status === 'in_progress') ?? null;
    return {
      quests,
      activeQuest,
      hasActiveQuest: activeQuest !== null,
      createQuest,
      claimQuest,
      markDone,
      confirmResolved,
      filterQuests,
    };
  }, [quests, createQuest, claimQuest, markDone, confirmResolved, filterQuests]);

  return <QuestStoreContext.Provider value={value}>{children}</QuestStoreContext.Provider>;
};

export const useQuestStore = () => {
  const context = React.useContext(QuestStoreContext);

  if (!context) {
    throw new Error('useQuestStore must be used within QuestProvider');
  }

  return context;
};
