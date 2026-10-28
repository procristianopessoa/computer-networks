import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Frame, Caption, colors, clamp } from "./Design";
export const Networks = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const nodes = [
    { x: 160, y: 90, label: "Notebook" },
    { x: 160, y: 330, label: "Servidor" },
    { x: 520, y: 210, label: "Switch A" },
    { x: 790, y: 210, label: "Roteador A" },
    { x: 1150, y: 210, label: "Roteador B" },
    { x: 1420, y: 210, label: "Switch B" },
    { x: 1660, y: 90, label: "Estação" },
    { x: 1660, y: 330, label: "Impressora" },
  ];
  const edges = [
    [0, 2],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [5, 7],
  ];
  const route = [nodes[0], nodes[2], nodes[3], nodes[4], nodes[5], nodes[6]];
  const p = Math.max(0, ((t - 12) % 8) / 8) * (route.length - 1);
  const step = Math.min(4, Math.floor(p));
  const mix = p - step;
  const packet = {
    x: route[step].x + (route[step + 1].x - route[step].x) * mix,
    y: route[step].y + (route[step + 1].y - route[step].y) * mix,
  };
  return (
    <Frame
      number="02"
      title="Duas LANs, uma comunicação"
      subtitle="Switches conectam hosts. Roteadores interligam redes."
    >
      <svg
        width="1760"
        height="460"
        viewBox="0 0 1760 460"
        style={{ overflow: "visible" }}
      >
        <rect
          x="20"
          y="10"
          width="610"
          height="400"
          rx="32"
          fill={colors.panel}
        />
        <rect
          x="1320"
          y="10"
          width="430"
          height="400"
          rx="32"
          fill={colors.panel}
        />
        <text x="50" y="450" fill={colors.green} fontSize="26">
          LAN A
        </text>
        <text x="1370" y="450" fill={colors.cyan} fontSize="26">
          LAN B
        </text>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={i === 3 ? colors.amber : colors.line}
            strokeWidth="5"
            opacity={interpolate(
              f,
              [(i * 0.8 + 1) * fps, (i * 0.8 + 2) * fps],
              [0, 1],
              clamp,
            )}
            strokeDasharray={i === 3 ? "12 10" : undefined}
          />
        ))}
        {nodes.map((n, i) => (
          <g
            key={n.label}
            opacity={interpolate(
              f,
              [i * 0.6 * fps, (i * 0.6 + 1) * fps],
              [0, 1],
              clamp,
            )}
          >
            <rect
              x={n.x - 63}
              y={n.y - 42}
              width="126"
              height="84"
              rx="18"
              fill={colors.bg}
              stroke={i === 3 || i === 4 ? colors.amber : colors.green}
              strokeWidth="3"
            />
            <text
              x={n.x}
              y={n.y + 10}
              textAnchor="middle"
              fill={colors.white}
              fontSize="30"
            >
              {i === 3 || i === 4 ? "↔" : i === 2 || i === 5 ? "⇄" : "▣"}
            </text>
            <text
              x={n.x}
              y={n.y + 78}
              fill={colors.white}
              textAnchor="middle"
              fontSize="24"
            >
              {n.label}
            </text>
          </g>
        ))}
        <text
          x="970"
          y="160"
          fill={colors.amber}
          textAnchor="middle"
          fontSize="30"
        >
          WAN
        </text>
        {t >= 12 && (
          <g>
            <circle cx={packet.x} cy={packet.y} r="14" fill={colors.green} />
            <circle
              cx={packet.x}
              cy={packet.y}
              r="25"
              fill="none"
              stroke={colors.green}
              strokeWidth="2"
            />
          </g>
        )}
      </svg>
      <Caption>
        {t < 7
          ? "Cada host se liga ao switch: topologia física em estrela."
          : t < 12
            ? "Roteadores conectam as duas redes através de um enlace WAN."
            : "Os dados atravessam enlaces e dispositivos até chegar ao destino. O desenho é esquemático."}
      </Caption>
    </Frame>
  );
};
