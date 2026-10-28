import { Scene, Box, Links } from "./Scene";
import { colors } from "../Design";
export const Unix = () => (
  <Scene
    chapter={3}
    era="1969 EM DIANTE · UNIX"
    title="Um ambiente fértil para redes"
    lead="Unix nasce nos Bell Labs e se difunde em pesquisa e universidades."
    points={[
      "Ken Thompson e Dennis Ritchie participam de sua criação.",
      "Multiusuário, ferramentas combináveis e portabilidade favorecem sua difusão.",
      "Mais tarde, o BSD ajuda a disseminar TCP/IP e a interface de sockets.",
    ]}
    takeaway="Unix é um sistema operacional. NCP e TCP/IP pertencem à história dos protocolos de comunicação."
    source="Fonte: Computer History Museum · IPSJ Computer Museum · Internet Society"
  >
    <Links
      edges={[
        [260, 200, 520, 200],
        [520, 200, 800, 200],
      ]}
      color={colors.cyan}
    />
    <Box x={70} y={145} w={240} label="BELL LABS" detail="Unix · 1969" />
    <Box
      x={385}
      y={145}
      w={255}
      label="UNIVERSIDADES"
      detail="Pesquisa e ferramentas"
      accent={colors.cyan}
      delay={2}
    />
    <Box
      x={715}
      y={145}
      w={240}
      label="BSD"
      detail="TCP/IP e sockets"
      accent={colors.cyan}
      delay={5}
    />
    <p
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        bottom: 35,
        color: colors.muted,
        fontSize: 26,
        textAlign: "center",
      }}
    >
      Sistema operacional e protocolos evoluem em trajetórias relacionadas.
    </p>
  </Scene>
);
