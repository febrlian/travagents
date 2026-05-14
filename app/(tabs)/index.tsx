import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../src/components/ui/Typography';
import { usePrayerStore } from '../../src/store/prayerStore';
import { useDisciplineStore } from '../../src/store/disciplineStore';
import { useJournalStore } from '../../src/store/journalStore';
import { HeroPrayerCard } from '../../src/components/cards/HeroPrayerCard';
import { MomentumBar } from '../../src/components/cards/MomentumBar';
import { TimelineItem } from '../../src/components/cards/TimelineItem';
import { AnimatedBottomSheet } from '../../src/components/ui/AnimatedBottomSheet';
import { ReflectionComposer } from '../../src/components/ui/ReflectionComposer';
import { Settings } from 'lucide-react-native';
import { PrayerName } from '../../src/types/models';

export default function HomeScreen() {
  const { prayers, nextPrayer, currentPrayer, calculatePrayers, checkInPrayer } = usePrayerStore();
  const { recordCheckIn } = useDisciplineStore();
  const { startReflection, saveReflection, updateDraft, discardDraft } = useJournalStore();
  const [reflectionVisible, setReflectionVisible] = useState(false);

  useEffect(() => {
    calculatePrayers(new Date());
  }, []);

  const handleCheckIn = () => {
    let checkedInPrayer = currentPrayer || (nextPrayer && nextPrayer.status === 'preparation' ? nextPrayer : null);

    if (checkedInPrayer) {
      checkInPrayer(checkedInPrayer.name);
      recordCheckIn(checkedInPrayer.status === 'preparation', false, false);
      calculatePrayers(new Date());

      // Trigger reflection
      startReflection(checkedInPrayer.name);
      setReflectionVisible(true);
    }
  };

  const handleSaveReflection = (mood: any, notes: string) => {
    updateDraft({ mood, gratitude: notes });
    saveReflection();
    setReflectionVisible(false);
  };


  const handleTimelineCheckIn = useCallback((prayerName: PrayerName) => {
    // Typecast to any to avoid typescript errors as the types might need PrayerName specifically
    checkInPrayer(prayerName);
    recordCheckIn(false, false, false);
    calculatePrayers(new Date());

    startReflection(prayerName);
    setReflectionVisible(true);
  }, [checkInPrayer, recordCheckIn, calculatePrayers, startReflection]);

  const activePrayer = currentPrayer || nextPrayer;

  return (
    <SafeAreaView className="flex-1 bg-semantic-background-base">
      <View className="flex-row items-center justify-between h-[56px] px-xl">
         <Typography variant="h2">Today</Typography>
         <Settings size={24} color="#5C625F" />
      </View>

      <ScrollView contentContainerStyle={{ paddingTop: 32, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <HeroPrayerCard prayer={activePrayer} onCheckIn={handleCheckIn} />
        <MomentumBar />

        <View className="px-xl mt-lg mb-md">
          <Typography variant="overline" color="muted">YOUR TIMELINE</Typography>
        </View>

        <View className="px-md">
          {prayers.map((prayer) => (
             <TimelineItem
               key={prayer.name}
               prayer={prayer}
               onCheckIn={handleTimelineCheckIn}
             />
          ))}
        </View>
      </ScrollView>

      {/* Post-Prayer Reflection Bottom Sheet */}
      <AnimatedBottomSheet
        isVisible={reflectionVisible}
        onClose={() => {
          discardDraft();
          setReflectionVisible(false);
        }}
      >
        <ReflectionComposer
          onSave={handleSaveReflection}
          onCancel={() => {
            discardDraft();
            setReflectionVisible(false);
          }}
        />
      </AnimatedBottomSheet>

    </SafeAreaView>
  );
}
