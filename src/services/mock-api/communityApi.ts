import { AccountabilityPartner, CommunityCircle, Masjid } from '../../types/models';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const communityApi = {
  async invitePartner(emailOrPhone: string): Promise<{ success: boolean; message: string; partner?: AccountabilityPartner }> {
    await delay(1200);

    if (emailOrPhone.includes('error')) {
      return { success: false, message: 'User not found or already has a partner.' };
    }

    return {
      success: true,
      message: 'Invitation sent successfully.',
      partner: {
        id: Math.random().toString(36).substring(7),
        name: emailOrPhone.split('@')[0],
        status: 'pending',
        consistencyScore: 0
      }
    };
  },

  async fetchNearbyMasjids(latitude: number, longitude: number): Promise<Masjid[]> {
    await delay(1500);
    return [
      {
        id: 'm1',
        name: 'Islamic Center of Downtown',
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
    ];
  },

  async checkInMasjid(masjidId: string): Promise<{ success: boolean; points: number }> {
    await delay(800);
    return { success: true, points: 5 };
  }
};
