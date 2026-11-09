import React from 'react';
import {
  ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View,
  type StyleProp, type TextInputProps, type TextStyle, type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useI18n } from '../i18n';
import type { Avatar } from '../store/types';
import { IllustratedAvatar } from './Illustrated';
import { SpeakButton } from './VoiceButtons';
import { useNav } from './nav';
import { C, R, S } from './theme';

/** Texte qui suit la langue de l'interface (sens d'écriture, police tifinagh). */
export function T({ style, ...props }: React.ComponentProps<typeof Text>) {
  const { ts } = useI18n();
  return <Text {...props} style={[ts, style]} />;
}

export function Screen({ title, children, back = true, right, scroll = true, footer }: {
  title?: string; children: React.ReactNode; back?: boolean; right?: React.ReactNode; scroll?: boolean; footer?: React.ReactNode;
}) {
  const nav = useNav();
  const { row, rtl, ts, t } = useI18n();
  const insets = useSafeAreaInsets();
  const Body = scroll ? ScrollView : View;
  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {(title || back) && (
        <View style={[styles.header, { flexDirection: row }]}>
          {back && nav.canGoBack ? (
            <Pressable accessibilityRole="button" accessibilityLabel={t('Retour')} onPress={nav.back} style={styles.backBtn} hitSlop={12}>
              <Text style={styles.backTxt}>{rtl ? '›' : '‹'}</Text>
            </Pressable>
          ) : <View style={{ width: 8 }} />}
          <Text style={[styles.headerTitle, ts]} numberOfLines={1}>{title}</Text>
          <View style={{ minWidth: 40, alignItems: rtl ? 'flex-start' : 'flex-end' }}>{right}</View>
        </View>
      )}
      <Body
        style={{ flex: 1 }}
        contentContainerStyle={scroll ? [styles.content, { paddingBottom: insets.bottom + 32 }] : undefined}
        keyboardShouldPersistTaps="handled"
      >
        {scroll ? <View style={styles.maxW}>{children}</View> : children}
      </Body>
      {footer && <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>{footer}</View>}
    </View>
  );
}

export function Btn({ label, onPress, kind = 'primary', icon, disabled, loading, style, small }: {
  label: string; onPress?: () => void; kind?: 'primary' | 'soft' | 'ghost' | 'sun'; icon?: string; disabled?: boolean; loading?: boolean; style?: StyleProp<ViewStyle>; small?: boolean;
}) {
  const { ts } = useI18n();
  const bg = { primary: C.primary, soft: C.primarySoft, ghost: 'transparent', sun: C.sun }[kind];
  const fg = { primary: '#fff', soft: C.primary, ghost: C.primary, sun: C.ink }[kind];
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn, small && styles.btnSmall, { backgroundColor: bg, opacity: disabled ? 0.45 : pressed ? 0.8 : 1 },
        kind === 'ghost' && { borderWidth: 1.5, borderColor: C.primarySoft }, style,
      ]}
    >
      {loading ? <ActivityIndicator color={fg} /> : (
        <Text style={[styles.btnTxt, small && { fontSize: 14 }, { color: fg }, ts, { textAlign: 'center' }]}>{icon ? `${icon}  ` : ''}{label}</Text>
      )}
    </Pressable>
  );
}

export function Card({ children, style, onPress, color }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void; color?: string }) {
  const { rtl } = useI18n();
  const accent = color ? (rtl ? { borderRightWidth: 5, borderRightColor: color } : { borderLeftWidth: 5, borderLeftColor: color }) : null;
  const content = <View style={[styles.card, accent, style]}>{children}</View>;
  if (!onPress) return content;
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}>{content}</Pressable>;
}

export function H({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  const { ts } = useI18n();
  return <Text style={[styles.h, ts, style]}>{children}</Text>;
}
/** Paragraphe. `rtl` force le sens du contenu (cours en arabe) ; `content` désactive le style de l'interface. */
export function P({ children, style, rtl, content }: { children: React.ReactNode; style?: StyleProp<TextStyle>; rtl?: boolean; content?: boolean }) {
  const { ts } = useI18n();
  const base = content || rtl !== undefined ? (rtl ? styles.rtl : styles.ltr) : ts;
  return <Text style={[styles.p, base, style]}>{children}</Text>;
}
export function Muted({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  const { ts } = useI18n();
  return <Text style={[styles.muted, ts, style]}>{children}</Text>;
}

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  const { ts } = useI18n();
  return (
    <View style={{ marginBottom: S.m }}>
      <Text style={[styles.label, ts]}>{label}</Text>
      <TextInput placeholderTextColor="#A3A7BE" {...props} style={[styles.input, ts, props.style]} />
    </View>
  );
}

export function Chip({ label, active, onPress, color }: { label: string; active?: boolean; onPress?: () => void; color?: string }) {
  const { ts } = useI18n();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      onPress={onPress}
      style={[styles.chip, active && { backgroundColor: color ?? C.primary, borderColor: color ?? C.primary }]}
    >
      <Text style={[styles.chipTxt, ts, active && { color: '#fff' }]}>{label}</Text>
    </Pressable>
  );
}

export function AvatarView({ avatar, size = 56 }: { avatar: Avatar; size?: number }) {
  if (avatar.kind === 'illus') return <IllustratedAvatar id={avatar.id} bg={avatar.bg} size={size} />;
  if (avatar.kind === 'photo') {
    return <Image source={{ uri: avatar.uri }} style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: C.line }} />;
  }
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: avatar.bg, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size * 0.55 }}>{avatar.value}</Text>
    </View>
  );
}

/** Bulle du professeur-compagnon. */
export function TeacherBubble({ avatar, name, text }: { avatar: Avatar; name: string; text: string }) {
  const { ts, row, rtl, lang } = useI18n();
  return (
    <View style={[styles.bubbleRow, { flexDirection: row }]}>
      <AvatarView avatar={avatar} size={52} />
      <View style={[styles.bubble, rtl && { borderTopLeftRadius: 16, borderTopRightRadius: 4 }]}>
        <Text style={[styles.bubbleName, ts]}>{name}</Text>
        <Text style={[styles.bubbleTxt, ts]}>{text}</Text>
        {lang !== 'zgh' && <View style={{ marginTop: 6, alignSelf: rtl ? 'flex-end' : 'flex-start' }}><SpeakButton size="s" segments={[{ text }]} /></View>}
      </View>
    </View>
  );
}

export function Row({ children, style, gap = S.s }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; gap?: number }) {
  const { row } = useI18n();
  return <View style={[{ flexDirection: row, alignItems: 'center', flexWrap: 'wrap', gap }, style]}>{children}</View>;
}

export function Badge({ label, tone = 'muted' }: { label: string; tone?: 'ok' | 'review' | 'muted' | 'primary' | 'sun' }) {
  const map = {
    ok: [C.okSoft, C.ok], review: [C.reviewSoft, C.review], muted: [C.pendingSoft, C.pending], primary: [C.primarySoft, C.primary], sun: [C.sunSoft, '#9A6400'],
  } as const;
  const [bg, fg] = map[tone];
  const { ts } = useI18n();
  return <View style={[styles.badge, { backgroundColor: bg }]}><Text style={[styles.badgeTxt, ts, { color: fg }]}>{label}</Text></View>;
}

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: S.m, paddingVertical: S.s, minHeight: 52 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.line },
  backTxt: { fontSize: 28, color: C.ink, marginTop: -3 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '700', color: C.ink, marginHorizontal: S.m },
  content: { padding: S.l },
  maxW: { width: '100%', maxWidth: 760, alignSelf: 'center' },
  footer: { paddingHorizontal: S.l, paddingTop: S.m, borderTopWidth: 1, borderTopColor: C.line, backgroundColor: C.bg },
  btn: { borderRadius: R.m, paddingVertical: 14, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', minHeight: 50 },
  btnSmall: { paddingVertical: 8, paddingHorizontal: 12, minHeight: 38, borderRadius: R.s },
  btnTxt: { fontSize: 16, fontWeight: '700' },
  card: { backgroundColor: C.card, borderRadius: R.m, padding: S.l, borderWidth: 1, borderColor: C.line, marginBottom: S.m },
  h: { fontSize: 22, fontWeight: '800', color: C.ink, marginBottom: S.s },
  p: { fontSize: 16, lineHeight: 24, color: C.ink },
  rtl: { writingDirection: 'rtl', textAlign: 'right' },
  ltr: { writingDirection: 'ltr', textAlign: 'left' },
  muted: { fontSize: 14, color: C.muted, lineHeight: 20 },
  label: { fontSize: 14, fontWeight: '700', color: C.ink, marginBottom: 6 },
  input: { backgroundColor: C.card, borderWidth: 1.5, borderColor: C.line, borderRadius: R.s, paddingHorizontal: S.m, paddingVertical: 12, fontSize: 16, color: C.ink },
  chip: { borderWidth: 1.5, borderColor: C.line, backgroundColor: C.card, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 999 },
  chipTxt: { fontSize: 14, fontWeight: '600', color: C.ink },
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: S.m, marginBottom: S.l },
  bubble: { flex: 1, backgroundColor: C.card, borderRadius: R.m, borderTopLeftRadius: 4, padding: S.m, borderWidth: 1, borderColor: C.line },
  bubbleName: { fontSize: 13, fontWeight: '800', color: C.primary, marginBottom: 2 },
  bubbleTxt: { fontSize: 16, lineHeight: 23, color: C.ink },
  badge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  badgeTxt: { fontSize: 12, fontWeight: '800' },
});
