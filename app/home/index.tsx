import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../src/components/ui/Typography';
import { usePrayerStore } from '../../src/store/prayerStore';
import { useDisciplineStore } from '../../src/store/disciplineStore';
import { HeroPrayerCard } from '../../src/components/cards/HeroPrayerCard';
import { MomentumBar } from '../../src/components/cards/MomentumBar';
import { TimelineItem } from '../../src/components/cards/TimelineItem';
import { Settings } from 'lucide-react-native';

export default function HomeScreen() {
  const { prayers, nextPrayer, currentPrayer, calculatePrayers, checkInPrayer } = usePrayerStore();
  const { recordCheckIn } = useDisciplineStore();

  useEffect(() => {
    // initialize prayers
    calculatePrayers(new Date());
  }, []);

  const handleCheckIn = () => {
    if (currentPrayer) {
      checkInPrayer(currentPrayer.name);
      recordCheckIn(false, false, false); // basic checkin for now
      calculatePrayers(new Date()); // recalculate to update next/current
    } else if (nextPrayer && nextPrayer.status === 'preparation') {
       // prep checkin
       checkInPrayer(nextPrayer.name);
       recordCheckIn(true, false, false);
       calculatePrayers(new Date());
    }
  };

  const activePrayer = currentPrayer || nextPrayer;

  return (
    <SafeAreaView className="flex-1 bg-semantic-background-base">

      {/* Header */}
      <View className="flex-row items-center justify-between h-[56px] px-xl">
         <Typography variant="h2">Today</Typography>
         <Settings size={24} color="#5C625F" />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingTop: 32, paddingBottom: 64 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <HeroPrayerCard prayer={activePrayer} onCheckIn={handleCheckIn} />
        <MomentumBar />

        {/* Timeline Divider */}
        <View className="px-xl mt-lg mb-md">
          <Typography variant="overline" color="muted">YOUR TIMELINE</Typography>
        </View>

        {/* Timeline Items */}
        <View className="px-md">
          {prayers.map((prayer) => (
             <TimelineItem
               key={prayer.name}
               prayer={prayer}
               onCheckIn={() => {
                  checkInPrayer(prayer.name);
                  recordCheckIn(false, false, false);
                  calculatePrayers(new Date());
               }}
             />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
