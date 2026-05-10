import { create } from 'zustand';
import { AccountabilityPartner, CommunityCircle, Masjid } from '../types/models';

interface CommunityStore {
  partners: AccountabilityPartner[];
  circles: CommunityCircle[];
  nearbyMasjids: Masjid[];
  isLoadingPartners: boolean;
  invitePartner: (emailOrPhone: string) => Promise<{ success: boolean; message: string }>;
  fetchNearbyMasjids: () => void;
}

export const useCommunityStore = create<CommunityStore>((set, get) => ({
  partners: [
    {
      id: 'p1',
      name: 'Ahmed Y.',
      status: 'active',
      consistencyScore: 88,
      lastCheckIn: new Date().toISOString(),
    }
  ],
  circles: [
    {
      id: 'c1',
      name: 'Morning Fajr Club',
      members: 5,
      groupMomentum: 75,
      sharedGoal: '30 Days Fajr On-time'
    }
  ],
  nearbyMasjids: [],
  isLoadingPartners: false,

  invitePartner: async (emailOrPhone: string) => {
    set({ isLoadingPartners: true });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    set({ isLoadingPartners: false });

    // Mock simulation logic
    if (emailOrPhone.includes('error')) {
       return { success: false, message: 'User not found or already invited.' };
    }

    // Success simulation
    const newPartner: AccountabilityPartner = {
      id: Math.random().toString(36).substring(7),
      name: emailOrPhone.split('@')[0] || 'New Friend',
      status: 'pending',
      consistencyScore: 0
    };

    set(state => ({ partners: [...state.partners, newPartner] }));
    return { success: true, message: 'Invitation sent successfully!' };
  },

  fetchNearbyMasjids: () => {
    // Mock data
    set({
      nearbyMasjids: [
        {
          id: 'm1',
          name: 'Islamic Center',
          distance: '0.8 mi',
          address: '123 Main St',
          nextIqamah: '13:30',
          events: [
            { id: 'e1', title: 'Friday Halaqah', date: '2023-11-10', time: '19:00', type: 'halaqah' }
          ]
        },
        {
          id: 'm2',
          name: 'Masjid Al-Noor',
          distance: '2.1 mi',
          address: '456 Oak Ave',
          nextIqamah: '13:45',
          events: []
        }
      ]
    });
  }
}));
