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
  createQuest: (input: CreateQuestInput) => string;
  claimQuest: (questId: string) => void;
  markDone: (questId: string) => void;
  confirmResolved: (questId: string) => void;
  filterQuests: (filters: FilterState) => Quest[];
};

const QuestStoreContext = React.createContext<QuestStore | undefined>(undefined);

const isoNow = () => new Date().toISOString();

const seedQuests: Quest[] = [
  {
    id: 'quest-1001',
    title: 'Print thesis pages',
    description: 'Need 10 pages printed in color. Pickup at Main Library desk.',
    location: 'Main Library',
    rewardPhp: 50,
    status: 'open',
    requesterName: 'Andrea C.',
    requesterId: '241303175',
    fulfillerName: null,
    fulfillerDone: false,
    requesterConfirmed: false,
    verificationStatus: 'not_started',
    paymentStatus: 'not_started',
    tags: ['Printing'],
    deadline: new Date(Date.now() + 1000 * 60 * 45).toISOString(), // 45 min
    createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
  {
    id: 'quest-1002',
    title: 'Grab coffee',
    description: 'Pick up one iced coffee from the student cafe. No extras.',
    location: 'Student Cafe',
    rewardPhp: 35,
    status: 'in_progress',
    requesterName: 'Miguel R.',
    requesterId: '239112458',
    fulfillerName: 'You',
    fulfillerDone: false,
    requesterConfirmed: false,
    verificationStatus: 'pending',
    paymentStatus: 'pending',
    tags: ['Food'],
    deadline: new Date(Date.now() + 1000 * 60 * 20).toISOString(), // 20 min
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: 'quest-1003',
    title: 'Deliver textbook to Science Building',
    description: 'Bring organic chemistry textbook to Room 215. Professor needs it ASAP.',
    location: 'Science Building',
    rewardPhp: 75,
    status: 'open',
    requesterName: 'Prof. Santos',
    requesterId: '240005632',
    fulfillerName: null,
    fulfillerDone: false,
    requesterConfirmed: false,
    verificationStatus: 'not_started',
    paymentStatus: 'not_started',
    tags: ['Admin'],
    deadline: new Date(Date.now() + 1000 * 60 * 30).toISOString(), // 30 min
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'quest-1004',
    title: 'Scan documents',
    description: 'Scan 25 pages of handwritten notes and email as PDF.',
    location: 'IT Center',
    rewardPhp: 45,
    status: 'open',
    requesterName: 'Jamie K.',
    requesterId: '239887654',
    fulfillerName: null,
    fulfillerDone: false,
    requesterConfirmed: false,
    verificationStatus: 'not_started',
    paymentStatus: 'not_started',
    tags: ['Printing', 'Admin'],
    deadline: new Date(Date.now() + 1000 * 60 * 180).toISOString(), // 3 hrs
    createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
  },
  {
    id: 'quest-1005',
    title: 'Pick up lab samples',
    description: 'Collect chemistry lab samples from the prep room. Meet outside at 2pm.',
    location: 'Chemistry Lab',
    rewardPhp: 60,
    status: 'open',
    requesterName: 'Alex T.',
    requesterId: '238945123',
    fulfillerName: null,
    fulfillerDone: false,
    requesterConfirmed: false,
    verificationStatus: 'not_started',
    paymentStatus: 'not_started',
    tags: ['Queue'],
    deadline: new Date(Date.now() + 1000 * 60 * 300).toISOString(), // 5 hrs
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: 'quest-1006',
    title: 'Buy snacks for study group',
    description: 'Get 6 energy drinks and some snacks from the convenience store.',
    location: 'C-Store',
    rewardPhp: 200,
    status: 'open',
    requesterName: 'Ryan M.',
    requesterId: '240112234',
    fulfillerName: null,
    fulfillerDone: false,
    requesterConfirmed: false,
    verificationStatus: 'not_started',
    paymentStatus: 'not_started',
    tags: ['Food'],
    deadline: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'quest-1007',
    title: 'Return library books',
    description: 'Return 4 books to the main desk. I have a late fee due.',
    location: 'Main Library',
    rewardPhp: 25,
    status: 'open',
    requesterName: 'Emma L.',
    requesterId: '239654321',
    fulfillerName: null,
    fulfillerDone: false,
    requesterConfirmed: false,
    verificationStatus: 'not_started',
    paymentStatus: 'not_started',
    tags: ['Admin'],
    deadline: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'quest-1008',
    title: 'Tech support - fix laptop',
    description: 'Help debug my laptop. Something is wrong with the keyboard driver.',
    location: 'Dorm C',
    rewardPhp: 80,
    status: 'open',
    requesterName: 'Jordan P.',
    requesterId: '240445678',
    fulfillerName: null,
    fulfillerDone: false,
    requesterConfirmed: false,
    verificationStatus: 'not_started',
    paymentStatus: 'not_started',
    tags: ['Other'],
    deadline: new Date(Date.now() + 1000 * 60 * 50).toISOString(), // 50 min
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
];

export const QuestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quests, setQuests] = React.useState<Quest[]>(seedQuests);

  const createQuest = React.useCallback((input: CreateQuestInput) => {
    const now = isoNow();
    const newQuest: Quest = {
      id: `quest-${Date.now()}`,
      title: input.title,
      description: input.description,
      location: input.location,
      rewardPhp: input.rewardPhp,
      status: 'open',
      requesterName: 'You',
      requesterId: '240000000',
      fulfillerName: null,
      fulfillerDone: false,
      requesterConfirmed: false,
      verificationStatus: 'not_started',
      paymentStatus: 'not_started',
      tags: input.tags,
      deadline: input.deadline,
      createdAt: now,
      updatedAt: now,
    };

    setQuests((prev) => [newQuest, ...prev]);
    return newQuest.id;
  }, []);

  const claimQuest = React.useCallback((questId: string) => {
    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.id !== questId || quest.status !== 'open') {
          return quest;
        }

        return {
          ...quest,
          status: 'in_progress',
          fulfillerName: 'You',
          verificationStatus: 'pending',
          updatedAt: isoNow(),
        };
      })
    );
  }, []);

  const markDone = React.useCallback((questId: string) => {
    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.id !== questId || quest.status !== 'in_progress' || quest.fulfillerDone) {
          return quest;
        }

        return {
          ...quest,
          fulfillerDone: true,
          verificationStatus: 'verified',
          paymentStatus: quest.paymentStatus === 'not_started' ? 'pending' : quest.paymentStatus,
          updatedAt: isoNow(),
        };
      })
    );
  }, []);

  const confirmResolved = React.useCallback((questId: string) => {
    setQuests((prev) =>
      prev.map((quest) => {
        if (
          quest.id !== questId ||
          quest.status !== 'in_progress' ||
          !quest.fulfillerDone ||
          quest.requesterConfirmed
        ) {
          return quest;
        }

        return {
          ...quest,
          requesterConfirmed: true,
          status: 'resolved',
          paymentStatus: 'paid',
          updatedAt: isoNow(),
        };
      })
    );
  }, []);

  const filterQuests = React.useCallback((filters: FilterState): Quest[] => {
    const openQuests = quests.filter((q) => q.status === 'open');

    // Apply tag filter
    const tagFiltered =
      filters.tags.length === 0
        ? openQuests
        : openQuests.filter((q) => filters.tags.some((t) => q.tags.includes(t)));

    // Apply sort
    if (filters.sort === 'urgency') {
      const urgencyOrder: Record<string, number> = { High: 0, Medium: 1, Low: 2 };
      return [...tagFiltered].sort((a, b) => {
        const ua = calculateUrgency(a.deadline) ?? 'Low';
        const ub = calculateUrgency(b.deadline) ?? 'Low';
        const diff = (urgencyOrder[ua] ?? 2) - (urgencyOrder[ub] ?? 2);
        if (diff !== 0) return diff;
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      });
    }

    // Default: recency
    return [...tagFiltered].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }, [quests]);

  const value = React.useMemo(
    () => ({ quests, createQuest, claimQuest, markDone, confirmResolved, filterQuests }),
    [quests, createQuest, claimQuest, markDone, confirmResolved, filterQuests]
  );

  return <QuestStoreContext.Provider value={value}>{children}</QuestStoreContext.Provider>;
};

export const useQuestStore = () => {
  const context = React.useContext(QuestStoreContext);

  if (!context) {
    throw new Error('useQuestStore must be used within QuestProvider');
  }

  return context;
};
