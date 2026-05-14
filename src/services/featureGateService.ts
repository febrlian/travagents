import { Alert } from 'react-native';
import { usePremiumStore } from '../store/premiumStore';

export const featureGateService = {
  canAccess: (featureKey: string): boolean => {
    return usePremiumStore.getState().checkFeatureAccess(featureKey);
  },

  withFeatureGate: <T extends (...args: any[]) => any>(
    featureKey: string,
    fn: T,
    fallback?: () => void
  ) => {
    return ((...args: Parameters<T>) => {
      if (usePremiumStore.getState().checkFeatureAccess(featureKey)) {
        return fn(...args);
      }
      if (fallback) {
        fallback();
      }
    }) as T;
  }
};
