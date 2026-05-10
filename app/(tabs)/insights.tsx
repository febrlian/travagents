import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../src/components/ui/Typography';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { insightsApi } from '../../src/services/mock-api/insightsApi';
import { PrayerInsight } from '../../src/types/models';
import { ActivityIndicator } from 'react-native';
import { TrendingUp, AlertTriangle, Sparkles } from 'lucide-react-native';

export default function InsightsScreen() {
  const [insights, setInsights] = useState<PrayerInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    insightsApi.getInsights().then(data => {
      setInsights(data);
      setLoading(false);
    });
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'difficulty': return <AlertTriangle size={24} color="#C26B6B" />;
      case 'trend': return <TrendingUp size={24} color="#0F6D5B" />;
      case 'prediction': return <Sparkles size={24} color="#B9852B" />;
      default: return <TrendingUp size={24} color="#0F6D5B" />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-semantic-background-base">
      <View className="flex-row items-center justify-between h-[56px] px-xl">
         <Typography variant="h2">Insights</Typography>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>

        {loading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            <ActivityIndicator size="large" color="#0F6D5B" />
          </View>
        ) : (
          <>
            <Typography variant="h3" style={{ marginBottom: 16 }}>Behavioral Analytics</Typography>

            {insights.map((insight, index) => (
              <GlassCard key={insight.id} delay={index * 100} style={{ marginBottom: 16 }}>
                <View className="flex-row items-start mb-2">
                  <View className="mr-3 mt-1">
                    {getIcon(insight.type)}
                  </View>
                  <View className="flex-1">
                    <Typography variant="h3">{insight.title}</Typography>
                    <Typography variant="body" color="muted" style={{ marginTop: 4 }}>
                      {insight.description}
                    </Typography>
                  </View>
                </View>
                {insight.actionableAdvice && (
                  <View className="mt-4 bg-white/50 p-4 rounded-xl border border-gray-200/50">
                    <Typography variant="caption" color="primary">SUGGESTION</Typography>
                    <Typography variant="body-sm" style={{ marginTop: 4 }}>
                      {insight.actionableAdvice}
                    </Typography>
                  </View>
                )}
              </GlassCard>
            ))}

            {/* Mock Chart Area */}
            <Typography variant="h3" style={{ marginTop: 16, marginBottom: 16 }}>Momentum Trend</Typography>
            <GlassCard delay={300}>
               <View className="h-40 items-center justify-center">
                 <Typography variant="body" color="muted">Chart Visualization Area</Typography>
                 <Typography variant="caption" color="muted" style={{ marginTop: 8 }}>
                   (Reanimated SVG Path goes here)
                 </Typography>
               </View>
            </GlassCard>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
