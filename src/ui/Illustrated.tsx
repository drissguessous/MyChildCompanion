/**
 * Avatars illustrés (vectoriels) : rendu identique sur Android, iOS et web,
 * contrairement aux émojis composés (👩‍🏫, tons de peau) parfois mal affichés.
 */
import React from 'react';
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Path, Rect } from 'react-native-svg';

type Hair = 'short' | 'curly' | 'long' | 'bun' | 'pony' | 'hijab' | 'cap' | 'spiky' | 'bob' | 'grey' | 'bald';

export interface IllusSpec {
  id: string;
  skin: string;
  hair: Hair;
  hairColor: string;
  shirt: string;
  glasses?: boolean;
  beard?: boolean;
  tie?: string;
  blazer?: boolean;
  hijabColor?: string;
}

const SK = { a: '#F6D3B3', b: '#E8B98F', c: '#C98E62', d: '#9C6B48', e: '#6E4A32' };
const HC = { black: '#2B2321', brown: '#5A3B2A', chestnut: '#8A5530', blond: '#D9A84E', grey: '#B9B4AE' };

export const KID_AVATARS: IllusSpec[] = [
  { id: 'k1', skin: SK.b, hair: 'pony', hairColor: HC.black, shirt: '#F28C8C' },
  { id: 'k2', skin: SK.c, hair: 'short', hairColor: HC.black, shirt: '#5DA9E9' },
  { id: 'k3', skin: SK.a, hair: 'bob', hairColor: HC.chestnut, shirt: '#9C7BEA' },
  { id: 'k4', skin: SK.d, hair: 'curly', hairColor: HC.black, shirt: '#F5B841' },
  { id: 'k5', skin: SK.b, hair: 'hijab', hairColor: HC.black, hijabColor: '#7FC8A9', shirt: '#7FC8A9' },
  { id: 'k6', skin: SK.a, hair: 'cap', hairColor: HC.brown, shirt: '#E76F51' },
  { id: 'k7', skin: SK.c, hair: 'long', hairColor: HC.brown, shirt: '#2A9D8F' },
  { id: 'k8', skin: SK.e, hair: 'spiky', hairColor: HC.black, shirt: '#8AB17D' },
  { id: 'k9', skin: SK.b, hair: 'bun', hairColor: HC.brown, shirt: '#F4A3C0', glasses: true },
  { id: 'k10', skin: SK.a, hair: 'short', hairColor: HC.blond, shirt: '#457B9D', glasses: true },
  { id: 'k11', skin: SK.d, hair: 'hijab', hairColor: HC.black, hijabColor: '#F2C14E', shirt: '#264653' },
  { id: 'k12', skin: SK.c, hair: 'curly', hairColor: HC.brown, shirt: '#E9C46A' },
];

export const TEACHER_ILLUS: IllusSpec[] = [
  { id: 't1', skin: SK.b, hair: 'bun', hairColor: HC.black, shirt: '#5B4BDB', blazer: true, glasses: true },
  { id: 't2', skin: SK.c, hair: 'short', hairColor: HC.black, shirt: '#2A9D8F', blazer: true, tie: '#F4A261', beard: true },
  { id: 't3', skin: SK.b, hair: 'hijab', hairColor: HC.black, hijabColor: '#C77DFF', shirt: '#C77DFF', blazer: true },
  { id: 't4', skin: SK.a, hair: 'grey', hairColor: HC.grey, shirt: '#457B9D', blazer: true, glasses: true, tie: '#E63946' },
  { id: 't5', skin: SK.d, hair: 'long', hairColor: HC.black, shirt: '#E76F51', blazer: true },
  { id: 't6', skin: SK.c, hair: 'bald', hairColor: HC.black, shirt: '#264653', blazer: true, beard: true, glasses: true },
  { id: 't7', skin: SK.b, hair: 'hijab', hairColor: HC.black, hijabColor: '#2A9D8F', shirt: '#2A9D8F', blazer: true, glasses: true },
  { id: 't8', skin: SK.a, hair: 'bob', hairColor: HC.chestnut, shirt: '#F4A3C0', blazer: true },
  { id: 't9', skin: SK.e, hair: 'short', hairColor: HC.black, shirt: '#5DA9E9', blazer: true, tie: '#264653' },
  { id: 't10', skin: SK.b, hair: 'grey', hairColor: HC.grey, shirt: '#8AB17D', blazer: true, beard: true },
];

const ALL = [...KID_AVATARS, ...TEACHER_ILLUS];
export const getIllus = (id: string) => ALL.find((a) => a.id === id) ?? KID_AVATARS[0];

function HairBack({ s }: { s: IllusSpec }) {
  switch (s.hair) {
    case 'long': return <Path d="M24 44 Q24 18 50 18 Q76 18 76 44 L78 82 Q50 90 22 82 Z" fill={s.hairColor} />;
    case 'bob': return <Path d="M25 46 Q25 19 50 19 Q75 19 75 46 L75 62 Q50 68 25 62 Z" fill={s.hairColor} />;
    case 'pony': return <G><Circle cx="22" cy="44" r="8" fill={s.hairColor} /><Circle cx="78" cy="44" r="8" fill={s.hairColor} /></G>;
    case 'bun': return <Circle cx="50" cy="16" r="9" fill={s.hairColor} />;
    case 'hijab': return <Path d="M22 48 Q22 16 50 16 Q78 16 78 48 L84 92 L16 92 Z" fill={s.hijabColor} />;
    default: return null;
  }
}

function HairFront({ s }: { s: IllusSpec }) {
  const c = s.hairColor;
  switch (s.hair) {
    case 'short': return <Path d="M27 42 Q27 19 50 19 Q73 19 73 42 Q66 31 50 31 Q36 31 27 42 Z" fill={c} />;
    case 'grey': return <Path d="M27 40 Q30 22 50 22 Q70 22 73 40 Q70 34 63 33 Q52 28 40 33 Q31 34 27 40 Z" fill={c} />;
    case 'spiky': return <Path d="M27 40 L31 24 L37 30 L42 19 L48 28 L54 18 L59 28 L65 21 L68 31 L73 28 L73 40 Q60 32 50 32 Q38 32 27 40 Z" fill={c} />;
    case 'curly': return <G>{[[32, 30], [40, 23], [50, 21], [60, 23], [68, 30], [28, 39], [72, 39]].map(([x, y]) => <Circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill={c} />)}</G>;
    case 'long': case 'bob': case 'pony': case 'bun':
      return <Path d="M27 43 Q27 19 50 19 Q73 19 73 43 Q62 30 48 30 Q40 34 27 43 Z" fill={c} />;
    case 'cap': return <G><Path d="M26 38 Q26 18 50 18 Q74 18 74 38 Z" fill="#E63946" /><Rect x="48" y="33" width="34" height="6" rx="3" fill="#C1121F" /><Circle cx="50" cy="19" r="2.5" fill="#C1121F" /></G>;
    case 'hijab': return <Path d="M27 50 Q27 25 50 25 Q73 25 73 50 Q72 30 50 30 Q28 30 27 50 Z" fill={s.hijabColor} opacity={0.9} />;
    default: return null;
  }
}

export function IllustratedAvatar({ id, bg, size }: { id: string; bg: string; size: number }) {
  const s = getIllus(id);
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs><ClipPath id={`c-${id}`}><Circle cx="50" cy="50" r="50" /></ClipPath></Defs>
      <Circle cx="50" cy="50" r="50" fill={bg} />
      <G clipPath={`url(#c-${id})`}>
        <HairBack s={s} />
        {/* corps */}
        <Path d="M18 100 Q18 72 50 72 Q82 72 82 100 Z" fill={s.shirt} />
        {s.blazer && <G><Path d="M18 100 Q18 74 42 72 L50 92 L58 72 Q82 74 82 100 Z" fill="#2F3150" opacity={0.85} /><Path d="M44 72 L50 86 L56 72 Z" fill="#FFFFFF" /></G>}
        {s.tie && <Path d="M48 74 L52 74 L54 88 L50 92 L46 88 Z" fill={s.tie} />}
        <Rect x="43" y="62" width="14" height="12" rx="5" fill={s.skin} />
        {/* visage */}
        <Ellipse cx="50" cy="46" rx="23" ry="25" fill={s.skin} />
        <Ellipse cx="27" cy="48" rx="3.5" ry="5" fill={s.skin} />
        <Ellipse cx="73" cy="48" rx="3.5" ry="5" fill={s.skin} />
        <HairFront s={s} />
        {s.beard && <Path d="M30 50 Q32 72 50 72 Q68 72 70 50 Q66 62 50 63 Q34 62 30 50 Z" fill={s.hairColor === '#B9B4AE' ? '#9E9893' : '#3A2C26'} />}
        {/* yeux */}
        <Ellipse cx="41" cy="47" rx="3.2" ry="3.8" fill="#2B2321" />
        <Ellipse cx="59" cy="47" rx="3.2" ry="3.8" fill="#2B2321" />
        <Circle cx="42.2" cy="45.6" r="1.1" fill="#FFFFFF" />
        <Circle cx="60.2" cy="45.6" r="1.1" fill="#FFFFFF" />
        {s.glasses && <G fill="none" stroke="#2F3150" strokeWidth="2"><Circle cx="41" cy="47" r="7" /><Circle cx="59" cy="47" r="7" /><Path d="M48 47 L52 47" /></G>}
        {/* joues et sourire */}
        <Circle cx="35" cy="56" r="3.5" fill="#F28C8C" opacity={0.45} />
        <Circle cx="65" cy="56" r="3.5" fill="#F28C8C" opacity={0.45} />
        <Path d="M42 57 Q50 64 58 57" stroke="#7A3E2E" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </G>
    </Svg>
  );
}
