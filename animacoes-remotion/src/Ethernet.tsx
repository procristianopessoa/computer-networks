import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Frame, Caption, colors, clamp } from "./Design";
export const Ethernet = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const stage = Math.min(2, Math.floor(t / 20));
  const p = (t % 6) / 6;
  return (
    <Frame
      number="05"
      title={
        stage === 0
          ? "Ethernet: uma família de padrões"
          : stage === 1
            ? "O enlace conecta as interfaces"
            : "A taxa do enlace não é a da aplicação"
      }
      subtitle={
        stage === 0
          ? "IEEE 802.3 · MAC e diferentes camadas físicas."
          : stage === 1
            ? "Cada porta forma um enlace ponto a ponto com seu vizinho."
            : "Capacidade, caminho, sobrecarga e serviço precisam ser distinguidos."
      }
    >
      {stage === 0 ? (
        <>
          {["100BASE-TX", "1000BASE-T", "10GBASE-SR"].map((name, i) => (
            <div
              key={name}
              style={{
                position: "absolute",
                left: i * 590,
                top: 50,
                width: 550,
                padding: 35,
                border: `2px solid ${i === 1 ? colors.green : colors.line}`,
                borderRadius: 24,
                background: colors.panel,
                opacity: interpolate(
                  f,
                  [i * 2 * fps, (i * 2 + 1) * fps],
                  [0, 1],
                  clamp,
                ),
              }}
            >
              <h2 style={{ fontSize: 45, margin: "0 0 25px" }}>{name}</h2>
              <p style={{ fontSize: 30, color: colors.muted, lineHeight: 1.5 }}>
                {i === 0
                  ? "100 Mb/s · cobre"
                  : i === 1
                    ? "1 Gb/s · cobre"
                    : "10 Gb/s · fibra multimodo"}
              </p>
              <div style={{ fontSize: 28, color: colors.green }}>
                Mesma família Ethernet
              </div>
            </div>
          ))}
          <div
            style={{
              position: "absolute",
              top: 350,
              fontSize: 30,
              color: colors.muted,
            }}
          >
            A compatibilidade depende do PHY, do meio, da distância e das duas
            pontas.
          </div>
        </>
      ) : stage === 1 ? (
        <svg width="1760" height="470" viewBox="0 0 1760 470">
          <line
            x1="330"
            y1="210"
            x2="820"
            y2="210"
            stroke={colors.line}
            strokeWidth="7"
          />
          <line
            x1="940"
            y1="210"
            x2="1420"
            y2="210"
            stroke={colors.line}
            strokeWidth="7"
          />
          {[
            { x: 80, label: "HOST A", sub: "Interface Ethernet" },
            { x: 730, label: "SWITCH", sub: "Portas de acesso" },
            { x: 1360, label: "SERVIDOR", sub: "Interface Ethernet" },
          ].map((n) => (
            <g key={n.label}>
              <rect
                x={n.x}
                y="130"
                width="320"
                height="160"
                rx="24"
                fill={colors.panel}
                stroke={colors.green}
                strokeWidth="3"
              />
              <text
                x={n.x + 160}
                y="190"
                textAnchor="middle"
                fill={colors.white}
                fontSize="35"
              >
                {n.label}
              </text>
              <text
                x={n.x + 160}
                y="240"
                textAnchor="middle"
                fill={colors.muted}
                fontSize="25"
              >
                {n.sub}
              </text>
            </g>
          ))}
          <rect
            x={400 + p * 950}
            y="190"
            width="85"
            height="40"
            rx="10"
            fill={colors.cyan}
          />
          <text
            x="880"
            y="365"
            textAnchor="middle"
            fontSize="32"
            fill={colors.white}
          >
            Dados da aplicação → quadro Ethernet → sinais físicos
          </text>
        </svg>
      ) : (
        <>
          <div style={{ position: "absolute", left: 60, top: 55, width: 1600 }}>
            {[
              {
                label: "Enlace host–switch",
                w: 1500,
                rate: "1 Gb/s",
                color: colors.green,
              },
              {
                label: "Enlace seguinte",
                w: 520,
                rate: "100 Mb/s",
                color: colors.amber,
              },
              {
                label: "Dados úteis da aplicação",
                w: 430,
                rate: "menor que o limite do caminho",
                color: colors.cyan,
              },
            ].map((row) => (
              <div key={row.label} style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 29, marginBottom: 10 }}>
                  {row.label}
                </div>
                <div
                  style={{
                    width: row.w,
                    height: 55,
                    borderRadius: 10,
                    background: row.color,
                    color: colors.bg,
                    padding: "10px 20px",
                    fontSize: 25,
                    fontWeight: 700,
                  }}
                >
                  {row.rate}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <Caption>
        {stage === 0
          ? "O nome Ethernet não descreve um único cabo ou uma única taxa."
          : stage === 1
            ? "Link ativo confirma conectividade física entre vizinhos; não garante acesso a serviços ou à Internet."
            : "As barras são ilustrativas. Um gargalo de 100 Mb/s limita esse caminho mesmo com acesso local de 1 Gb/s."}
      </Caption>
    </Frame>
  );
};
