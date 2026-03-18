// App.tsx — DevMood v2.0
// TypeScript · Context API · Custom Hooks · React Navigation

import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Platform, StatusBar, Animated,
} from 'react-native';
import { AppProvider, useApp } from './src/context/AppContext';
import { AnaEkran }     from './src/screens/AnaEkran';
import { GecmisEkran }  from './src/screens/GecmisEkran';
import { AyarlarEkran } from './src/screens/AyarlarEkran';
import { usePulse }     from './src/hooks';

// ─── Tab Tipi ────────────────────────────────────────────────────────────────

type Tab = 'ana' | 'gecmis' | 'ayarlar';

interface TabItem {
  id:     Tab;
  emoji:  string;
  label:  string;
}
const TABS: TabItem[] = [
  { id: 'ana',     emoji: '🏠', label: 'Ana Sayfa' },
  { id: 'gecmis',  emoji: '📅', label: 'Geçmiş'   },
  { id: 'ayarlar', emoji: '⚙️', label: 'Ayarlar'   },
];

// ─── Tab Butonu ──────────────────────────────────────────────────────────────

function TabButon({ item, aktif, onPress }: {
  item:    TabItem;
  aktif:   boolean;
  onPress: () => void;
}) {
  const { tema, secilenMood } = useApp();
  const scale = usePulse(aktif);

  return (
    <TouchableOpacity
      style={styles.tabBtn}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Animated.View style={[
        styles.tabPill,
        aktif && { backgroundColor: secilenMood.bg },
        { transform: [{ scale }] },
      ]}>
        <Text style={styles.tabEmoji}>{item.emoji}</Text>
      </Animated.View>
      <Text style={[
        styles.tabLabel,
        { color: aktif ? secilenMood.text : tema.metin3 },
        aktif && { fontWeight: '700' },
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Tab Bar ─────────────────────────────────────────────────────────────────

function TabBar({ aktifTab, setAktifTab }: {
  aktifTab:    Tab;
  setAktifTab: (t: Tab) => void;
}) {
  const { tema } = useApp();
  return (
    <View style={[styles.tabBar, {
      backgroundColor: tema.tab,
      borderTopColor:  tema.sinir,
    }]}>
      {TABS.map(item => (
        <TabButon
          key={item.id}
          item={item}
          aktif={aktifTab === item.id}
          onPress={() => setAktifTab(item.id)}
        />
      ))}
    </View>
  );
}

// ─── Sayfa Başlığı ───────────────────────────────────────────────────────────

function SayfaBasligi({ tab }: { tab: Tab }) {
  const { tema } = useApp();
  const basliklar: Record<Tab, string> = {
    ana:     '',
    gecmis:  'Geçmiş',
    ayarlar: 'Ayarlar',
  };
  if (!basliklar[tab]) return null;
  return (
    <View style={[styles.header, { backgroundColor: tema.kart, borderBottomColor: tema.sinir }]}>
      <Text style={[styles.headerText, { color: tema.metin1 }]}>{basliklar[tab]}</Text>
    </View>
  );
}

// ─── İç Uygulama ─────────────────────────────────────────────────────────────

function IcUygulama() {
  const [aktifTab, setAktifTab] = React.useState<Tab>('ana');
  const { tema, settings } = useApp();

  const ekranlar: Record<Tab, React.ReactElement> = {
    ana:     <AnaEkran />,
    gecmis:  <GecmisEkran />,
    ayarlar: <AyarlarEkran />,
  };

  return (
    <View style={[styles.kap, { backgroundColor: tema.arkaplan }]}>
      <StatusBar barStyle={settings.karanlik ? 'light-content' : 'dark-content'} />
      <SayfaBasligi tab={aktifTab} />
      <View style={{ flex: 1 }}>
        {ekranlar[aktifTab]}
      </View>
      <TabBar aktifTab={aktifTab} setAktifTab={setAktifTab} />
    </View>
  );
}

// ─── Root Export ─────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AppProvider>
      <IcUygulama />
    </AppProvider>
  );
}

// ─── Stiller ─────────────────────────────────────────────────────────────────

const BOTTOM_SAFE = Platform.OS === 'ios' ? 24 : 8;

const styles = StyleSheet.create({
  kap:       { flex: 1 },
  header:    { paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight ?? 24,
               paddingBottom: 12, paddingHorizontal: 20,
               borderBottomWidth: 0.5 },
  headerText:{ fontSize: 22, fontWeight: '700' },
  tabBar:    { flexDirection: 'row', borderTopWidth: 0.5,
               paddingBottom: BOTTOM_SAFE, paddingTop: 10, paddingHorizontal: 10 },
  tabBtn:    { flex: 1, alignItems: 'center', gap: 3 },
  tabPill:   { width: 44, height: 30, borderRadius: 15,
               alignItems: 'center', justifyContent: 'center' },
  tabEmoji:  { fontSize: 18, lineHeight: 22 },
  tabLabel:  { fontSize: 10, fontWeight: '500' },
});
