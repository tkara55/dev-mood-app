// src/screens/AnaEkran.tsx

import React from 'react';
import { ScrollView, View, Text, StyleSheet, Animated } from 'react-native';
import { useApp } from '../context/AppContext';
import { useFadeSlideIn } from '../hooks';
import { MoodTracker }    from '../components/MoodTracker';
import { WeeklyStats }    from '../components/WeeklyStats';
import { DeveloperCard }  from '../components/DeveloperCard';
import { BolumBaslik }    from '../components/UI';

export function AnaEkran() {
  const { tema } = useApp();
  const { opacity, translateY } = useFadeSlideIn(0);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: tema.arkaplan }}
      contentContainerStyle={styles.icerik}
      showsVerticalScrollIndicator={false}
    >
      {/* App Başlığı */}
      <Animated.View style={[styles.baslik, { opacity, transform: [{ translateY }] }]}>
        <View>
          <Text style={[styles.appAd, { color: tema.metin1 }]}>DevMood</Text>
          <Text style={[styles.appSub, { color: tema.metin3 }]}>Ruh halin, kodun kadar önemli.</Text>
        </View>
        <View style={[styles.versBadge, { backgroundColor: tema.ikincil }]}>
          <Text style={[styles.vers, { color: tema.metin3 }]}>v2.0</Text>
        </View>
      </Animated.View>

      {/* Mood Tracker */}
      <BolumBaslik>Geliştirici Mood Takipçisi 🎭</BolumBaslik>
      <MoodTracker />

      {/* Haftalık Özet */}
      <WeeklyStats />

      {/* Kimlik Kartı */}
      <DeveloperCard />

      <Text style={[styles.footer, { color: tema.metin3 }]}>
        DevMood v2.0 · Context API · Custom Hooks · TypeScript
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icerik:    { padding:20, paddingTop:56, paddingBottom:50 },
  baslik:    { flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between', marginBottom:22 },
  appAd:     { fontSize:30, fontWeight:'800', letterSpacing:-0.8 },
  appSub:    { fontSize:12, marginTop:3 },
  versBadge: { borderRadius:8, paddingHorizontal:10, paddingVertical:4 },
  vers:      { fontSize:12, fontWeight:'600' },
  footer:    { textAlign:'center', fontSize:11, marginTop:24 },
});
