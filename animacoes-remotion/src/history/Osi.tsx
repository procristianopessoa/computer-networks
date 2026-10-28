import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, clamp } from "../Design";
import { Scene, Box } from "./Scene";
export const Osi = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layers = [
    "Aplicação",
    "Apresentação",
    "Sessão",
    "Transporte",
    "Rede",
    "Enlace",
    "Física",
  ];
  return (
    <Scene
      chapter={7}
      era="FINAL DOS ANOS 1970–1984 · ISO/OSI"
      title="Um modelo para organizar a comunicação"
      lead="A ISO publica o modelo básico de referência OSI em 1984."
      points={[
        "Sete camadas dividem funções e responsabilidades da comunicação.",
        "O modelo ajuda a estudar, padronizar e diagnosticar sistemas.",
        "OSI e TCP/IP são trajetórias sobrepostas; não são a mesma arquitetura.",
      ]}
      takeaway="OSI é um modelo de referência. Sua publicação não substitui o TCP/IP já adotado na ARPANET."
      source="Fonte: ISO 7498:1984 · Internet Society"
    >
      {layers.map((l, i) => (
        <div
          key={l}
          style={{
            position: "absolute",
            left: 65,
            top: 25 + i * 55,
            width: 435,
            height: 45,
            background:
              i === 3 ? colors.cyan : i === 4 ? colors.amber : colors.panel,
            border: `1px solid ${colors.line}`,
            color: i === 3 || i === 4 ? colors.bg : colors.white,
            borderRadius: 8,
            padding: "5px 18px",
            fontSize: 25,
            opacity: interpolate(
              f,
              [i * 0.7 * fps, (i * 0.7 + 0.5) * fps],
              [0, 1],
              clamp,
            ),
          }}
        >
          {7 - i} · {l}
        </div>
      ))}
      <Box
        x={570}
        y={95}
        w={355}
        label="ISO → OSI"
        detail="Modelo de referência"
        delay={2}
      />
      <Box
        x={570}
        y={250}
        w={355}
        label="TCP/IP"
        detail="Arquitetura da Internet"
        accent={colors.cyan}
        delay={5}
      />
    </Scene>
  );
};
