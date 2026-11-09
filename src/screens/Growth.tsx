import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { getLevel, LEVELS } from '../data/curriculum';
import { useI18n } from '../i18n';
import { bilanRef, practiceRef } from '../lib/activities';
import { badgesFor } from '../lib/badges';
import { generate, skillsFor, weekNumber } from '../lib/generators';
import { buildPlan, masteryFromBilan, planProgress } from '../lib/plan';
import { correctAnswerText, printHtml } from '../lib/print';
import { streakOf, today, useApp } from '../store/AppContext';
import { Badge, Btn, Card, H, Muted, P, Row, Screen, T, TeacherBubble } from '../ui/kit';
import { useNav } from '../ui/nav';
import { C, R } from '../ui/theme';
import { TASK_ICON, TASK_LABEL, taskRoute } from './Home';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export function Practice() {
  const nav = useNav();
  const { t, subject } = useI18n();
  const { child } = useApp();
  if (!child) return null;
  const { current, review } = skillsFor(child.levelId, LEVELS.map((l) => l.id));
  const card = (k: (typeof current)[number]) => (
    <Card key={k.id} color={C.primary} onPress={() => nav.push({ name: 'Quiz', mode: 'entrainement', refId: practiceRef(k.id, child.levelId) })}>
      <T style={{ fontSize: 16, fontWeight: '700', color: C.ink }}>{t(k.title)}</T>
      <Muted>{subject(k.subjectId)} · {t('8 questions nouvelles à chaque fois')}</Muted>
    </Card>
  );
  return (
    <Screen title={`♾️ ${t('Entraînement')}`}>
      <Muted style={{ marginBottom: 12 }}>{t('Des exercices toujours nouveaux, corrigés tout de suite. Entraîne-toi autant que tu veux !')}</Muted>
      {current.length > 0 && <H style={{ fontSize: 18 }}>{t('Mon année')}</H>}
      {current.map(card)}
      {review.length > 0 && <H style={{ fontSize: 18, marginTop: 8 }}>{t('Mise à niveau : les bases')}</H>}
      {review.map(card)}
      {current.length + review.length === 0 && <P>{t('L’entraînement de ce niveau arrive bientôt.')}</P>}
    </Screen>
  );
}

export function PlanScreen({ fromAttempt }: { fromAttempt?: string }) {
  const nav = useNav();
  const { t, level, row, lang } = useI18n();
  const locale = lang === 'ar' ? 'ar-MA' : 'fr-FR';
  const { child, state, savePlan } = useApp();
  const [printing, setPrinting] = useState(false);
  const attempt = state.attempts.find((a) => a.id === fromAttempt);
  useEffect(() => {
    if (!child || !attempt || attempt.kind !== 'bilan') return;
    const existing = state.plans[child.id];
    if (existing && existing.createdAt > attempt.date) return;
    savePlan(buildPlan(child.id, child.levelId, masteryFromBilan(attempt.refId, attempt.answers)));
  }, [attempt?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!child) return null;
  const plan = state.plans[child.id];

  if (!plan) {
    return (
      <Screen title={t('Mon plan')}>
        <TeacherBubble avatar={child.teacher.avatar} name={child.teacher.name}
          text={t('Pour te préparer un plan rien que pour toi, je commence par un petit bilan. Ce n’est pas une note : ça m’aide à savoir ce que tu sais déjà.')} />
        <Btn icon="🗺️" label={t('Commencer mon bilan')} onPress={() => nav.push({ name: 'Quiz', mode: 'bilan', refId: bilanRef(child.levelId) })} />
      </Screen>
    );
  }

  const prog = planProgress(plan);
  const done = new Set(plan.done);
  const todayIso = today();

  async function printPlan() {
    setPrinting(true);
    const rows = plan.days.map((d) => `<tr><td>${new Date(d.date).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: '2-digit' })}</td><td>${d.rest ? 'Repos 🌿' : d.tasks.map((tk) => `☐ ${TASK_ICON[tk.kind]} ${esc(TASK_LABEL[tk.kind])} : ${esc(tk.title)}`).join('<br>')}</td></tr>`).join('');
    const mastery = plan.mastery.map((m) => `<li>${esc(m.title)} — ${Math.round(m.ratio * 100)} %</li>`).join('');
    await printHtml(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Plan</title><style>body{font-family:Arial,sans-serif;color:#1F2340}h1{color:#5B4BDB}table{border-collapse:collapse;width:100%}td{border:1px solid #ddd;padding:6px;vertical-align:top;font-size:11pt}</style></head><body>
      <h1>Oustadati — plan de mise à niveau</h1><p>${esc(child!.name)} · ${esc(getLevel(child!.levelId).label)} · ${plan.weeks} semaines</p>
      <h3>Bilan de départ</h3><ul>${mastery}</ul><h3>Programme</h3><table>${rows}</table></body></html>`).finally(() => setPrinting(false));
  }

  return (
    <Screen title={t('Mon plan')}>
      <Card>
        <Row style={{ justifyContent: 'space-between' }}>
          <H style={{ fontSize: 18, marginBottom: 0 }}>🗺️ {t('Plan de {n} semaines', { n: plan.weeks })}</H>
          <Badge tone="primary" label={`${Math.round(prog.ratio * 100)} %`} />
        </Row>
        <View style={{ height: 10, backgroundColor: C.primarySoft, borderRadius: 5, marginVertical: 10, overflow: 'hidden' }}>
          <View style={{ height: 10, width: `${Math.round(prog.ratio * 100)}%`, backgroundColor: C.primary }} />
        </View>
        <Muted>{t('{a} tâches faites sur {b}', { a: prog.done, b: prog.total })} · {level(getLevel(plan.levelId))}</Muted>
      </Card>
      <Card>
        <H style={{ fontSize: 17 }}>{t('Mon point de départ')}</H>
        {plan.mastery.map((m) => (
          <Row key={m.unit} style={{ justifyContent: 'space-between', paddingVertical: 4 }}>
            <P style={{ flex: 1 }} content>{t(m.title)}</P>
            <Badge tone={m.ratio >= 0.85 ? 'ok' : m.ratio >= 0.6 ? 'primary' : 'sun'} label={m.ratio >= 0.85 ? t('Acquis') : m.ratio >= 0.6 ? t('En cours') : t('À travailler')} />
          </Row>
        ))}
      </Card>
      {plan.days.map((d) => {
        const isToday = d.date === todayIso;
        const past = d.date < todayIso;
        return (
          <Card key={d.date} style={isToday ? { borderColor: C.primary, borderWidth: 2 } : past ? { opacity: 0.75 } : undefined}>
            <Row style={{ justifyContent: 'space-between', marginBottom: 4 }}>
              <T style={{ fontWeight: '800', color: C.ink }}>{new Date(d.date).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'short' })}</T>
              {isToday && <Badge tone="primary" label={t('Aujourd’hui')} />}
            </Row>
            {d.rest ? <Muted>🌿 {t('Repos')}</Muted> : d.tasks.map((tk) => (
              <Pressable key={tk.id} accessibilityRole="button" onPress={() => nav.push(taskRoute(tk, child))} style={{ flexDirection: row, gap: 8, paddingVertical: 4 }}>
                <Text>{done.has(tk.id) ? '✅' : TASK_ICON[tk.kind]}</Text>
                <T style={{ flex: 1, color: C.ink }}>{t(TASK_LABEL[tk.kind])} · {t(tk.title)}</T>
              </Pressable>
            ))}
          </Card>
        );
      })}
      <Row gap={10}>
        <Btn small kind="soft" icon="🖨️" label={t('Imprimer le plan')} loading={printing} onPress={printPlan} />
        <Btn small kind="ghost" icon="🗺️" label={t('Refaire un bilan')} onPress={() => nav.push({ name: 'Quiz', mode: 'bilan', refId: bilanRef(child.levelId) })} />
      </Row>
    </Screen>
  );
}

export function Badges() {
  const { t } = useI18n();
  const { child, state } = useApp();
  if (!child) return null;
  const list = badgesFor(state, child.id);
  const earned = list.filter((b) => b.earned);
  const stars = state.stars[child.id] ?? 0;

  function diploma() {
    const f = child!.gender === 'f';
    printHtml(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Diplôme</title><style>
      @page{size:A4 landscape;margin:12mm}body{font-family:Georgia,serif;text-align:center;color:#1F2340}
      .b{border:10px double #5B4BDB;border-radius:24px;padding:36px;height:150mm}h1{font-size:40pt;color:#5B4BDB;margin:8px}
      .n{font-size:34pt;font-weight:bold;margin:18px}.s{font-size:16pt}.e{font-size:30pt;letter-spacing:6px}</style></head><body><div class="b">
      <div class="e">⭐ 🏅 ⭐</div><h1>Diplôme d’effort</h1><div class="s">décerné à</div><div class="n">${esc(child!.name)}</div>
      <div class="s">pour ${f ? 'sa' : 'sa'} persévérance et ${f ? 'sa' : 'sa'} régularité dans ses apprentissages :<br>
      ${stars} étoiles d’effort · ${earned.length} badges · ${streakOf(state.activeDays[child!.id])} jour(s) de travail d’affilée</div>
      <p class="s" style="margin-top:28px">${esc(earned.map((b) => `${b.icon} ${b.title}`).join(' · '))}</p>
      <p class="s" style="margin-top:28px">Avec toute la fierté de ${esc(child!.teacher.name)} — ${new Date().toLocaleDateString('fr-FR')}</p>
      <p style="color:#6B7090">Oustadati · أستاذتي</p></div></body></html>`);
  }

  return (
    <Screen title={`🏅 ${t('Mes badges')}`}>
      <Muted style={{ marginBottom: 12 }}>{t('Les badges récompensent ton effort et ta régularité, pas seulement tes notes.')}</Muted>
      <Row gap={12}>
        {list.map((b) => (
          <View key={b.id} style={{ width: '30%', minWidth: 100, flexGrow: 1, alignItems: 'center', backgroundColor: C.card, borderRadius: R.m, padding: 12, borderWidth: 1, borderColor: b.earned ? C.sun : C.line, opacity: b.earned ? 1 : 0.45 }}>
            <Text style={{ fontSize: 38 }}>{b.earned ? b.icon : '🔒'}</Text>
            <T style={{ fontWeight: '800', color: C.ink, textAlign: 'center', marginTop: 4 }}>{t(b.title)}</T>
            <Muted style={{ textAlign: 'center', fontSize: 12 }}>{t(b.desc)}</Muted>
          </View>
        ))}
      </Row>
      <View style={{ height: 16 }} />
      <Btn kind="sun" icon="🎓" label={t('Imprimer mon diplôme d’effort')} onPress={diploma} disabled={earned.length === 0} />
    </Screen>
  );
}

export function Family() {
  const { t } = useI18n();
  const { child, markFamily, addStars, state } = useApp();
  const [shown, setShown] = useState(false);
  if (!child) return null;
  const week = weekNumber();
  const { current, review } = skillsFor(child.levelId, LEVELS.map((l) => l.id));
  const pool = [...current, ...review];
  const done = (state.familyDone[child.id] ?? []).includes(week);
  if (!pool.length) return <Screen title={t('Défi famille')}><P>{t('Le défi famille de ce niveau arrive bientôt.')}</P></Screen>;
  const skill = pool[week % pool.length];
  const q = generate(skill.id, week * 31 + child.name.length, 1)[0];
  return (
    <Screen title={`👨‍👩‍👧 ${t('Défi famille')}`}>
      <TeacherBubble avatar={child.teacher.avatar} name={child.teacher.name}
        text={t('Cette semaine, c’est toi le professeur ! Pose cette question à papa, maman ou à un frère ou une sœur. Vérifie leur réponse et explique-leur la méthode.')} />
      <Card style={{ borderColor: C.sun, borderWidth: 2 }}>
        <Muted>{t(skill.title)}</Muted>
        <P content style={{ fontSize: 20, fontWeight: '800', marginTop: 6 }}>{q.prompt}</P>
      </Card>
      {!shown ? (
        <Btn kind="soft" icon="👀" label={t('Voir la réponse (pour le professeur)')} onPress={() => setShown(true)} />
      ) : (
        <Card style={{ backgroundColor: C.okSoft, borderColor: C.okSoft }}>
          <P content style={{ fontWeight: '800' }}>{correctAnswerText(q)}</P>
          <P content>{q.explanation}</P>
        </Card>
      )}
      <View style={{ height: 10 }} />
      <Btn icon="🎉" label={done ? t('Défi relevé cette semaine ✓') : t('Défi relevé !')} disabled={done} onPress={() => { markFamily(child.id, week); addStars(child.id, 2); }} />
      <Muted style={{ marginTop: 10, textAlign: 'center' }}>{t('Un nouveau défi chaque semaine.')}</Muted>
    </Screen>
  );
}
