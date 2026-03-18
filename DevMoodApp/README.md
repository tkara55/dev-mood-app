<div align="center">

# 🎭 DevMood

### Geliştirici Ruh Hali Takip Uygulaması

*Ruh halin, kodun kadar önemli.*

[![React Native](https://img.shields.io/badge/React%20Native-0.74-61DAFB?style=flat-square&logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Expo](https://img.shields.io/badge/Expo-51-000020?style=flat-square&logo=expo)](https://expo.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📱 Uygulama Hakkında

**DevMood**, yazılımcıların günlük ruh hallerini takip etmelerine, haftalık istatistiklerini görmelerine ve geçmiş kayıtlarına ulaşmalarına olanak tanıyan bir React Native uygulamasıdır.

Bu proje, React Native öğrenim sürecinde **prop/state yönetimi**, **Context API**, **Custom Hooks** ve **animasyon** konularını pekiştirmek amacıyla geliştirilmiştir.

---

## 🎮 Oyunlaştırma Özellikleri

| Özellik | Açıklama |
|---|---|
| 🔥 **Streak Sistemi** | Her gün mood kaydedilirse streak artar, zinciri kırma! |
| 🏆 **En Sık Mood Rozeti** | Haftalık en baskın mood'un emoji rozeti kazanılır |
| 📊 **Haftalık Bar** | 7 günlük emoji takvimi, bugün vurgulu gösterilir |
| 📈 **Mood Dağılım Grafiği** | 30 günlük geçmiş verisi bar grafik olarak görselleştirilir |
| 🪪 **Geliştirici Kimlik Kartı** | Mood'a göre renk değiştiren profil kartı |
| ✅ **İşe Al Butonu** | Müsaitlik durumu toggle'ı — gerçekçi HR deneyimi |

---

## ✨ Özellikler

### 🎭 Mood Tracker
- **8 farklı geliştirici modu:** Flow ⚡, Odak 🧠, Kahve ☕, Bug Avı 🐛, Code Review 📝, Prod Yanıyor 🔥, Sprint Sonu 🎯, Mola 🧘
- Seçilen mood'a göre banner, kimlik kartı ve tab bar rengi anlık değişir
- Emoji **spring bounce** animasyonu

### 📅 Geçmiş Ekranı
- 30+ günlük kayıt listesi
- Mood bazlı **filtre çipleri**
- **Bar grafik** ile mood dağılımı
- Kronolojik sıralı log görünümü

### ⚙️ Ayarlar Ekranı
- 🌙 Dark / Light tema geçişi
- 🔔 Bildirim ve haftalık rapor toggle'ları
- 🔊 Ses efektleri ayarı
- Uygulama teknik bilgileri

---

## 🏗 Teknik Mimari

```
DevMoodApp/
├── App.tsx                        ← Root + Tab Navigation
├── src/
│   ├── types/index.ts             ← TypeScript arayüzleri (Mood, DayLog, AppSettings...)
│   ├── constants/index.ts         ← MOODS[], DEVELOPER, tema renkleri
│   ├── context/AppContext.tsx     ← Global state yönetimi (Context API)
│   ├── hooks/index.ts             ← useBounce · useFadeSlideIn · usePulse · useStreak
│   ├── components/
│   │   ├── UI.tsx                 ← Kart · Ayrac · Badge · StatKutu · DurumRozet
│   │   ├── MoodTracker.tsx        ← 8 mood butonu + animasyonlu banner
│   │   ├── WeeklyStats.tsx        ← Streak + haftalık emoji bar
│   │   └── DeveloperCard.tsx      ← Kimlik kartı + İşe Al/Serbest Bırak
│   └── screens/
│       ├── AnaEkran.tsx
│       ├── GecmisEkran.tsx
│       └── AyarlarEkran.tsx
├── tsconfig.json
├── app.json
└── package.json
```

### Kullanılan Teknolojiler

- **TypeScript** — strict mode, tüm tip tanımları ayrı dosyada
- **Context API** — tek `AppContext` ile global state (tema + mood + log + ayarlar)
- **4 Custom Hook** — `useBounce`, `useFadeSlideIn`, `usePulse`, `useStreak`
- **Animated API** — Spring · Timing · Parallel · Sequence kombinasyonu
- **Data-driven** — `MOODS[]` config, yeni mood eklemek JSX gerektirmiyor

---

## 🚀 Nasıl Çalıştırılır?

### Gereksinimler

- [Node.js](https://nodejs.org) v18 veya üzeri
- [Expo Go](https://expo.dev/client) uygulaması (iOS/Android)

### Adımlar

**1. Repoyu klonla**
```bash
git clone https://github.com/KULLANICI_ADIN/dev-mood-app.git
cd dev-mood-app
```

**2. Bağımlılıkları yükle**
```bash
npm install
```

**3. Uygulamayı başlat**
```bash
npx expo start
```

**4. Telefonda aç**
- Terminalde QR kodu çıkar
- iPhone: Kamerayı aç → QR'a tut → Expo Go'da aç
- Android: Expo Go aç → "Scan QR code" → tara

---

## 📦 APK İndir

> Android için direkt kurulum dosyası:

**[⬇️ DevMood-v2.0.apk](releases/DevMood-v2.0.apk)**

> ⚠️ APK'yı yüklemek için Android ayarlarında "Bilinmeyen kaynaklara izin ver" seçeneğini açman gerekebilir.

---

## 🎬 Tanıtım Videosu

[![DevMood Tanıtım](https://img.shields.io/badge/▶%20YouTube'da%20İzle-FF0000?style=for-the-badge&logo=youtube)](https://youtube.com/YOUR_VIDEO_LINK)

---

## 🤖 AI Kullanımı (Ödev Notu)

Bu proje, önce iskelet kod elle yazılmış, ardından Claude AI ile geliştirilmiştir.

**Kullanılan Prompt:**
> *"Yazdığım iskelet kodu Clean Code prensiplerine göre refactor et: mood state'ini Context API ile global yap, useBounce · useFadeSlideIn · usePulse · useStreak adlı 4 custom hook oluştur, tüm kodu TypeScript strict mode uyumlu hale getir. Geçmiş ekranı için 30 günlük simüle veri üret ve mood bazlı filtre + dağılım grafiği ekle."*

**Öğrenilen:**
`Animated.parallel` ve `Animated.sequence` birleştirilerek fade + slide animasyonu tek hook'ta yönetildi. Her ekran `useFadeSlideIn(delay)` ile kendi staggered girişini yapıyor — animasyon mantığı tamamen bileşenden ayrı.

---

## 📄 Lisans

MIT © 2025 — [Ahmet Yılmaz](https://github.com/KULLANICI_ADIN)
