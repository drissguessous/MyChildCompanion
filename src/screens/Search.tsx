import React, { useMemo, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { search, type SearchFilters } from '../data';
import { getLevel, LEVELS, SUBJECTS } from '../data/curriculum';
import type { SubjectId } from '../data/types';
import { useI18n } from '../i18n';
import { useApp } from '../store/AppContext';
import { Badge, Card, Chip, Muted, Row, Screen, styles as kit } from '../ui/kit';
import { useNav } from '../ui/nav';
import { C } from '../ui/theme';

const KINDS: { id: SearchFilters['kind']; label: string }[] = [
  { id: undefined, label: 'Tout' },
  { id: 'disponible', label: 'Disponible' },
  { id: 'cours', label: 'Cours' },
  { id: 'examen', label: 'Examens' },
  { id: 'theme', label: 'Thèmes à venir' },
];

export function Search() {
  const nav = useNav();
  const { child } = useApp();
  const { t, subject, cycle } = useI18n();
  const [f, setF] = useState<SearchFilters>({ query: '', levelId: child?.levelId });
  const set = (p: Partial<SearchFilters>) => setF((x) => ({ ...x, ...p }));
  const results = useMemo(() => search(f), [f]);
  const levels = LEVELS.filter((l) => !f.cycle || l.cycle === f.cycle);
  const subjects = Array.from(new Set((f.levelId ? [getLevel(f.levelId)] : levels).flatMap((l) => l.subjects))) as SubjectId[];
  const shown = results.slice(0, 80);

  return (
    <Screen title={t('Rechercher')}>
      <TextInput
        value={f.query}
        onChangeText={(query) => set({ query })}
        placeholder={t('Ex. fractions, Pythagore, imparfait, examen régional…')}
        placeholderTextColor="#A3A7BE"
        autoCorrect={false}
        style={[kit.input, { marginBottom: 12 }]}
        accessibilityLabel={t('Rechercher')}
      />
      <Muted style={{ marginBottom: 6 }}>{t('Cycle')}</Muted>
      <Row style={{ marginBottom: 10 }}>
        <Chip label={t('Tous')} active={!f.cycle} onPress={() => set({ cycle: undefined })} />
        {(['primaire', 'college', 'lycee'] as const).map((cy) => (
          <Chip key={cy} label={cycle(cy)} active={f.cycle === cy} onPress={() => set({ cycle: cy, levelId: f.levelId && getLevel(f.levelId).cycle !== cy ? undefined : f.levelId })} />
        ))}
      </Row>
      <Muted style={{ marginBottom: 6 }}>{t('Niveau')}</Muted>
      <Row style={{ marginBottom: 10 }}>
        <Chip label={t('Tous')} active={!f.levelId} onPress={() => set({ levelId: undefined })} />
        {levels.map((l) => (
          <Chip key={l.id} label={child?.levelId === l.id ? `${l.id} ★` : l.id} active={f.levelId === l.id} onPress={() => set({ levelId: l.id, subjectId: undefined })} />
        ))}
      </Row>
      <Muted style={{ marginBottom: 6 }}>{t('Matière')}</Muted>
      <Row style={{ marginBottom: 10 }}>
        <Chip label={t('Toutes')} active={!f.subjectId} onPress={() => set({ subjectId: undefined })} />
        {subjects.map((s) => (
          <Chip key={s} label={`${SUBJECTS[s].icon} ${subject(s)}`} color={SUBJECTS[s].color} active={f.subjectId === s} onPress={() => set({ subjectId: s })} />
        ))}
      </Row>
      <Muted style={{ marginBottom: 6 }}>{t('Type')}</Muted>
      <Row style={{ marginBottom: 16 }}>
        {KINDS.map((k) => <Chip key={k.label} label={t(k.label)} active={f.kind === k.id} onPress={() => set({ kind: k.id })} />)}
      </Row>

      <Muted style={{ marginBottom: 10 }}>{t('{n} résultat(s)', { n: results.length })}</Muted>
      {shown.map((it) => {
        const s = SUBJECTS[it.subjectId];
        const onPress = it.chapterId
          ? () => nav.push({ name: 'Lesson', chapterId: it.chapterId! })
          : it.examId ? () => nav.push({ name: 'Quiz', mode: 'examen', refId: it.examId! }) : undefined;
        return (
          <Card key={it.key} color={s.color} onPress={onPress}>
            <Row style={{ justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: C.ink, writingDirection: /[؀-ۿ]/.test(it.title) ? 'rtl' : 'ltr' }}>
                  {it.kind === 'examen' ? '📝 ' : it.kind === 'cours' ? '📖 ' : ''}{it.title}
                </Text>
                <Muted>{getLevel(it.levelId).short} · {subject(it.subjectId)}</Muted>
              </View>
              {it.kind === 'examen' && <Badge tone="sun" label={t('Examen')} />}
              {it.kind === 'cours' && <Badge tone="ok" label={t('Cours')} />}
              {it.kind === 'theme' && <Badge label={t('Bientôt')} />}
            </Row>
          </Card>
        );
      })}
      {results.length === 0 && <Muted>{t('Aucun résultat. Essaie un autre mot ou enlève un filtre.')}</Muted>}
    </Screen>
  );
}
