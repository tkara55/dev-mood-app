// src/types/index.ts

export interface Mood {
  id: string;
  emoji: string;
  tag: string;
  sub: string;
  bg: string;
  border: string;
  text: string;
  darkBg?: string;
}

export interface DayLog {
  date: string;       // ISO date string (YYYY-MM-DD)
  gun: string;        // 'Pt' | 'Sa' | ...
  moodId: string | null;
  aktif: boolean;
  note?: string;
}

export interface Developer {
  ad: string;
  uzmanlik: string;
  seviye: 'Junior' | 'Mid' | 'Senior' | 'Staff' | 'Principal';
  deneyim: string;
  github: string;
  projeSayisi: number;
  avatar: string;
}

export interface AppSettings {
  karanlik: boolean;
  bildirimler: boolean;
  bildirimSaati: string;  // 'HH:MM'
  haftalikRapor: boolean;
  sesEfektleri: boolean;
}

export type RootStackParamList = {
  Ana:     undefined;
  Gecmis:  undefined;
  Ayarlar: undefined;
};
