import { useCurrentFrame, useVideoConfig } from "remotion";
import { Frame, Caption, colors } from "./Design";
export const Access = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const stage = Math.min(2, Math.floor(t / 20));
  const local = t % 20;
  const phase = Math.floor(local / 4);
  const p = (local % 4) / 4;
  const collision = stage === 0 && phase === 1;
  return (
    <Frame
      number="06"
      title={
        stage === 0
          ? "Ethernet compartilhada: CSMA/CD"
          : stage === 1
            ? "Ethernet full duplex: dois sentidos"
            : "Wi-Fi: disputa e prevenção de colisões"
      }
      subtitle={
        stage === 0
          ? "Ouvir, transmitir, detectar colisão, interromper e tentar novamente."
          : stage === 1
            ? "Enlace ponto a ponto, com transmissão e recepção simultâneas."
            : "Exemplo simplificado de contenção: escuta, backoff e confirmação."
      }
    >
      <svg width="1760" height="470" viewBox="0 0 1760 470">
        <rect
          x="100"
          y="110"
          width="290"
          height="190"
          rx="25"
          fill={colors.panel}
          stroke={colors.green}
          strokeWidth="3"
        />
        <text
          x="245"
          y="190"
          textAnchor="middle"
          fill={colors.white}
          fontSize="38"
        >
          ESTAÇÃO A
        </text>
        <text
          x="245"
          y="245"
          textAnchor="middle"
          fill={colors.muted}
          fontSize="26"
        >
          {stage === 2 ? "Rádio" : "Interface"}
        </text>
        <rect
          x="1370"
          y="110"
          width="290"
          height="190"
          rx="25"
          fill={colors.panel}
          stroke={colors.cyan}
          strokeWidth="3"
        />
        <text
          x="1515"
          y="190"
          textAnchor="middle"
          fill={colors.white}
          fontSize="38"
        >
          {stage === 2 ? "PONTO DE ACESSO" : "ESTAÇÃO B"}
        </text>
        <line
          x1="390"
          y1={stage === 1 ? 170 : 210}
          x2="1370"
          y2={stage === 1 ? 170 : 210}
          stroke={colors.line}
          strokeWidth="8"
          strokeDasharray={stage === 2 ? "15 12" : undefined}
        />
        {stage === 1 && (
          <line
            x1="390"
            y1="260"
            x2="1370"
            y2="260"
            stroke={colors.line}
            strokeWidth="8"
          />
        )}
        {stage === 0 && (
          <>
            <circle
              cx={collision ? 860 : 450 + p * 850}
              cy="210"
              r="23"
              fill={collision ? "#ff6670" : colors.green}
            />
            {phase === 1 && (
              <circle cx={900 - p * 40} cy="210" r="23" fill="#ff6670" />
            )}
            <text
              x="880"
              y="105"
              textAnchor="middle"
              fill={collision ? "#ff6670" : colors.white}
              fontSize="38"
            >
              {
                [
                  "MEIO LIVRE",
                  "COLISÃO",
                  "BACKOFF A ≠ B",
                  "A TRANSMITE",
                  "B TRANSMITE",
                ][phase]
              }
            </text>
          </>
        )}
        {stage === 1 && (
          <>
            <rect
              x={430 + p * 850}
              y="150"
              width="85"
              height="40"
              rx="10"
              fill={colors.green}
            />
            <rect
              x={1280 - p * 850}
              y="240"
              width="85"
              height="40"
              rx="10"
              fill={colors.cyan}
            />
            <text
              x="880"
              y="100"
              textAnchor="middle"
              fill={colors.white}
              fontSize="35"
            >
              TX →
            </text>
            <text
              x="880"
              y="350"
              textAnchor="middle"
              fill={colors.white}
              fontSize="35"
            >
              ← RX
            </text>
          </>
        )}
        {stage === 2 && (
          <>
            <text
              x="880"
              y="100"
              textAnchor="middle"
              fill={colors.amber}
              fontSize="35"
            >
              {
                [
                  "ESCUTA DO CANAL",
                  "ESPERA / BACKOFF",
                  "TRANSMISSÃO",
                  "CONFIRMAÇÃO ACK",
                  "NOVA DISPUTA",
                ][phase]
              }
            </text>
            {phase === 2 && (
              <rect
                x={430 + p * 850}
                y="190"
                width="85"
                height="40"
                rx="10"
                fill={colors.green}
              />
            )}{" "}
            {phase === 3 && (
              <rect
                x={1280 - p * 850}
                y="190"
                width="75"
                height="40"
                rx="10"
                fill={colors.amber}
              />
            )}
          </>
        )}
        <text
          x="880"
          y="420"
          textAnchor="middle"
          fill={colors.muted}
          fontSize="27"
        >
          {stage === 0
            ? "Um meio compartilhado: transmissões podem se sobrepor."
            : stage === 1
              ? "Sem colisões nesse enlace; CSMA/CD não é usado."
              : "CSMA/CA reduz a probabilidade de colisão; não a elimina."}
        </text>
      </svg>
      <Caption>
        {stage === 0
          ? "Sequência didática: os tempos de propagação e backoff não estão em escala."
          : stage === 1
            ? "Uma interface de 1 Gb/s full duplex pode transmitir até 1 Gb/s e receber até 1 Gb/s simultaneamente."
            : "ACK e backoff fazem parte do exemplo de quadros unicast com confirmação; não resumem todos os modos do IEEE 802.11."}
      </Caption>
    </Frame>
  );
};
