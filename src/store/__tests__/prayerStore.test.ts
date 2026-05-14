import { usePrayerStore } from '../prayerStore';



jest.mock('adhan', () => {
  const mockTimes = {
    fajr: new Date('2024-01-01T05:00:00Z'),
    sunrise: new Date('2024-01-01T06:30:00Z'),
    dhuhr: new Date('2024-01-01T12:00:00Z'),
    asr: new Date('2024-01-01T15:30:00Z'),
    maghrib: new Date('2024-01-01T18:00:00Z'),
    isha: new Date('2024-01-01T19:30:00Z'),
  };
  return {
    Coordinates: jest.fn(),
    CalculationMethod: {
      MuslimWorldLeague: jest.fn().mockReturnValue({}),
    },
    PrayerTimes: jest.fn().mockImplementation(() => mockTimes),
  };
});

describe('prayerStore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
    usePrayerStore.setState({ prayers: [], currentPrayer: null, nextPrayer: null });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('calculatePrayers', () => {
    it('should set nextPrayer to Fajr and currentPrayer to null when time is before Fajr preparation', () => {
      // Fajr prep is at 04:45. Set time to 04:35 (10 mins before prep)
      jest.setSystemTime(new Date('2024-01-01T04:35:00Z'));

      const { calculatePrayers } = usePrayerStore.getState();
      calculatePrayers(new Date('2024-01-01T00:00:00Z'));

      const state = usePrayerStore.getState();
      expect(state.currentPrayer).toBeNull();
      expect(state.nextPrayer?.name).toBe('Fajr');

      const fajrEvent = state.prayers.find(p => p.name === 'Fajr');
      expect(fajrEvent?.status).toBe('upcoming');
    });

    it('should set currentPrayer to Fajr with status "preparation" and nextPrayer to Dhuhr when time is in Fajr prep window', () => {
      // Fajr prep is at 04:45. Open is at 05:00. Set time to 04:50
      jest.setSystemTime(new Date('2024-01-01T04:50:00Z'));

      const { calculatePrayers } = usePrayerStore.getState();
      calculatePrayers(new Date('2024-01-01T00:00:00Z'));

      const state = usePrayerStore.getState();
      expect(state.currentPrayer?.name).toBe('Fajr');
      expect(state.currentPrayer?.status).toBe('preparation');
      expect(state.nextPrayer?.name).toBe('Dhuhr');

      const fajrEvent = state.prayers.find(p => p.name === 'Fajr');
      expect(fajrEvent?.status).toBe('preparation');
    });

    it('should set currentPrayer to Fajr with status "open" when time is in Fajr open window', () => {
      // Fajr open is at 05:00. Close is at 06:30. Set time to 05:30
      jest.setSystemTime(new Date('2024-01-01T05:30:00Z'));

      const { calculatePrayers } = usePrayerStore.getState();
      calculatePrayers(new Date('2024-01-01T00:00:00Z'));

      const state = usePrayerStore.getState();
      expect(state.currentPrayer?.name).toBe('Fajr');
      expect(state.currentPrayer?.status).toBe('open');
      expect(state.nextPrayer?.name).toBe('Dhuhr');

      const fajrEvent = state.prayers.find(p => p.name === 'Fajr');
      expect(fajrEvent?.status).toBe('open');
    });

    it('should mark Fajr as "missed" and set nextPrayer to Dhuhr when time is after Fajr close and unchecked', () => {
      // Fajr closes at 06:30. Dhuhr prep is 11:45. Set time to 08:00
      jest.setSystemTime(new Date('2024-01-01T08:00:00Z'));

      const { calculatePrayers } = usePrayerStore.getState();
      calculatePrayers(new Date('2024-01-01T00:00:00Z'));

      const state = usePrayerStore.getState();

      const fajrEvent = state.prayers.find(p => p.name === 'Fajr');
      expect(fajrEvent?.status).toBe('missed');

      // Since it's 08:00, we are before Dhuhr prep, so currentPrayer should be null
      expect(state.currentPrayer).toBeNull();
      expect(state.nextPrayer?.name).toBe('Dhuhr');
    });
  });

  describe('checkInPrayer', () => {
    it('should update prayer status to "completed" and set currentPrayer to null with default isJamaah false', () => {
        // Setup initial state by calculating prayers during Fajr open window
        jest.setSystemTime(new Date('2024-01-01T05:30:00Z'));

        const { calculatePrayers, checkInPrayer } = usePrayerStore.getState();
        calculatePrayers(new Date('2024-01-01T00:00:00Z'));

        let state = usePrayerStore.getState();
        expect(state.currentPrayer?.name).toBe('Fajr');

        // Check in
        checkInPrayer('Fajr');

        state = usePrayerStore.getState();
        expect(state.currentPrayer).toBeNull();

        const fajrEvent = state.prayers.find(p => p.name === 'Fajr');
        expect(fajrEvent?.status).toBe('completed');
        expect(fajrEvent?.isJamaah).toBe(false);
        expect(fajrEvent?.checkInTime).toEqual(new Date('2024-01-01T05:30:00Z'));
    });

    it('should update prayer status to "completed" with isJamaah true', () => {
        // Setup initial state by calculating prayers during Dhuhr open window
        jest.setSystemTime(new Date('2024-01-01T12:30:00Z'));

        const { calculatePrayers, checkInPrayer } = usePrayerStore.getState();
        calculatePrayers(new Date('2024-01-01T00:00:00Z'));

        let state = usePrayerStore.getState();
        expect(state.currentPrayer?.name).toBe('Dhuhr');

        // Check in
        checkInPrayer('Dhuhr', true);

        state = usePrayerStore.getState();
        expect(state.currentPrayer).toBeNull();

        const dhuhrEvent = state.prayers.find(p => p.name === 'Dhuhr');
        expect(dhuhrEvent?.status).toBe('completed');
        expect(dhuhrEvent?.isJamaah).toBe(true);
        expect(dhuhrEvent?.checkInTime).toEqual(new Date('2024-01-01T12:30:00Z'));
    });
  });
});
