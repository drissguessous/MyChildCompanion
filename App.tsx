import { NotoSansTifinagh_400Regular, useFonts } from '@expo-google-fonts/noto-sans-tifinagh';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { syncReminders } from './src/lib/reminders';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ChildEditor, Personalize } from './src/screens/ChildEditor';
import { Correction } from './src/screens/Correction';
import { Breathing, Home, Profiles } from './src/screens/Home';
import { Badges, Family, PlanScreen, Practice } from './src/screens/Growth';
import { Exams, Lesson, SubjectScreen } from './src/screens/Learn';
import { ParentSetup, Welcome } from './src/screens/Onboarding';
import { About, Grades, ParentChild, ParentHome, ParentSettings } from './src/screens/Parent';
import { Quiz, Result } from './src/screens/Quiz';
import { Search } from './src/screens/Search';
import { AppProvider, useApp } from './src/store/AppContext';
import { NavProvider, useNav, type Route } from './src/ui/nav';
import { C } from './src/ui/theme';

function Router() {
  const { route } = useNav();
  const { child } = useApp();
  const needsChild = ['Home', 'Subject', 'Lesson', 'Quiz', 'Result', 'Exams', 'Search', 'Personalize', 'Breathing', 'Practice', 'Plan', 'Badges', 'Family'];
  if (needsChild.includes(route.name) && !child) return <Profiles />;
  switch (route.name) {
    case 'Welcome': return <Welcome />;
    case 'ParentSetup': return <ParentSetup />;
    case 'Profiles': return <Profiles />;
    case 'ChildEditor': return <ChildEditor childId={route.childId} onboarding={route.onboarding} />;
    case 'Personalize': return <Personalize />;
    case 'Home': return <Home />;
    case 'Subject': return <SubjectScreen subjectId={route.subjectId} />;
    case 'Lesson': return <Lesson key={route.chapterId} chapterId={route.chapterId} />;
    case 'Quiz': return <Quiz key={`${route.mode}-${route.refId}`} mode={route.mode} refId={route.refId} />;
    case 'Result': return <Result attemptId={route.attemptId} />;
    case 'Correction': return <Correction attemptId={route.attemptId} />;
    case 'Exams': return <Exams />;
    case 'Search': return <Search />;
    case 'Grades': return <Grades childId={route.childId} />;
    case 'Breathing': return <Breathing />;
    case 'ParentHome': return <ParentHome />;
    case 'ParentChild': return <ParentChild childId={route.childId} />;
    case 'ParentSettings': return <ParentSettings />;
    case 'About': return <About />;
    case 'Practice': return <Practice />;
    case 'Plan': return <PlanScreen fromAttempt={route.fromAttempt} />;
    case 'Badges': return <Badges />;
    case 'Family': return <Family />;
  }
}

/** Reprogramme les rappels quand les profils, les plans ou la langue changent. */
function ReminderSync() {
  const { ready, state } = useApp();
  const key = JSON.stringify([state.lang, state.children.map((c) => [c.id, c.name, c.reminder, c.teacher.name]), Object.values(state.plans).map((p) => p.id)]);
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => { syncReminders(state).catch(() => undefined); }, 800);
    return () => clearTimeout(id);
  }, [ready, key]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

function Root() {
  const { ready, state } = useApp();
  const [fontsLoaded, fontError] = useFonts({ NotoSansTifinagh_400Regular });
  if (!ready || (!fontsLoaded && !fontError)) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.bg }}>
        <Text style={{ fontSize: 56 }}>👩‍🏫</Text>
        <ActivityIndicator color={C.primary} style={{ marginTop: 12 }} />
      </View>
    );
  }
  const initial: Route = !state.parent ? { name: 'Welcome' } : state.children.length === 0 ? { name: 'ChildEditor', onboarding: true } : { name: 'Profiles' };
  return (
    <NavProvider initial={initial}>
      <Router />
    </NavProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" />
        <ReminderSync />
        <Root />
      </AppProvider>
    </SafeAreaProvider>
  );
}
