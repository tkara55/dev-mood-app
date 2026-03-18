// src/constants/index.ts

import { Mood, Developer, AppSettings } from '../types';

export const MOODS: Mood[] = [
  { id:'flow',    emoji:'⚡', tag:'Flow Modu',    sub:'Kod akıyor, dokunma.',          bg:'#EEEDFE', border:'#7F77DD', text:'#3C3489', darkBg:'#1E1B3A' },
  { id:'focus',   emoji:'🧠', tag:'Odak',         sub:'Derin düşünce modunda.',         bg:'#E1F5EE', border:'#1D9E75', text:'#085041', darkBg:'#0D2B22' },
  { id:'coffee',  emoji:'☕', tag:'Kahve Lazım',  sub:'Kafein seviyesi kritik.',         bg:'#FAEEDA', border:'#BA7517', text:'#633806', darkBg:'#2B1E08' },
  { id:'debug',   emoji:'🐛', tag:'Bug Avı',      sub:"Saatlerdir bu bug'ı arıyorum.", bg:'#FAECE7', border:'#D85A30', text:'#4A1B0C', darkBg:'#2B120A' },
  { id:'review',  emoji:'📝', tag:'Code Review',  sub:"PR'ler gözden geçiriliyor.",    bg:'#E6F1FB', border:'#378ADD', text:'#042C53', darkBg:'#071929' },
  { id:'fire',    emoji:'🔥', tag:'Prod Yanıyor', sub:'Herkes beni arıyor...',           bg:'#FCEBEB', border:'#E24B4A', text:'#501313', darkBg:'#2B0A0A' },
  { id:'sprint',  emoji:'🎯', tag:'Sprint Sonu',  sub:'Demo zamanı, hazır mıyız?',      bg:'#F0E8FC', border:'#9B59B6', text:'#5B2C6F', darkBg:'#1E0D2B' },
  { id:'rest',    emoji:'🧘', tag:'Mola',         sub:'Biraz nefes almak lazım.',        bg:'#E8F8F5', border:'#1ABC9C', text:'#0E6655', darkBg:'#0A2B24' },
];

export const DEVELOPER: Developer = {
  ad:           'Ahmet Yılmaz',
  uzmanlik:     'React Native · Node.js · TypeScript',
  seviye:       'Senior',
  deneyim:      '7 yıl',
  github:       'github.com/ahmetyilmaz',
  projeSayisi:  24,
  avatar:       'AY',
};

export const DEFAULT_SETTINGS: AppSettings = {
  karanlik:        false,
  bildirimler:     true,
  bildirimSaati:   '09:00',
  haftalikRapor:   true,
  sesEfektleri:    false,
};

export const GUNLER = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];

export const LIGHT_THEME = {
  arkaplan: '#F5F4F0',
  kart:     '#FFFFFF',
  sinir:    '#E0DED6',
  metin1:   '#1A1A1A',
  metin2:   '#555550',
  metin3:   '#999994',
  ikincil:  '#F0EFE9',
  tab:      '#FFFFFF',
};

export const DARK_THEME = {
  arkaplan: '#0F0F0F',
  kart:     '#1C1C1E',
  sinir:    '#2C2C2E',
  metin1:   '#F2F2F7',
  metin2:   '#AEAEB2',
  metin3:   '#636366',
  ikincil:  '#2C2C2E',
  tab:      '#1C1C1E',
};
