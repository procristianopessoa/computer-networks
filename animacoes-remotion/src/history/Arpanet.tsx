import { Scene, Box, Links } from "./Scene";
export const Arpanet = () => (
  <Scene
    chapter={2}
    era="1969 · ARPANET"
    title="Computadores em instituições diferentes"
    lead="A comutação de pacotes conecta os primeiros quatro nós."
    points={[
      "UCLA, SRI, UCSB e Universidade de Utah integram a rede inicial.",
      "IMPs fazem a interface dos hosts com a sub-rede de pacotes.",
      "A rede permite explorar comunicação e compartilhamento de recursos.",
    ]}
    takeaway="A ARPANET foi um precursor essencial da Internet, ainda sem a Web e sem o TCP/IP de 1983."
    source="Fonte: Internet Society · Computer History Museum (1969)"
  >
    <Links
      edges={[
        [260, 95, 750, 95],
        [260, 95, 260, 335],
        [260, 335, 750, 335],
        [750, 95, 750, 335],
        [260, 95, 750, 335],
      ]}
    />
    <Box x={130} y={40} w={260} label="UCLA" detail="Host + IMP" />
    <Box x={620} y={40} w={260} label="SRI" detail="Host + IMP" delay={1} />
    <Box x={130} y={280} w={260} label="UCSB" detail="Host + IMP" delay={2} />
    <Box x={620} y={280} w={260} label="UTAH" detail="Host + IMP" delay={3} />
  </Scene>
);
