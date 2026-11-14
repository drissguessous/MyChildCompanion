import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import * as coach from '../coach/coach';
import { getExam } from '../data';
import { getLevel } from '../data/curriculum';
import type { Question } from '../data/types';
import { useI18n } from '../i18n';
import { resolveActivity, type Activity, type ActivityKind } from '../lib/activities';
import { hintFor } from '../lib/hints';
import { matchChoice, matchTrueFalse, wordsToNumber, type VoiceLang } from '../lib/voice';
import { MicButton, SpeakButton } from '../ui/VoiceButtons';
import { formatGrade, gradeAll, toScale, type AnswerValue, type Answers, type QuestionOutcome } from '../lib/grading';
import { masteryFromBilan } from '../lib/plan';
import { html, printHtml } from '../lib/print';
import { useApp } from '../store/AppContext';
import type { Attempt } from '../store/types';
import { Badge, Btn, Card, H, Muted, P, Row, Screen, TeacherBubble, styles as kit } from '../ui/kit';
import { useNav } from '../ui/nav';
import { C, R } from '../ui/theme';

function QuestionCard({ q, n, value, onChange, outcome, locked, rtl, act }: {
  q: Question; n: number; value: AnswerValue; onChange: (v: AnswerValue) => void; outcome?: QuestionOutcome; locked: boolean; rtl: boolean; act: Activity;
}) {
  const { t } = useI18n();
  const [showHint, setShowHint] = useState(false);
  const vlang: VoiceLang = act.lang === 'ar' ? 'ar' : act.lang === 'en' ? 'en' : 'fr';
  const readSegments = [{ text: q.prompt, lang: vlang }, ...(q.type === 'qcm' ? q.choices.map((c, i) => ({ text: `${'ABCD'[i]}. ${c}`, lang: vlang })) : q.type === 'tf' ? [{ text: vlang === 'ar' ? 'صحيح أم خطأ؟' : vlang === 'en' ? 'True or false?' : 'Vrai ou faux ?', lang: vlang }] : [])];
  const hint = showHint ? hintFor(q, act) : undefined;
  function onVoice(text: string) {
    if (q.type === 'qcm') { const i = matchChoice(text, q.choices); if (i !== undefined) onChange(i); return; }
    if (q.type === 'tf') { const b = matchTrueFalse(text); if (b !== undefined) onChange(b); return; }
    if (q.type === 'number') { const v = wordsToNumber(text); if (v !== undefined) onChange(v); return; }
    onChange(typeof value === 'string' && q.type === 'open' && value ? `${value} ${text}` : text);
  }
  const border = outcome?.status === 'correct' ? C.ok : outcome?.status === 'review' ? C.review : C.line;
  const dir = rtl ? ({ writingDirection: 'rtl', textAlign: 'right' } as const) : ({ writingDirection: 'ltr', textAlign: 'left' } as const);
  const option = (label: string, selected: boolean, onPress: () => void) => (
    <Pressable
      key={label}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled: locked }}
      disabled={locked}
      onPress={onPress}
      style={{ borderWidth: 2, borderColor: selected ? C.primary : C.line, backgroundColor: selected ? C.primarySoft : C.card, borderRadius: R.s, padding: 12, marginTop: 8 }}
    >
      <Text style={[{ fontSize: 16, color: C.ink, fontWeight: selected ? '700' : '400' }, dir]}>{label}</Text>
    </Pressable>
  );
  return (
    <Card style={{ borderColor: border, borderWidth: outcome ? 2 : 1 }}>
      <Row style={{ justifyContent: 'space-between', marginBottom: 6 }}>
        <Muted>{t('Question {n}', { n })}{q.points && q.points > 1 ? ` · ${t('{n} pts', { n: q.points })}` : ''}</Muted>
        {outcome?.status === 'correct' && <Badge tone="ok" label={`✓ ${t('Juste')}`} />}
        {outcome?.status === 'review' && <Badge tone="review" label={`↻ ${t('À revoir')}`} />}
        {outcome?.status === 'pending' && <Badge tone="muted" label={`✍️ ${t('Lu avec le parent')}`} />}
      </Row>
      <P rtl={rtl} style={{ fontWeight: '600' }}>{q.prompt}</P>
      <Row gap={8} style={{ marginTop: 8 }}>
        <SpeakButton size="s" segments={readSegments} label={t('Écouter')} />
        {!locked && <MicButton lang={vlang} onText={onVoice} />}
        {!locked && (
          <Pressable accessibilityRole="button" onPress={() => setShowHint((h) => !h)} hitSlop={8}
            style={{ backgroundColor: showHint ? C.ok : C.okSoft, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 12 }}>
            <Text style={{ color: showHint ? '#fff' : C.ok, fontWeight: '700', fontSize: 13 }}>💡 {t('Explique-moi')}</Text>
          </Pressable>
        )}
      </Row>
      {hint && (
        <View style={{ backgroundColor: C.okSoft, borderRadius: 12, padding: 12, marginTop: 10 }}>
          {!!hint.method && <P rtl={hint.lang === 'ar'} style={{ marginBottom: 6 }}>🧭 {hint.method}</P>}
          {hint.rules.map((r) => <P key={r} rtl={hint.lang === 'ar'} style={{ marginBottom: 6 }}>📌 {r}</P>)}
          <P rtl={hint.lang === 'ar'} style={{ fontStyle: 'italic' }}>💡 {hint.tip}</P>
          <View style={{ marginTop: 8 }}>
            <SpeakButton size="s" label={t('Écouter l’explication')} segments={[hint.method, ...hint.rules, hint.tip].filter(Boolean).map((x) => ({ text: x as string, lang: hint.lang === 'ar' ? 'ar' : 'fr' }))} />
          </View>
        </View>
      )}
      {q.type === 'qcm' && q.choices.map((c, i) => option(c, value === i, () => onChange(i)))}
      {q.type === 'tf' && (rtl
        ? [option('صحيح', value === true, () => onChange(true)), option('خطأ', value === false, () => onChange(false))]
        : [option('Vrai', value === true, () => onChange(true)), option('Faux', value === false, () => onChange(false))])}
      {(q.type === 'number' || q.type === 'text' || q.type === 'open') && (
        <TextInput
          editable={!locked}
          value={typeof value === 'string' ? value : ''}
          onChangeText={onChange}
          multiline={q.type === 'open'}
          keyboardType={q.type === 'number' ? 'numbers-and-punctuation' : 'default'}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={`${t('Ta réponse')}${q.type === 'number' && q.unit ? ` (${q.unit})` : ''}`}
          placeholderTextColor="#A3A7BE"
          style={[kit.input, { marginTop: 10, minHeight: q.type === 'open' ? 110 : undefined, textAlignVertical: q.type === 'open' ? 'top' : 'center' }, dir, locked && { backgroundColor: '#F6F4EF' }]}
        />
      )}
    </Card>
  );
}

function Timer({ minutes, startedAt }: { minutes: number; startedAt: number }) {
  const { t } = useI18n();
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const left = Math.max(0, minutes * 60 - Math.floor((now - startedAt) / 1000));
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');
  return <Badge tone={left === 0 ? 'sun' : 'primary'} label={left === 0 ? t('Temps écoulé, termine tranquillement') : `⏱ ${mm}:${ss}`} />;
}

/** Clé de la tâche du plan correspondant à une activité. */
function planKey(kind: ActivityKind, refId: string): [ 'exercice' | 'examen' | 'entrainement' | 'bilan', string ] {
  if (kind === 'entrainement') return ['entrainement', refId.split(':')[0]];
  if (kind === 'bilan') return ['bilan', 'bilan'];
  return [kind, refId];
}

export function Quiz({ mode, refId, resume }: { mode: ActivityKind; refId: string; resume?: boolean }) {
  const nav = useNav();
  const { t, lang } = useI18n();
  const { child, state, addAttempt, addStars, completeTask, saveDraft } = useApp();
  const act = useMemo(() => resolveActivity(mode, refId), [mode, refId]);
  // bilan et entraînement ont une graine aléatoire : la clé ignore la graine, le brouillon garde le refId exact
  const stable = mode === 'bilan' || mode === 'entrainement' ? refId.split(':').filter((_, i, a) => !(mode === 'bilan' ? i === 2 : i === a.length - 2)).join(':') : refId;
  const draftKey = `${mode}:${stable}`;
  const [draft] = useState(() => (child ? state.drafts?.[child.id]?.[draftKey] : undefined));
  const sameRef = draft?.refId === refId;
  useEffect(() => {
    if (draft && !sameRef && mode === 'entrainement') nav.replace({ name: 'Quiz', mode, refId: draft.refId, resume: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const autoResume = !!draft && sameRef && (resume || (mode !== 'examen' && mode !== 'bilan'));
  const [answers, setAnswersRaw] = useState<Answers>(() => (autoResume ? draft!.answers : {}));
  const [phase, setPhase] = useState<'intro' | 'answer' | 'checked' | 'retry'>((mode === 'examen' || mode === 'bilan') && !autoResume ? 'intro' : 'answer');
  const [checked, setChecked] = useState<QuestionOutcome[]>();
  const [startedAt, setStartedAt] = useState(() => Date.now() - (autoResume ? draft!.elapsedSec * 1000 : 0));
  // Enregistrement automatique à chaque réponse : l'enfant peut quitter et reprendre sans rien perdre
  function setAnswers(u: Answers | ((a: Answers) => Answers)) {
    setAnswersRaw((prev) => {
      const next = typeof u === 'function' ? u(prev) : u;
      if (child) saveDraft(child.id, draftKey, Object.keys(next).length ? { refId, answers: next, elapsedSec: Math.round((Date.now() - startedAt) / 1000), savedAt: new Date().toISOString() } : undefined);
      return next;
    });
  }
  const [printing, setPrinting] = useState(false);
  if (!child || !act) return null;

  const { questions, sections } = act;
  const x = coach.ctx(child, child.teacher, lang);
  const scale = getLevel(act.levelId).gradeScale;
  const rtl = act.lang === 'ar';
  const exam = mode === 'examen' ? getExam(refId) : undefined;
  const singleShot = mode === 'examen' || mode === 'bilan';
  const title = mode === 'exercice' ? `${t('Exercices')} · ${act.title}` : mode === 'entrainement' ? `♾️ ${t(act.title)}` : t(act.title);
  const answeredCount = questions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== '').length;

  function finish(final: Answers, retried: boolean) {
    const g = gradeAll(questions, final);
    const earned = g.outcomes.reduce((s, o) => s + o.earned, 0);
    const attempt: Attempt = {
      id: `${child!.id}-${refId}-${Date.now()}`,
      childId: child!.id, kind: mode, refId, date: new Date().toISOString(), answers: final, openGrades: {},
      earned, total: g.total, scale, grade: toScale(earned, g.total, scale), provisional: g.openTotal > 0,
      durationSec: Math.round((Date.now() - startedAt) / 1000),
    };
    addAttempt(attempt);
    saveDraft(child!.id, draftKey, undefined);
    addStars(child!.id, 1 + (retried ? 1 : 0) + (singleShot ? 1 : 0));
    const [k, ref] = planKey(mode, refId);
    completeTask(child!.id, k, ref);
    nav.replace({ name: 'Result', attemptId: attempt.id });
  }

  function verify() {
    const g = gradeAll(questions, answers);
    if (singleShot || phase === 'retry' || g.outcomes.every((o) => o.status !== 'review')) {
      finish(answers, phase === 'retry');
      return;
    }
    setChecked(g.outcomes);
    setPhase('checked');
  }

  if (phase === 'intro') {
    return (
      <Screen title={title}>
        <TeacherBubble
          avatar={child.teacher.avatar}
          name={child.teacher.name}
          text={mode === 'bilan' ? t('Ce bilan n’est pas une note pour l’école : il m’aide à savoir par où commencer avec toi. Réponds simplement, et passe les questions que tu ne connais pas encore.') : coach.examBefore(x)}
        />
        <Card>
          <P>⏳ {t('Durée conseillée : {n} min', { n: act.durationMin ?? 30 })}</P>
          <P>📄 {t('{n} questions', { n: questions.length })}{mode === 'examen' ? ` · ${t('note sur {n}', { n: scale })}` : ''}</P>
          {mode === 'examen' && <P>{child.chronoEnabled ? `⏱ ${t('Le chronomètre est activé (réglage parent).')}` : `🙂 ${t('Pas de chronomètre : prends ton temps.')}`}</P>}
          {exam && <Muted style={{ marginTop: 8 }}>{exam.instructions}</Muted>}
        </Card>
        {draft ? (
          <>
            <Card color={C.ok}><P>💾 {t('Tu avais commencé : {a} réponse(s) enregistrée(s). Tu peux reprendre là où tu t’étais arrêté.', { a: Object.keys(draft.answers).length })}</P></Card>
            <Btn icon="▶️" label={t('Reprendre')} onPress={() => {
              if (!sameRef) { nav.replace({ name: 'Quiz', mode, refId: draft.refId, resume: true }); return; }
              setAnswersRaw(draft.answers); setStartedAt(Date.now() - draft.elapsedSec * 1000); setPhase('answer');
            }} />
            <View style={{ height: 8 }} />
            <Btn kind="ghost" small label={t('Recommencer depuis le début')} onPress={() => { saveDraft(child.id, draftKey, undefined); setStartedAt(Date.now()); setPhase('answer'); }} />
          </>
        ) : (
          <Btn icon="🚀" label={t('Je commence')} onPress={() => { setStartedAt(Date.now()); setPhase('answer'); }} />
        )}
        <View style={{ height: 10 }} />
        <Row gap={10}>
          <Btn small kind="soft" icon="🌬️" label={t('Respirer d’abord')} onPress={() => nav.push({ name: 'Breathing' })} />
          {exam && <Btn small kind="ghost" icon="🖨️" label={t('Imprimer le sujet')} loading={printing} onPress={async () => { setPrinting(true); try { await printHtml(html.exam(exam, child)); } finally { setPrinting(false); } }} />}
        </Row>
      </Screen>
    );
  }

  const reviewIds = new Set(checked?.filter((o) => o.status === 'review').map((o) => o.id));
  let n = 0;
  return (
    <Screen
      title={title}
      right={mode === 'examen' && child.chronoEnabled && act.durationMin ? <Timer minutes={act.durationMin} startedAt={startedAt} /> : undefined}
      footer={
        phase === 'checked' ? (
          <Row gap={10}>
            <Btn style={{ flexGrow: 1 }} icon="↻" label={t('Réessayer les questions à revoir')} onPress={() => {
              setAnswers((a) => Object.fromEntries(Object.entries(a).filter(([k]) => !reviewIds.has(k))));
              setPhase('retry');
            }} />
            <Btn style={{ flexGrow: 1 }} kind="soft" label={t('Terminer')} onPress={() => finish(answers, false)} />
          </Row>
        ) : (
          <Row gap={10}>
            {phase === 'answer' && answeredCount > 0 && <Btn kind="soft" icon="💾" label={t('Enregistrer et continuer plus tard')} onPress={() => nav.back()} />}
            <Btn
              style={{ flexGrow: 1 }}
              icon="✅"
              label={singleShot ? t('Rendre ma copie ({a}/{b})', { a: answeredCount, b: questions.length }) : t('Vérifier mes réponses')}
              onPress={verify}
              disabled={answeredCount === 0}
            />
          </Row>
        )
      }
    >
      {phase === 'checked' && checked && (
        <TeacherBubble
          avatar={child.teacher.avatar}
          name={child.teacher.name}
          text={`${coach.resultMessage(x, checked.filter((o) => o.status === 'correct').length / questions.length)} ${coach.retryMessage(x)}`}
        />
      )}
      {phase === 'retry' && <Muted style={{ marginBottom: 10 }}>{t('Seules les questions « à revoir » sont modifiables.')}</Muted>}
      {sections.map((s, si) => (
        <View key={`${si}-${s.title}`}>
          {!!s.title && <H style={{ fontSize: 18, marginTop: 8 }}>{t(s.title)}</H>}
          {s.questions.map((q) => {
            n += 1;
            const outcome = phase === 'checked' ? checked?.find((o) => o.id === q.id) : undefined;
            const locked = phase === 'checked' || (phase === 'retry' && !reviewIds.has(q.id));
            return (
              <QuestionCard
                key={q.id} q={q} n={n} rtl={rtl} act={act} value={answers[q.id]} outcome={outcome} locked={locked}
                onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
              />
            );
          })}
        </View>
      ))}
    </Screen>
  );
}

export function Result({ attemptId }: { attemptId: string }) {
  const nav = useNav();
  const { t, lang } = useI18n();
  const { child, state } = useApp();
  const attempt = state.attempts.find((a) => a.id === attemptId);
  if (!child || !attempt) return null;
  const act = resolveActivity(attempt.kind, attempt.refId);
  const questions = act?.questions ?? [];
  const g = gradeAll(questions, attempt.answers, attempt.openGrades);
  const x = coach.ctx(child, child.teacher, lang);
  const sameRef = (a: Attempt) => (attempt.kind === 'entrainement' ? a.refId.split(':')[0] === attempt.refId.split(':')[0] : a.refId === attempt.refId);
  const previous = state.attempts
    .filter((a) => a.childId === child.id && a.kind === attempt.kind && sameRef(a) && a.date < attempt.date)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
  const autoRatio = g.autoTotal > 0 ? g.autoEarned / g.autoTotal : attempt.earned / Math.max(1, attempt.total);
  const prevRatio = previous ? previous.earned / Math.max(1, previous.total) : undefined;
  const msg = coach.resultMessage(x, autoRatio, prevRatio, attempt.date.length);
  const ok = g.outcomes.filter((o) => o.status === 'correct').length;
  const review = g.outcomes.filter((o) => o.status === 'review').length;
  const pending = g.outcomes.filter((o) => o.status === 'pending').length;
  const mastery = attempt.kind === 'bilan' ? masteryFromBilan(attempt.refId, attempt.answers) : [];

  return (
    <Screen title={t('Résultat')}>
      <TeacherBubble avatar={child.teacher.avatar} name={child.teacher.name} text={msg} />
      <Card style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 15, color: C.muted, fontWeight: '700', textAlign: 'center' }}>{act ? t(act.title) : ''}</Text>
        {attempt.kind === 'bilan' ? (
          <Text style={{ fontSize: 44, fontWeight: '900', color: C.primary, marginVertical: 6 }}>{Math.round(autoRatio * 100)} %</Text>
        ) : (
          <Text style={{ fontSize: 54, fontWeight: '900', color: C.primary, marginVertical: 6 }}>
            {formatGrade(attempt.grade)}<Text style={{ fontSize: 26, color: C.muted }}> / {attempt.scale}</Text>
          </Text>
        )}
        {attempt.provisional && <Badge tone="muted" label={t('Note provisoire')} />}
        <Row gap={8} style={{ marginTop: 12, justifyContent: 'center' }}>
          <Badge tone="ok" label={`✓ ${t('{n} juste(s)', { n: ok })}`} />
          {review > 0 && <Badge tone="review" label={`↻ ${t('{n} à revoir', { n: review })}`} />}
          {pending > 0 && <Badge tone="muted" label={`✍️ ${t('{n} à lire avec le parent', { n: pending })}`} />}
        </Row>
        <Text style={{ marginTop: 12, fontSize: 15, color: '#9A6400', fontWeight: '700' }}>{coach.starMessage(x)}</Text>
      </Card>
      {mastery.length > 0 && (
        <Card>
          <H style={{ fontSize: 17 }}>🗺️ {t('Ce que tu maîtrises déjà, et ce qu’on va travailler')}</H>
          {mastery.map((m) => (
            <Row key={m.unit} style={{ justifyContent: 'space-between', paddingVertical: 5 }}>
              <P style={{ flex: 1 }} content>{t(m.title)}</P>
              <Badge tone={m.ratio >= 0.85 ? 'ok' : m.ratio >= 0.6 ? 'primary' : 'sun'} label={m.ratio >= 0.85 ? t('Acquis') : m.ratio >= 0.6 ? t('En cours') : t('À travailler')} />
            </Row>
          ))}
          <Btn icon="🗺️" label={t('Construire mon plan de mise à niveau')} onPress={() => nav.replace({ name: 'Plan', fromAttempt: attempt.id })} style={{ marginTop: 10 }} />
        </Card>
      )}
      {pending > 0 && <Muted style={{ marginBottom: 12 }}>{coach.examAfterPending(x)}</Muted>}
      <Btn icon="🔒" label={t('Voir la correction avec mon parent')} onPress={() => nav.push({ name: 'Correction', attemptId })} />
      <View style={{ height: 10 }} />
      <Row gap={10}>
        {attempt.kind !== 'bilan' && (
          <Btn style={{ flexGrow: 1 }} kind="soft" icon="↻" label={attempt.kind === 'entrainement' ? t('Nouvelle série') : t('Recommencer')} onPress={() => {
            const refId = attempt.kind === 'entrainement' ? attempt.refId.replace(/:(\d+):/, `:${Date.now() % 1_000_000}:`) : attempt.refId;
            nav.replace({ name: 'Quiz', mode: attempt.kind, refId });
          }} />
        )}
        {attempt.kind === 'exercice' && <Btn style={{ flexGrow: 1 }} kind="ghost" icon="📖" label={t('Relire le cours')} onPress={() => nav.replace({ name: 'Lesson', chapterId: attempt.refId })} />}
        <Btn style={{ flexGrow: 1 }} kind="ghost" icon="🏠" label={t('Accueil')} onPress={() => nav.reset({ name: 'Home' })} />
      </Row>
    </Screen>
  );
}
