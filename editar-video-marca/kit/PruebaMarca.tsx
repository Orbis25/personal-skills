import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  Caption,
  Fondo,
  Hook,
  LowerThird,
  M,
  NumberedCard,
  PaperCard,
  Wordmark,
} from "./marca";

// Composición de prueba de la marca: hook + subtítulo + lower third + tarjetas.
export const DURACION_PRUEBA_MARCA = 150;

export const PruebaMarca: React.FC = () => (
  <Fondo>
    {/* Hook */}
    <Sequence from={0} durationInFrames={150}>
      <AbsoluteFill style={{ padding: `${M.top}px ${M.right}px 0 ${M.side}px` }}>
        <Wordmark />
        <div style={{ height: 40 }} />
        <Hook text="¿Tu API le cobra dos veces al usuario?" accent="dos veces" />
      </AbsoluteFill>
    </Sequence>

    {/* Tarjeta papel (concepto) */}
    <Sequence from={30} durationInFrames={60}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 20 }}>
        <PaperCard title="Idempotencia" height={440}>
          <svg viewBox="0 0 760 360" width="100%" height="100%">
            <g fill="none" stroke="#16130E" strokeWidth="5" strokeLinecap="round">
              <rect x="30" y="130" width="150" height="100" rx="12" />
              <rect x="580" y="130" width="150" height="100" rx="12" />
              <path d="M180 160 C300 110, 440 110, 580 160" />
              <path d="M180 200 C300 250, 440 250, 580 200" />
              <path d="M560 150 L580 160 L556 174" />
            </g>
            <text x="105" y="188" textAnchor="middle" fontSize="28" fontFamily="JetBrains Mono" fill="#16130E">POST</text>
            <text x="655" y="188" textAnchor="middle" fontSize="28" fontFamily="JetBrains Mono" fill="#16130E">DB</text>
            <text x="380" y="300" textAnchor="middle" fontSize="34" fontFamily="JetBrains Mono" fill="#16130E">1 o 100 veces = mismo resultado</text>
          </svg>
        </PaperCard>
      </AbsoluteFill>
    </Sequence>

    {/* Lower third */}
    <Sequence from={45} durationInFrames={75}>
      <AbsoluteFill style={{ justifyContent: "flex-end", padding: `0 0 ${M.bottom + 130}px ${M.side}px` }}>
        <div><LowerThird name="Alonzo" role="Software Engineer" /></div>
      </AbsoluteFill>
    </Sequence>

    {/* Enumeración */}
    <Sequence from={90} durationInFrames={60}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${M.right}px 0 ${M.side}px`, top: 20 }}>
        <NumberedCard n={1} label="Testeable" />
      </AbsoluteFill>
    </Sequence>

    {/* Subtítulo */}
    <Sequence from={30} durationInFrames={120}>
      <AbsoluteFill style={{ justifyContent: "flex-end", padding: `0 ${M.right}px ${M.bottom}px ${M.side}px` }}>
        <Caption words={["implementa", "idempotencia"]} active={0} keyIndex={1} />
      </AbsoluteFill>
    </Sequence>

  </Fondo>
);
