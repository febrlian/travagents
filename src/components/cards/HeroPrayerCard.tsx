import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';
import { Surface } from '../ui/Surface';
import { differenceInMinutes, differenceInHours } from 'date-fns';
import { PrayerEvent } from '../../store/prayerStore';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

interface HeroPrayerCardProps {
  prayer?: PrayerEvent | null;
  onCheckIn: () => void;
}

export function HeroPrayerCard({ prayer, onCheckIn }: HeroPrayerCardProps) {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (!prayer) return;

    const interval = setInterval(() => {
      const now = new Date();
      // Simple mock countdown logic to next target
      const targetTime = prayer.status === 'upcoming' || prayer.status === 'preparation' ? prayer.windowOpens : prayer.windowCloses;
      const hours = differenceInHours(targetTime, now);
      const minutes = differenceInMinutes(targetTime, now) % 60;
      setCountdown(`${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [prayer]);

  if (!prayer) {
    return (
      <Surface elevation={3} blur intensity={80} className="rounded-[24px] p-3xl mx-xl mb-2xl">
         <Typography variant="hero" className="text-center">All offered</Typography>
         <Typography variant="body-sm" color="muted" className="text-center mt-sm">Rest in your consistency.</Typography>
      </Surface>
    );
  }

  const getPrepStateCopy = () => {
    if (prayer.status === 'preparation') return 'Preparation window open';
    if (prayer.status === 'open') return `${prayer.name} is now`;
    return `Upcoming in ${countdown}`;
  };

  return (
    <Animated.View entering={FadeInUp.duration(500).springify()} exiting={FadeOutDown}>
      <Surface elevation={3} blur intensity={70} className="rounded-[24px] px-2xl py-3xl mx-lg mb-2xl">
        <View className="flex-col gap-lg items-center text-center w-full">
          <Typography variant="overline" color="muted">NEXT PRAYER</Typography>
          <Typography variant="hero">{prayer.name}</Typography>
          <Typography variant="h2" color="accent" weight="400">in {countdown || '...'}</Typography>
          <Typography variant="body-sm" color="secondary">{getPrepStateCopy()}</Typography>

          <Button className="w-full mt-sm" onPress={onCheckIn}>
            {prayer.status === 'open' ? 'Check In' : 'Prepare Intention'}
          </Button>
        </View>
      </Surface>
    </Animated.View>
  );
}
