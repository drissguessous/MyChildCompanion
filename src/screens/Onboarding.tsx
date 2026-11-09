import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { catalogStats } from '../data';
import { useI18n } from '../i18n';
import { useApp } from '../store/AppContext';
import { Btn, Card, Field, H, Muted, P, Screen } from '../ui/kit';
import { LanguagePicker } from '../ui/LanguagePicker';
import { IllustratedAvatar } from '../ui/Illustrated';
import { useNav } from '../ui/nav';
import { C } from '../ui/theme';

export function Welcome() {
  const nav = useNav();
  const { t } = useI18n();
  const { loadDemo } = useApp();
  const [busy, setBusy] = useState(false);
  const stats = catalogStats();
  return (
    <Screen back={false}>
      <LanguagePicker />
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <IllustratedAvatar id="t3" bg="#ECE9FF" size={110} />
        <Text style={{ fontSize: 34, fontWeight: '900', color: C.primary, marginTop: 8 }}>Oustadati</Text>
        <Text style={{ fontSize: 22, color: C.muted, marginTop: 2 }}>أستاذتي · ⵜⴰⵙⵍⵎⴰⴷⵜ ⵉⵏⵓ</Text>
        <P style={{ textAlign: 'center', marginTop: 12 }}>
          {t('Un professeur bienveillant, toujours là pour accompagner ton enfant du CP au bac.')}
        </P>
      </View>
      <Card>
        <P>📚 {t('Cours, exercices et examens blancs du programme Massar')}</P>
        <P>♾️ {t('Entraînement illimité et plan de mise à niveau personnalisé')}</P>
        <P>✅ {t('Correction automatique et notes sur 10 ou sur 20')}</P>
        <P>🔒 {t('Corrigés protégés par le mot de passe parent')}</P>
        <P>🖨️ {t('Impression en PDF')}</P>
        <P>💛 {t('Encouragements, motivation et météo de l’humeur')}</P>
        <Muted style={{ marginTop: 8 }}>
          {t('{topics} thèmes du programme · {chapters} cours rédigés · {exams} examens · {questions} questions', stats)}
        </Muted>
      </Card>
      <Btn label={t('Commencer')} icon="🚀" onPress={() => nav.push({ name: 'ParentSetup' })} />
      <View style={{ height: 10 }} />
      <Btn
        kind="soft"
        label={t('Découvrir avec la démo')}
        icon="🎈"
        loading={busy}
        onPress={async () => {
          setBusy(true);
          await loadDemo();
          setBusy(false);
          nav.reset({ name: 'Profiles' });
        }}
      />
      <Muted style={{ textAlign: 'center', marginTop: 16 }}>
        {t('Toutes les données restent sur cet appareil. Aucun compte, aucune publicité.')}
      </Muted>
    </Screen>
  );
}

export function ParentSetup() {
  const nav = useNav();
  const { t } = useI18n();
  const { setupParent } = useApp();
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState<string>();

  async function create() {
    if (pwd.length < 4) return setErr(t('Choisissez au moins 4 caractères.'));
    if (pwd !== pwd2) return setErr(t('Les deux mots de passe ne sont pas identiques.'));
    setErr('');
    setBusy(true);
    setCode(await setupParent(pwd));
    setBusy(false);
  }

  if (code) {
    return (
      <Screen title={t('Code de secours')} back={false}>
        <H>{t('Notez ce code')} 📝</H>
        <P>{t('Il permet de changer le mot de passe parent si vous l’oubliez. Gardez-le hors de portée des enfants.')}</P>
        <Card style={{ alignItems: 'center', marginTop: 16 }}>
          <Text selectable style={{ fontSize: 30, fontWeight: '900', letterSpacing: 3, color: C.primary }}>{code}</Text>
        </Card>
        <Btn label={t('C’est noté, ajouter mon enfant')} onPress={() => nav.reset({ name: 'ChildEditor', onboarding: true })} />
      </Screen>
    );
  }

  return (
    <Screen title={t('Espace parent')}>
      <H>{t('Créez votre mot de passe parent')}</H>
      <P style={{ marginBottom: 16 }}>
        {t('Il protège les corrigés, les notes à valider et les réglages. Votre enfant pourra travailler seul, et vous découvrirez la correction ensemble.')}
      </P>
      <Field label={t('Mot de passe (4 caractères minimum)')} value={pwd} onChangeText={setPwd} secureTextEntry />
      <Field label={t('Confirmez le mot de passe')} value={pwd2} onChangeText={setPwd2} secureTextEntry onSubmitEditing={create} />
      {!!err && <Muted style={{ color: C.review, marginBottom: 10 }}>{err}</Muted>}
      <Btn label={t('Créer le mot de passe')} onPress={create} loading={busy} disabled={!pwd || !pwd2} />
    </Screen>
  );
}
