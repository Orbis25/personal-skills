// Ejemplo de referencia (kit/editar-video-marca): carrusel 4:5 de 5 slides con el personaje de marca.
import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Avatar, type Expresion } from "./marca/Avatar";
import { CodeBlock, KeyWord, M, NumberedCard, PaperCard, Verdict, Wordmark } from "./marca";

// Carrusel 4:5 (1080×1350) del reel IA + arquitectura. Cada slide dura 60 frames; el PNG sale del frame 44 de cada una (springs quietos y cursor encendido).
export const SLIDE = 60;
export const N_SLIDES = 5;
// en el carrusel real este diagrama viene del reel del mismo tema
const sinContexto = <PaperCard title="Cada feature nueva" height={420} />;
const POSES: { expresion: Expresion; rot: number; acento: string; color: string }[] = [
  { expresion: "sorpresa", rot: -6, acento: "!?", color: M.alert },
  { expresion: "piensa", rot: 4, acento: "?", color: M.highlight },
  { expresion: "uff", rot: -3, acento: "…", color: M.text },
  { expresion: "explica", rot: 3, acento: "!", color: M.primary },
  { expresion: "guino", rot: 0, acento: "✦", color: M.highlight },
];

const sticker = [4, -4].flatMap((d) => [`drop-shadow(${d}px 0 0 ${M.paper})`, `drop-shadow(0 ${d}px 0 ${M.paper})`]).join(" ");

const Slide: React.FC<{
  n: number;
  title: React.ReactNode;
  sub?: string;
  children?: React.ReactNode;
  foot?: string;
  h?: number; // alto del Memoji
}> = ({ n, title, sub, children, foot = "desliza →", h = 440 }) => (
  <AbsoluteFill
    style={{
      background: M.bg,
      backgroundImage: `linear-gradient(${M.surface} 2px, transparent 2px), linear-gradient(90deg, ${M.surface} 2px, transparent 2px)`,
      backgroundSize: "60px 60px",
    }}
  >
    {/* personaje estilo Memoji tipo sticker: una expresión por slide + acento de marca */}
    <div
      style={{
        position: "absolute",
        right: 40,
        bottom: 110,
        height: h,
        transform: `rotate(${POSES[n - 1].rot}deg)`,
      }}
    >
      <Avatar
        expresion={POSES[n - 1].expresion}
        style={{ height: "100%", filter: `${sticker} drop-shadow(0 24px 40px rgba(0,0,0,.6))` }}
      />
      <span
        style={{
          position: "absolute",
          top: -40,
          right: -20,
          fontFamily: M.fTitle,
          fontWeight: 700,
          fontSize: h * 0.26,
          color: POSES[n - 1].color,
          WebkitTextStroke: `6px ${M.bg}`,
          paintOrder: "stroke fill",
        }}
      >
        {POSES[n - 1].acento}
      </span>
    </div>
    <AbsoluteFill style={{ padding: "72px 72px 64px", flexDirection: "column", gap: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Wordmark size={34} />
        <span style={{ fontFamily: M.fMono, fontWeight: 700, fontSize: 30, color: M.primary }}>
          {n}/{N_SLIDES}
        </span>
      </div>
      <div style={{ fontFamily: M.fTitle, fontWeight: 700, fontSize: 84, lineHeight: 1.02, letterSpacing: -2, color: M.text, marginTop: 24 }}>
        {title}
      </div>
      {sub ? <div style={{ fontFamily: M.fMono, fontWeight: 500, fontSize: 34, color: M.text, opacity: 0.85, maxWidth: 820 }}>{sub}</div> : null}
      <div style={{ flex: 1, position: "relative" }}>{children}</div>
      <span style={{ fontFamily: M.fMono, fontWeight: 700, fontSize: 30, color: M.primary }}>{foot}</span>
    </AbsoluteFill>
  </AbsoluteFill>
);

const hl = (t: string, c: string = M.highlight) => <span style={{ color: c }}>{t}</span>;

export const CarruselIAArquitectura: React.FC = () => (
  <Series>
    <Series.Sequence durationInFrames={SLIDE}>
      <Slide n={1} h={640} title={<>¿Tu IA está construyendo un {hl("Frankenstein", M.alert)}?</>} sub="Funciona hoy. No escala mañana." />
    </Series.Sequence>
    <Series.Sequence durationInFrames={SLIDE}>
      <Slide n={2} title={<>La IA ya escribe {hl("buen código")}</>} sub="…pero en cada feature nueva arranca sin el contexto de lo que ya construiste.">
        <div style={{ transform: "scale(.62)", transformOrigin: "top left", marginTop: 10 }}>{sinContexto}</div>
      </Slide>
    </Series.Sequence>
    <Series.Sequence durationInFrames={SLIDE}>
      <Slide n={3} title={<>Prompt tras prompt, {hl("sin arquitectura")}</>}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-start", marginTop: 10 }}>
          <div style={{ transform: "scale(.7)", transformOrigin: "left center", marginBottom: -30 }}>
            <KeyWord text="PROMPT ×4" color={M.primary} />
          </div>
          <Verdict ok label="Funciona" />
          <Verdict ok={false} label="No escala" />
          <Verdict ok={false} label="Frankenstein" />
        </div>
      </Slide>
    </Series.Sequence>
    <Series.Sequence durationInFrames={SLIDE}>
      <Slide n={4} title={<>Trátala como a un {hl("junior")} nuevo</>} sub="Antes de la primera tarea le explicas cómo se trabaja y qué arquitectura usan.">
        <div style={{ display: "flex", flexDirection: "column", gap: 18, width: 540, marginTop: 10 }}>
          <NumberedCard n={1} label="Clean Architecture" />
          <NumberedCard n={2} label="CQRS" />
          <NumberedCard n={3} label="DDD" />
        </div>
      </Slide>
    </Series.Sequence>
    <Series.Sequence durationInFrames={SLIDE}>
      <Slide n={5} h={380} title={<>Escríbelo en tu {hl("CLAUDE.md")}</>} foot="@oalonzodev">
        <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 6 }}>
          <CodeBlock
            title="CLAUDE.md"
            width={600}
            lines={[
              { text: "# Arquitectura", at: 0 },
              { text: "Domain/      → modelos", at: 0 },
              { text: "Application/ → negocio", at: 0 },
              { text: "Commands/    → escritura", at: 0 },
              { text: "Queries/     → lectura", at: 0 },
            ]}
          />
          <div style={{ fontFamily: M.fTitle, fontWeight: 700, fontSize: 52, color: M.text, maxWidth: 560, lineHeight: 1.1 }}>
            Comenta {hl("SDD")} y te lo explico. Guarda este post.
          </div>
        </div>
      </Slide>
    </Series.Sequence>
  </Series>
);
