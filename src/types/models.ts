export type PrayerName = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
export type PrayerStatus = 'preparation' | 'open' | 'closing' | 'missed' | 'completed' | 'upcoming';
export type ReflectionMood = 'peaceful' | 'rushed' | 'distracted' | 'connected' | 'struggling' | 'grateful';

export interface PrayerInsight {
  id: string;
  type: 'difficulty' | 'trend' | 'prediction';
  title: string;
  description: string;
  actionableAdvice?: string;
  relatedPrayer?: PrayerName;
  dateGenerated: string;
}

export interface MomentumState {
  score: number;
  currentStreak: number;
  longestStreak: number;
  recoveriesAvailable: number;
  earlyCheckIns: number;
  jamaahCheckIns: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  progress: number;
  totalRequired: number;
}

export interface Reflection {
  id: string;
  prayerName: PrayerName;
  date: string;
  mood: ReflectionMood;
  gratitude?: string;
  duaIntentions?: string;
  focusQuality: number; // 1-10
  distractionLevel: number; // 1-10
}

export interface DisciplineTrend {
  date: string;
  score: number;
  completed: number;
  missed: number;
  jamaah: number;
}

export interface UserProfile {
  id: string;
  name: string;
  joinDate: string;
  momentum: MomentumState;
  isPremium: boolean;
}

export interface AccountabilityPartner {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'rejected';
  consistencyScore: number;
  lastCheckIn?: string;
  avatarUrl?: string;
}

export interface CommunityCircle {
  id: string;
  name: string;
  members: number;
  groupMomentum: number;
  sharedGoal: string;
}

export interface Masjid {
  id: string;
  name: string;
  distance: string; // e.g., "0.5 mi"
  address: string;
  nextIqamah: string;
  events: MasjidEvent[];
}

export interface MasjidEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'halaqah' | 'lecture' | 'reminder';
}

export interface MasjidCheckIn {
  id: string;
  masjidId: string;
  prayerName: PrayerName;
  date: string;
  consistencyPointsEarned: number;
}

export interface NotificationScenario {
  id: string;
  type: 'preparation' | 'momentum' | 'adaptive';
  title: string;
  body: string;
  triggerTime: string;
  isRead: boolean;
}
