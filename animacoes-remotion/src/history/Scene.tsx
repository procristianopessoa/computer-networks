import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, clamp } from "../Design";
type Props = {
  chapter: number;
  era: string;
  title: string;
  lead: string;
  points: [string, string, string];
  takeaway: string;
  source: string;
  children: React.ReactNode;
};
export const Scene: React.FC<Props> = ({
  chapter,
  era,
  title,
  lead,
  points,
  takeaway,
  source,
  children,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        color: colors.white,
        fontFamily: "Segoe UI,Arial,sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 85% 25%,#124b43,transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 85,
          right: 85,
          top: 62,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          letterSpacing: 3,
          color: colors.green,
          fontWeight: 700,
        }}
      >
        <span>IFSP / REDES DE COMPUTADORES</span>
        <span>AULA 01 · {chapter}/9</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 85,
          top: 132,
          fontSize: 24,
          color: colors.amber,
          letterSpacing: 3,
        }}
      >
        {era}
      </div>
      <h1
        style={{
          position: "absolute",
          left: 85,
          top: 167,
          margin: 0,
          fontSize: 64,
          letterSpacing: -2,
          lineHeight: 1.1,
          opacity: interpolate(f, [0, 0.65 * fps], [0, 1], clamp),
        }}
      >
        {title}
      </h1>
      <p
        style={{
          position: "absolute",
          left: 85,
          top: 245,
          right: 85,
          margin: 0,
          fontSize: 30,
          color: colors.muted,
        }}
      >
        {lead}
      </p>
      <div
        style={{
          position: "absolute",
          left: 85,
          top: 350,
          width: 1015,
          height: 440,
          background: "#0c2935",
          border: `1px solid ${colors.line}`,
          borderRadius: 28,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
      <div style={{ position: "absolute", left: 1160, right: 85, top: 350 }}>
        {points.map((p, i) => (
          <div
            key={p}
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 30,
              opacity: interpolate(
                f,
                [(1 + i * 3) * fps, (2 + i * 3) * fps],
                [0, 1],
                clamp,
              ),
              translate: `${interpolate(f, [(1 + i * 3) * fps, (2 + i * 3) * fps], [25, 0], clamp)}px 0`,
            }}
          >
            <span
              style={{
                fontSize: 24,
                color: colors.green,
                fontWeight: 700,
                paddingTop: 5,
              }}
            >
              0{i + 1}
            </span>
            <p style={{ fontSize: 31, lineHeight: 1.4, margin: 0 }}>{p}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 85,
          right: 85,
          top: 835,
          padding: "20px 28px",
          borderLeft: `5px solid ${colors.green}`,
          background: colors.panel,
          fontSize: 30,
          lineHeight: 1.4,
          opacity: interpolate(f, [9 * fps, 10 * fps], [0, 1], clamp),
        }}
      >
        {takeaway}
      </div>
      <div
        style={{
          position: "absolute",
          left: 85,
          right: 85,
          bottom: 46,
          fontSize: 20,
          color: colors.muted,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{source}</span>
        <span>Histórias sobrepostas · esquema didático</span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 6,
          background: colors.green,
          width: `${(100 * ((chapter - 1) * 18 + f / fps)) / 162}%`,
        }}
      />
    </AbsoluteFill>
  );
};
export const Box: React.FC<{
  x: number;
  y: number;
  w?: number;
  label: string;
  detail?: string;
  accent?: string;
  delay?: number;
}> = ({ x, y, w = 220, label, detail, accent = colors.green, delay = 0 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        padding: "22px 18px",
        borderRadius: 18,
        border: `2px solid ${accent}`,
        background: colors.bg,
        textAlign: "center",
        opacity: interpolate(
          f,
          [delay * fps, (delay + 0.8) * fps],
          [0, 1],
          clamp,
        ),
        translate: `0 ${interpolate(f, [delay * fps, (delay + 0.8) * fps], [15, 0], clamp)}px`,
      }}
    >
      <strong style={{ fontSize: 30, color: accent, display: "block" }}>
        {label}
      </strong>
      {detail && (
        <span
          style={{
            display: "block",
            fontSize: 23,
            color: colors.muted,
            marginTop: 8,
          }}
        >
          {detail}
        </span>
      )}
    </div>
  );
};
export const Links: React.FC<{
  edges: [number, number, number, number][];
  color?: string;
}> = ({ edges, color = colors.green }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <svg width="1015" height="440" style={{ position: "absolute", inset: 0 }}>
      {edges.map(([x1, y1, x2, y2], i) => {
        const p = ((f / fps) * 0.19 + i * 0.13) % 1;
        return (
          <g
            key={i}
            opacity={interpolate(f, [0.5 * fps, 2 * fps], [0, 1], clamp)}
          >
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={colors.line}
              strokeWidth="4"
            />
            <circle
              cx={x1 + (x2 - x1) * p}
              cy={y1 + (y2 - y1) * p}
              r="7"
              fill={color}
            />
          </g>
        );
      })}
    </svg>
  );
};
