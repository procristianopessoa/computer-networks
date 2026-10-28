import { useCurrentFrame, useVideoConfig } from "remotion";
import { Frame, Caption, colors } from "./Design";
export const Signals = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const bits = [1, 0, 1, 1, 0];
  const shift = (t * 95) % 1050;
  const wave = Array.from(
    { length: 526 },
    (_, i) =>
      `${i === 0 ? "M" : "L"} ${i * 2} ${Math.sin((i * 2 * Math.PI) / 35) * (bits[Math.min(4, Math.floor((i * 2) / 210))] ? 27 : -27)}`,
  ).join(" ");
  return (
    <Frame
      number="04"
      title="O mesmo dado, três meios"
      subtitle="10110 · Exemplos didáticos de codificação, sem escala física."
    >
      <svg viewBox="0 0 1760 480" width="1760" height="480">
        <text x="0" y="60" fontSize="32" fill={colors.amber}>
          COBRE
        </text>
        <text x="0" y="95" fontSize="23" fill={colors.muted}>
          Variação elétrica
        </text>
        <text x="0" y="215" fontSize="32" fill={colors.green}>
          FIBRA
        </text>
        <text x="0" y="250" fontSize="23" fill={colors.muted}>
          Pulsos luminosos
        </text>
        <text x="0" y="370" fontSize="32" fill={colors.cyan}>
          RÁDIO
        </text>
        <text x="0" y="405" fontSize="23" fill={colors.muted}>
          Modulação por fase
        </text>
        {[70, 225, 380].map((y) => (
          <line
            key={y}
            x1="350"
            y1={y}
            x2="1610"
            y2={y}
            stroke={colors.line}
            strokeWidth="2"
          />
        ))}
        {bits.map((b, i) => (
          <g key={i}>
            <text x={420 + i * 210} y="25" fontSize="27" fill={colors.white}>
              {b}
            </text>
            <path
              d={`M ${350 + i * 210} ${b ? 40 : 100} h 200`}
              fill="none"
              stroke={colors.amber}
              strokeWidth="6"
            />
            <line
              x1={550 + i * 210}
              y1={b ? 40 : 100}
              x2={560 + i * 210}
              y2={bits[i + 1] ? 40 : 100}
              stroke={colors.amber}
              strokeWidth={i === 4 ? 0 : 4}
            />
            <rect
              x={365 + i * 210}
              y="210"
              width="170"
              height="30"
              rx="15"
              fill={b ? colors.green : colors.panel}
              opacity={b ? 0.9 : 0.7}
            />
          </g>
        ))}
        <g transform="translate(350 380)">
          <path d={wave} fill="none" stroke={colors.cyan} strokeWidth="4" />
        </g>
        <line
          x1={350 + shift}
          x2={350 + shift}
          y1="0"
          y2="435"
          stroke={colors.white}
          strokeWidth="2"
          strokeDasharray="8 8"
        />
        <text
          x={350 + shift}
          y="470"
          textAnchor="middle"
          fill={colors.white}
          fontSize="24"
        >
          bit {bits[Math.min(4, Math.floor(shift / 210))]}
        </text>
        <text
          x="1660"
          y="82"
          textAnchor="middle"
          fontSize="25"
          fill={colors.amber}
        >
          V
        </text>
        <text
          x="1660"
          y="237"
          textAnchor="middle"
          fontSize="25"
          fill={colors.green}
        >
          LUZ
        </text>
        <text
          x="1660"
          y="392"
          textAnchor="middle"
          fontSize="25"
          fill={colors.cyan}
        >
          RF
        </text>
      </svg>
      <Caption>
        {t < 8
          ? "Bits são informação abstrata. O transmissor os representa por grandezas físicas."
          : t < 17
            ? "O receptor interpreta variações elétricas, luz ou ondas de rádio e recupera os dados."
            : "Alcance, atenuação, interferência e mobilidade orientam a escolha do meio."}
      </Caption>
    </Frame>
  );
};
