import { create } from 'zustand';
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { subMinutes, addMinutes } from 'date-fns';
import { PrayerName, PrayerStatus } from '../types/models';

export interface PrayerEvent {
  name: PrayerName;
  windowOpens: Date;
  windowCloses: Date;
  preparationOpens: Date;
  status: PrayerStatus;
  checkInTime?: Date;
  isJamaah?: boolean;
}

interface PrayerStore {
  prayers: PrayerEvent[];
  currentPrayer: PrayerEvent | null;
  nextPrayer: PrayerEvent | null;
  calculatePrayers: (date: Date) => void;
  checkInPrayer: (name: PrayerName, isJamaah?: boolean) => void;
}

// Mock coordinates (e.g., Mecca for default, but can be updated)
const MOCK_COORDS = new Coordinates(21.4225, 39.8262);

export const usePrayerStore = create<PrayerStore>((set, get) => ({
  prayers: [],
  currentPrayer: null,
  nextPrayer: null,

  calculatePrayers: (date: Date) => {
    const params = CalculationMethod.MuslimWorldLeague();
    const prayerTimes = new PrayerTimes(MOCK_COORDS, date, params);

    // We will build a list of PrayerEvents
    const events: PrayerEvent[] = [
      {
        name: 'Fajr',
        windowOpens: prayerTimes.fajr,
        windowCloses: prayerTimes.sunrise,
        preparationOpens: subMinutes(prayerTimes.fajr, 15),
        status: 'upcoming'
      },
      {
        name: 'Dhuhr',
        windowOpens: prayerTimes.dhuhr,
        windowCloses: prayerTimes.asr,
        preparationOpens: subMinutes(prayerTimes.dhuhr, 15),
        status: 'upcoming'
      },
      {
        name: 'Asr',
        windowOpens: prayerTimes.asr,
        windowCloses: prayerTimes.maghrib,
        preparationOpens: subMinutes(prayerTimes.asr, 15),
        status: 'upcoming'
      },
      {
        name: 'Maghrib',
        windowOpens: prayerTimes.maghrib,
        windowCloses: prayerTimes.isha,
        preparationOpens: subMinutes(prayerTimes.maghrib, 15),
        status: 'upcoming'
      },
      {
        name: 'Isha',
        // Simplification for Isha window closing at midnight or Fajr
        windowOpens: prayerTimes.isha,
        windowCloses: addMinutes(prayerTimes.isha, 240), // Arbitrary 4 hours for mock
        preparationOpens: subMinutes(prayerTimes.isha, 15),
        status: 'upcoming'
      }
    ];

    // Determine current status based on current time
    const now = new Date();

    let currentPrayer: PrayerEvent | null = null;
    let nextPrayer: PrayerEvent | null = null;

    const nowTime = now.getTime();

    events.forEach(event => {
       const prepTime = event.preparationOpens.getTime();
       const openTime = event.windowOpens.getTime();
       const closeTime = event.windowCloses.getTime();

       if (nowTime < prepTime) {
          // Future
          if (!nextPrayer && !currentPrayer) nextPrayer = event;
       } else if (nowTime > prepTime && nowTime < openTime) {
          event.status = 'preparation';
          currentPrayer = event;
       } else if (nowTime > openTime && nowTime < closeTime) {
          event.status = 'open';
          currentPrayer = event;
       } else if (nowTime > closeTime && !event.checkInTime) {
          event.status = 'missed';
       }
    });

    if (!nextPrayer && currentPrayer) {
       const currentIndex = events.findIndex(e => e.name === currentPrayer?.name);
       if (currentIndex < events.length - 1) {
          nextPrayer = events[currentIndex + 1];
       }
    }

    set({ prayers: events, currentPrayer, nextPrayer });
  },

  checkInPrayer: (name: PrayerName, isJamaah = false) => {
    set(state => {
      const now = new Date();
      const prayers = state.prayers.map(p => {
        if (p.name === name) {
           return { ...p, status: 'completed' as PrayerStatus, checkInTime: now, isJamaah };
        }
        return p;
      });
      return { prayers, currentPrayer: null }; // Current prayer is now completed
    });
  }
}));
