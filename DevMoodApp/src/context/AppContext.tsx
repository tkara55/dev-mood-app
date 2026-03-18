// src/context/AppContext.tsx

import React, {
  createContext, useContext, useState,
  useCallback, useEffect, ReactNode,
} from 'react';
import { Mood, DayLog, AppSettings } from '../types';
import { MOODS, DEFAULT_SETTINGS, GUNLER, LIGHT_THEME, DARK_THEME } from '../constants';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function bugunStr(): string {
  return new Date().toISOString().split('T')[0];
}

function buildWeekLog(): DayLog[] {
  const today = new Date();
  return GUNLER.map((gun, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    // Simüle edilmiş geçmiş verisi
    const simulatedMoods = [MOODS[0].id, MOODS[1].id, MOODS[5].id, MOODS[2].id, MOODS[0].id];
    const isToday = i === 6;
    const isPast  = i < 5;
    return {
      date:   dateStr,
      gun,
      moodId: isPast ? simulatedMoods[i] : null,
      aktif:  isPast,
      note:   isPast ? undefined : undefined,
    };
  });
}

function buildHistoryLogs(): DayLog[] {
  const logs: DayLog[] = [];
  const today = new Date();
  const moodIds = MOODS.map(m => m.id);
  for (let i = 30; i >= 7; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    if (isWeekend && Math.random() > 0.3) continue;
    logs.push({
      date:   dateStr,
      gun:    GUNLER[(dayOfWeek + 6) % 7],
      moodId: moodIds[Math.floor(Math.random() * moodIds.length)],
      aktif:  true,
    });
  }
  return logs;
}

// ─── Context Types ────────────────────────────────────────────────────────────

interface AppContextValue {
  // Tema
  tema: typeof LIGHT_THEME;
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;

  // Mood
  secilenMood: Mood;
  setSecilenMood: (mood: Mood) => void;

  // Logs
  weekLog:     DayLog[];
  historyLogs: DayLog[];
  todayNote:   string;
  setTodayNote: (note: string) => void;

  // Stats
  streak:    number;
  enSikMood: Mood;
  toplamAktif: number;

  // Profil
  musaitMi:    boolean;
  setMusaitMi: (v: boolean) => void;

  // Notifications
  bildirimGonder: (baslik: string, mesaj: string) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings,    setSettings]    = useState<AppSettings>(DEFAULT_SETTINGS);
  const [secilenMood, setSecilenMoodRaw] = useState<Mood>(MOODS[0]);
  const [weekLog,     setWeekLog]     = useState<DayLog[]>(buildWeekLog);
  const [historyLogs] = useState<DayLog[]>(buildHistoryLogs);
  const [todayNote,   setTodayNote]   = useState('');
  const [musaitMi,    setMusaitMi]    = useState(true);

  const tema = settings.karanlik ? DARK_THEME : LIGHT_THEME;

  // Mood seçilince bugünün log'unu güncelle
  const setSecilenMood = useCallback((mood: Mood) => {
    setSecilenMoodRaw(mood);
    setWeekLog(prev => {
      const yeni = [...prev];
      yeni[yeni.length - 1] = {
        ...yeni[yeni.length - 1],
        moodId: mood.id,
        aktif:  true,
      };
      return yeni;
    });
  }, []);

  const updateSettings = useCallback((partial: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }));
  }, []);

  // Stats hesaplama
  const aktifGunler  = weekLog.filter(g => g.aktif);
  const streak       = aktifGunler.length;
  const toplamAktif  = aktifGunler.length;

  const enSikMood = (() => {
    const sayac: Record<string, number> = {};
    [...historyLogs, ...aktifGunler]
      .filter(g => g.moodId !== null)
      .forEach(g => { sayac[g.moodId!] = (sayac[g.moodId!] || 0) + 1; });
    const maxId = Object.keys(sayac).sort((a, b) => sayac[b] - sayac[a])[0];
    return MOODS.find(m => m.id === maxId) ?? MOODS[0];
  })();

  // Sahte bildirim (gerçek push notification Expo'da ayrı setup gerektirir)
  const bildirimGonder = useCallback((baslik: string, mesaj: string) => {
    if (!settings.bildirimler) return;
    console.log(`[BİLDİRİM] ${baslik}: ${mesaj}`);
    // Expo: Notifications.scheduleNotificationAsync(...)
  }, [settings.bildirimler]);

  return (
    <AppContext.Provider value={{
      tema, settings, updateSettings,
      secilenMood, setSecilenMood,
      weekLog, historyLogs, todayNote, setTodayNote,
      streak, enSikMood, toplamAktif,
      musaitMi, setMusaitMi,
      bildirimGonder,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
