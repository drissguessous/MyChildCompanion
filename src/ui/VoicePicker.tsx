import React, { useEffect, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { useI18n } from '../i18n';
import { loadVoices, SAMPLE, speak, stopSpeaking, voicesFor, type VoiceLang, type VoiceOption } from '../lib/voice';
import { useApp } from '../store/AppContext';
import { Chip, H, Muted, Row } from './kit';
import { C } from './theme';

const LANGS: { id: VoiceLang; label: string }[] = [
  { id: 'fr', label: 'Français' },
  { id: 'ar', label: 'Arabe' },
  { id: 'en', label: 'Anglais' },
];
const RATES = [{ v: 0.75, l: 'Lente' }, { v: 0.92, l: 'Normale' }, { v: 1.1, l: 'Rapide' }];

/** Choix de la voix pour chaque langue, avec écoute d'essai, et de la vitesse de lecture. */
export function VoicePicker() {
  const { t } = useI18n();
  const { state, update } = useApp();
  const [ready, setReady] = useState(false);
  const [lists, setLists] = useState<Record<VoiceLang, VoiceOption[]>>({ fr: [], ar: [], en: [] });
  useEffect(() => {
    loadVoices(true).then(() => {
      setLists({ fr: voicesFor('fr'), ar: voicesFor('ar'), en: voicesFor('en') });
      setReady(true);
    });
    return () => { stopSpeaking(); };
  }, []);
  const chosen = state.voices ?? {};
  const rate = state.voiceRate ?? 0.92;

  return (
    <View>
      <H style={{ fontSize: 18 }}>🗣️ {t('Voix de lecture')}</H>
      <Muted style={{ marginBottom: 10 }}>{t('Touche ▶ pour écouter, puis choisis la voix qui te plaît. Les voix dépendent de l’appareil.')}</Muted>
      {!ready && <Muted>{t('Recherche des voix…')}</Muted>}
      {ready && LANGS.map(({ id, label }) => (
        <View key={id} style={{ marginBottom: 14 }}>
          <Text style={{ fontWeight: '800', color: C.ink, marginBottom: 6 }}>{t(label)}</Text>
          {lists[id].length === 0 ? (
            <Muted style={{ color: C.review }}>
              {Platform.OS === 'web'
                ? t('Aucune voix dans ce navigateur pour cette langue. Essayez Chrome ou Edge.')
                : t('Aucune voix installée pour cette langue. Ajoutez-la dans les réglages du téléphone (Synthèse vocale / Contenu énoncé).')}
            </Muted>
          ) : lists[id].map((o, i) => {
            const selected = (chosen[id] ?? lists[id][0].id) === o.id;
            return (
              <View key={o.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Pressable accessibilityRole="button" accessibilityLabel={t('Écouter')} hitSlop={8}
                  onPress={() => speak(`try-${o.id}`, [{ text: SAMPLE[id], lang: id }], rate, o.id)}
                  style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: C.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
                  <Text>▶</Text>
                </Pressable>
                <Pressable accessibilityRole="radio" accessibilityState={{ checked: selected }} style={{ flex: 1 }}
                  onPress={() => update((s) => ({ ...s, voices: { ...(s.voices ?? {}), [id]: o.id } }))}>
                  <View style={{ borderWidth: 2, borderColor: selected ? C.primary : C.line, backgroundColor: selected ? C.primarySoft : C.card, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12 }}>
                    <Text style={{ color: C.ink, fontWeight: selected ? '800' : '500' }}>{o.label}{i === 0 ? `  · ${t('recommandée')}` : ''}</Text>
                  </View>
                </Pressable>
              </View>
            );
          })}
        </View>
      ))}
      <Text style={{ fontWeight: '800', color: C.ink, marginBottom: 6 }}>{t('Vitesse')}</Text>
      <Row>{RATES.map((r) => <Chip key={r.v} label={t(r.l)} active={rate === r.v} onPress={() => update((s) => ({ ...s, voiceRate: r.v }))} />)}</Row>
    </View>
  );
}
