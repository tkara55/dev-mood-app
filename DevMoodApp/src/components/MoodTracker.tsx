// src/components/MoodTracker.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useApp } from '../context/AppContext';
import { useBounce } from '../hooks';
import { Kart } from './UI';
import { MOODS } from '../constants';

const { width: W } = Dimensions.get('window');
const BTN_W = (W - 72) / 4;

export function MoodTracker() {
  const { secilenMood, setSecilenMood, tema, settings } = useApp();
  const { scale, bounce } = useBounce();

  const handleSec = (mood: typeof MOODS[0]) => {
    setSecilenMood(mood);
    bounce();
  };

  return (
    <Kart style={styles.kart}>
      {/* Aktif Mood Banner */}
      <View style={[styles.banner, {
        backgroundColor: settings.karanlik ? secilenMood.darkBg! : secilenMood.bg,
        borderColor:     secilenMood.border,
      }]}>
        <Animated.Text style={[styles.buyukEmoji, { transform: [{ scale }] }]}>
          {secilenMood.emoji}
        </Animated.Text>
        <View style={{ flex: 1 }}>
          <Text style={[styles.moodTag, { color: secilenMood.text }]}>{secilenMood.tag}</Text>
          <Text style={[styles.moodSub, { color: secilenMood.text, opacity: 0.8 }]}>{secilenMood.sub}</Text>
        </View>
      </View>

      {/* 4×2 Mood Grid */}
      <View style={styles.grid}>
        {MOODS.map((m) => {
          const secili = secilenMood.id === m.id;
          const btnBg  = secili
            ? (settings.karanlik ? m.darkBg! : m.bg)
            : tema.ikincil;
          return (
            <TouchableOpacity
              key={m.id}
              style={[styles.moodBtn, {
                backgroundColor: btnBg,
                borderColor:     secili ? m.border : tema.sinir,
                borderWidth:     secili ? 2 : 0.5,
              }]}
              onPress={() => handleSec(m)}
              activeOpacity={0.75}
            >
              <Text style={styles.btnEmoji}>{m.emoji}</Text>
              <Text style={[styles.btnLabel, { color: secili ? m.text : tema.metin2 }]}>
                {m.tag.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Kart>
  );
}

const styles = StyleSheet.create({
  kart:       { marginBottom: 16 },
  banner:     { flexDirection:'row', alignItems:'center', gap:12, borderRadius:12, borderWidth:1.5, padding:14, marginBottom:14 },
  buyukEmoji: { fontSize:42, lineHeight:50 },
  moodTag:    { fontSize:17, fontWeight:'700' },
  moodSub:    { fontSize:12, marginTop:2, fontStyle:'italic' },
  grid:       { flexDirection:'row', flexWrap:'wrap', gap:8 },
  moodBtn:    { width:BTN_W, borderRadius:10, paddingVertical:12, alignItems:'center', gap:4 },
  btnEmoji:   { fontSize:22, lineHeight:26 },
  btnLabel:   { fontSize:10, fontWeight:'600' },
});
