import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BackHandler, Platform } from 'react-native';
import type { SubjectId } from '../data/types';
import type { ActivityKind } from '../lib/activities';

export type Route =
  | { name: 'Welcome' }
  | { name: 'ParentSetup' }
  | { name: 'Profiles' }
  | { name: 'ChildEditor'; childId?: string; onboarding?: boolean }
  | { name: 'Personalize' }
  | { name: 'Home' }
  | { name: 'Subject'; subjectId: SubjectId }
  | { name: 'Lesson'; chapterId: string }
  | { name: 'Quiz'; mode: ActivityKind; refId: string }
  | { name: 'Result'; attemptId: string }
  | { name: 'Correction'; attemptId: string }
  | { name: 'Exams' }
  | { name: 'Search' }
  | { name: 'Grades'; childId: string }
  | { name: 'Breathing' }
  | { name: 'ParentHome' }
  | { name: 'ParentChild'; childId: string }
  | { name: 'ParentSettings' }
  | { name: 'About' }
  | { name: 'Practice' }
  | { name: 'Plan'; fromAttempt?: string }
  | { name: 'Badges' }
  | { name: 'Family' };

interface Nav {
  route: Route;
  canGoBack: boolean;
  push: (r: Route) => void;
  replace: (r: Route) => void;
  reset: (r: Route) => void;
  back: () => void;
}

const NavCtx = createContext<Nav | null>(null);

export function NavProvider({ initial, children }: { initial: Route; children: React.ReactNode }) {
  const [stack, setStack] = useState<Route[]>([initial]);

  const back = useCallback(() => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)), []);

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.length > 1) {
        back();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [stack.length, back]);

  // Web : remonter en haut de page à chaque changement d'écran
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') window.scrollTo?.(0, 0);
  }, [stack]);

  const value = useMemo<Nav>(() => ({
    route: stack[stack.length - 1],
    canGoBack: stack.length > 1,
    push: (r) => setStack((s) => [...s, r]),
    replace: (r) => setStack((s) => [...s.slice(0, -1), r]),
    reset: (r) => setStack([r]),
    back,
  }), [stack, back]);

  return <NavCtx.Provider value={value}>{children}</NavCtx.Provider>;
}

export function useNav(): Nav {
  const n = useContext(NavCtx);
  if (!n) throw new Error('useNav hors NavProvider');
  return n;
}
