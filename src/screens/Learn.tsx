import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { examsFor, getChapter } from '../data';
import { getLevel, LEVELS, SUBJECTS } from '../data/curriculum';
import { topicsFor } from '../data/programme';
import type { Block, SubjectId } from '../data/types';
import { useI18n } from '../i18n';
import { practiceRef } from '../lib/activities';
import { skillsFor } from '../lib/generators';
import { formatGrade } from '../lib/grading';
import { html, printHtml } from '../lib/print';
import { useApp } from '../store/AppContext';
import type { Attempt } from '../store/types';
import { Badge, Btn, Card, H, Muted, P, Row, Screen, T } from '../ui/kit';
import { useNav } from '../ui/nav';
import { C } from '../ui/theme';

const isArabic = (s: string) => /[؀-ۿ]/.test(s);

function bestGrade(attempts: Attempt[], match: (a: Attempt) => boolean) {
  const list = attempts.filter(match);
  if (!list.length) return undefined;
  return list.reduce((b, a) => (a.grade / a.scale > b.grade / b.scale ? a : b));
}

export function SubjectScreen({ subjectId }: { subjectId: SubjectId }) {
  const nav = useNav();
  const { t, subject, level: levelName } = useI18n();
  const { child, state } = useApp();
  if (!child) return null;
  const s = SUBJECTS[subjectId];
  const level = getLevel(child.levelId);
  const topics = topicsFor(level.id, subjectId);
  const exams = examsFor(level.id, subjectId);
  const skills = skillsFor(level.id, LEVELS.map((l) => l.id)).current.filter((k) => k.subjectId === subjectId);
  const mine = state.attempts.filter((a) => a.childId === child.id);
  const read = state.readLessons[child.id] ?? [];
  return (
    <Screen title={`${s.icon} ${subject(subjectId)}`}>
      <Muted style={{ marginBottom: 12 }}>{levelName(level)} · {t('programme Massar')}</Muted>
      {topics.map((tp) => {
        const best = tp.chapterId ? bestGrade(mine, (a) => a.refId === tp.chapterId) : undefined;
        return (
          <Card key={tp.title} color={s.color} onPress={tp.chapterId ? () => nav.push({ name: 'Lesson', chapterId: tp.chapterId! }) : undefined}>
            <Row style={{ justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: C.ink, flex: 1, writingDirection: isArabic(tp.title) ? 'rtl' : 'ltr' }}>{tp.title}</Text>
              {!tp.chapterId && <Badge label={t('Bientôt')} />}
              {tp.chapterId && best && <Badge tone={best.grade / best.scale >= 0.7 ? 'ok' : 'primary'} label={`${formatGrade(best.grade)}/${best.scale}`} />}
              {tp.chapterId && !best && <Badge tone="primary" label={read.includes(tp.chapterId) ? t('Lu') : t('Nouveau')} />}
            </Row>
          </Card>
        );
      })}
      {topics.length === 0 && <P>{t('Le programme de cette matière arrive bientôt.')}</P>}
      {skills.length > 0 && (
        <>
          <H style={{ fontSize: 18, marginTop: 12 }}>♾️ {t('Entraînement illimité')}</H>
          {skills.map((k) => (
            <Card key={k.id} color={C.primary} onPress={() => nav.push({ name: 'Quiz', mode: 'entrainement', refId: practiceRef(k.id, level.id) })}>
              <T style={{ fontSize: 16, fontWeight: '700', color: C.ink }}>{t(k.title)}</T>
              <Muted>{t('8 questions nouvelles à chaque fois')}</Muted>
            </Card>
          ))}
        </>
      )}
      {exams.length > 0 && (
        <>
          <H style={{ fontSize: 18, marginTop: 12 }}>{t('Examens et contrôles')}</H>
          {exams.map((e) => (
            <Card key={e.id} color={C.sun} onPress={() => nav.push({ name: 'Quiz', mode: 'examen', refId: e.id })}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: C.ink }}>📝 {e.title}</Text>
              <Muted>{t('{n} min', { n: e.durationMin })}</Muted>
            </Card>
          ))}
        </>
      )}
    </Screen>
  );
}

function BlockView({ b, rtl }: { b: Block; rtl: boolean }) {
  const align = rtl ? ({ writingDirection: 'rtl', textAlign: 'right' } as const) : ({ writingDirection: 'ltr', textAlign: 'left' } as const);
  switch (b.type) {
    case 'h': return <Text style={[{ fontSize: 19, fontWeight: '800', marginTop: 14, marginBottom: 8, color: C.primary }, align]}>{b.text}</Text>;
    case 'p': return <P rtl={rtl} style={{ marginBottom: 8 }}>{b.text}</P>;
    case 'rule': return (
      <View style={{ backgroundColor: C.primarySoft, borderRadius: 12, padding: 12, marginVertical: 8, borderWidth: 2, borderColor: C.primary }}>
        <Text style={[{ fontWeight: '800', color: C.primary, marginBottom: 4 }, align]}>{rtl ? 'أتذكر' : 'À retenir'}</Text>
        <P rtl={rtl}>{b.text}</P>
      </View>
    );
    case 'example': return (
      <View style={{ backgroundColor: C.sunSoft, borderRadius: 12, padding: 12, marginVertical: 8, borderLeftWidth: rtl ? 0 : 5, borderRightWidth: rtl ? 5 : 0, borderColor: C.sun }}>
        <P rtl={rtl}>{b.text}</P>
      </View>
    );
    case 'tip': return <P rtl={rtl} style={{ color: C.ok, fontStyle: 'italic', marginVertical: 8 }}>💡 {b.text}</P>;
    case 'list': return <View style={{ marginVertical: 6 }}>{b.items.map((i) => <P rtl={rtl} key={i} style={{ marginBottom: 4 }}>•  {i}</P>)}</View>;
  }
}

export function Lesson({ chapterId }: { chapterId: string }) {
  const nav = useNav();
  const { t } = useI18n();
  const { child, markLessonRead } = useApp();
  const [printing, setPrinting] = useState(false);
  const ch = getChapter(chapterId);
  useEffect(() => { if (child && ch) markLessonRead(child.id, ch.id); }, [ch?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!ch) return null;
  const rtl = ch.lang === 'ar';
  const print = async (content: string) => { setPrinting(true); try { await printHtml(content); } finally { setPrinting(false); } };
  return (
    <Screen
      title={ch.title}
      footer={<Btn icon="✏️" label={t('Je m’exerce')} onPress={() => nav.push({ name: 'Quiz', mode: 'exercice', refId: ch.id })} />}
    >
      <Card style={{ backgroundColor: C.okSoft, borderColor: C.okSoft }}>
        <P rtl={rtl} style={{ fontWeight: '800', marginBottom: 4 }}>{rtl ? '🎯 الأهداف' : '🎯 Objectifs'}</P>
        {ch.objectives.map((o) => <P rtl={rtl} key={o}>•  {o}</P>)}
      </Card>
      {ch.lesson.map((b, i) => <BlockView key={i} b={b} rtl={rtl} />)}
      <Row gap={10} style={{ marginTop: 20 }}>
        <Btn small kind="soft" icon="🖨️" label={t('Imprimer le cours (PDF)')} loading={printing} onPress={() => print(html.lesson(ch, child))} />
        <Btn small kind="ghost" icon="🖨️" label={t('Imprimer les exercices')} onPress={() => print(html.exercises(ch, child))} />
      </Row>
      <Muted style={{ marginTop: 16 }}>{t('Contenu indicatif rédigé à partir du programme Massar : en cas de différence, suis ton manuel et ton professeur.')}</Muted>
    </Screen>
  );
}

export function Exams() {
  const nav = useNav();
  const { t, subject } = useI18n();
  const { child, state } = useApp();
  if (!child) return null;
  const level = getLevel(child.levelId);
  const exams = examsFor(level.id);
  return (
    <Screen title={t('Examens blancs')}>
      {level.certifyingExam && <Card color={C.sun}><P>🎓 {t('Cette année : {exam}. On s’entraîne pas à pas, sans pression.', { exam: t(level.certifyingExam) })}</P></Card>}
      {exams.map((e) => {
        const best = bestGrade(state.attempts.filter((a) => a.childId === child.id), (a) => a.refId === e.id);
        return (
          <Card key={e.id} color={SUBJECTS[e.subjectId].color} onPress={() => nav.push({ name: 'Quiz', mode: 'examen', refId: e.id })}>
            <Row style={{ justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: C.ink }}>{SUBJECTS[e.subjectId].icon} {e.title}</Text>
                <Muted>{t('{n} min', { n: e.durationMin })} · {subject(e.subjectId)} · {e.kind === 'examen-blanc' ? t('Examen blanc') : t('Contrôle')}</Muted>
              </View>
              {best && <Badge tone="primary" label={`${formatGrade(best.grade)}/${best.scale}`} />}
            </Row>
          </Card>
        );
      })}
      {exams.length === 0 && <P>{t('Les examens blancs de ce niveau arrivent bientôt. En attendant, entraîne-toi avec les exercices des cours.')}</P>}
      <Btn kind="ghost" small icon="🔎" label={t('Chercher un examen d’un autre niveau')} onPress={() => nav.push({ name: 'Search' })} />
    </Screen>
  );
}
