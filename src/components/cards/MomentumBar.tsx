import React from 'react';
import { View } from 'react-native';
import { Typography } from '../ui/Typography';
import { Surface } from '../ui/Surface';
import { useDisciplineStore } from '../../store/disciplineStore';
import { Flame, Activity, ShieldPlus } from 'lucide-react-native';

export function MomentumBar() {
  const { metrics } = useDisciplineStore();

  return (
    <Surface elevation={1} className="flex-row items-center justify-between h-[56px] px-lg rounded-2xl mx-lg mb-xl">
      <View className="flex-row items-center gap-xs">
         <Flame size={16} color="#B9852B" />
         <Typography variant="body-sm" weight="500">
           {metrics.streak < 3 ? 'Building momentum' : `${metrics.streak} days`}
         </Typography>
      </View>

      <View className="flex-row items-center gap-xs">
         <Activity size={16} color="#0F6D5B" />
         <Typography variant="caption" color="muted">Trend</Typography>
      </View>

      <View className="flex-row items-center gap-xs">
         <ShieldPlus size={16} color="#2E7D5A" />
         <Typography variant="caption" color="success">{metrics.recoveriesAvailable} left</Typography>
      </View>
    </Surface>
  );
}
