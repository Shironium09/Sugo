import React, { createContext, useContext, useState, useCallback } from 'react';

export interface SugoQuest {
  id: string;
  requester: string;
  request: string;
  description: string;
  location: string;
  distance: string;
  payment: number;
  status: 'available' | 'active' | 'completed';
  createdAt: number;
}

export interface HistoryEntry {
  id: string;
  time: string;
  text: string;
}

interface SugoContextType {
  availableQuests: SugoQuest[];
  activeQuest: SugoQuest | null;
  history: HistoryEntry[];
  acceptQuest: (questId: string) => void;
  completeQuest: () => void;
  createQuest: (quest: Omit<SugoQuest, 'id' | 'status' | 'createdAt'>) => void;
}

const SugoContext = createContext<SugoContextType | null>(null);

const INITIAL_QUESTS: SugoQuest[] = [
  {
    id: '1',
    requester: 'NINO CAL.',
    request: 'DELIVERING',
    description: 'Deliver a package to the nearby barangay hall.',
    location: 'NASIPIT, TALAMBAN',
    distance: '10KM',
    payment: 200,
    status: 'available',
    createdAt: Date.now() - 86400000,
  },
  {
    id: '2',
    requester: 'BRYCE MAT.',
    request: 'CAR WASH',
    description: 'Wash and detail a sedan parked at the garage.',
    location: 'LILOAN',
    distance: '2KM',
    payment: 300,
    status: 'available',
    createdAt: Date.now() - 172800000,
  },
  {
    id: '3',
    requester: 'ERIC SAN.',
    request: 'CLEANING',
    description: 'General house cleaning for 2-bedroom apartment.',
    location: 'MANDAUE',
    distance: '7KM',
    payment: 250,
    status: 'available',
    createdAt: Date.now() - 259200000,
  },
];

const INITIAL_HISTORY: HistoryEntry[] = [
  { id: 'h1', time: '2D', text: "ACCEPTED NINO'S QUEST" },
  { id: 'h2', time: '3W', text: "ACCEPTED BRYCE'S QUEST" },
  { id: 'h3', time: '3W', text: 'BOOKED A "CLEANING" QUEST' },
  { id: 'h4', time: '1M', text: "ACCEPTED ERIC'S QUEST" },
  { id: 'h5', time: '1M', text: 'BOOKED A "WALKING THE DOG" QUEST' },
];

export const SugoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [availableQuests, setAvailableQuests] =
    useState<SugoQuest[]>(INITIAL_QUESTS);
  const [activeQuest, setActiveQuest] = useState<SugoQuest | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);

  const acceptQuest = useCallback(
    (questId: string) => {
      const quest = availableQuests.find((q) => q.id === questId);
      if (!quest) return;

      // Remove from available, set as active
      setAvailableQuests((prev) => prev.filter((q) => q.id !== questId));
      setActiveQuest({ ...quest, status: 'active' });

      // Add to history
      setHistory((prev) => [
        {
          id: `h-${Date.now()}`,
          time: 'NOW',
          text: `ACCEPTED ${quest.requester}'S QUEST`,
        },
        ...prev,
      ]);
    },
    [availableQuests],
  );

  const completeQuest = useCallback(() => {
    if (!activeQuest) return;

    // Add completion to history
    setHistory((prev) => [
      {
        id: `h-${Date.now()}`,
        time: 'NOW',
        text: `COMPLETED "${activeQuest.request}" QUEST`,
      },
      ...prev,
    ]);

    setActiveQuest(null);
  }, [activeQuest]);

  const createQuest = useCallback(
    (quest: Omit<SugoQuest, 'id' | 'status' | 'createdAt'>) => {
      const newQuest: SugoQuest = {
        ...quest,
        id: `q-${Date.now()}`,
        status: 'available',
        createdAt: Date.now(),
      };
      setAvailableQuests((prev) => [newQuest, ...prev]);

      // Add to history
      setHistory((prev) => [
        {
          id: `h-${Date.now()}`,
          time: 'NOW',
          text: `BOOKED A "${quest.request}" QUEST`,
        },
        ...prev,
      ]);
    },
    [],
  );

  return (
    <SugoContext.Provider
      value={{
        availableQuests,
        activeQuest,
        history,
        acceptQuest,
        completeQuest,
        createQuest,
      }}
    >
      {children}
    </SugoContext.Provider>
  );
};

export const useSugo = (): SugoContextType => {
  const context = useContext(SugoContext);
  if (!context) {
    throw new Error('useSugo must be used within a SugoProvider');
  }
  return context;
};
