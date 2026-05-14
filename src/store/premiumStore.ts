import { create } from 'zustand';

interface PremiumStore {
  isPremiumModalVisible: boolean;
  openPremiumModal: () => void;
  closePremiumModal: () => void;
  isPremium: boolean;
  togglePremium: () => void;
  checkFeatureAccess: (featureKey: string) => boolean;
}

export const usePremiumStore = create<PremiumStore>((set, get) => ({
  isPremium: false,
  isPremiumModalVisible: false,

  openPremiumModal: () => set({ isPremiumModalVisible: true }),
  closePremiumModal: () => set({ isPremiumModalVisible: false }),

  togglePremium: () => set(state => ({ isPremium: !state.isPremium })),

  checkFeatureAccess: (featureKey: string) => {
    const { isPremium } = get();
    // In a real app, you might have a dictionary of premium features.
    // For this mock, we assume certain keys require premium.
    const premiumFeatures = ['ai_insights', 'advanced_analytics', 'family_circles', 'deep_journaling'];

    if (premiumFeatures.includes(featureKey)) {
      return isPremium;
    }
    return true; // Free features
  }
}));
