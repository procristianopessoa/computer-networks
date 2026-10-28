import { useCurrentFrame, useVideoConfig } from "remotion";
import { Frame, Caption, colors } from "./Design";
export const Switching = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const stage = Math.min(2, Math.floor(t / 20));
  const p = (t % 5) / 5;
  return (
    <Frame
      number="07"
      title={
        stage === 0
          ? "Aprender pela origem"
          : stage === 1
            ? "Destino desconhecido: flooding"
            : "Destino conhecido: porta específica"
      }
      subtitle="Aprendizagem MAC e encaminhamento dentro da mesma VLAN."
    >
      <svg width="1050" height="440" viewBox="0 0 1050 440">
        <line
          x1="210"
          y1="220"
          x2="520"
          y2="220"
          stroke={colors.line}
          strokeWidth="6"
        />
        <line
          x1="620"
          y1="200"
          x2="890"
          y2="85"
          stroke={colors.line}
          strokeWidth="6"
        />
        <line
          x1="620"
          y1="240"
          x2="890"
          y2="350"
          stroke={colors.line}
          strokeWidth="6"
        />
        {[
          { x: 40, y: 155, name: "HOST A", sub: "MAC A · porta 1" },
          { x: 450, y: 150, name: "SWITCH", sub: "VLAN 10" },
          { x: 820, y: 30, name: "HOST B", sub: "MAC B · porta 2" },
          { x: 820, y: 290, name: "HOST C", sub: "MAC C · porta 3" },
        ].map((n) => (
          <g key={n.name}>
            <rect
              x={n.x}
              y={n.y}
              width="210"
              height="125"
              rx="20"
              fill={colors.panel}
              stroke={colors.green}
              strokeWidth="2"
            />
            <text
              x={n.x + 105}
              y={n.y + 48}
              textAnchor="middle"
              fill={colors.white}
              fontSize="28"
            >
              {n.name}
            </text>
            <text
              x={n.x + 105}
              y={n.y + 88}
              textAnchor="middle"
              fill={colors.muted}
              fontSize="20"
            >
              {n.sub}
            </text>
          </g>
        ))}
        {stage === 0 ? (
          <circle cx={260 + p * 200} cy="220" r="17" fill={colors.green} />
        ) : (
          <>
            <circle
              cx={660 + p * 150}
              cy={190 - p * 65}
              r="17"
              fill={colors.cyan}
            />
            {stage === 1 && (
              <circle
                cx={660 + p * 150}
                cy={250 + p * 80}
                r="17"
                fill={colors.cyan}
              />
            )}
          </>
        )}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 1150,
          right: 10,
          top: 70,
          padding: 30,
          background: colors.panel,
          borderRadius: 20,
        }}
      >
        <h2 style={{ fontSize: 36, margin: "0 0 30px" }}>Tabela MAC</h2>
        <div style={{ fontSize: 29, lineHeight: 1.9 }}>
          MAC A → porta 1<br />
          {stage === 2 ? "MAC B → porta 2" : "MAC B → desconhecido"}
          <br />
          VLAN 10
        </div>
      </div>
      <Caption>
        {stage === 0
          ? "Ao receber o quadro de A, o switch aprende o MAC de origem A associado à porta de entrada."
          : stage === 1
            ? "Sem uma entrada para B, encaminha às demais portas elegíveis da mesma VLAN; não devolve pela entrada."
            : "Após uma resposta de B, sua origem é aprendida. Novos quadros unicast para B seguem pela porta 2."}
      </Caption>
    </Frame>
  );
};
