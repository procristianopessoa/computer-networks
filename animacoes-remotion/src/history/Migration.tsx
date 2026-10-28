import { Scene, Box, Links } from "./Scene";
import { colors } from "../Design";
export const Migration = () => (
  <Scene
    chapter={6}
    era="1º DE JANEIRO DE 1983 · TRANSIÇÃO"
    title="Da ARPANET com NCP à arquitetura TCP/IP"
    lead="Uma mudança coordenada estabelece a nova base de comunicação."
    points={[
      "A data marca a transição de NCP para TCP/IP na ARPANET.",
      "A arquitetura permite interconectar redes de tecnologias diferentes.",
      "A Internet se desenvolve como rede de redes, sem depender da Web.",
    ]}
    takeaway="1983 é um marco da adoção de TCP/IP — não a data em que todos os elementos da Internet foram inventados."
    source="Fonte: Internet Society · A Brief History of the Internet"
  >
    <Links
      edges={[
        [200, 200, 500, 200],
        [500, 200, 800, 200],
      ]}
      color={colors.amber}
    />
    <Box x={60} y={140} w={260} label="REDE A" detail="Hosts TCP/IP" />
    <Box
      x={370}
      y={140}
      w={280}
      label="GATEWAY"
      detail="Interconexão"
      accent={colors.amber}
      delay={2}
    />
    <Box
      x={700}
      y={140}
      w={260}
      label="REDE B"
      detail="Hosts TCP/IP"
      delay={4}
    />
    <p
      style={{
        position: "absolute",
        bottom: 40,
        left: 65,
        right: 65,
        fontSize: 27,
        color: colors.muted,
        textAlign: "center",
      }}
    >
      Tecnologias locais diferentes · arquitetura de comunicação comum
    </p>
  </Scene>
);
