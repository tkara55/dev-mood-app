// src/screens/AyarlarEkran.tsx

import React from 'react';
import {
  ScrollView, View, Text, Switch,
  TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { useFadeSlideIn } from '../hooks';
import { Kart, BolumBaslik, Ayrac } from '../components/UI';
import { DEVELOPER } from '../constants';

interface AyarSatiriProps {
  emoji:    string;
  baslik:   string;
  aciklama: string;
  deger:    boolean;
  onChange: (v: boolean) => void;
}
function AyarSatiri({ emoji, baslik, aciklama, deger, onChange }: AyarSatiriProps) {
  const { tema } = useApp();
  return (
    <View style={styles.ayarSatir}>
      <View style={[styles.ayarEmoji, { backgroundColor: tema.ikincil }]}>
        <Text style={{ fontSize: 18 }}>{emoji}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.ayarBaslik, { color: tema.metin1 }]}>{baslik}</Text>
        <Text style={[styles.ayarAcik, { color: tema.metin3 }]}>{aciklama}</Text>
      </View>
      <Switch
        value={deger}
        onValueChange={onChange}
        trackColor={{ false: '#E0DED6', true: '#3C3489' }}
        thumbColor={deger ? '#7F77DD' : '#fff'}
      />
    </View>
  );
}

interface BilgiBloğuProps { etiket: string; deger: string; }
function BilgiBloku({ etiket, deger }: BilgiBloğuProps) {
  const { tema } = useApp();
  return (
    <View style={styles.bilgiSatir}>
      <Text style={[styles.bilgiKey, { color: tema.metin3 }]}>{etiket}</Text>
      <Text style={[styles.bilgiVal, { color: tema.metin1 }]}>{deger}</Text>
    </View>
  );
}

export function AyarlarEkran() {
  const { tema, settings, updateSettings, secilenMood, bildirimGonder } = useApp();
  const { opacity, translateY } = useFadeSlideIn(0);

  const handleBildirimTest = () => {
    bildirimGonder('Test Bildirimi 🔔', 'Bildirimler düzgün çalışıyor!');
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: tema.arkaplan }}
      contentContainerStyle={styles.icerik}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={{ opacity, transform: [{ translateY }] }}>

        {/* Profil Özeti */}
        <BolumBaslik>Profil</BolumBaslik>
        <Kart style={{ marginBottom: 18 }}>
          <View style={[styles.profilHeader, {
            backgroundColor: settings.karanlik ? secilenMood.darkBg! : secilenMood.bg,
            borderColor:     secilenMood.border,
          }]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarHarf}>{DEVELOPER.avatar}</Text>
            </View>
            <View>
              <Text style={[styles.profilAd,  { color: secilenMood.text }]}>{DEVELOPER.ad}</Text>
              <Text style={[styles.profilRol, { color: secilenMood.text, opacity: 0.75 }]}>
                {DEVELOPER.seviye} Developer · {DEVELOPER.deneyim}
              </Text>
            </View>
          </View>
          <Ayrac />
          <BilgiBloku etiket="GitHub"   deger={DEVELOPER.github} />
          <BilgiBloku etiket="Uzmanlık" deger={DEVELOPER.uzmanlik} />
          <BilgiBloku etiket="Projeler" deger={`${DEVELOPER.projeSayisi} tamamlandı`} />
        </Kart>

        {/* Görünüm Ayarları */}
        <BolumBaslik>Görünüm</BolumBaslik>
        <Kart style={{ marginBottom: 18 }}>
          <AyarSatiri
            emoji="🌙"
            baslik="Karanlık Mod"
            aciklama="Gözlerini yorma, kodunu yaz."
            deger={settings.karanlik}
            onChange={(v) => updateSettings({ karanlik: v })}
          />
          <Ayrac style={{ marginVertical: 8 }} />
          <AyarSatiri
            emoji="🔊"
            baslik="Ses Efektleri"
            aciklama="Mood değiştirirken ses çıksın."
            deger={settings.sesEfektleri}
            onChange={(v) => updateSettings({ sesEfektleri: v })}
          />
        </Kart>

        {/* Bildirim Ayarları */}
        <BolumBaslik>Bildirimler</BolumBaslik>
        <Kart style={{ marginBottom: 18 }}>
          <AyarSatiri
            emoji="🔔"
            baslik="Günlük Hatırlatıcı"
            aciklama="Her gün mood'unu kaydet."
            deger={settings.bildirimler}
            onChange={(v) => updateSettings({ bildirimler: v })}
          />
          <Ayrac style={{ marginVertical: 8 }} />
          <AyarSatiri
            emoji="📊"
            baslik="Haftalık Rapor"
            aciklama="Haftanın mood özetini al."
            deger={settings.haftalikRapor}
            onChange={(v) => updateSettings({ haftalikRapor: v })}
          />
          {settings.bildirimler && (
            <>
              <Ayrac style={{ marginVertical: 8 }} />
              <TouchableOpacity
                style={[styles.testBtn, { backgroundColor: tema.ikincil, borderColor: tema.sinir }]}
                onPress={handleBildirimTest}
                activeOpacity={0.7}
              >
                <Text style={[styles.testBtnText, { color: tema.metin2 }]}>
                  🔔  Test Bildirimi Gönder
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Kart>

        {/* Uygulama Bilgisi */}
        <BolumBaslik>Uygulama</BolumBaslik>
        <Kart style={{ marginBottom: 18 }}>
          <BilgiBloku etiket="Sürüm"       deger="2.0.0" />
          <BilgiBloku etiket="Framework"   deger="React Native + Expo" />
          <BilgiBloku etiket="Dil"         deger="TypeScript" />
          <BilgiBloku etiket="State"       deger="Context API + Custom Hooks" />
          <BilgiBloku etiket="Animasyon"   deger="Animated API (Spring + Timing)" />
          <BilgiBloku etiket="Navigasyon"  deger="React Navigation v6" />
        </Kart>

        {/* Sıfırla */}
        <TouchableOpacity
          style={[styles.resetBtn, { borderColor: '#E24B4A' }]}
          activeOpacity={0.7}
          onPress={() => updateSettings({ bildirimler: true, haftalikRapor: true, sesEfektleri: false })}
        >
          <Text style={[styles.resetText, { color: '#E24B4A' }]}>🗑  Ayarları Sıfırla</Text>
        </TouchableOpacity>

      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icerik:       { padding:20, paddingTop:16, paddingBottom:50 },
  profilHeader: { flexDirection:'row', alignItems:'center', gap:14, borderRadius:12, borderWidth:1.5, padding:14 },
  avatar:       { width:52, height:52, borderRadius:26, backgroundColor:'#EEEDFE', alignItems:'center', justifyContent:'center' },
  avatarHarf:   { fontSize:18, fontWeight:'700', color:'#3C3489' },
  profilAd:     { fontSize:16, fontWeight:'700' },
  profilRol:    { fontSize:12, marginTop:2 },
  ayarSatir:    { flexDirection:'row', alignItems:'center', gap:12 },
  ayarEmoji:    { width:40, height:40, borderRadius:10, alignItems:'center', justifyContent:'center' },
  ayarBaslik:   { fontSize:14, fontWeight:'600' },
  ayarAcik:     { fontSize:11, marginTop:1 },
  bilgiSatir:   { flexDirection:'row', justifyContent:'space-between', paddingVertical:5 },
  bilgiKey:     { fontSize:13 },
  bilgiVal:     { fontSize:13, fontWeight:'500', textAlign:'right', flex:1, marginLeft:8 },
  testBtn:      { borderRadius:10, borderWidth:0.5, padding:12, alignItems:'center' },
  testBtnText:  { fontSize:14, fontWeight:'600' },
  resetBtn:     { borderRadius:10, borderWidth:1, padding:13, alignItems:'center' },
  resetText:    { fontSize:14, fontWeight:'600' },
});
