import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../src/components/ui/Typography';
import { AnimatedHeatmap } from '../../src/components/ui/AnimatedHeatmap';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { Star, Trophy, Target } from 'lucide-react-native';

export default function JourneyScreen() {
  // Mock data for heatmap (last 12 weeks = 84 days)
  const mockHeatmapData = Array.from({ length: 84 }, () => Math.floor(Math.random() * 5));

  return (
    <SafeAreaView className="flex-1 bg-semantic-background-base">
      <View className="flex-row items-center justify-between h-[56px] px-xl">
         <Typography variant="h2">Journey</Typography>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Heatmap Section */}
        <AnimatedHeatmap data={mockHeatmapData} />

        {/* Milestones Section */}
        <View className="px-xl mt-8">
           <Typography variant="h3" style={{ marginBottom: 16 }}>Milestones</Typography>

           <GlassCard delay={100} style={{ marginBottom: 16 }}>
             <View className="flex-row items-center">
               <View className="w-12 h-12 rounded-full bg-emerald-100 items-center justify-center mr-4">
                 <Star size={24} color="#0F6D5B" />
               </View>
               <View className="flex-1">
                 <Typography variant="h3">First 7-Day Streak</Typography>
                 <Typography variant="body-sm" color="muted">Completed on Oct 12</Typography>
               </View>
             </View>
           </GlassCard>

           <GlassCard delay={200} style={{ marginBottom: 16 }}>
             <View className="flex-row items-center">
               <View className="w-12 h-12 rounded-full bg-gold-500/20 items-center justify-center mr-4">
                 <Trophy size={24} color="#B9852B" />
               </View>
               <View className="flex-1">
                 <Typography variant="h3">30 Fajr On-Time</Typography>
                 <Typography variant="body-sm" color="muted">24/30 Completed</Typography>
               </View>
             </View>
           </GlassCard>

           <GlassCard delay={300}>
             <View className="flex-row items-center">
               <View className="w-12 h-12 rounded-full bg-emerald-100 items-center justify-center mr-4">
                 <Target size={24} color="#0F6D5B" />
               </View>
               <View className="flex-1">
                 <Typography variant="h3">Jamaah Consistency</Typography>
                 <Typography variant="body-sm" color="muted">10 Prayers in Jamaah</Typography>
               </View>
             </View>
           </GlassCard>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
