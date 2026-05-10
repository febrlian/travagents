import { create } from 'zustand';

interface DisciplineMetrics {
  score: number; // 0 - 99
  streak: number;
  recoveriesAvailable: number;
  earlyCheckIns: number;
}

interface DisciplineStore {
  metrics: DisciplineMetrics;
  recordCheckIn: (isEarly: boolean, isJamaah: boolean, isRecovery: boolean) => void;
  resetScore: () => void;
}

export const useDisciplineStore = create<DisciplineStore>((set) => ({
  metrics: {
    score: 65, // Starting score
    streak: 0,
    recoveriesAvailable: 3,
    earlyCheckIns: 0,
  },

  recordCheckIn: (isEarly: boolean, isJamaah: boolean, isRecovery: boolean) => {
    set(state => {
      let newScore = state.metrics.score;
      let newStreak = state.metrics.streak;
      let newRecoveries = state.metrics.recoveriesAvailable;
      let newEarly = state.metrics.earlyCheckIns;

      // Base addition for check-in
      if (isRecovery) {
         newScore += 2;
         newRecoveries = Math.max(0, newRecoveries - 1);
      } else {
         newScore += 5;
         newStreak += 1;
      }

      if (isEarly) {
         newScore += 3;
         newEarly += 1;
      }

      if (isJamaah) {
         newScore += 5;
      }

      return {
        metrics: {
          score: Math.min(newScore, 99), // Cap at 99 per design system rules
          streak: newStreak,
          recoveriesAvailable: newRecoveries,
          earlyCheckIns: newEarly
        }
      };
    });
  },

  resetScore: () => {
    set({
      metrics: {
        score: 0,
        streak: 0,
        recoveriesAvailable: 3,
        earlyCheckIns: 0
      }
    });
  }
}));
