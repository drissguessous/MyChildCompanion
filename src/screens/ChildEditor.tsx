import React, { useState } from 'react';
import { Switch, View } from 'react-native';
import { LEVELS } from '../data/curriculum';
import { useI18n } from '../i18n';
import { ensurePermission, remindersSupported } from '../lib/reminders';
import { useApp } from '../store/AppContext';
import type { Child, Teacher } from '../store/types';
import { AvatarPicker } from '../ui/AvatarPicker';
import { Btn, Card, Chip, Field, H, Muted, P, Row, Screen, TeacherBubble } from '../ui/kit';
import { LanguagePicker } from '../ui/LanguagePicker';
import { VoicePicker } from '../ui/VoicePicker';
import { useNav } from '../ui/nav';
import { ParentGate } from '../ui/ParentGate';
import { C, EMOJI_AVATARS, TEACHER_EMOJIS } from '../ui/theme';

const DEFAULT_TEACHER: Teacher = { name: 'Oustadati', gender: 'f', avatar: { kind: 'illus', id: 't1', bg: '#DDD6FE' } };

function TeacherFields({ teacher, onChange, childName }: { teacher: Teacher; onChange: (t: Teacher) => void; childName: string }) {
  const { t } = useI18n();
  const f = teacher.gender === 'f';
  return (
    <Card>
      <H style={{ fontSize: 18 }}>🍎 {t('Ton professeur')}</H>
      <Muted style={{ marginBottom: 12 }}>{t(f ? 'Choisis son prénom et son visage. C’est elle qui t’encouragera.' : 'Choisis son prénom et son visage. C’est lui qui t’encouragera.')}</Muted>
      <Field label={t('Prénom du professeur')} value={teacher.name} onChangeText={(name) => onChange({ ...teacher, name })} placeholder="Oustadati" maxLength={24} />
      <Row style={{ marginBottom: 14 }}>
        <Chip label={t('Une professeure')} active={f} onPress={() => onChange({ ...teacher, gender: 'f' })} />
        <Chip label={t('Un professeur')} active={!f} onPress={() => onChange({ ...teacher, gender: 'm' })} />
      </Row>
      <AvatarPicker label={t('Avatar ou photo du professeur')} value={teacher.avatar} emojis={TEACHER_EMOJIS} teacher onChange={(avatar) => onChange({ ...teacher, avatar })} />
      <TeacherBubble
        avatar={teacher.avatar}
        name={teacher.name || 'Oustadati'}
        text={t(f ? 'Bonjour {name} ! Je suis ravie de t’accompagner.' : 'Bonjour {name} ! Je suis ravi de t’accompagner.', { name: childName || '🙂' })}
      />
    </Card>
  );
}

function ChildForm({ initial, onboarding }: { initial?: Child; onboarding?: boolean }) {
  const nav = useNav();
  const { t, level, cycle } = useI18n();
  const { saveChild, selectChild, removeChild } = useApp();
  const [c, setC] = useState<Child>(initial ?? {
    id: `c-${Date.now()}`, name: '', gender: 'f', levelId: '1AP', scienceLang: 'fr', chronoEnabled: false, createdAt: new Date().toISOString(),
    avatar: { kind: 'illus', id: 'k1', bg: '#FDE68A' }, teacher: DEFAULT_TEACHER,
  });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const set = (p: Partial<Child>) => setC((x) => ({ ...x, ...p }));
  const lvl = LEVELS.find((l) => l.id === c.levelId);
  const rem = c.reminder ?? { enabled: false, hour: 18, minute: 0 };
  const [remMsg, setRemMsg] = useState('');

  function save() {
    const child = { ...c, name: c.name.trim(), teacher: { ...c.teacher, name: c.teacher.name.trim() || 'Oustadati' } };
    saveChild(child);
    if (onboarding) {
      selectChild(child.id);
      nav.reset({ name: 'Home' });
    } else nav.back();
  }

  return (
    <>
      {onboarding && <LanguagePicker />}
      <Card>
        <H style={{ fontSize: 18 }}>👧 {t('L’enfant')}</H>
        <Field label={t('Prénom')} value={c.name} onChangeText={(name) => set({ name })} placeholder="Yasmine" maxLength={24} />
        <Row style={{ marginBottom: 14 }}>
          <Chip label={t('Fille')} active={c.gender === 'f'} onPress={() => set({ gender: 'f' })} />
          <Chip label={t('Garçon')} active={c.gender === 'm'} onPress={() => set({ gender: 'm' })} />
        </Row>
        <AvatarPicker label={t('Avatar ou photo de l’enfant')} value={c.avatar} emojis={EMOJI_AVATARS} onChange={(avatar) => set({ avatar })} />
        <P style={{ fontWeight: '700', marginBottom: 8 }}>{t('Niveau (système Massar)')}</P>
        {(['primaire', 'college', 'lycee'] as const).map((cy) => (
          <View key={cy} style={{ marginBottom: 10 }}>
            <Muted style={{ marginBottom: 6 }}>{cycle(cy)}</Muted>
            <Row>
              {LEVELS.filter((l) => l.cycle === cy).map((l) => (
                <Chip key={l.id} label={l.short === l.id ? l.id : `${l.id} · ${l.short}`} active={c.levelId === l.id} onPress={() => set({ levelId: l.id })} />
              ))}
            </Row>
          </View>
        ))}
        {lvl && <Muted style={{ marginBottom: 12 }}>{level(lvl)}</Muted>}
        <Row style={{ justifyContent: 'space-between', marginTop: 4 }}>
          <View style={{ flex: 1 }}>
            <P style={{ fontWeight: '700' }}>{t('Chronomètre pendant les examens')}</P>
            <Muted>{t('Désactivé conseillé en primaire, pour éviter le stress.')}</Muted>
          </View>
          <Switch value={c.chronoEnabled} onValueChange={(v) => set({ chronoEnabled: v })} trackColor={{ true: C.primary }} />
        </Row>
      </Card>
      <Card>
        <Row style={{ justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <H style={{ fontSize: 18, marginBottom: 2 }}>⏰ {t('Rappel quotidien')}</H>
            <Muted>{t('Une notification à l’heure choisie, chaque jour de travail du plan (rien les jours de repos), et la veille d’un examen blanc.')}</Muted>
          </View>
          <Switch value={rem.enabled} trackColor={{ true: C.primary }} onValueChange={async (v) => {
            setRemMsg('');
            if (v && remindersSupported && !(await ensurePermission())) { setRemMsg(t('Autorisez les notifications dans les réglages du téléphone pour recevoir les rappels.')); }
            if (v && !remindersSupported) setRemMsg(t('Sur la version web, le rappel s’affiche à l’ouverture de l’application. Installez l’application Android pour recevoir des notifications.'));
            set({ reminder: { ...rem, enabled: v } });
          }} />
        </Row>
        {rem.enabled && (
          <>
            <Muted style={{ marginTop: 10, marginBottom: 6 }}>{t('Heure')}</Muted>
            <Row>{[7, 8, 12, 14, 16, 17, 18, 19, 20].map((h) => <Chip key={h} label={`${h} h`} active={rem.hour === h} onPress={() => set({ reminder: { ...rem, hour: h } })} />)}</Row>
            <Muted style={{ marginTop: 10, marginBottom: 6 }}>{t('Minutes')}</Muted>
            <Row>{[0, 15, 30, 45].map((m) => <Chip key={m} label={`:${String(m).padStart(2, '0')}`} active={rem.minute === m} onPress={() => set({ reminder: { ...rem, minute: m } })} />)}</Row>
          </>
        )}
        {!!remMsg && <Muted style={{ marginTop: 8, color: C.review }}>{remMsg}</Muted>}
      </Card>
      <TeacherFields teacher={c.teacher} onChange={(teacher) => set({ teacher })} childName={c.name} />
      <Btn label={onboarding ? t('C’est parti !') : t('Enregistrer')} icon="✅" onPress={save} disabled={!c.name.trim()} />
      {initial && !onboarding && (
        <View style={{ marginTop: 24 }}>
          {!confirmDelete ? (
            <Btn kind="ghost" small label={t('Supprimer ce profil')} onPress={() => setConfirmDelete(true)} />
          ) : (
            <Card style={{ borderColor: C.review }}>
              <P>{t('Supprimer le profil de {name} et toute sa progression ? Cette action est définitive.', { name: initial.name })}</P>
              <Row style={{ marginTop: 10 }}>
                <Btn small kind="soft" label={t('Annuler')} onPress={() => setConfirmDelete(false)} />
                <Btn small label={t('Supprimer')} onPress={() => { removeChild(initial.id); nav.back(); }} />
              </Row>
            </Card>
          )}
        </View>
      )}
    </>
  );
}

export function ChildEditor({ childId, onboarding }: { childId?: string; onboarding?: boolean }) {
  const { state } = useApp();
  const { t } = useI18n();
  const initial = state.children.find((c) => c.id === childId);
  return (
    <Screen title={initial ? t('Profil de {name}', { name: initial.name }) : t('Nouvel enfant')} back={!onboarding}>
      <ParentGate reason={t('Créer ou modifier un profil demande le mot de passe parent.')}>
        <ChildForm initial={initial} onboarding={onboarding} />
      </ParentGate>
    </Screen>
  );
}

/** Personnalisation par l'enfant lui-même : langue, son avatar et son professeur (sans mot de passe). */
export function Personalize() {
  const nav = useNav();
  const { t } = useI18n();
  const { child, saveChild } = useApp();
  const [c, setC] = useState(child);
  if (!c) return null;
  return (
    <Screen title={t('Personnaliser')}>
      <Card>
        <H style={{ fontSize: 18 }}>🌍 {t('Langue')}</H>
        <LanguagePicker />
      </Card>
      <Card>
        <H style={{ fontSize: 18 }}>😊 {t('Toi')}</H>
        <AvatarPicker label={t('Ton avatar ou ta photo')} value={c.avatar} emojis={EMOJI_AVATARS} onChange={(avatar) => setC({ ...c, avatar })} />
      </Card>
      <TeacherFields teacher={c.teacher} onChange={(teacher) => setC({ ...c, teacher })} childName={c.name} />
      <Card><VoicePicker /></Card>
      <Btn label={t('Enregistrer')} icon="✅" onPress={() => { saveChild({ ...c, teacher: { ...c.teacher, name: c.teacher.name.trim() || 'Oustadati' } }); nav.back(); }} />
    </Screen>
  );
}
