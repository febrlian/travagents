import { featureGateService } from '../featureGateService';
import { usePremiumStore } from '../../store/premiumStore';

// Mock the Zustand store
jest.mock('../../store/premiumStore', () => {
  return {
    usePremiumStore: {
      getState: jest.fn(() => ({
        checkFeatureAccess: jest.fn(),
      })),
    },
  };
});

describe('featureGateService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('canAccess', () => {
    it('returns true if usePremiumStore.checkFeatureAccess returns true', () => {
      const mockCheckFeatureAccess = jest.fn().mockReturnValue(true);
      (usePremiumStore.getState as jest.Mock).mockReturnValue({
        checkFeatureAccess: mockCheckFeatureAccess,
      });

      expect(featureGateService.canAccess('test_feature')).toBe(true);
      expect(mockCheckFeatureAccess).toHaveBeenCalledWith('test_feature');
    });

    it('returns false if usePremiumStore.checkFeatureAccess returns false', () => {
      const mockCheckFeatureAccess = jest.fn().mockReturnValue(false);
      (usePremiumStore.getState as jest.Mock).mockReturnValue({
        checkFeatureAccess: mockCheckFeatureAccess,
      });

      expect(featureGateService.canAccess('test_feature')).toBe(false);
      expect(mockCheckFeatureAccess).toHaveBeenCalledWith('test_feature');
    });
  });

  describe('withFeatureGate', () => {
    it('executes the function if feature access is granted', () => {
      const mockCheckFeatureAccess = jest.fn().mockReturnValue(true);
      (usePremiumStore.getState as jest.Mock).mockReturnValue({
        checkFeatureAccess: mockCheckFeatureAccess,
      });

      const mockFn = jest.fn().mockReturnValue('result');
      const gatedFn = featureGateService.withFeatureGate('test_feature', mockFn);

      const result = gatedFn('arg1', 'arg2');

      expect(mockCheckFeatureAccess).toHaveBeenCalledWith('test_feature');
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
      expect(result).toBe('result');
    });

    it('executes the fallback function if feature access is denied', () => {
      const mockCheckFeatureAccess = jest.fn().mockReturnValue(false);
      (usePremiumStore.getState as jest.Mock).mockReturnValue({
        checkFeatureAccess: mockCheckFeatureAccess,
      });

      const mockFn = jest.fn();
      const mockFallback = jest.fn();
      const gatedFn = featureGateService.withFeatureGate('test_feature', mockFn, mockFallback);

      gatedFn();

      expect(mockCheckFeatureAccess).toHaveBeenCalledWith('test_feature');
      expect(mockFn).not.toHaveBeenCalled();
      expect(mockFallback).toHaveBeenCalled();
    });

    it('logs a console warning if feature access is denied and no fallback is provided', () => {
      const mockCheckFeatureAccess = jest.fn().mockReturnValue(false);
      (usePremiumStore.getState as jest.Mock).mockReturnValue({
        checkFeatureAccess: mockCheckFeatureAccess,
      });

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      const mockFn = jest.fn();
      const gatedFn = featureGateService.withFeatureGate('test_feature', mockFn);

      gatedFn();

      expect(mockCheckFeatureAccess).toHaveBeenCalledWith('test_feature');
      expect(mockFn).not.toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledWith("Feature access denied for 'test_feature' and no fallback provided.");

      consoleWarnSpy.mockRestore();
    });
  });
});
