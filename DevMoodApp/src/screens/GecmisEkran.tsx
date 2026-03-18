// src/screens/GecmisEkran.tsx

import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity,
  StyleSheet, Animated,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { useFadeSlideIn } from '../hooks';
import { Kart, BolumBaslik, StatKutu } from '../components/UI';
import { MOODS } from '../constants';
import { DayLog } from '../types';

type FilterId = 'hepsi' | string;

export function GecmisEkran() {
  const { historyLogs, weekLog, tema, settings } = useApp();
  const { opacity, translateY } = useFadeSlideIn(0);
  const [filtre, setFiltre] = useState<FilterId>('hepsi');

  const tumLogs: DayLog[] = [...historyLogs, ...weekLog.filter(g => g.aktif)];
  const filtrelenmis = filtre === 'hepsi'
    ? tumLogs
    : tumLogs.filter(g => g.moodId === filtre);

  // İstatistik hesapla
  const moodSayac: Record<string, number> = {};
  tumLogs.forEach(g => {
    if (g.moodId) moodSayac[g.moodId] = (moodSayac[g.moodId] || 0) + 1;
  });
  const topMood = MOODS.find(m => m.id === Object.keys(moodSayac).sort((a,b)=>moodSayac[b]-moodSayac[a])[0]);

  return (
    <ScrollView
      style={{ flex:1, backgroundColor: tema.arkaplan }}
      contentContainerStyle={styles.icerik}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={{ opacity, transform: [{ translateY }] }}>

        {/* Genel İstatistikler */}
        <BolumBaslik>Genel İstatistikler 📈</BolumBaslik>
        <View style={styles.statSatir}>
          <StatKutu sayi={String(tumLogs.length)} etiket="Toplam Gün" />
          <StatKutu
            sayi={topMood?.emoji ?? '⚡'}
            etiket="En Sevilen"
            bg={topMood ? (settings.karanlik ? topMood.darkBg! : topMood.bg) : tema.ikincil}
            renk={topMood?.text}
          />
          <StatKutu sayi={String(Object.keys(moodSayac).length)} etiket="Farklı Mood" />
        </View>

        {/* Mood Dağılımı */}
        <BolumBaslik style={{ marginTop: 18 }}>Mood Dağılımı 🎨</BolumBaslik>
        <Kart style={{ marginBottom: 16 }}>
          {MOODS.filter(m => moodSayac[m.id]).map(m => {
            const sayi  = moodSayac[m.id] || 0;
            const maks  = Math.max(...Object.values(moodSayac));
            const oran  = sayi / maks;
            const barBg = settings.karanlik ? m.darkBg! : m.bg;
            return (
              <View key={m.id} style={styles.dagilimSatir}>
                <Text style={styles.dagilimEmoji}>{m.emoji}</Text>
                <View style={styles.barKap}>
                  <View style={[styles.barDolgu, {
                    width:           `${oran * 100}%`,
                    backgroundColor: settings.karanlik ? m.darkBg! : m.bg,
                    borderColor:     m.border,
                  }]} />
                </View>
                <Text style={[styles.dagilimSayi, { color: tema.metin2 }]}>{sayi}</Text>
              </View>
            );
          })}
        </Kart>

        {/* Filtre Çipleri */}
        <BolumBaslik>Geçmiş Kayıtlar 📅</BolumBaslik>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtreSatir}>
          {['hepsi', ...MOODS.map(m => m.id)].map(f => {
            const m = MOODS.find(x => x.id === f);
            const aktif = filtre === f;
            return (
              <TouchableOpacity
                key={f}
                style={[styles.filtreBtn, {
                  backgroundColor: aktif ? (m ? (settings.karanlik ? m.darkBg! : m.bg) : tema.metin1) : tema.ikincil,
                  borderColor:     aktif ? (m?.border ?? tema.metin1) : tema.sinir,
                  borderWidth:     aktif ? 1.5 : 0.5,
                }]}
                onPress={() => setFiltre(f)}
              >
                <Text style={[styles.filtreTxt, {
                  color: aktif ? (m?.text ?? tema.arkaplan) : tema.metin2,
                }]}>
                  {f === 'hepsi' ? 'Tümü' : `${m?.emoji} ${m?.tag}`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Log Listesi */}
        <View style={{ gap: 8 }}>
          {[...filtrelenmis].reverse().map((log, i) => {
            const mood = MOODS.find(m => m.id === log.moodId);
            if (!mood) return null;
            const logBg = settings.karanlik ? mood.darkBg! : mood.bg;
            return (
              <Kart key={`${log.date}-${i}`} style={styles.logKart}>
                <View style={styles.logIcerik}>
                  <View style={[styles.logMoodKare, { backgroundColor: logBg, borderColor: mood.border }]}>
                    <Text style={styles.logEmoji}>{mood.emoji}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.logTag, { color: tema.metin1 }]}>{mood.tag}</Text>
                    <Text style={[styles.logSub, { color: tema.metin3 }]}>{mood.sub}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[styles.logGun, { color: tema.metin3 }]}>{log.gun}</Text>
                    <Text style={[styles.logTarih, { color: tema.metin3 }]}>
                      {log.date.slice(5).replace('-', '/')}
                    </Text>
                  </View>
                </View>
              </Kart>
            );
          })}
        </View>

        {filtrelenmis.length === 0 && (
          <View style={styles.bosKap}>
            <Text style={styles.bosEmoji}>🔍</Text>
            <Text style={[styles.bosTxt, { color: tema.metin3 }]}>Kayıt bulunamadı</Text>
          </View>
        )}

      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icerik:       { padding:20, paddingTop:16, paddingBottom:50 },
  statSatir:    { flexDirection:'row', gap:8, marginBottom:4 },
  dagilimSatir: { flexDirection:'row', alignItems:'center', gap:10, marginBottom:10 },
  dagilimEmoji: { fontSize:20, width:28, textAlign:'center' },
  barKap:       { flex:1, height:20, backgroundColor:'rgba(0,0,0,0.04)', borderRadius:6, overflow:'hidden' },
  barDolgu:     { height:'100%', borderRadius:6, borderWidth:1 },
  dagilimSayi:  { fontSize:13, fontWeight:'600', width:22, textAlign:'right' },
  filtreSatir:  { marginBottom:14 },
  filtreBtn:    { borderRadius:999, paddingHorizontal:12, paddingVertical:6, marginRight:8 },
  filtreTxt:    { fontSize:12, fontWeight:'600' },
  logKart:      { padding:12 },
  logIcerik:    { flexDirection:'row', alignItems:'center', gap:12 },
  logMoodKare:  { width:42, height:42, borderRadius:10, borderWidth:1.5, alignItems:'center', justifyContent:'center' },
  logEmoji:     { fontSize:20 },
  logTag:       { fontSize:14, fontWeight:'600' },
  logSub:       { fontSize:11, marginTop:1, fontStyle:'italic' },
  logGun:       { fontSize:12, fontWeight:'700' },
  logTarih:     { fontSize:10, marginTop:1 },
  bosKap:       { alignItems:'center', paddingVertical:40, gap:8 },
  bosEmoji:     { fontSize:32 },
  bosTxt:       { fontSize:14 },
});
