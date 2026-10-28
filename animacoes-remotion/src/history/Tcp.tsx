import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, clamp } from "../Design";
import { Scene, Box } from "./Scene";
export const Tcp = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Scene
      chapter={5}
      era="1973–1981 · TCP E IP"
      title="Conectar redes, preservar responsabilidades"
      lead="Cerf e Kahn desenvolvem a proposta que evoluirá para TCP/IP."
      points={[
        "O trabalho de 1973–1974 descreve uma arquitetura de interconexão.",
        "O desenho inicial reúne funções depois separadas em TCP e IP.",
        "Em 1981, as RFCs 791 e 793 especificam IPv4 e TCP.",
      ]}
      takeaway="TCP cuida do transporte confiável entre extremidades; IP cuida de datagramas e endereçamento entre redes."
      source="Fonte: Internet Society · RFC 675 · RFC 791 · RFC 793"
    >
      <Box x={95} y={125} w={300} label="TCP INICIAL" detail="1973–1974" />
      <div
        style={{
          position: "absolute",
          left: 440,
          top: 177,
          fontSize: 65,
          color: colors.green,
          opacity: interpolate(f, [3 * fps, 4 * fps], [0, 1], clamp),
        }}
      >
        →
      </div>
      <Box
        x={580}
        y={45}
        w={330}
        label="TCP"
        detail="Transporte confiável"
        accent={colors.cyan}
        delay={4}
      />
      <Box
        x={580}
        y={240}
        w={330}
        label="IP"
        detail="Datagramas entre redes"
        accent={colors.amber}
        delay={6}
      />
    </Scene>
  );
};
