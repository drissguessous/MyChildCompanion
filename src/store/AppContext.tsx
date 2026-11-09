import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { buildDemoState, DEMO_PASSWORD, DEMO_RECOVERY } from '../data/simulation';
import { hashSecret, newRecoveryCode, normalizeRecovery, randomHex } from '../lib/security';
import type { Lang } from '../coach/messages';
import { completeInPlan, type Plan, type TaskKind } from '../lib/plan';
import { EMPTY_STATE, type AppState, type Attempt, type Child, type MoodEntry } from './types';

const KEY = 'oustadati:v1';
const PARENT_SESSION_MS = 10 * 60 * 1000;

interface Ctx {
  ready: boolean;
  state: AppState;
  child?: Child;
  update: (fn: (s: AppState) => AppState) => void;
  // Parent
  setupParent: (password: string) => Promise<string>; // renvoie le code de secours
  unlockParent: (password: string) => Promise<boolean>;
  recoverParent: (code: string, newPassword: string) => Promise<boolean>;
  parentUnlocked: boolean;
  lockParent: () => void;
  // Démo et données
  loadDemo: () => Promise<void>;
  resetAll: () => Promise<void>;
  // Enfant
  selectChild: (id?: string) => void;
  saveChild: (c: Child) => void;
  removeChild: (id: string) => void;
  addAttempt: (a: Attempt) => void;
  saveAttempt: (a: Attempt) => void;
  addMood: (m: MoodEntry) => void;
  addStars: (childId: string, n: number) => void;
  markActive: (childId: string) => void;
  markLessonRead: (childId: string, chapterId: string) => void;
  setLang: (l: Lang) => void;
  savePlan: (p: Plan) => void;
  completeTask: (childId: string, kind: TaskKind, ref: string) => void;
  bump: (childId: string, counter: string) => void;
  markMission: (childId: string) => void;
  markFamily: (childId: string, week: number) => void;
}

const AppCtx = createContext<Ctx | null>(null);

export const today = () => new Date().toISOString().slice(0, 10);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(EMPTY_STATE);
  const [ready, setReady] = useState(false);
  const [unlockedUntil, setUnlockedUntil] = useState(0);
  const [, tick] = useState(0);
  const loaded = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setState({ ...EMPTY_STATE, ...JSON.parse(raw) });
      } catch {
        // stockage indisponible : on démarre vide
      }
      loaded.current = true;
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => undefined);
  }, [state]);

  // Re-render à l'expiration de la session parent
  useEffect(() => {
    if (unlockedUntil <= Date.now()) return;
    const t = setTimeout(() => tick((n) => n + 1), unlockedUntil - Date.now() + 50);
    return () => clearTimeout(t);
  }, [unlockedUntil]);

  const update = useCallback((fn: (s: AppState) => AppState) => setState((s) => fn(s)), []);

  const setupParent = useCallback(async (password: string) => {
    const salt = randomHex();
    const recoverySalt = randomHex();
    const code = newRecoveryCode();
    const [hash, recoveryHash] = await Promise.all([
      hashSecret(password, salt),
      hashSecret(normalizeRecovery(code), recoverySalt),
    ]);
    setState((s) => ({ ...s, parent: { salt, hash, recoverySalt, recoveryHash } }));
    setUnlockedUntil(Date.now() + PARENT_SESSION_MS);
    return code;
  }, []);

  const unlockParent = useCallback(async (password: string) => {
    const p = state.parent;
    if (!p) return false;
    const ok = (await hashSecret(password, p.salt)) === p.hash;
    if (ok) setUnlockedUntil(Date.now() + PARENT_SESSION_MS);
    return ok;
  }, [state.parent]);

  const recoverParent = useCallback(async (code: string, newPassword: string) => {
    const p = state.parent;
    if (!p) return false;
    const ok = (await hashSecret(normalizeRecovery(code), p.recoverySalt)) === p.recoveryHash;
    if (!ok) return false;
    const salt = randomHex();
    const hash = await hashSecret(newPassword, salt);
    setState((s) => ({ ...s, parent: s.parent && { ...s.parent, salt, hash } }));
    setUnlockedUntil(Date.now() + PARENT_SESSION_MS);
    return true;
  }, [state.parent]);

  const loadDemo = useCallback(async () => {
    const salt = randomHex();
    const recoverySalt = randomHex();
    const [hash, recoveryHash] = await Promise.all([
      hashSecret(DEMO_PASSWORD, salt),
      hashSecret(normalizeRecovery(DEMO_RECOVERY), recoverySalt),
    ]);
    setState((prev) => ({ ...buildDemoState({ salt, hash, recoverySalt, recoveryHash }), lang: prev.lang }));
    setUnlockedUntil(0);
  }, []);

  const resetAll = useCallback(async () => {
    await AsyncStorage.removeItem(KEY).catch(() => undefined);
    setState((prev) => ({ ...EMPTY_STATE, lang: prev.lang }));
    setUnlockedUntil(0);
  }, []);

  const value = useMemo<Ctx>(() => ({
    ready,
    state,
    child: state.children.find((c) => c.id === state.activeChildId),
    update,
    setupParent,
    unlockParent,
    recoverParent,
    parentUnlocked: unlockedUntil > Date.now(),
    lockParent: () => setUnlockedUntil(0),
    loadDemo,
    resetAll,
    selectChild: (id) => setState((s) => ({ ...s, activeChildId: id })),
    saveChild: (c) => setState((s) => ({
      ...s,
      children: s.children.some((x) => x.id === c.id) ? s.children.map((x) => (x.id === c.id ? c : x)) : [...s.children, c],
    })),
    removeChild: (id) => setState((s) => ({
      ...s,
      children: s.children.filter((c) => c.id !== id),
      attempts: s.attempts.filter((a) => a.childId !== id),
      moods: s.moods.filter((m) => m.childId !== id),
      activeChildId: s.activeChildId === id ? undefined : s.activeChildId,
    })),
    addAttempt: (a) => setState((s) => ({ ...s, attempts: [...s.attempts, a] })),
    saveAttempt: (a) => setState((s) => ({ ...s, attempts: s.attempts.map((x) => (x.id === a.id ? a : x)) })),
    addMood: (m) => setState((s) => ({
      ...s,
      moods: [...s.moods.filter((x) => !(x.childId === m.childId && x.date === m.date)), m],
    })),
    addStars: (childId, n) => setState((s) => ({ ...s, stars: { ...s.stars, [childId]: (s.stars[childId] ?? 0) + n } })),
    markActive: (childId) => setState((s) => {
      const days = s.activeDays[childId] ?? [];
      if (days.includes(today())) return s;
      return { ...s, activeDays: { ...s.activeDays, [childId]: [...days, today()] } };
    }),
    markLessonRead: (childId, chapterId) => setState((s) => {
      const list = s.readLessons[childId] ?? [];
      const plan = s.plans[childId];
      const next = plan ? { ...s, plans: { ...s.plans, [childId]: completeInPlan(plan, 'lesson', chapterId) } } : s;
      if (list.includes(chapterId)) return next;
      return { ...next, readLessons: { ...s.readLessons, [childId]: [...list, chapterId] } };
    }),
    setLang: (lang) => setState((s) => ({ ...s, lang })),
    savePlan: (p) => setState((s) => ({ ...s, plans: { ...s.plans, [p.childId]: p } })),
    completeTask: (childId, kind, ref) => setState((s) => {
      const plan = s.plans[childId];
      if (!plan) return s;
      const next = completeInPlan(plan, kind, ref);
      return next === plan ? s : { ...s, plans: { ...s.plans, [childId]: next } };
    }),
    bump: (childId, counter) => setState((s) => {
      const c = s.counters[childId] ?? {};
      return { ...s, counters: { ...s.counters, [childId]: { ...c, [counter]: (c[counter] ?? 0) + 1 } } };
    }),
    markMission: (childId) => setState((s) => {
      const list = s.missionsDone[childId] ?? [];
      if (list.includes(today())) return s;
      return { ...s, missionsDone: { ...s.missionsDone, [childId]: [...list, today()] } };
    }),
    markFamily: (childId, week) => setState((s) => {
      const list = s.familyDone[childId] ?? [];
      if (list.includes(week)) return s;
      return { ...s, familyDone: { ...s.familyDone, [childId]: [...list, week] } };
    }),
  }), [ready, state, update, setupParent, unlockParent, recoverParent, unlockedUntil, loadDemo, resetAll]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp(): Ctx {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp hors AppProvider');
  return c;
}

/** Nombre de jours consécutifs d'activité jusqu'à aujourd'hui (ou hier). */
export function streakOf(days: string[] = []): number {
  const set = new Set(days);
  let n = 0;
  const d = new Date();
  if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (set.has(d.toISOString().slice(0, 10))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
