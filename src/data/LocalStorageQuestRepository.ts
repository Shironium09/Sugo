import { IQuestRepository } from './IQuestRepository';
import { Quest, CreateQuestInput, FilterState, calculateUrgency } from './questStore';

type StorageAdapter = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem?: (key: string) => void;
};

const STORAGE_KEY = 'sugo_quests';

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
    deadline: new Date(Date.now() + 1000 * 60 * 45).toISOString(),
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
    deadline: new Date(Date.now() + 1000 * 60 * 20).toISOString(),
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
    deadline: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
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
    deadline: new Date(Date.now() + 1000 * 60 * 180).toISOString(),
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
    deadline: new Date(Date.now() + 1000 * 60 * 300).toISOString(),
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
    deadline: new Date(Date.now() + 1000 * 60 * 50).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
];

const createMemoryAdapter = (): StorageAdapter => {
  const memoryStore: Record<string, string> = {};
  return {
    getItem: (key) => (key in memoryStore ? memoryStore[key] : null),
    setItem: (key, value) => {
      memoryStore[key] = value;
    },
  };
};

const resolveStorage = (): StorageAdapter => {
  if (typeof globalThis === 'undefined') return createMemoryAdapter();
  const maybeStorage = (globalThis as { localStorage?: StorageAdapter }).localStorage;
  if (!maybeStorage) return createMemoryAdapter();

  try {
    const testKey = '__sugo_storage_test__';
    maybeStorage.setItem(testKey, '1');
    maybeStorage.removeItem?.(testKey);
    return maybeStorage;
  } catch {
    return createMemoryAdapter();
  }
};

export class LocalStorageQuestRepository implements IQuestRepository {
  private storage: StorageAdapter;

  constructor() {
    this.storage = resolveStorage();
  }

  async getQuests(): Promise<Quest[]> {
    try {
      const data = this.storage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }

      await this.saveQuests(seedQuests);
      return seedQuests;
    } catch (e) {
      console.error('Error reading quests from local storage', e);
      return [];
    }
  }

  private async saveQuests(quests: Quest[]): Promise<void> {
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(quests));
    } catch (e) {
      console.error('Error saving quests to local storage', e);
    }
  }

  async createQuest(input: CreateQuestInput): Promise<string> {
    const quests = await this.getQuests();
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

    quests.unshift(newQuest);
    await this.saveQuests(quests);
    return newQuest.id;
  }

  async claimQuest(questId: string): Promise<void> {
    const quests = await this.getQuests();
    let updated = false;
    const newQuests = quests.map((quest) => {
      if (quest.id === questId && quest.status === 'open') {
        updated = true;
        return {
          ...quest,
          status: 'in_progress' as const,
          fulfillerName: 'You',
          verificationStatus: 'pending' as const,
          updatedAt: isoNow(),
        };
      }
      return quest;
    });

    if (updated) {
      await this.saveQuests(newQuests);
    }
  }

  async markDone(questId: string): Promise<void> {
    const quests = await this.getQuests();
    let updated = false;
    const newQuests = quests.map((quest) => {
      if (quest.id === questId && quest.status === 'in_progress' && !quest.fulfillerDone) {
        updated = true;
        return {
          ...quest,
          fulfillerDone: true,
          verificationStatus: 'verified' as const,
          paymentStatus: quest.paymentStatus === 'not_started' ? 'pending' : quest.paymentStatus,
          updatedAt: isoNow(),
        };
      }
      return quest;
    });

    if (updated) {
      await this.saveQuests(newQuests);
    }
  }

  async confirmResolved(questId: string): Promise<void> {
    const quests = await this.getQuests();
    let updated = false;
    const newQuests = quests.map((quest) => {
      if (quest.id === questId && quest.status === 'in_progress' && quest.fulfillerDone && !quest.requesterConfirmed) {
        updated = true;
        return {
          ...quest,
          requesterConfirmed: true,
          status: 'resolved' as const,
          paymentStatus: 'paid' as const,
          updatedAt: isoNow(),
        };
      }
      return quest;
    });

    if (updated) {
      await this.saveQuests(newQuests);
    }
  }

  async filterQuests(filters: FilterState): Promise<Quest[]> {
    const quests = await this.getQuests();
    const openQuests = quests.filter((q) => q.status === 'open');

    const tagFiltered =
      filters.tags.length === 0
        ? openQuests
        : openQuests.filter((q) => filters.tags.some((t) => q.tags.includes(t)));

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

    return [...tagFiltered].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }
}
