import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useI18n } from '../i18n';
import { resolveActivity } from '../lib/activities';
import { formatGrade, gradeAll, toScale } from '../lib/grading';
import { childAnswerText, correctAnswerText, html, printHtml } from '../lib/print';
import { useApp } from '../store/AppContext';
import { Badge, Btn, Card, H, Muted, P, Row, Screen } from '../ui/kit';
import { ParentGate } from '../ui/ParentGate';
import { SpeakButton } from '../ui/VoiceButtons';
import { C } from '../ui/theme';

function Stepper({ value, max, onChange }: { value: number; max: number; onChange: (v: number) => void }) {
  const btn = (label: string, v: number) => (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={() => onChange(Math.max(0, Math.min(max, v)))}
      style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: C.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, color: C.primary, fontWeight: '800' }}>{label}</Text>
    </Pressable>
  );
  return (
    <Row gap={12}>
      {btn('−', value - 0.5)}
      <Text style={{ fontSize: 18, fontWeight: '800', color: C.ink, minWidth: 70, textAlign: 'center' }}>{formatGrade(value)} / {max}</Text>
      {btn('+', value + 0.5)}
    </Row>
  );
}

function CorrectionBody({ attemptId }: { attemptId: string }) {
  const { state, saveAttempt } = useApp();
  const attempt = state.attempts.find((a) => a.id === attemptId)!;
  const child = state.children.find((c) => c.id === attempt.childId);
  const { t } = useI18n();
  const act = resolveActivity(attempt.kind, attempt.refId);
  const questions = act?.questions ?? [];
  const [openGrades, setOpenGrades] = useState<Record<string, number>>(attempt.openGrades);
  const [saved, setSaved] = useState(false);
  const rtl = act?.lang === 'ar';
  const g = gradeAll(questions, attempt.answers, openGrades);
  const openQs = questions.filter((q) => q.type === 'open');
  const allGraded = openQs.every((q) => openGrades[q.id] !== undefined);
  const earned = g.outcomes.reduce((s, o) => s + o.earned, 0);
  const grade = toScale(earned, g.total, attempt.scale);

  function save() {
    saveAttempt({ ...attempt, openGrades, earned, grade, provisional: !allGraded });
    setSaved(true);
  }

  return (
    <>
      <Card style={{ alignItems: 'center' }}>
        <Muted>{child?.name} · {new Date(attempt.date).toLocaleDateString('fr-FR')}</Muted>
        <Text style={{ fontSize: 40, fontWeight: '900', color: C.primary }}>{formatGrade(grade)} / {attempt.scale}</Text>
        {!allGraded && <Badge tone="muted" label={t('Notez les réponses rédigées pour finaliser')} />}
      </Card>
      <Muted style={{ marginBottom: 12 }}>
        {t('Conseil : découvrez la correction avec votre enfant, en commençant par ce qu’il a réussi. Une erreur est une occasion d’expliquer, pas de reprocher.')}
      </Muted>
      {questions.map((q, i) => {
        const o = g.outcomes[i];
        return (
          <Card key={q.id} style={{ borderColor: o.status === 'correct' ? C.ok : o.status === 'review' ? C.review : C.line, borderWidth: 2 }}>
            <Row style={{ justifyContent: 'space-between', marginBottom: 6 }}>
              <Muted>{t('Question {n}', { n: i + 1 })}{(q.points ?? 1) > 1 ? ` · ${t('{n} pts', { n: q.points ?? 1 })}` : ''}</Muted>
              {o.status === 'correct' && <Badge tone="ok" label={`✓ ${t('Juste')}`} />}
              {o.status === 'review' && <Badge tone="review" label={`↻ ${t('À revoir')}`} />}
              {o.status === 'pending' && <Badge tone="muted" label={t('À noter')} />}
            </Row>
            <P rtl={rtl} style={{ fontWeight: '600', marginBottom: 8 }}>{q.prompt}</P>
            <View style={{ backgroundColor: '#F3F4F8', borderRadius: 10, padding: 10, marginBottom: 8 }}>
              <Muted>{t('Réponse de l’enfant')}</Muted>
              <P rtl={rtl}>{childAnswerText(q, attempt.answers[q.id])}</P>
            </View>
            <View style={{ backgroundColor: C.okSoft, borderRadius: 10, padding: 10 }}>
              <Muted style={{ color: C.ok, fontWeight: '800' }}>{q.type === 'open' ? t('Corrigé type') : t('Réponse attendue')}</Muted>
              <P rtl={rtl} style={{ fontWeight: '700' }}>{correctAnswerText(q)}</P>
              <P rtl={rtl} style={{ marginTop: 4 }}>{q.explanation}</P>
              <View style={{ marginTop: 8 }}>
                <SpeakButton size="s" label={t('Écouter l’explication')} segments={[{ text: q.prompt }, { text: `${t('Réponse attendue')} : ${correctAnswerText(q)}` }, { text: q.explanation }]} />
              </View>
            </View>
            {q.type === 'open' && (
              <View style={{ marginTop: 12 }}>
                <Muted style={{ marginBottom: 6 }}>{t('Points attribués par le parent')}</Muted>
                <Stepper value={openGrades[q.id] ?? 0} max={q.points ?? 1} onChange={(v) => { setOpenGrades((m) => ({ ...m, [q.id]: v })); setSaved(false); }} />
              </View>
            )}
          </Card>
        );
      })}
      {openQs.length > 0 && <Btn icon="💾" label={saved ? t('Note enregistrée ✓') : t('Enregistrer la note')} onPress={save} disabled={saved} />}
      <View style={{ height: 10 }} />
      <Btn kind="soft" icon="🖨️" label={t('Imprimer le corrigé (PDF)')} onPress={() =>
        printHtml(html.correction(act?.title ?? '', act?.levelId ?? '1AP', act?.subjectId ?? 'math', questions, rtl,
          { ...attempt, openGrades, grade, provisional: !allGraded }, child))
      } />
    </>
  );
}

export function Correction({ attemptId }: { attemptId: string }) {
  const { state } = useApp();
  const { t } = useI18n();
  if (!state.attempts.some((a) => a.id === attemptId)) return null;
  return (
    <Screen title={t('Correction')}>
      <ParentGate reason={t('La correction se découvre avec un parent. Demande à papa ou maman de saisir le mot de passe.')}>
        <H style={{ fontSize: 18 }}>{t('Corrigé détaillé')}</H>
        <CorrectionBody attemptId={attemptId} />
      </ParentGate>
    </Screen>
  );
}
