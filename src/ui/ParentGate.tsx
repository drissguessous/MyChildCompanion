import React, { useState } from 'react';
import { Text, View } from "react-native";
import { useI18n } from '../i18n';
import { useApp } from '../store/AppContext';
import { Btn, Card, Field, H, Muted, P } from './kit';
import { C } from './theme';

/** Affiche `children` seulement si le parent a saisi son mot de passe (session de 10 min). */
export function ParentGate({ children, reason }: { children: React.ReactNode; reason?: string }) {
  const { parentUnlocked, unlockParent, recoverParent, setupParent, state } = useApp();
  const { t } = useI18n();
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [recover, setRecover] = useState(false);
  const [code, setCode] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [newCode, setNewCode] = useState<string>();

  if (newCode) {
    return (
      <Card style={{ borderColor: C.primary, borderWidth: 2 }}>
        <H>📝 {t('Notez ce code')}</H>
        <P>{t('Il permet de changer le mot de passe parent si vous l’oubliez. Gardez-le hors de portée des enfants.')}</P>
        <Text selectable style={{ fontSize: 28, fontWeight: "900", textAlign: "center", letterSpacing: 3, color: C.primary, marginVertical: 12 }}>{newCode}</Text>
        <Btn label={t('C’est noté')} onPress={() => setNewCode(undefined)} />
      </Card>
    );
  }
  if (parentUnlocked) return <>{children}</>;

  if (!state.parent) {
    const create = async () => {
      if (pwd.length < 4) return setErr(t('Choisissez au moins 4 caractères.'));
      if (pwd !== pwd2) return setErr(t('Les deux mots de passe ne sont pas identiques.'));
      setErr('');
      setBusy(true);
      const c = await setupParent(pwd);
      setBusy(false);
      setPwd(''); setPwd2('');
      setNewCode(c);
    };
    return (
      <Card style={{ borderColor: C.primary, borderWidth: 2 }}>
        <H>🔒 {t('Créez votre mot de passe parent')}</H>
        <Field label={t('Mot de passe parent')} value={pwd} onChangeText={setPwd} secureTextEntry autoFocus />
        <Field label={t('Confirmer le mot de passe')} value={pwd2} onChangeText={setPwd2} secureTextEntry onSubmitEditing={create} returnKeyType="done" />
        {!!err && <Muted style={{ color: C.review, marginBottom: 8 }}>{err}</Muted>}
        <Btn label={t('Créer')} onPress={create} loading={busy} disabled={!pwd || !pwd2} />
      </Card>
    );
  }

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
