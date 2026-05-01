import { Quest, CreateQuestInput, FilterState } from './questStore';

export interface IQuestRepository {
  getQuests(): Promise<Quest[]>;
  createQuest(input: CreateQuestInput): Promise<string>;
  claimQuest(questId: string): Promise<void>;
  markDone(questId: string): Promise<void>;
  confirmResolved(questId: string): Promise<void>;
  filterQuests(filters: FilterState): Promise<Quest[]>;
}
