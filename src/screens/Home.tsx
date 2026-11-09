import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, Text, View } from 'react-native';
import * as coach from '../coach/coach';
import { MOODS, type MoodId } from '../coach/messages';
import { CHAPTERS, chaptersFor } from '../data';
import { getLevel, LEVELS, SUBJECTS } from '../data/curriculum';
import { useI18n } from '../i18n';
import { skillsFor } from '../lib/generators';
import { planProgress, todayTasks, type PlanTask } from '../lib/plan';
import { shareInvite } from '../lib/share';
import { streakOf, today, useApp } from '../store/AppContext';
import type { AppState, Child } from '../store/types';
import { AvatarView, Badge, Btn, Card, H, Muted, P, Row, Screen, T, TeacherBubble } from '../ui/kit';
import { LanguagePicker } from '../ui/LanguagePicker';
import { useNav, type Route } from '../ui/nav';
import { C, R } from '../ui/theme';
import { bilanRef, practiceRef } from '../lib/activities';

export function Profiles() {
  const nav = useNav();
  const { t, level } = useI18n();
  const { state, selectChild } = useApp();
  return (
    <Screen back={false} title="Oustadati">
      <LanguagePicker />
      <H style={{ textAlign: 'center', marginTop: 8 }}>{t('Qui travaille aujourd’hui ?')}</H>
      <Row gap={16} style={{ justifyContent: 'center', marginVertical: 20 }}>
        {state.children.map((c) => (
          <Pressable
            key={c.id}
            accessibilityRole="button"
            onPress={() => { selectChild(c.id); nav.push({ name: 'Home' }); }}
            style={({ pressed }) => ({ alignItems: 'center', width: 120, opacity: pressed ? 0.8 : 1 })}
          >
            <AvatarView avatar={c.avatar} size={96} />
            <Text style={{ fontSize: 18, fontWeight: '800', color: C.ink, marginTop: 8 }}>{c.name}</Text>
            <Muted style={{ textAlign: 'center' }}>{level(getLevel(c.levelId))}</Muted>
          </Pressable>
        ))}
      </Row>
      {state.children.length === 0 && <P style={{ textAlign: 'center', marginBottom: 16 }}>{t('Aucun profil pour l’instant.')}</P>}
      <Btn kind="soft" icon="➕" label={t('Ajouter un enfant')} onPress={() => nav.push({ name: 'ChildEditor' })} />
      <View style={{ height: 10 }} />
      <Btn kind="ghost" icon="🔒" label={t('Espace parent')} onPress={() => nav.push({ name: 'ParentHome' })} />
      {state.demo && <Muted style={{ textAlign: 'center', marginTop: 16 }}>{t('Mode démo — mot de passe parent : 1234')}</Muted>}
    </Screen>
  );
}

function MoodCheck({ onPick }: { onPick: (m: MoodId) => void }) {
  const { t, lang } = useI18n();
  return (
    <Card>
      <P style={{ fontWeight: '800', marginBottom: 10 }}>{t('Comment te sens-tu aujourd’hui ?')}</P>
      <Row gap={10} style={{ justifyContent: 'space-between' }}>
        {MOODS.map((m) => (
          <Pressable key={m.id} accessibilityRole="button" accessibilityLabel={coach.moodLabel(lang, m.id)} onPress={() => onPick(m.id)} style={{ alignItems: 'center', minWidth: 54 }}>
            <Text style={{ fontSize: 34 }}>{m.emoji}</Text>
            <Muted style={{ fontSize: 12, textAlign: 'center' }}>{coach.moodLabel(lang, m.id)}</Muted>
          </Pressable>
        ))}
      </Row>
    </Card>
  );
}

/** Route vers l'activité d'une tâche du plan ou de la mission. */
export function taskRoute(task: PlanTask, child: Child): Route {
  switch (task.kind) {
    case 'lesson': return { name: 'Lesson', chapterId: task.ref };
    case 'exercice': return { name: 'Quiz', mode: 'exercice', refId: task.ref };
    case 'examen': return { name: 'Quiz', mode: 'examen', refId: task.ref };
    case 'entrainement': return { name: 'Quiz', mode: 'entrainement', refId: practiceRef(task.ref, child.levelId) };
    case 'bilan': return { name: 'Quiz', mode: 'bilan', refId: bilanRef(child.levelId) };
  }
}

export const TASK_ICON: Record<PlanTask['kind'], string> = { lesson: '📖', exercice: '✏️', entrainement: '♾️', examen: '📝', bilan: '🗺️' };
export const TASK_LABEL: Record<PlanTask['kind'], string> = { lesson: 'Lire le cours', exercice: 'Exercices', entrainement: 'Entraînement', examen: 'Examen blanc', bilan: 'Bilan' };

/** Mission du jour : tâches du plan, sinon une suggestion adaptée. */
export function missionFor(state: AppState, child: Child): { tasks: PlanTask[]; done: Set<string>; rest: boolean; fromPlan: boolean } {
  const plan = state.plans[child.id];
  if (plan) {
    const day = todayTasks(plan);
    if (day) return { tasks: day.tasks, done: new Set(plan.done), rest: day.rest, fromPlan: true };
  }
  const mine = state.attempts.filter((a) => a.childId === child.id);
  const doneToday = new Set(mine.filter((a) => a.date.slice(0, 10) === today()).map((a) => `${a.kind}:${a.kind === 'entrainement' ? a.refId.split(':')[0] : a.refId}`));
  const read = new Set(state.readLessons[child.id] ?? []);
  const tasks: PlanTask[] = [];
  if (!mine.some((a) => a.kind === 'bilan')) tasks.push({ id: 'm-bilan', kind: 'bilan', ref: 'bilan', title: 'Bilan de positionnement' });
  const unread = CHAPTERS.find((c) => c.levelId === child.levelId && !read.has(c.id));
  if (unread) tasks.push({ id: `m-l-${unread.id}`, kind: 'lesson', ref: unread.id, title: unread.title });
  const skills = skillsFor(child.levelId, LEVELS.map((l) => l.id));
  const skill = [...skills.current, ...skills.review][new Date().getDate() % Math.max(1, skills.current.length + skills.review.length)];
  if (skill) tasks.push({ id: `m-s-${skill.id}`, kind: 'entrainement', ref: skill.id, title: skill.title });
  const ch = CHAPTERS.find((c) => c.levelId === child.levelId && read.has(c.id) && !doneToday.has(`exercice:${c.id}`));
  if (tasks.length < 3 && ch) tasks.push({ id: `m-e-${ch.id}`, kind: 'exercice', ref: ch.id, title: ch.title });
  const done = new Set(tasks.filter((tk) =>
    tk.kind === 'lesson' ? read.has(tk.ref) && false : doneToday.has(`${tk.kind}:${tk.ref}`) || (tk.kind === 'bilan' && mine.some((a) => a.kind === 'bilan')),
  ).map((tk) => tk.id));
  return { tasks: tasks.slice(0, 3), done, rest: false, fromPlan: false };
}

function Mission({ child }: { child: Child }) {
  const nav = useNav();
  const { t, lang, row } = useI18n();
  const { state, markMission } = useApp();
  const m = missionFor(state, child);
  const x = coach.ctx(child, child.teacher, lang);
  const allDone = m.tasks.length > 0 && m.tasks.every((tk) => m.done.has(tk.id));
  useEffect(() => { if (allDone) markMission(child.id); }, [allDone]); // eslint-disable-line react-hooks/exhaustive-deps
  const plan = state.plans[child.id];
  const prog = plan ? planProgress(plan) : undefined;

  return (
    <Card style={{ borderColor: C.primary, borderWidth: 2 }}>
      <Row style={{ justifyContent: 'space-between', marginBottom: 6 }}>
        <H style={{ fontSize: 18, marginBottom: 0 }}>🎯 {t('Mission du jour')}</H>
        {prog && <Badge tone="primary" label={t('Plan : {p} %', { p: Math.round(prog.ratio * 100) })} />}
      </Row>
      {m.rest ? (
        <P>🌿 {t('Aujourd’hui, c’est jour de repos dans ton plan. Joue, lis une histoire, profite de ta famille !')}</P>
      ) : (
        <>
          <Muted style={{ marginBottom: 8 }}>{coach.missionMessage(x, allDone)}</Muted>
          {m.tasks.map((tk) => {
            const done = m.done.has(tk.id);
            return (
              <Pressable key={tk.id} accessibilityRole="button" onPress={() => nav.push(taskRoute(tk, child))}
                style={{ flexDirection: row, alignItems: 'center', gap: 10, paddingVertical: 8, opacity: done ? 0.6 : 1 }}>
                <Text style={{ fontSize: 22 }}>{done ? '✅' : TASK_ICON[tk.kind]}</Text>
                <View style={{ flex: 1 }}>
                  <T style={{ fontSize: 15, fontWeight: '700', color: C.ink, textDecorationLine: done ? 'line-through' : 'none' }}>{t(TASK_LABEL[tk.kind])}</T>
                  <Muted>{t(tk.title)}</Muted>
                </View>
              </Pressable>
            );
          })}
        </>
      )}
      <Btn small kind="soft" icon="🗺️" label={plan ? t('Voir mon plan') : t('Créer mon plan de mise à niveau')} onPress={() => nav.push({ name: 'Plan' })} style={{ marginTop: 8 }} />
    </Card>
  );
}

export function Home() {
  const nav = useNav();
  const { t, lang, level: levelName, subject } = useI18n();
  const { child, state, addMood, markActive } = useApp();
  const [moodReply, setMoodReply] = useState<string>();
  const [inviteMsg, setInviteMsg] = useState('');
  useEffect(() => { if (child) markActive(child.id); }, [child?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!child) return null;

  const x = coach.ctx(child, child.teacher, lang);
  const level = getLevel(child.levelId);
  const todayMood = state.moods.find((m) => m.childId === child.id && m.date === today());
  const childMoods = state.moods.filter((m) => m.childId === child.id);
  const streak = streakOf(state.activeDays[child.id]);
  const stars = state.stars[child.id] ?? 0;
  const message = moodReply ?? (coach.needsAdult(childMoods) ? coach.talkToParent(x) : coach.greeting(x));

  return (
    <Screen
      title={`${child.name} · ${level.short}`}
      right={<Pressable accessibilityRole="button" accessibilityLabel={t('Personnaliser')} onPress={() => nav.push({ name: 'Personalize' })}><AvatarView avatar={child.avatar} size={38} /></Pressable>}
    >
      <TeacherBubble avatar={child.teacher.avatar} name={child.teacher.name} text={message} />
      {!todayMood && (
        <MoodCheck onPick={(mood) => {
          addMood({ childId: child.id, date: today(), mood });
          setMoodReply(coach.moodReply(x, mood));
        }} />
      )}
      {todayMood?.mood === 'stresse' && <Btn kind="soft" icon="🌬️" label={t('Faire l’exercice de respiration')} onPress={() => nav.push({ name: 'Breathing' })} style={{ marginBottom: 12 }} />}

      <Row gap={10} style={{ marginBottom: 12 }}>
        <Pressable accessibilityRole="button" onPress={() => nav.push({ name: 'Badges' })}><Badge tone="sun" label={`⭐ ${t('{n} étoiles d’effort', { n: stars })}`} /></Pressable>
        {streak > 0 && <Badge tone="primary" label={`🔥 ${t('{n} jour(s) de suite', { n: streak })}`} />}
      </Row>
      {streak >= 3 && <Muted style={{ marginBottom: 12 }}>{coach.streakMessage(x)}</Muted>}

      {Platform.OS === 'web' && child.reminder?.enabled && new Date().getHours() * 60 + new Date().getMinutes() >= child.reminder.hour * 60 + child.reminder.minute && (
        <Card style={{ backgroundColor: C.sunSoft, borderColor: C.sun }}><P>⏰ {t('C’est l’heure de ta mission du jour !')}</P></Card>
      )}
      <Mission child={child} />

      <H style={{ fontSize: 18, marginTop: 4 }}>{t('Mes matières')}</H>
      <Muted style={{ marginBottom: 8 }}>{levelName(level)}</Muted>
      <Row gap={12} style={{ marginBottom: 16 }}>
        {level.subjects.map((sid) => {
          const s = SUBJECTS[sid];
          const n = chaptersFor(level.id, sid).length;
          return (
            <Pressable
              key={sid}
              accessibilityRole="button"
              onPress={() => nav.push({ name: 'Subject', subjectId: sid })}
              style={({ pressed }) => ({
                width: '47%', minWidth: 140, flexGrow: 1, backgroundColor: C.card, borderRadius: R.m, padding: 14,
                borderWidth: 1, borderColor: C.line, borderTopWidth: 5, borderTopColor: s.color, opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text style={{ fontSize: 28 }}>{s.icon}</Text>
              <T style={{ fontSize: 16, fontWeight: '800', color: C.ink, marginTop: 4 }}>{subject(sid)}</T>
              <Muted>{n > 0 ? t('{n} cours prêt(s)', { n }) : t('Programme · bientôt')}</Muted>
            </Pressable>
          );
        })}
      </Row>

      <Row gap={10}>
        <Btn style={{ flexGrow: 1 }} kind="sun" icon="♾️" label={t('Entraînement')} onPress={() => nav.push({ name: 'Practice' })} />
        <Btn style={{ flexGrow: 1 }} kind="sun" icon="📝" label={t('Examens blancs')} onPress={() => nav.push({ name: 'Exams' })} />
      </Row>
      <View style={{ height: 10 }} />
      <Row gap={10}>
        <Btn style={{ flexGrow: 1 }} kind="soft" icon="🔎" label={t('Rechercher')} onPress={() => nav.push({ name: 'Search' })} />
        <Btn style={{ flexGrow: 1 }} kind="soft" icon="👨‍👩‍👧" label={t('Défi famille')} onPress={() => nav.push({ name: 'Family' })} />
      </Row>
      <View style={{ height: 10 }} />
      <Row gap={10}>
        <Btn style={{ flexGrow: 1 }} kind="ghost" icon="📊" label={t('Mes notes')} onPress={() => nav.push({ name: 'Grades', childId: child.id })} />
        <Btn style={{ flexGrow: 1 }} kind="ghost" icon="🏅" label={t('Mes badges')} onPress={() => nav.push({ name: 'Badges' })} />
        <Btn style={{ flexGrow: 1 }} kind="ghost" icon="🌬️" label={t('Respirer')} onPress={() => nav.push({ name: 'Breathing' })} />
      </Row>
      <Card style={{ marginTop: 16, backgroundColor: C.sunSoft, borderColor: C.sunSoft }}>
        <P>{coach.dailyTip(x)}</P>
      </Card>
      <Btn kind="ghost" small icon="💌" label={t('Inviter une famille')} onPress={async () => {
        const r = await shareInvite(t('Je te recommande Oustadati, une application gratuite d’accompagnement scolaire (programme Massar), bienveillante et sans publicité :'));
        setInviteMsg(r === 'copied' ? t('Lien copié ! Colle-le dans WhatsApp ou un SMS.') : r === 'failed' ? t('Le partage n’a pas pu s’ouvrir.') : '');
      }} />
      {!!inviteMsg && <Muted style={{ textAlign: 'center', marginTop: 6 }}>{inviteMsg}</Muted>}
      <View style={{ height: 8 }} />
      <Btn kind="ghost" small icon="👥" label={t('Changer de profil')} onPress={() => nav.reset({ name: 'Profiles' })} />
    </Screen>
  );
}

export function Breathing() {
  const { child, bump } = useApp();
  const { t, lang } = useI18n();
  const scale = useRef(new Animated.Value(0.6)).current;
  const [step, setStep] = useState(0);
  const [cycles, setCycles] = useState(0);
  useEffect(() => { if (child && cycles === 3) bump(child.id, 'breathing'); }, [cycles]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    let cancelled = false;
    const seq = [{ to: 1, ms: 4000 }, { to: 1, ms: 2000 }, { to: 0.6, ms: 5000 }];
    let i = 0;
    const run = () => {
      if (cancelled) return;
      setStep(i % 3);
      const s = seq[i % 3];
      Animated.timing(scale, { toValue: s.to, duration: s.ms, easing: Easing.inOut(Easing.quad), useNativeDriver: false }).start(() => {
        i++;
        if (i % 3 === 0) setCycles((c) => c + 1);
        run();
      });
    };
    run();
    return () => { cancelled = true; scale.stopAnimation(); };
  }, [scale]);
  const steps = coach.breathingSteps(lang);
  return (
    <Screen title={t('Respirer ensemble')}>
      {child && <TeacherBubble avatar={child.teacher.avatar} name={child.teacher.name} text={t('Suis le cercle avec ta respiration. Trois fois, et ton corps se calme.')} />}
      <View style={{ alignItems: 'center', justifyContent: 'center', height: 300 }}>
        <Animated.View style={{ width: 220, height: 220, borderRadius: 110, backgroundColor: C.primarySoft, alignItems: 'center', justifyContent: 'center', transform: [{ scale }] }}>
          <Text style={{ fontSize: 46 }}>🌬️</Text>
        </Animated.View>
      </View>
      <H style={{ textAlign: 'center' }}>{steps[step]}</H>
      <Muted style={{ textAlign: 'center' }}>{cycles >= 3 ? t('Bravo, tu as pris trois grandes respirations. Tu peux continuer ou revenir quand tu veux.') : t('Respiration {n} sur 3', { n: cycles + 1 })}</Muted>
    </Screen>
  );
}
