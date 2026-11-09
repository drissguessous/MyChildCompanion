import React, { useState } from 'react';
import { View } from 'react-native';
import { useI18n } from '../i18n';
import { useApp } from '../store/AppContext';
import { Btn, Card, Field, H, Muted, P } from './kit';
import { C } from './theme';

/** Affiche `children` seulement si le parent a saisi son mot de passe (session de 10 min). */
export function ParentGate({ children, reason }: { children: React.ReactNode; reason?: string }) {
  const { parentUnlocked, unlockParent, recoverParent, state } = useApp();
  const { t } = useI18n();
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [recover, setRecover] = useState(false);
  const [code, setCode] = useState('');
  const [newPwd, setNewPwd] = useState('');

  if (parentUnlocked) return <>{children}</>;

  async function submit() {
    setBusy(true);
    setErr('');
    const ok = await unlockParent(pwd);
    setBusy(false);
    if (!ok) setErr(t('Mot de passe incorrect.'));
    setPwd('');
  }

  async function submitRecovery() {
    if (newPwd.length < 4) return setErr(t('Le nouveau mot de passe doit faire au moins 4 caractères.'));
    setBusy(true);
    setErr('');
    const ok = await recoverParent(code, newPwd);
    setBusy(false);
    if (!ok) setErr(t('Code de secours incorrect.'));
  }

  return (
    <Card style={{ borderColor: C.primary, borderWidth: 2 }}>
      <H>🔒 {t('Espace parent')}</H>
      <P style={{ marginBottom: 12 }}>{reason ?? t('Cette partie est réservée aux parents.')}</P>
      {state.demo && <Muted style={{ marginBottom: 10 }}>{t('Mode démo : le mot de passe est 1234.')}</Muted>}
      {!recover ? (
        <>
          <Field label={t('Mot de passe parent')} value={pwd} onChangeText={setPwd} secureTextEntry autoFocus onSubmitEditing={submit} returnKeyType="done" />
          {!!err && <Muted style={{ color: C.review, marginBottom: 8 }}>{err}</Muted>}
          <Btn label={t('Déverrouiller')} onPress={submit} loading={busy} disabled={!pwd} />
          <View style={{ height: 8 }} />
          <Btn kind="ghost" small label={t('Mot de passe oublié ?')} onPress={() => { setRecover(true); setErr(''); }} />
        </>
      ) : (
        <>
          <Field label={t('Code de secours (donné à la création)')} value={code} onChangeText={setCode} autoCapitalize="characters" placeholder="ABCD-EFGH" />
          <Field label={t('Nouveau mot de passe')} value={newPwd} onChangeText={setNewPwd} secureTextEntry />
          {!!err && <Muted style={{ color: C.review, marginBottom: 8 }}>{err}</Muted>}
          <Btn label={t('Changer le mot de passe')} onPress={submitRecovery} loading={busy} disabled={!code || !newPwd} />
          <View style={{ height: 8 }} />
          <Btn kind="ghost" small label={t('Retour')} onPress={() => { setRecover(false); setErr(''); }} />
        </>
      )}
    </Card>
  );
}
