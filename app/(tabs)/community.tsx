import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "../../src/components/ui/Typography";
import { GlassCard } from "../../src/components/ui/GlassCard";
import { Button } from "../../src/components/ui/Button";
import { useCommunityStore } from "../../src/store/communityStore";
import { communityApi } from "../../src/services/mock-api/communityApi";
import { Users, MapPin, UserPlus } from "lucide-react-native";
import { Masjid } from "../../src/types/models";

export default function CommunityScreen() {
  const { partners, circles, invitePartner } = useCommunityStore();
  const [loadingMasjids, setLoadingMasjids] = useState(true);
  const [masjids, setMasjids] = useState<Masjid[]>([]);

  useEffect(() => {
    communityApi.fetchNearbyMasjids(0, 0).then((data) => {
      setMasjids(data);
      setLoadingMasjids(false);
    });
  }, []);

  const handleInvite = async () => {
    // Mocking an invite process directly
    const res = await invitePartner("friend@example.com");
    alert(res.message);
  };

  return (
    <SafeAreaView className="flex-1 bg-semantic-background-base">
      <View className="flex-row items-center justify-between h-[56px] px-xl">
        <Typography variant="h2">Community</Typography>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
        {/* Accountability Partners */}
        <View className="flex-row items-center justify-between mb-4">
          <Typography variant="h3">Accountability Partners</Typography>
          <TouchableOpacity onPress={handleInvite}>
            <UserPlus size={20} color="#0F6D5B" />
          </TouchableOpacity>
        </View>

        {partners.map((partner, index) => (
          <GlassCard
            key={partner.id}
            delay={index * 100}
            style={{ marginBottom: 16 }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-emerald-100 rounded-full items-center justify-center mr-4">
                  <Typography variant="h3" color="primary">
                    {partner.name.charAt(0)}
                  </Typography>
                </View>
                <View>
                  <Typography variant="body">{partner.name}</Typography>
                  <Typography variant="caption" color="muted">
                    Consistency: {partner.consistencyScore}%
                  </Typography>
                </View>
              </View>
              <Button variant="secondary" onPress={() => alert("Nudge sent!")}>
                Nudge
              </Button>
            </View>
          </GlassCard>
        ))}

        {/* Nearby Masjids */}
        <Typography variant="h3" style={{ marginTop: 24, marginBottom: 16 }}>
          Nearby Masjids
        </Typography>

        {loadingMasjids ? (
          <ActivityIndicator size="small" color="#0F6D5B" />
        ) : (
          masjids.map((masjid, index) => (
            <GlassCard
              key={masjid.id}
              delay={200 + index * 100}
              style={{ marginBottom: 16 }}
            >
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-4">
                  <Typography variant="h3">{masjid.name}</Typography>
                  <View className="flex-row items-center mt-1">
                    <MapPin size={12} color="#8A918D" />
                    <Typography
                      variant="caption"
                      color="muted"
                      style={{ marginLeft: 4 }}
                    >
                      {masjid.distance} • {masjid.address}
                    </Typography>
                  </View>
                  <Typography
                    variant="body-sm"
                    color="primary"
                    style={{ marginTop: 8 }}
                  >
                    Next Iqamah: {masjid.nextIqamah}
                  </Typography>
                </View>
                <Button
                  variant="primary"
                  onPress={() => alert("Checked into Jamaah!")}
                >
                  Check-in
                </Button>
              </View>
            </GlassCard>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
