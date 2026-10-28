// Generado desde ~/.claude/marca/marca.md — si cambia la marca, regenerar este archivo.
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const grotesk = loadGrotesk("normal", { weights: ["700"] });
const mono = loadMono("normal", { weights: ["500", "700"] });

export const M = {
  bg: "#0A0E14",
  surface: "#121A24",
  text: "#F2F5F7",
  primary: "#22D3EE",
  highlight: "#FBBF24",
  alert: "#FF5D5D",
  ok: "#34D399",
  paper: "#F4EFE6",
  fTitle: grotesk.fontFamily,
  fMono: mono.fontFamily,
  // safe zones 1080x1920
  top: 290,
  bottom: 390,
  side: 64,
  right: 140,
} as const;

// Wordmark con cursor parpadeante
export const Wordmark: React.FC<{ size?: number; opacity?: number }> = ({
  size = 38,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const blink = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;
  return (
    <div
      style={{
        fontFamily: M.fMono,
        fontWeight: 700,
        fontSize: size,
        color: M.text,
        opacity,
        letterSpacing: -1,
        textShadow: "0 2px 10px rgba(0,0,0,.6)",
      }}
    >
      oalonzo<span style={{ color: M.primary }}>.dev</span>
      <span style={{ color: M.primary, opacity: blink }}>_</span>
    </div>
  );
};

// Hook: texto grande con pop desde el frame 0
export const Hook: React.FC<{ text: string; accent?: string }> = ({
  text,
  accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 14, stiffness: 180 } });
  const parts = accent ? text.split(accent) : [text];
  return (
    <div
      style={{
        fontFamily: M.fTitle,
        fontWeight: 700,
        fontSize: 108,
        lineHeight: 1.02,
        color: M.text,
        textAlign: "left",
        transform: `scale(${interpolate(pop, [0, 1], [0.92, 1])})`,
        transformOrigin: "left center",
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateRight: "clamp",
        }),
      }}
    >
      {parts[0]}
      {accent ? <span style={{ color: M.highlight }}>{accent}</span> : null}
      {parts[1]}
    </div>
  );
};

// Subtítulo de marca: 2-4 palabras, activa en primario, clave en resaltado
export const Caption: React.FC<{
  words: string[];
  active: number;
  keyIndex?: number;
}> = ({ words, active, keyIndex }) => (
  <div
    style={{
      fontFamily: M.fMono,
      fontWeight: 700,
      fontSize: 64,
      display: "flex",
      gap: 18,
      justifyContent: "center",
      flexWrap: "wrap",
      textAlign: "center",
      WebkitTextStroke: `6px ${M.bg}`,
      paintOrder: "stroke fill",
      textShadow: "0 6px 18px rgba(0,0,0,.45)",
    }}
  >
    {words.map((w, i) => (
      <span
        key={i}
        style={{
          color:
            i === keyIndex ? M.highlight : i === active ? M.primary : M.text,
          textTransform: i === keyIndex ? "uppercase" : "none",
        }}
      >
        {w}
      </span>
    ))}
  </div>
);

export const LowerThird: React.FC<{ name: string; role: string }> = ({
  name,
  role,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        transform: `translateY(${interpolate(inn, [0, 1], [24, 0])}px)`,
        opacity: inn,
        background: M.surface,
        border: `2px solid ${M.primary}`,
        borderRadius: 14,
        padding: "16px 26px",
        display: "inline-flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <span
        style={{ fontFamily: M.fTitle, fontWeight: 700, fontSize: 40, color: M.text }}
      >
        {name}
      </span>
      <span style={{ fontFamily: M.fMono, fontWeight: 500, fontSize: 26, color: M.primary }}>
        {role}
      </span>
    </div>
  );
};

// Tarjeta "papel sobre terminal": 1 concepto = 1 tarjeta
export const PaperCard: React.FC<{
  title: string;
  children?: React.ReactNode;
  width?: number;
  height?: number;
}> = ({ title, children, width = 840, height = 560 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 16, stiffness: 160 } });
  return (
    <div
      style={{
        width,
        height,
        background: M.paper,
        borderRadius: 22,
        boxShadow: "0 28px 60px rgba(0,0,0,.55)",
        transform: `rotate(${interpolate(inn, [0, 1], [-2, 0])}deg) scale(${interpolate(inn, [0, 1], [0.92, 1])})`,
        opacity: inn,
        padding: 36,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        color: "#16130E",
      }}
    >
      <div style={{ fontFamily: M.fTitle, fontWeight: 700, fontSize: 44 }}>
        {title}
      </div>
      <div style={{ flex: 1, position: "relative" }}>{children}</div>
    </div>
  );
};

// Tarjeta numerada 01 / 02 / 03
export const NumberedCard: React.FC<{ n: number; label: string }> = ({
  n,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 14, stiffness: 180 } });
  return (
    <div
      style={{
        background: M.surface,
        border: `2px solid ${M.primary}`,
        borderRadius: 18,
        padding: "20px 30px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        transform: `translateX(${interpolate(inn, [0, 1], [-60, 0])}px)`,
        opacity: inn,
      }}
    >
      <span style={{ fontFamily: M.fMono, fontWeight: 700, fontSize: 64, color: M.highlight }}>
        {String(n).padStart(2, "0")}
      </span>
      <span style={{ fontFamily: M.fTitle, fontWeight: 700, fontSize: 48, color: M.text }}>
        {label}
      </span>
    </div>
  );
};

// Fondo base de marca
export const Fondo: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: M.bg }}>{children}</AbsoluteFill>
);

// Palabra gigante con pop; `strike` la tacha (ej. el anti-patrón que ya no tendrás)
export const KeyWord: React.FC<{
  text: string;
  sub?: string;
  color?: string;
  strike?: boolean;
}> = ({ text, sub, color = M.highlight, strike }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 14, stiffness: 180 } });
  const line = strike ? spring({ frame: frame - 12, fps, config: { damping: 200 } }) : 0;
  return (
    <div style={{ textAlign: "center", transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])})`, opacity: pop }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <span
          style={{
            fontFamily: M.fTitle,
            fontWeight: 700,
            fontSize: 132,
            letterSpacing: -3,
            color,
            WebkitTextStroke: `8px ${M.bg}`,
            paintOrder: "stroke fill",
          }}
        >
          {text}
        </span>
        {strike ? (
          <div
            style={{
              position: "absolute",
              left: -10,
              top: "52%",
              height: 14,
              borderRadius: 7,
              width: `${line * 104}%`,
              background: M.alert,
            }}
          />
        ) : null}
      </div>
      {sub ? (
        <div style={{ fontFamily: M.fMono, fontWeight: 700, fontSize: 44, color: M.text, marginTop: 6 }}>{sub}</div>
      ) : null}
    </div>
  );
};

// Bloque de código: cada línea entra (con click) en su frame `at`, la última activa en resaltado
export const CodeBlock: React.FC<{
  title: string;
  lines: { text: string; at: number }[];
  width?: number;
}> = ({ title, lines, width = 900 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 200 } });
  const shown = lines.filter((l) => frame >= l.at);
  return (
    <div
      style={{
        width,
        background: M.surface,
        border: `2px solid ${M.primary}`,
        borderRadius: 18,
        padding: "22px 30px",
        boxShadow: "0 28px 60px rgba(0,0,0,.55)",
        transform: `translateY(${interpolate(inn, [0, 1], [24, 0])}px)`,
        opacity: inn,
        fontFamily: M.fMono,
        fontWeight: 500,
        fontSize: 36,
        lineHeight: 1.5,
      }}
    >
      <div style={{ color: M.primary, fontWeight: 700, marginBottom: 8 }}>{title}</div>
      {shown.map((l, i) => {
        // escrito letra a letra en 8 frames
        const chars = Math.ceil(interpolate(frame - l.at, [0, 8], [0, l.text.length], { extrapolateRight: "clamp" }));
        return (
          <div key={i} style={{ color: i === shown.length - 1 ? M.highlight : M.text, whiteSpace: "pre" }}>
            {l.text.slice(0, chars)}
          </div>
        );
      })}
    </div>
  );
};

// Veredicto: buena práctica (ok) o anti-patrón (alerta)
export const Verdict: React.FC<{ ok: boolean; label: string }> = ({ ok, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 14, stiffness: 180 } });
  const c = ok ? M.ok : M.alert;
  return (
    <div
      style={{
        background: M.surface,
        border: `3px solid ${c}`,
        borderRadius: 18,
        padding: "18px 30px",
        display: "flex",
        alignItems: "center",
        gap: 22,
        transform: `scale(${interpolate(inn, [0, 1], [0.85, 1])})`,
        opacity: inn,
      }}
    >
      <span style={{ fontFamily: M.fMono, fontWeight: 700, fontSize: 60, color: c }}>{ok ? "✓" : "✗"}</span>
      <span style={{ fontFamily: M.fTitle, fontWeight: 700, fontSize: 52, color: M.text }}>{label}</span>
    </div>
  );
};

// Outro: "Escribe PALABRA y te lo explico" + handle
export const Outro: React.FC<{ word: string; handle: string }> = ({ word, handle }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
    <KeyWord text={word} sub="escríbelo en comentarios" />
    <div style={{ fontFamily: M.fMono, fontWeight: 700, fontSize: 40, color: M.primary }}>{handle}</div>
  </div>
);
