import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../src/components/ui/Typography';
import { Button } from '../../src/components/ui/Button';
import { usePremiumStore } from '../../src/store/premiumStore';
import { useRouter } from 'expo-router';
import { Check, X } from 'lucide-react-native';

export default function PremiumScreen() {
  const { isPremium, togglePremium } = usePremiumStore();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-semantic-background-base">
      <View className="flex-row items-center justify-between h-[56px] px-xl">
         <TouchableOpacity onPress={() => router.back()}>
           <X size={24} color="#0E1110" />
         </TouchableOpacity>
         <Typography variant="h3">Premium</Typography>
         <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Typography variant="h1" style={{ marginBottom: 16 }}>
          Elevate Your Discipline
        </Typography>
        <Typography variant="body" color="muted" style={{ marginBottom: 32 }}>
          Unlock advanced insights, deeper community connections, and an AI-driven spiritual journey.
        </Typography>

        <View className="bg-white rounded-3xl p-6 shadow-sm mb-6 border border-gray-100">
           {[
             'Advanced Behavioral Trends',
             'AI-Powered Predictive Insights',
             'Family Circles & Shared Goals',
             'Deep Journaling & Mood Analytics',
             'Full Masjid Event Integration'
           ].map((feature, i) => (
             <View key={i} className="flex-row items-center mb-4">
                <View className="bg-emerald-100 rounded-full p-1 mr-3">
                  <Check size={16} color="#0F6D5B" />
                </View>
                <Typography variant="body">{feature}</Typography>
             </View>
           ))}
        </View>

        <View className="mt-8">
           <Typography variant="h3" style={{ textAlign: 'center', marginBottom: 16 }}>
             Current Status: {isPremium ? 'Premium Active' : 'Free Tier'}
           </Typography>

           <Button
             variant={isPremium ? 'secondary' : 'primary'}
             children={isPremium ? "Cancel Subscription (Mock)" : "Upgrade to Premium (Mock)"}
             onPress={() => {
               togglePremium();
             }}
           />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
