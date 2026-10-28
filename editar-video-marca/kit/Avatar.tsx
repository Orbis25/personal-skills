// Personaje de marca estilo Memoji (humano, solo cabeza + manos): volumen con degradados, sin contorno.
import React, { useId } from "react";

export type Expresion = "sorpresa" | "piensa" | "uff" | "explica" | "guino";

const Y = 322; // altura de los ojos
const BROW = "#1E1510";
const LIP = "#C8706A";
const MOUTH = "#5A1F1F";
const SKIN = "#F3C9AA";

const Ojo: React.FC<{ id: string; x: number; ry?: number; dx?: number; dy?: number; cerrado?: boolean; parpado?: number }> = ({
  id,
  x,
  ry = 27,
  dx = 0,
  dy = 0,
  cerrado,
  parpado = 0,
}) => {
  if (cerrado)
    return <path d={`M${x - 26} ${Y + 6} Q${x} ${Y - 20} ${x + 26} ${Y + 6}`} fill="none" stroke={BROW} strokeWidth={9} strokeLinecap="round" />;
  const corte = Y - ry + 2 * ry * parpado * 0.5; // 0 = abierto, 1 = medio cerrado
  return (
    <g>
      <clipPath id={`${id}lid${x}`}>
        <rect x={x - 40} y={corte} width={80} height={2 * ry + 10} />
      </clipPath>
      <g clipPath={`url(#${id}lid${x})`}>
        <ellipse cx={x} cy={Y} rx={26} ry={ry} fill="#FFFFFF" />
        <circle cx={x + dx} cy={Y + 3 + dy} r={18} fill={`url(#${id}iris)`} />
        <circle cx={x + dx} cy={Y + 3 + dy} r={8} fill="#120A06" />
        <circle cx={x + dx + 7} cy={Y - 5 + dy} r={5.5} fill="#FFFFFF" />
        <circle cx={x + dx - 6} cy={Y + 10 + dy} r={2.5} fill="#FFFFFF" opacity={0.8} />
      </g>
      <path
        d={`M${x - 28} ${corte + 6} Q${x} ${corte - 6} ${x + 28} ${corte + 6}`}
        fill="none"
        stroke={BROW}
        strokeWidth={5}
        strokeLinecap="round"
      />
    </g>
  );
};

const Ceja: React.FC<{ d: string }> = ({ d }) => <path d={d} fill="none" stroke={BROW} strokeWidth={16} strokeLinecap="round" />;

// manos estilo Memoji: formas redondeadas con el mismo degradado de piel
const DedoArriba: React.FC<{ id: string }> = ({ id }) => (
  <g fill={`url(#${id}skin)`}>
    <rect x={492} y={300} width={42} height={130} rx={21} />
    <rect x={462} y={404} width={112} height={128} rx={46} />
    <ellipse cx={470} cy={452} rx={24} ry={34} />
    <path d="M480 470 Q520 462 560 470 M482 498 Q520 490 558 498" fill="none" stroke="#D49B7A" strokeWidth={5} strokeLinecap="round" />
  </g>
);
const ManoMenton: React.FC<{ id: string }> = ({ id }) => (
  <g fill={`url(#${id}skin)`}>
    <rect x={392} y={400} width={40} height={120} rx={20} transform="rotate(18 412 460)" />
    <rect x={300} y={500} width={150} height={104} rx={48} />
    <ellipse cx={316} cy={520} rx={34} ry={22} />
    <path d="M330 552 Q376 544 432 552 M330 578 Q376 570 432 578" fill="none" stroke="#D49B7A" strokeWidth={5} strokeLinecap="round" />
  </g>
);

const caras = (id: string): Record<Expresion, React.ReactNode> => ({
  sorpresa: (
    <>
      <Ceja d="M196 252 Q236 220 274 240" />
      <Ceja d="M326 240 Q364 220 404 252" />
      <Ojo id={id} x={238} ry={33} />
      <Ojo id={id} x={362} ry={33} />
      <ellipse cx={300} cy={460} rx={22} ry={28} fill={MOUTH} stroke={LIP} strokeWidth={7} />
    </>
  ),
  piensa: (
    <>
      <Ceja d="M198 266 Q236 252 274 262" />
      <Ceja d="M326 248 Q364 226 402 246" />
      <Ojo id={id} x={238} dx={8} dy={-8} />
      <Ojo id={id} x={362} dx={8} dy={-8} />
      <path d="M270 460 Q300 456 330 448" fill="none" stroke={LIP} strokeWidth={10} strokeLinecap="round" />
      <ManoMenton id={id} />
    </>
  ),
  uff: (
    <>
      <Ceja d="M198 256 Q238 254 274 270" />
      <Ceja d="M326 270 Q362 254 402 256" />
      <Ojo id={id} x={238} dy={5} parpado={0.75} />
      <Ojo id={id} x={362} dy={5} parpado={0.75} />
      <path d="M266 464 Q283 452 300 462 Q317 472 334 458" fill="none" stroke={LIP} strokeWidth={10} strokeLinecap="round" />
    </>
  ),
  explica: (
    <>
      <Ceja d="M198 248 Q236 226 274 244" />
      <Ceja d="M326 244 Q364 226 402 248" />
      <Ojo id={id} x={238} />
      <Ojo id={id} x={362} />
      <path d="M262 446 Q300 498 338 446 Z" fill={MOUTH} stroke={LIP} strokeWidth={7} strokeLinejoin="round" />
      <path d="M270 449 L330 449 L326 460 L274 460 Z" fill="#FFFFFF" />
      <ellipse cx={300} cy={478} rx={15} ry={7} fill="#E07A78" />
      <DedoArriba id={id} />
    </>
  ),
  guino: (
    <>
      <Ceja d="M198 252 Q236 236 274 248" />
      <Ceja d="M326 258 Q364 250 402 260" />
      <Ojo id={id} x={238} />
      <Ojo id={id} x={362} cerrado />
      <path d="M248 440 Q300 508 352 440 Z" fill={MOUTH} stroke={LIP} strokeWidth={7} strokeLinejoin="round" />
      <path d="M256 444 L344 444 Q340 464 330 466 L270 466 Q260 464 256 444 Z" fill="#FFFFFF" />
    </>
  ),
});

export const Avatar: React.FC<{ expresion: Expresion; style?: React.CSSProperties }> = ({ expresion, style }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 600 640" style={style}>
      <defs>
        <radialGradient id={`${id}skin`} cx="42%" cy="38%" r="70%">
          <stop offset="0" stopColor="#FDE6D4" />
          <stop offset="0.55" stopColor={SKIN} />
          <stop offset="1" stopColor="#D99F7E" />
        </radialGradient>
        <radialGradient id={`${id}hair`} cx="45%" cy="25%" r="85%">
          <stop offset="0" stopColor="#3A3330" />
          <stop offset="1" stopColor="#0E0B0A" />
        </radialGradient>
        <radialGradient id={`${id}iris`} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#7A5236" />
          <stop offset="1" stopColor="#2E1C10" />
        </radialGradient>
        <radialGradient id={`${id}blush`}>
          <stop offset="0" stopColor="#F28C7E" stopOpacity={0.45} />
          <stop offset="1" stopColor="#F28C7E" stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* orejas y cabeza */}
      <ellipse cx={126} cy={348} rx={28} ry={44} fill={`url(#${id}skin)`} />
      <ellipse cx={474} cy={348} rx={28} ry={44} fill={`url(#${id}skin)`} />
      <path d="M300 112 C428 112 474 208 474 320 C474 448 400 530 300 530 C200 530 126 448 126 320 C126 208 172 112 300 112 Z" fill={`url(#${id}skin)`} />
      <ellipse cx={206} cy={410} rx={40} ry={24} fill={`url(#${id}blush)`} />
      <ellipse cx={394} cy={410} rx={40} ry={24} fill={`url(#${id}blush)`} />

      {/* pelo negro: mechones ondulados hacia arriba-derecha con canas */}
      <g fill={`url(#${id}hair)`}>
        <path d="M130 300 C118 200 160 130 230 110 C300 92 400 98 448 140 C492 180 488 250 472 300 C462 246 444 218 404 208 C340 192 260 192 200 208 C164 218 142 252 130 300 Z" />
        <path d="M150 250 C136 160 190 96 266 84 C226 116 206 164 210 214 Z" />
        <path d="M196 206 C194 112 266 46 352 48 C300 78 268 128 262 198 Z" />
        <path d="M256 196 C264 98 346 34 434 62 C382 76 340 118 330 194 Z" />
        <path d="M326 198 C344 118 418 72 476 112 C440 124 412 158 402 206 Z" />
        <path d="M398 206 C428 146 484 146 492 204 C486 244 478 272 472 300 C462 250 440 220 398 206 Z" />
      </g>
      <g fill="none" stroke="#050404" strokeWidth={4} strokeLinecap="round" opacity={0.6}>
        <path d="M210 212 C208 160 230 116 266 90" />
        <path d="M262 198 C268 132 300 86 350 54" />
        <path d="M330 196 C342 136 380 92 432 66" />
        <path d="M402 206 C414 164 440 130 474 114" />
      </g>
      <g fill="none" stroke="#8A8784" strokeLinecap="round" opacity={0.8}>
        <path d="M178 226 C178 168 206 128 246 104" strokeWidth={6} />
        <path d="M226 192 C230 128 276 82 334 64" strokeWidth={8} />
        <path d="M290 190 C300 124 350 80 412 74" strokeWidth={8} />
        <path d="M356 196 C372 146 410 116 456 120" strokeWidth={6} />
      </g>

      {/* barba completa + bigote fino */}
      <path
        d="M128 300 C128 470 220 546 300 546 C380 546 472 470 472 300 C456 396 424 432 388 448 C352 466 248 466 212 448 C176 432 144 396 128 300 Z"
        fill={`url(#${id}hair)`}
      />
      <path d="M252 432 Q300 418 348 432" fill="none" stroke="#1A120D" strokeWidth={9} strokeLinecap="round" />

      {/* nariz */}
      <path d="M284 394 Q300 408 316 394" fill="none" stroke="#C98868" strokeWidth={7} strokeLinecap="round" />
      <ellipse cx={302} cy={366} rx={9} ry={20} fill="#FFFFFF" opacity={0.25} />

      {caras(id)[expresion]}

      {/* lentes */}
      <g fill="#FFFFFF" fillOpacity={0.12} stroke="#5A5F66" strokeWidth={9}>
        <rect x={180} y={276} width={116} height={92} rx={30} />
        <rect x={304} y={276} width={116} height={92} rx={30} />
      </g>
      <path d="M296 304 Q300 298 304 304 M180 304 L132 296 M420 304 L468 296" fill="none" stroke="#5A5F66" strokeWidth={8} strokeLinecap="round" />
    </svg>
  );
};
