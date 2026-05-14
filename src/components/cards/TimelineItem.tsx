import { PrayerName } from "../../types/models";
import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../ui/Typography';
import { PrayerEvent } from '../../store/prayerStore';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring
} from 'react-native-reanimated';
import { format } from 'date-fns';

interface TimelineItemProps {
  prayer: PrayerEvent;
  onCheckIn: (prayerName: PrayerName) => void;
}

export const TimelineItem = memo(function TimelineItem({ prayer, onCheckIn }: TimelineItemProps) {
  const pulseScale = useSharedValue(1);

  React.useEffect(() => {
    if (prayer.status === 'open') {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1, // infinite
        true // reverse
      );
    } else {
      pulseScale.value = withTiming(1);
    }
  }, [prayer.status]);

  const animatedDotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }]
  }));

  const getDotStyle = () => {
    switch (prayer.status) {
      case 'completed': return 'w-[6px] h-[6px] rounded-full bg-semantic-status-success';
      case 'open': return 'w-[8px] h-[8px] rounded-full bg-semantic-accent-primary shadow-sm';
      case 'missed': return 'w-[6px] h-[6px] rounded-full bg-semantic-status-danger';
      default: return 'w-[6px] h-[6px] rounded-full bg-semantic-border-subtle';
    }
  };

  const getPrayerStatusCopy = () => {
    switch (prayer.status) {
      case 'completed': return 'Completed';
      case 'open': return 'Current Window Open';
      case 'missed': return 'Recovery available';
      case 'preparation': return 'Preparing...';
      default: return 'Upcoming';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={prayer.status === 'open' ? 0.7 : 1}
      onPress={() => { if (prayer.status === 'open') onCheckIn(prayer.name) }}
    >
      <View className="flex-row h-[72px] px-md">

        {/* Left Rail */}
        <View className="w-[20px] items-center mr-md">
          <View className="w-[2px] flex-1 bg-semantic-border-subtle absolute top-0 bottom-0" />
          <View className="flex-1 justify-center relative">
            <Animated.View className={getDotStyle()} style={animatedDotStyle} />
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 justify-center py-sm">
          <View className="flex-row justify-between items-end">
            <Typography
               variant="h3"
               color={prayer.status === 'completed' || prayer.status === 'upcoming' ? 'secondary' : 'primary'}
               className={prayer.status === 'completed' ? 'line-through opacity-60' : ''}
            >
              {prayer.name}
            </Typography>
            <Typography variant="caption" color="muted">
              {format(prayer.windowOpens, 'HH:mm')}
            </Typography>
          </View>
          <Typography
             variant="caption"
             color={prayer.status === 'completed' ? 'success' : 'muted'}
          >
            {getPrayerStatusCopy()}
          </Typography>
        </View>

      </View>
    </TouchableOpacity>
  );
});
