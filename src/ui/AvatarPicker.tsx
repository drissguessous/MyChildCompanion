import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useI18n } from '../i18n';
import type { Avatar } from '../store/types';
import { AvatarView, Btn, Muted, Row } from './kit';
import { AVATAR_BGS, C } from './theme';

/** Réduit la photo à 256 px pour la stocker sur l'appareil (aucun envoi en ligne). */
async function toSmallDataUri(uri: string): Promise<string> {
  const ref = await ImageManipulator.manipulate(uri).resize({ width: 256 }).renderAsync();
  const out = await ref.saveAsync({ base64: true, compress: 0.7, format: SaveFormat.JPEG });
  return `data:image/jpeg;base64,${out.base64}`;
}

export function AvatarPicker({ value, onChange, emojis, label }: {
  value: Avatar; onChange: (a: Avatar) => void; emojis: string[]; label: string;
}) {
  const { t, ts } = useI18n();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const bg = value.kind === 'emoji' ? value.bg : AVATAR_BGS[0];

  async function pick(camera: boolean) {
    setMsg('');
    setBusy(true);
    try {
      if (camera) {
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (!perm.granted) {
          setMsg(t('L’accès à l’appareil photo n’est pas autorisé. Tu peux choisir un avatar à la place.'));
          return;
        }
      }
      const opts: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.8 };
      const res = camera ? await ImagePicker.launchCameraAsync(opts) : await ImagePicker.launchImageLibraryAsync(opts);
      if (res.canceled || !res.assets?.[0]) return;
      onChange({ kind: 'photo', uri: await toSmallDataUri(res.assets[0].uri) });
    } catch {
      setMsg(t('La photo n’a pas pu être chargée. Essaie une autre image ou choisis un avatar.'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={[{ fontSize: 14, fontWeight: '700', color: C.ink, marginBottom: 8 }, ts]}>{label}</Text>
      <Row gap={12} style={{ marginBottom: 10 }}>
        <AvatarView avatar={value} size={72} />
        <View style={{ flex: 1, gap: 8 }}>
          <Btn small kind="soft" icon="🖼️" label={t('Choisir une photo')} onPress={() => pick(false)} loading={busy} />
          <Btn small kind="ghost" icon="📷" label={t('Prendre une photo')} onPress={() => pick(true)} disabled={busy} />
        </View>
      </Row>
      {!!msg && <Muted style={{ color: C.review, marginBottom: 8 }}>{msg}</Muted>}
      <Row gap={8}>
        {emojis.map((e) => (
          <Pressable
            key={e}
            accessibilityRole="button"
            accessibilityLabel={`Avatar ${e}`}
            onPress={() => onChange({ kind: 'emoji', value: e, bg })}
            style={{
              width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: bg,
              borderWidth: 3, borderColor: value.kind === 'emoji' && value.value === e ? C.primary : 'transparent',
            }}
          >
            <Text style={{ fontSize: 24 }}>{e}</Text>
          </Pressable>
        ))}
      </Row>
      {value.kind === 'emoji' && (
        <Row gap={8} style={{ marginTop: 10 }}>
          {AVATAR_BGS.map((c) => (
            <Pressable
              key={c}
              accessibilityRole="button"
              accessibilityLabel={t('Couleur de fond')}
              onPress={() => onChange({ ...value, bg: c })}
              style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: c, borderWidth: 3, borderColor: value.bg === c ? C.ink : 'transparent' }}
            />
          ))}
        </Row>
      )}
    </View>
  );
}
