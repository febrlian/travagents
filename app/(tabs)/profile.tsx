import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../src/components/ui/Typography';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { useDisciplineStore } from '../../src/store/disciplineStore';
import { useRouter } from 'expo-router';
import { Settings as SettingsIcon, Crown, Activity } from 'lucide-react-native';

export default function ProfileScreen() {
  const { metrics } = useDisciplineStore();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-semantic-background-base">
      <View className="flex-row items-center justify-between h-[56px] px-xl">
         <Typography variant="h2">Profile</Typography>
         <TouchableOpacity onPress={() => router.push('/settings/premium')}>
           <SettingsIcon size={24} color="#0E1110" />
         </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>

        {/* Header Profile */}
        <View className="items-center mb-8">
           <View className="w-24 h-24 bg-emerald-100 rounded-full items-center justify-center mb-4">
             <Typography variant="h1" color="primary">S</Typography>
           </View>
           <Typography variant="h2">Sadiq Learner</Typography>
           <Typography variant="body" color="muted">Joined Oct 2023</Typography>

           <TouchableOpacity
             className="mt-4 flex-row items-center bg-gold-500/10 px-4 py-2 rounded-full border border-gold-500/20"
             onPress={() => router.push('/settings/premium')}
           >
             <Crown size={16} color="#B9852B" />
             <Typography variant="caption" color="primary" style={{ marginLeft: 8, color: '#B9852B' }}>
               Manage Premium
             </Typography>
           </TouchableOpacity>
        </View>

        {/* Momentum Overview */}
        <Typography variant="h3" style={{ marginBottom: 16 }}>Lifetime Momentum</Typography>

        <View className="flex-row gap-4 mb-8">
          <GlassCard style={{ flex: 1, alignItems: 'center' }}>
            <Activity size={24} color="#0F6D5B" style={{ marginBottom: 8 }} />
            <Typography variant="h2">{metrics.streak}</Typography>
            <Typography variant="caption" color="muted">Current Streak</Typography>
          </GlassCard>

          <GlassCard style={{ flex: 1, alignItems: 'center' }}>
             <Typography variant="h2">{metrics.score}</Typography>
             <Typography variant="caption" color="muted">Discipline Score</Typography>
          </GlassCard>
        </View>

        {/* Stats List */}
        <GlassCard>
          <View className="border-b border-gray-100 pb-4 mb-4">
            <Typography variant="caption" color="muted">TOTAL PRAYERS</Typography>
            <Typography variant="h3">1,402</Typography>
          </View>
          <View className="border-b border-gray-100 pb-4 mb-4">
            <Typography variant="caption" color="muted">JAMAAH ATTENDANCE</Typography>
            <Typography variant="h3">240</Typography>
          </View>
          <View>
            <Typography variant="caption" color="muted">EARLY CHECK-INS</Typography>
            <Typography variant="h3">{metrics.earlyCheckIns}</Typography>
          </View>
        </GlassCard>

      </ScrollView>
    </SafeAreaView>
  );
}
