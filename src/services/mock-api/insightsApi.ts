import { PrayerInsight, DisciplineTrend } from '../../types/models';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const insightsApi = {
  async getInsights(): Promise<PrayerInsight[]> {
    await delay(1200);
    return [
      {
        id: 'i1',
        type: 'difficulty',
        title: 'Fajr Inconsistency',
        description: 'Fajr becomes inconsistent when you sleep after midnight.',
        actionableAdvice: 'Try setting a wind-down alarm at 10:30 PM.',
        relatedPrayer: 'Fajr',
        dateGenerated: new Date().toISOString()
      },
      {
        id: 'i2',
        type: 'trend',
        title: 'Asr Momentum',
        description: 'Your Asr punctuality has improved by 40% this week.',
        relatedPrayer: 'Asr',
        dateGenerated: new Date().toISOString()
      }
    ];
  },

  async getTrends(): Promise<DisciplineTrend[]> {
    await delay(1000);
    // Mock last 7 days
    const trends: DisciplineTrend[] = [];
    const baseTime = Date.now();
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    for(let i=6; i>=0; i--) {
       trends.push({
         date: new Date(baseTime - i * MS_PER_DAY).toISOString().split('T')[0],
         score: 60 + Math.floor(Math.random() * 30),
         completed: Math.floor(Math.random() * 5) + 1,
         missed: Math.floor(Math.random() * 2),
         jamaah: Math.floor(Math.random() * 3)
       });
    }
    return trends;
  }
};
