import { Reflection } from '../../types/models';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const journalApi = {
  async saveReflection(reflection: Reflection): Promise<{ success: boolean; id: string }> {
    await delay(1000);
    return { success: true, id: Math.random().toString(36).substring(7) };
  },

  async getReflections(): Promise<Reflection[]> {
    await delay(1500);
    // Return some mock history
    return [];
  }
};
