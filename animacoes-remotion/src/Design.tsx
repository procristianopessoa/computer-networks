import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const colors = {
  bg: "#071d2b",
  panel: "#102f40",
  line: "#315361",
  green: "#31c46b",
  cyan: "#46d6df",
  amber: "#ffd166",
  white: "#f1f8f6",
  muted: "#abc2ca",
};
export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
export const Frame: React.FC<{
  number: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}> = ({ number, title, subtitle, children }) => {
  const f = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        color: colors.white,
        fontFamily: "Segoe UI, Arial, sans-serif",
        padding: 80,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 20%, #145147 0%, transparent 48%)",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 23,
          letterSpacing: 4,
          color: colors.green,
          fontWeight: 700,
        }}
      >
        <span>IFSP / REDES DE COMPUTADORES</span>
        <span>AULA {number}</span>
      </div>
      <div
        style={{
          position: "relative",
          opacity: interpolate(f, [0, fps * 0.7], [0, 1], clamp),
          translate: `0 ${interpolate(f, [0, fps * 0.7], [20, 0], clamp)}px`,
        }}
      >
        <h1
          style={{
            fontSize: 66,
            lineHeight: 1.12,
            letterSpacing: -2,
            margin: "34px 0 16px",
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: 30, color: colors.muted, margin: 0 }}>
          {subtitle}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 300,
          bottom: 150,
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          bottom: 65,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: colors.muted,
        }}
      >
        <span>Observe o movimento. Relacione as etapas.</span>
        <span>{String(Math.floor(f / fps)).padStart(2, "0")} s</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 7,
          background: colors.green,
          width: `${(100 * f) / (durationInFrames - 1)}%`,
        }}
      />
    </AbsoluteFill>
  );
};
export const Caption: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "20px 30px",
      borderLeft: `5px solid ${colors.green}`,
      background: colors.panel,
      fontSize: 32,
      lineHeight: 1.35,
    }}
  >
    {children}
  </div>
);
