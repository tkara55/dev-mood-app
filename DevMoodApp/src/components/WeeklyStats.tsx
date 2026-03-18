// src/components/WeeklyStats.tsx

import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useApp } from '../context/AppContext';
import { useFadeSlideIn } from '../hooks';
import { Kart, BolumBaslik, Ayrac, StatKutu } from './UI';
import { MOODS } from '../constants';

export function WeeklyStats() {
  const { weekLog, streak, enSikMood, toplamAktif, tema, settings } = useApp();
  const { opacity, translateY } = useFadeSlideIn(120);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <BolumBaslik>Haftalık Özet 📊</BolumBaslik>
      <Kart style={{ marginBottom: 16 }}>

        {/* Stat Kutuları */}
        <View style={styles.statSatir}>
          <StatKutu
            sayi={String(streak)}
            etiket="Gün Streak 🔥"
          />
          <StatKutu
            sayi={enSikMood.emoji}
            etiket="En Sık Mood"
            bg={settings.karanlik ? enSikMood.darkBg! : enSikMood.bg}
            renk={enSikMood.text}
          />
          <StatKutu
            sayi={`${toplamAktif}/7`}
            etiket="Aktif Gün"
          />
        </View>

        <Ayrac />

        {/* Günlük Emoji Bar */}
        <View style={styles.gunBar}>
          {weekLog.map((g, i) => {
            const mood      = g.moodId ? MOODS.find(m => m.id === g.moodId) : null;
            const bugun     = i === weekLog.length - 1;
            const moodBg    = mood
              ? (settings.karanlik ? mood.darkBg! : mood.bg)
              : tema.ikincil;

            return (
              <View key={g.date} style={styles.gunKolom}>
                <View style={[styles.gunKare, {
                  backgroundColor: moodBg,
                  borderColor:     mood ? mood.border : tema.sinir,
                  borderWidth:     bugun ? 2 : 0.5,
                }]}>
                  <Text style={styles.gunEmoji}>{mood ? mood.emoji : '–'}</Text>
                </View>
                <Text style={[styles.gunEtiket, {
                  color:      bugun ? tema.metin1 : tema.metin3,
                  fontWeight: bugun ? '700' : '400',
                }]}>{g.gun}</Text>
                {bugun && (
                  <View style={[styles.bugunDot, { backgroundColor: '#1D9E75' }]} />
                )}
              </View>
            );
          })}
        </View>
      </Kart>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  statSatir:  { flexDirection:'row', gap:8, marginBottom:2 },
  gunBar:     { flexDirection:'row', justifyContent:'space-between' },
  gunKolom:   { alignItems:'center', gap:4, flex:1 },
  gunKare:    { width:36, height:36, borderRadius:8, alignItems:'center', justifyContent:'center' },
  gunEmoji:   { fontSize:16 },
  gunEtiket:  { fontSize:9 },
  bugunDot:   { width:4, height:4, borderRadius:2, marginTop:-2 },
});
