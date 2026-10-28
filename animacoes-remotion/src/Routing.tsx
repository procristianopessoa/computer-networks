import { useCurrentFrame, useVideoConfig } from "remotion";
import { Frame, Caption, colors } from "./Design";
export const Routing = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const stage = Math.min(2, Math.floor(t / 20));
  const p = (t % 8) / 8;
  return (
    <Frame
      number="11"
      title={
        stage === 0
          ? "O destino está em outra sub-rede"
          : stage === 1
            ? "O gateway encaminha por uma rota"
            : "A resposta também precisa de caminho"
      }
      subtitle="VLAN 10 → função L3 → VLAN 20 · exemplo sem NAT."
    >
      <svg width="1760" height="400" viewBox="0 0 1760 400">
        <line
          x1="380"
          y1="200"
          x2="770"
          y2="200"
          stroke={colors.green}
          strokeWidth="6"
        />
        <line
          x1="990"
          y1="200"
          x2="1370"
          y2="200"
          stroke={colors.cyan}
          strokeWidth="6"
        />
        {[
          {
            x: 40,
            name: "HOST",
            ip: "192.168.10.10/24",
            sub: "Gateway 192.168.10.1",
          },
          {
            x: 710,
            name: "ROTEADOR / L3",
            ip: "10.1 ↔ 20.1",
            sub: "Rotas e políticas",
          },
          {
            x: 1370,
            name: "SERVIDOR",
            ip: "192.168.20.20/24",
            sub: "Gateway 192.168.20.1",
          },
        ].map((n) => (
          <g key={n.x}>
            <rect
              x={n.x}
              y="110"
              width="350"
              height="190"
              rx="22"
              fill={colors.panel}
              stroke={colors.line}
              strokeWidth="3"
            />
            <text
              x={n.x + 175}
              y="160"
              textAnchor="middle"
              fill={colors.white}
              fontSize="31"
            >
              {n.name}
            </text>
            <text
              x={n.x + 175}
              y="215"
              textAnchor="middle"
              fill={colors.green}
              fontSize="27"
            >
              {n.ip}
            </text>
            <text
              x={n.x + 175}
              y="263"
              textAnchor="middle"
              fill={colors.muted}
              fontSize="23"
            >
              {n.sub}
            </text>
          </g>
        ))}
        <circle
          cx={stage === 2 ? 1330 - p * 920 : 410 + p * 920}
          cy="200"
          r="18"
          fill={stage === 2 ? colors.amber : colors.green}
        />
      </svg>
      <p
        style={{
          position: "absolute",
          top: 400,
          left: 30,
          right: 30,
          fontSize: 31,
        }}
      >
        IP de destino: 192.168.20.20 · os endereços de enlace mudam a cada salto
        roteado.
      </p>
      <Caption>
        {stage === 0
          ? "O host usa a máscara e sua tabela de rotas; o quadro local é enviado ao MAC do próximo salto."
          : stage === 1
            ? "A correspondência de prefixo mais longo escolhe a rota. No roteamento, TTL/checksum IPv4 são atualizados."
            : "Confirme rota de retorno, VLANs transportadas e permissões do serviço. Uma VLAN isolada não substitui firewall."}
      </Caption>
    </Frame>
  );
};
