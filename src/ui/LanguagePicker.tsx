import React from 'react';
import { LANGS, useI18n } from '../i18n';
import { useApp } from '../store/AppContext';
import { Chip, Muted, Row } from './kit';

export function LanguagePicker({ showNote = true }: { showNote?: boolean }) {
  const { state, setLang } = useApp();
  const { t } = useI18n();
  return (
    <>
      <Row style={{ justifyContent: 'center', marginBottom: 6 }}>
        {LANGS.map((l) => (
          <Chip key={l.id} label={l.native} active={state.lang === l.id} onPress={() => setLang(l.id)} />
        ))}
      </Row>
      {showNote && state.lang === 'zgh' && (
        <Muted style={{ textAlign: 'center', marginBottom: 8 }}>
          {t('Version bêta : une partie de l’interface reste en français.')}
        </Muted>
      )}
    </>
  );
}
