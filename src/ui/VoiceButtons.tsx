import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { useI18n } from '../i18n';
import { onSpeakingChange, recognitionLocale, speak, speakingId, stopSpeaking, type VoiceLang } from '../lib/voice';
import { C } from './theme';

let seq = 0;

/** Bouton 🔊 : lit les segments à voix haute ; un second appui arrête. */
export function SpeakButton({ segments, label, size = 'm' }: { segments: { text: string; lang?: VoiceLang }[]; label?: string; size?: 's' | 'm' }) {
  const { t, ts } = useI18n();
  const id = useRef(`s${++seq}`).current;
  const [active, setActive] = useState(speakingId() === id);
  useEffect(() => onSpeakingChange((cur) => setActive(cur === id)), [id]);
  useEffect(() => () => { if (speakingId() === id) stopSpeaking(); }, [id]);
  const small = size === 's';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={active ? t('Arrêter la lecture') : t('Écouter')}
      onPress={() => (active ? stopSpeaking() : speak(id, segments))}
      hitSlop={8}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', backgroundColor: active ? C.primary : C.primarySoft, borderRadius: 999, paddingVertical: small ? 5 : 8, paddingHorizontal: small ? 10 : 14 }}
    >
      <Text style={{ fontSize: small ? 14 : 16 }}>{active ? '⏹' : '🔊'}</Text>
      {!!label && <Text style={[{ color: active ? '#fff' : C.primary, fontWeight: '700', fontSize: small ? 13 : 15 }, ts]}>{active ? t('Arrêter') : label}</Text>}
    </Pressable>
  );
}

function recognitionAvailable(): boolean {
  try {
    return ExpoSpeechRecognitionModule.isRecognitionAvailable();
  } catch {
    return false;
  }
}

/** Bouton 🎤 : l'enfant dicte sa réponse ; `onText` reçoit la transcription finale. */
export function MicButton({ lang, onText, disabled }: { lang: VoiceLang; onText: (text: string) => void; disabled?: boolean }) {
  const { t } = useI18n();
  const [listening, setListening] = useState(false);
  const [msg, setMsg] = useState('');
  const mine = useRef(false);
  const [available] = useState(recognitionAvailable);

  useSpeechRecognitionEvent('result', (e) => {
    if (!mine.current) return;
    const text = e.results?.[0]?.transcript ?? '';
    if (e.isFinal && text) onText(text);
  });
  useSpeechRecognitionEvent('end', () => { if (mine.current) { mine.current = false; setListening(false); } });
  useSpeechRecognitionEvent('error', (e) => {
    if (!mine.current) return;
    mine.current = false;
    setListening(false);
    setMsg(e.error === 'not-allowed' ? t('Micro non autorisé.') : e.error === 'no-speech' ? t('Je n’ai rien entendu, réessaie.') : t('La dictée n’a pas fonctionné.'));
  });

  if (!available) return null;

  async function start() {
    setMsg('');
    stopSpeaking();
    const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync().catch(() => ({ granted: false }));
    if (!perm.granted) { setMsg(t('Micro non autorisé.')); return; }
    mine.current = true;
    setListening(true);
    ExpoSpeechRecognitionModule.start({ lang: recognitionLocale(lang), interimResults: false, maxAlternatives: 3, continuous: false });
  }

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={listening ? t('J’écoute…') : t('Répondre à voix haute')}
        disabled={disabled}
        onPress={() => (listening ? ExpoSpeechRecognitionModule.stop() : start())}
        hitSlop={8}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', backgroundColor: listening ? C.review : C.sunSoft, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 14, opacity: disabled ? 0.4 : 1 }}
      >
        <Text style={{ fontSize: 16 }}>{listening ? '⏺' : '🎤'}</Text>
        <Text style={{ color: listening ? '#fff' : '#9A6400', fontWeight: '700' }}>{listening ? t('J’écoute…') : t('Dire')}</Text>
      </Pressable>
      {!!msg && <Text style={{ color: C.review, fontSize: 13, marginTop: 4 }}>{msg}</Text>}
    </>
  );
}
