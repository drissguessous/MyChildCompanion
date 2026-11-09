import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { needsAdult } from '../coach/coach';
import { MOODS } from '../coach/messages';
import { catalogStats } from '../data';
import { getLevel, SUBJECTS } from '../data/curriculum';
import type { SubjectId } from '../data/types';
import { formatGrade } from '../lib/grading';
import { hashSecret, randomHex } from '../lib/security';
import { useI18n } from '../i18n';
import { planProgress } from '../lib/plan';
import { resolveActivity } from '../lib/activities';
import { LanguagePicker } from '../ui/LanguagePicker';
import { streakOf, useApp } from '../store/AppContext';
import type { Attempt } from '../store/types';
import { AvatarView, Badge, Btn, Card, Field, H, Muted, P, Row, Screen } from '../ui/kit';
import { useNav } from '../ui/nav';
import { ParentGate } from '../ui/ParentGate';
import { C } from '../ui/theme';

const refTitle = (a: Attempt) => resolveActivity(a.kind, a.refId)?.title ?? a.refId;
const refSubject = (a: Attempt): SubjectId | undefined => resolveActivity(a.kind, a.refId)?.subjectId;
const pct = (a: Attempt) => a.grade / a.scale;

function GradeBars({ attempts }: { attempts: Attempt[] }) {
  const last = [...attempts].sort((a, b) => a.date.localeCompare(b.date)).slice(-14);
  if (!last.length) return null;
  return (
    <View accessibilityLabel="Évolution des notes" style={{ flexDirection: 'row', alignItems: 'flex-end', height: 110, gap: 6, marginVertical: 8 }}>
      {last.map((a) => (
        <View key={a.id} style={{ flex: 1, alignItems: 'center' }}>
          <View style={{ width: '100%', maxWidth: 26, height: Math.max(6, 90 * pct(a)), borderRadius: 6, backgroundColor: pct(a) >= 0.7 ? C.ok : pct(a) >= 0.5 ? C.primary : C.sun }} />
          <Text style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{new Date(a.date).getDate()}</Text>
        </View>
      ))}
    </View>
  );
}

function ParentHomeBody() {
  const nav = useNav();
  const { t, level, subject } = useI18n();
  const { state, lockParent } = useApp();
  return (
    <>
      {state.children.map((c) => {
        const mine = state.attempts.filter((a) => a.childId === c.id);
        const last5 = [...mine].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
        const avg = last5.length ? last5.reduce((s, a) => s + pct(a), 0) / last5.length : undefined;
        const pending = mine.filter((a) => a.provisional).length;
        const alert = needsAdult(state.moods.filter((m) => m.childId === c.id));
        const scale = getLevel(c.levelId).gradeScale;
        return (
          <Card key={c.id} onPress={() => nav.push({ name: 'ParentChild', childId: c.id })}>
            <Row gap={12}>
              <AvatarView avatar={c.avatar} size={52} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '800', color: C.ink }}>{c.name}</Text>
                <Muted>{level(getLevel(c.levelId))}</Muted>
              </View>
              {avg !== undefined && <Badge tone="primary" label={`${t('Moy. récente')} ${formatGrade(Math.round(avg * scale * 4) / 4)}/${scale}`} />}
            </Row>
            <Row gap={8} style={{ marginTop: 10 }}>
              {pending > 0 && <Badge tone="sun" label={`✍️ ${t('{n} copie(s) à noter', { n: pending })}`} />}
              {alert && <Badge tone="review" label={`💛 ${t('Humeur à surveiller')}`} />}
              <Badge label={`🔥 ${streakOf(state.activeDays[c.id])} j`} />
              <Badge label={`⭐ ${state.stars[c.id] ?? 0}`} />
            </Row>
          </Card>
        );
      })}
      {state.children.length === 0 && <P style={{ marginBottom: 12 }}>{t('Aucun enfant pour l’instant.')}</P>}
      <Btn kind="soft" icon="➕" label={t('Ajouter un enfant')} onPress={() => nav.push({ name: 'ChildEditor' })} />
      <View style={{ height: 10 }} />
      <Row gap={10}>
        <Btn style={{ flexGrow: 1 }} kind="ghost" icon="⚙️" label={t('Réglages')} onPress={() => nav.push({ name: 'ParentSettings' })} />
        <Btn style={{ flexGrow: 1 }} kind="ghost" icon="🔒" label={t('Verrouiller')} onPress={() => { lockParent(); nav.back(); }} />
      </Row>
    </>
  );
}

export function ParentHome() {
  const { t } = useI18n();
  return (
    <Screen title={t('Espace parent')}>
      <ParentGate><ParentHomeBody /></ParentGate>
    </Screen>
  );
}

function ParentChildBody({ childId }: { childId: string }) {
  const nav = useNav();
  const { t, level, subject } = useI18n();
  const { state } = useApp();
  const c = state.children.find((x) => x.id === childId);
  if (!c) return null;
  const mine = state.attempts.filter((a) => a.childId === c.id).sort((a, b) => b.date.localeCompare(a.date));
  const bySubject = new Map<SubjectId, Attempt[]>();
  for (const a of mine) {
    const s = refSubject(a);
    if (s) bySubject.set(s, [...(bySubject.get(s) ?? []), a]);
  }
  const moods = state.moods.filter((m) => m.childId === c.id).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7).reverse();
  const scale = getLevel(c.levelId).gradeScale;

  return (
    <>
      <Row gap={12} style={{ marginBottom: 12 }}>
        <AvatarView avatar={c.avatar} size={64} />
        <View style={{ flex: 1 }}>
          <H style={{ marginBottom: 0 }}>{c.name}</H>
          <Muted>{level(getLevel(c.levelId))} · {t('professeur')} : {c.teacher.name}</Muted>
        </View>
      </Row>
      {needsAdult(state.moods.filter((m) => m.childId === c.id)) && (
        <Card style={{ backgroundColor: C.reviewSoft, borderColor: C.reviewSoft }}>
          <P>💛 {t('{name} a indiqué plusieurs jours difficiles (stress ou tristesse) récemment. Un moment d’échange calme pourrait l’aider. Si cela dure, n’hésitez pas à en parler à son enseignant ou à un professionnel.', { name: c.name })}</P>
        </Card>
      )}
      {state.plans[c.id] && (
        <Card>
          <H style={{ fontSize: 17 }}>🗺️ {t('Plan de mise à niveau')}</H>
          <P>{t('{a} tâches faites sur {b}', { a: planProgress(state.plans[c.id]).done, b: planProgress(state.plans[c.id]).total })} · {Math.round(planProgress(state.plans[c.id]).ratio * 100)} %</P>
          <Muted>{t('À travailler')} : {state.plans[c.id].mastery.filter((m) => m.ratio < 0.6).map((m) => t(m.title)).join(', ') || '—'}</Muted>
        </Card>
      )}
      <Card>
        <H style={{ fontSize: 17 }}>{t('Humeur des derniers jours')}</H>
        <Row gap={10}>
          {moods.map((m) => (
            <View key={m.date} style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 26 }}>{MOODS.find((x) => x.id === m.mood)?.emoji}</Text>
              <Muted style={{ fontSize: 11 }}>{new Date(m.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</Muted>
            </View>
          ))}
          {moods.length === 0 && <Muted>{t('Pas encore de relevé.')}</Muted>}
        </Row>
      </Card>
      <Card>
        <H style={{ fontSize: 17 }}>{t('Évolution des notes')}</H>
        <GradeBars attempts={mine} />
        <Muted>{t('Vert : 70 % et plus · violet : 50 à 70 % · orange : à consolider')}</Muted>
      </Card>
      <Card>
        <H style={{ fontSize: 17 }}>{t('Moyenne par matière')}</H>
        {[...bySubject.entries()].map(([s, list]) => {
          const avg = list.reduce((x, a) => x + pct(a), 0) / list.length;
          return (
            <Row key={s} style={{ justifyContent: 'space-between', paddingVertical: 6 }}>
              <P>{SUBJECTS[s].icon} {subject(s)}</P>
              <Badge tone={avg >= 0.7 ? 'ok' : avg >= 0.5 ? 'primary' : 'sun'} label={`${formatGrade(Math.round(avg * scale * 4) / 4)} / ${scale}`} />
            </Row>
          );
        })}
        {bySubject.size === 0 && <Muted>{t('Pas encore de note.')}</Muted>}
      </Card>
      <H style={{ fontSize: 17, marginTop: 4 }}>{t('Historique')}</H>
      {mine.map((a) => (
        <Card key={a.id} onPress={() => nav.push({ name: 'Correction', attemptId: a.id })}>
          <Row style={{ justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: C.ink }}>{a.kind === 'examen' ? '📝 ' : a.kind === 'entrainement' ? '♾️ ' : a.kind === 'bilan' ? '🗺️ ' : '✏️ '}{t(refTitle(a))}</Text>
              <Muted>{new Date(a.date).toLocaleDateString('fr-FR')} · {t('{n} min', { n: Math.round((a.durationSec ?? 0) / 60) })}</Muted>
            </View>
            <View style={{ alignItems: 'flex-end', gap: 4 }}>
              <Badge tone="primary" label={`${formatGrade(a.grade)}/${a.scale}`} />
              {a.provisional && <Badge tone="sun" label={t('À noter')} />}
            </View>
          </Row>
        </Card>
      ))}
      <Btn kind="soft" icon="✏️" label={t('Modifier le profil')} onPress={() => nav.push({ name: 'ChildEditor', childId: c.id })} />
    </>
  );
}

export function ParentChild({ childId }: { childId: string }) {
  const { t } = useI18n();
  return <Screen title={t('Suivi')}><ParentGate><ParentChildBody childId={childId} /></ParentGate></Screen>;
}

function SettingsBody() {
  const nav = useNav();
  const { t, level, subject } = useI18n();
  const { update, loadDemo, resetAll, state } = useApp();
  const [pwd, setPwd] = useState('');
  const [msg, setMsg] = useState('');
  const [confirm, setConfirm] = useState<'demo' | 'reset' | null>(null);

  async function changePassword() {
    if (pwd.length < 4) return setMsg(t('Au moins 4 caractères.'));
    const salt = randomHex();
    const hash = await hashSecret(pwd, salt);
    update((s) => ({ ...s, parent: s.parent && { ...s.parent, salt, hash } }));
    setPwd('');
    setMsg(t('Mot de passe modifié ✓'));
  }

  return (
    <>
      <Card>
        <H style={{ fontSize: 17 }}>🌍 {t('Langue')}</H>
        <LanguagePicker />
      </Card>
      <Card>
        <H style={{ fontSize: 17 }}>{t('Mot de passe parent')}</H>
        <Field label={t('Nouveau mot de passe')} value={pwd} onChangeText={setPwd} secureTextEntry />
        {!!msg && <Muted style={{ marginBottom: 8 }}>{msg}</Muted>}
        <Btn small label={t('Changer')} onPress={changePassword} disabled={!pwd} />
        <Muted style={{ marginTop: 10 }}>
          {t('Le mot de passe est une protection locale : il évite que l’enfant voie les corrigés, mais quelqu’un qui efface les données de l’application peut le contourner (et perd alors toute la progression).')}
        </Muted>
      </Card>
      <Card>
        <H style={{ fontSize: 17 }}>{t('Données')}</H>
        <P style={{ marginBottom: 10 }}>{t('Toutes les données restent sur cet appareil. Aucun compte, aucun envoi sur Internet.')}</P>
        {confirm === null && (
          <Row gap={10}>
            <Btn small kind="soft" label={t('Charger la démo')} onPress={() => setConfirm('demo')} />
            <Btn small kind="ghost" label={t('Tout effacer')} onPress={() => setConfirm('reset')} />
          </Row>
        )}
        {confirm && (
          <View>
            <P style={{ color: C.review, marginBottom: 8 }}>
              {confirm === 'demo' ? t('La démo remplace les profils et notes actuels.') : t('Tout effacer supprime profils, notes et mot de passe.')} {t('Cette action est définitive.')}
            </P>
            <Row gap={10}>
              <Btn small kind="soft" label={t('Annuler')} onPress={() => setConfirm(null)} />
              <Btn small label={t('Confirmer')} onPress={async () => {
                if (confirm === 'demo') { await loadDemo(); nav.reset({ name: 'Profiles' }); } else { await resetAll(); nav.reset({ name: 'Welcome' }); }
              }} />
            </Row>
          </View>
        )}
      </Card>
      <Btn kind="ghost" small label={t('À propos d’Oustadati')} onPress={() => nav.push({ name: 'About' })} />
      {state.demo && <Muted style={{ marginTop: 10 }}>{t('Mode démo actif.')}</Muted>}
    </>
  );
}

export function ParentSettings() {
  const { t } = useI18n();
  return <Screen title={t('Réglages')}><ParentGate><SettingsBody /></ParentGate></Screen>;
}

export function Grades({ childId }: { childId: string }) {
  const nav = useNav();
  const { t, level, subject } = useI18n();
  const { state } = useApp();
  const mine = state.attempts.filter((a) => a.childId === childId).sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Screen title={t('Mes notes')}>
      {mine.length > 0 && <Card><GradeBars attempts={mine} /><Muted>{t('Chaque barre est un exercice ou un examen. Regarde comme tu avances !')}</Muted></Card>}
      {mine.map((a) => (
        <Card key={a.id} onPress={() => nav.push({ name: 'Result', attemptId: a.id })}>
          <Row style={{ justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: C.ink }}>{t(refTitle(a))}</Text>
              <Muted>{new Date(a.date).toLocaleDateString('fr-FR')}</Muted>
            </View>
            <Badge tone="primary" label={`${formatGrade(a.grade)}/${a.scale}${a.provisional ? ' *' : ''}`} />
          </Row>
        </Card>
      ))}
      {mine.length === 0 && <P>{t('Pas encore de note. Ton premier exercice t’attend !')}</P>}
      {mine.some((a) => a.provisional) && <Muted>{t('* note provisoire : une réponse rédigée sera lue avec ton parent.')}</Muted>}
    </Screen>
  );
}

export function About() {
  const { t } = useI18n();
  const s = catalogStats();
  return (
    <Screen title={t('À propos')}>
      <H>Oustadati · أستاذتي</H>
      <P style={{ marginBottom: 10 }}>{t('Application d’accompagnement scolaire pour le système Massar (primaire, collège, lycée). Les missions française, américaine et britannique arrivent dans une prochaine version.')}</P>
      <Card>
        <P>{t('{topics} thèmes du programme · {chapters} cours rédigés · {exams} examens · {questions} questions', s)}</P>
        <P>♾️ {t('Entraînement illimité et plan de mise à niveau personnalisé')}</P>
      </Card>
      <Muted>{t('Le contenu est rédigé à partir des orientations du programme et doit être validé par un enseignant. En cas de différence avec le manuel de la classe, le manuel et l’enseignant font foi.')}</Muted>
      <Muted style={{ marginTop: 8 }}>{t('Traduction amazighe (tifinagh) en version bêta, à faire relire par un locuteur.')}</Muted>
    </Screen>
  );
}
