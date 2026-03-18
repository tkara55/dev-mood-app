// src/components/DeveloperCard.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useApp } from '../context/AppContext';
import { useFadeSlideIn } from '../hooks';
import { Kart, BolumBaslik, Ayrac, DurumRozet, Satir, Badge } from './UI';
import { DEVELOPER } from '../constants';

export function DeveloperCard() {
  const { secilenMood, musaitMi, setMusaitMi, tema, settings, bildirimGonder } = useApp();
  const { opacity, translateY } = useFadeSlideIn(240);

  const headerBg = settings.karanlik ? secilenMood.darkBg! : secilenMood.bg;

  const handleIseAl = () => {
    if (!musaitMi) return;
    setMusaitMi(false);
    bildirimGonder('İşe Alındı! 🎉', `${DEVELOPER.ad} artık projenizde çalışıyor.`);
  };

  const handleMüsait = () => {
    setMusaitMi(true);
    bildirimGonder('Durum Güncellendi', `${DEVELOPER.ad} tekrar müsait.`);
  };

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <BolumBaslik>Yazılımcı Kimlik Kartı 🪪</BolumBaslik>
      <Kart>
        {/* Profil Başlığı — Mood ile renk senkronizasyonu */}
        <View style={[styles.kartHeader, {
          backgroundColor: headerBg,
          borderColor:     secilenMood.border,
        }]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarHarf}>{DEVELOPER.avatar}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.isim, { color: secilenMood.text }]}>{DEVELOPER.ad}</Text>
            <Text style={[styles.rol,  { color: secilenMood.text, opacity: 0.8 }]}>
              Full-Stack Developer
            </Text>
            <Text style={[styles.simdiMood, { color: secilenMood.text, opacity: 0.7 }]}>
              Şu an: {secilenMood.emoji} {secilenMood.tag}
            </Text>
          </View>
        </View>

        <Ayrac />

        {/* Detay Bilgileri */}
        <Satir etiket="Uzmanlık">
          <Text style={[styles.val, { color: tema.metin1 }]} numberOfLines={1}>
            {DEVELOPER.uzmanlik}
          </Text>
        </Satir>
        <Satir etiket="Seviye">
          <Badge label={DEVELOPER.seviye} bg="#EAF3DE" color="#3B6D11" />
        </Satir>
        <Satir etiket="Deneyim">
          <Text style={[styles.val, { color: tema.metin1 }]}>{DEVELOPER.deneyim}</Text>
        </Satir>
        <Satir etiket="Projeler">
          <Text style={[styles.val, { color: tema.metin1 }]}>
            {DEVELOPER.projeSayisi} tamamlandı
          </Text>
        </Satir>
        <Satir etiket="GitHub">
          <Text style={[styles.val, { color: '#378ADD' }]}>{DEVELOPER.github}</Text>
        </Satir>
        <Satir etiket="Durum">
          <DurumRozet aktif={musaitMi} />
        </Satir>

        <Ayrac />

        {/* İşe Al / Serbest Bırak */}
        <TouchableOpacity
          style={[styles.btn, {
            backgroundColor: musaitMi ? headerBg      : tema.ikincil,
            borderColor:     musaitMi ? secilenMood.border : tema.sinir,
          }]}
          onPress={musaitMi ? handleIseAl : handleMüsait}
          activeOpacity={0.8}
        >
          <Text style={[styles.btnText, {
            color: musaitMi ? secilenMood.text : tema.metin3,
          }]}>
            {musaitMi ? '✅  İşe Al' : '🔓  Serbest Bırak'}
          </Text>
        </TouchableOpacity>
      </Kart>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  kartHeader:  { flexDirection:'row', alignItems:'center', gap:12, borderRadius:12, borderWidth:1.5, padding:14, marginBottom:4 },
  avatar:      { width:52, height:52, borderRadius:26, backgroundColor:'#EEEDFE', alignItems:'center', justifyContent:'center' },
  avatarHarf:  { fontSize:18, fontWeight:'700', color:'#3C3489' },
  isim:        { fontSize:16, fontWeight:'700' },
  rol:         { fontSize:12, marginTop:1 },
  simdiMood:   { fontSize:11, marginTop:4, fontStyle:'italic' },
  val:         { fontSize:13, fontWeight:'500', textAlign:'right' },
  btn:         { borderRadius:10, borderWidth:1.5, paddingVertical:13, alignItems:'center', marginTop:4 },
  btnText:     { fontSize:15, fontWeight:'700' },
});
