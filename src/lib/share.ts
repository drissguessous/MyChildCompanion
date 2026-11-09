import { Platform, Share } from 'react-native';

export const WEB_URL = 'https://drissguessous.github.io/mychildcompanion/';

/** Partage natif (WhatsApp, SMS…) ; sur le web, partage du navigateur ou copie du lien. */
export async function shareInvite(message: string): Promise<'shared' | 'copied' | 'failed'> {
  const text = `${message}\n${WEB_URL}`;
  try {
    if (Platform.OS === 'web') {
      const nav = typeof navigator !== 'undefined' ? (navigator as Navigator & { share?: (d: { text: string; url: string }) => Promise<void> }) : undefined;
      if (nav?.share) {
        await nav.share({ text: message, url: WEB_URL });
        return 'shared';
      }
      await nav?.clipboard?.writeText(text);
      return 'copied';
    }
    await Share.share({ message: text });
    return 'shared';
  } catch {
    return 'failed';
  }
}
