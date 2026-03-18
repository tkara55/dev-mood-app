// src/hooks/index.ts

import { useRef, useCallback, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

/** Emoji bounce animasyonu */
export function useBounce() {
  const scale = useRef(new Animated.Value(1)).current;

  const bounce = useCallback(() => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.35,
        useNativeDriver: true,
        speed: 40,
        bounciness: 6,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 25,
        bounciness: 8,
      }),
    ]).start();
  }, [scale]);

  return { scale, bounce };
}

/** Yukarıdan aşağı fade+slide animasyonu */
export function useFadeSlideIn(delay = 0) {
  const opacity   = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue:         1,
        duration:        420,
        delay,
        easing:          Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue:         0,
        duration:        420,
        delay,
        easing:          Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return { opacity, translateY };
}

/** Renk geçiş pulse animasyonu (tab active vb.) */
export function usePulse(active: boolean) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (active) {
      Animated.sequence([
        Animated.spring(scale, { toValue: 1.15, useNativeDriver: true, speed: 30 }),
        Animated.spring(scale, { toValue: 1,    useNativeDriver: true, speed: 20 }),
      ]).start();
    }
  }, [active]);

  return scale;
}

/** Haftalık streak hesaplama hook'u */
export function useStreak(logs: { aktif: boolean }[]): number {
  let streak = 0;
  for (let i = logs.length - 1; i >= 0; i--) {
    if (logs[i].aktif) streak++;
    else break;
  }
  return streak;
}
