// src/components/UI.tsx
// Paylaşılan temel UI bileşenleri

import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useApp } from '../context/AppContext';

// ─── Kart ────────────────────────────────────────────────────────────────────

interface KartProps { children: ReactNode; style?: ViewStyle; }
export function Kart({ children, style }: KartProps) {
  const { tema } = useApp();
  return (
    <View style={[{
      backgroundColor: tema.kart,
      borderRadius:    16,
      borderWidth:     0.5,
      borderColor:     tema.sinir,
      padding:         16,
    }, style]}>
      {children}
    </View>
  );
}

// ─── Bölüm Başlığı ───────────────────────────────────────────────────────────

interface BolumProps { children: ReactNode; style?: TextStyle; }
export function BolumBaslik({ children, style }: BolumProps) {
  const { tema } = useApp();
  return (
    <Text style={[{
      fontSize:      11,
      fontWeight:    '600',
      color:         tema.metin3,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom:  10,
    }, style]}>{children}</Text>
  );
}

// ─── Ayraç ───────────────────────────────────────────────────────────────────

export function Ayrac({ style }: { style?: ViewStyle }) {
  const { tema } = useApp();
  return (
    <View style={[{ height: 0.5, backgroundColor: tema.sinir, marginVertical: 12 }, style]} />
  );
}

// ─── Durum Rozeti ─────────────────────────────────────────────────────────────

interface DurumRozetProps {
  aktif: boolean;
  aktifMetin?: string;
  pasifMetin?: string;
}
export function DurumRozet({ aktif, aktifMetin = 'Müsait', pasifMetin = 'Meşgul' }: DurumRozetProps) {
  return (
    <View style={[styles.durumRozet, { backgroundColor: aktif ? '#E1F5EE' : '#FCEBEB' }]}>
      <View style={[styles.nokta, { backgroundColor: aktif ? '#1D9E75' : '#E24B4A' }]} />
      <Text style={[styles.durumMetin, { color: aktif ? '#085041' : '#A32D2D' }]}>
        {aktif ? aktifMetin : pasifMetin}
      </Text>
    </View>
  );
}

// ─── Satır Öğesi ─────────────────────────────────────────────────────────────

interface SatirProps {
  etiket:   string;
  children: ReactNode;
  style?:   ViewStyle;
}
export function Satir({ etiket, children, style }: SatirProps) {
  const { tema } = useApp();
  return (
    <View style={[styles.satir, style]}>
      <Text style={{ fontSize: 13, color: tema.metin3 }}>{etiket}</Text>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>{children}</View>
    </View>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

interface BadgeProps { label: string; bg: string; color: string; }
export function Badge({ label, bg, color }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

// ─── İstatistik Kutusu ────────────────────────────────────────────────────────

interface StatKutuProps { sayi: string; etiket: string; bg?: string; renk?: string; }
export function StatKutu({ sayi, etiket, bg, renk }: StatKutuProps) {
  const { tema } = useApp();
  return (
    <View style={[styles.statKutu, { backgroundColor: bg ?? tema.ikincil }]}>
      <Text style={[styles.statSayi, { color: renk ?? tema.metin1 }]}>{sayi}</Text>
      <Text style={[styles.statEtiket, { color: renk ?? tema.metin3 }]}>{etiket}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  durumRozet:  { flexDirection:'row', alignItems:'center', gap:5, borderRadius:999, paddingHorizontal:10, paddingVertical:4 },
  nokta:       { width:7, height:7, borderRadius:4 },
  durumMetin:  { fontSize:12, fontWeight:'700' },
  satir:       { flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingVertical:6 },
  badge:       { borderRadius:999, paddingHorizontal:12, paddingVertical:3 },
  badgeText:   { fontSize:12, fontWeight:'700' },
  statKutu:    { flex:1, borderRadius:12, padding:12, alignItems:'center', gap:3 },
  statSayi:    { fontSize:24, fontWeight:'800' },
  statEtiket:  { fontSize:10, fontWeight:'600', textAlign:'center' },
});
