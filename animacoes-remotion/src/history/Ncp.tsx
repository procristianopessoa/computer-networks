import { Scene, Box, Links } from "./Scene";
export const Ncp = () => (
  <Scene
    chapter={4}
    era="INÍCIO DOS ANOS 1970 · NCP"
    title="Regras para os hosts da ARPANET"
    lead="NCP viabiliza a comunicação host a host na rede inicial."
    points={[
      "O software NCP implementa funções de comunicação nos hosts.",
      "Aplicações usam a rede para acesso remoto e transferência de arquivos.",
      "Interligar redes heterogêneas exige uma arquitetura mais abrangente.",
    ]}
    takeaway="NCP atende à ARPANET inicial. O desafio de uma rede de redes conduz ao desenvolvimento de TCP/IP."
    source="Fonte: Internet Society · RFC 2235"
  >
    <Links
      edges={[
        [250, 200, 500, 200],
        [500, 200, 780, 200],
      ]}
    />
    <Box x={65} y={135} w={280} label="HOST A" detail="Aplicação + NCP" />
    <Box
      x={385}
      y={135}
      w={240}
      label="ARPANET"
      detail="Sub-rede de pacotes"
      delay={2}
    />
    <Box
      x={700}
      y={135}
      w={250}
      label="HOST B"
      detail="NCP + aplicação"
      delay={3}
    />
    <p
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        bottom: 45,
        fontSize: 26,
        textAlign: "center",
      }}
    >
      O host participa da rede por meio de uma implementação de protocolo.
    </p>
  </Scene>
);
