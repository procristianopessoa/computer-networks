import { Scene, Box, Links } from "./Scene";
import { colors } from "../Design";
export const Web = () => (
  <Scene
    chapter={9}
    era="1989–1993 · A WEB SOBRE A INTERNET"
    title="Da infraestrutura aos documentos conectados"
    lead="A Web amplia o acesso à informação usando uma rede já existente."
    points={[
      "1989: Tim Berners-Lee propõe a Web no CERN.",
      "1990–1991: navegador, servidor e primeiros recursos tornam a proposta utilizável.",
      "1993: o CERN coloca o software da Web em domínio público.",
    ]}
    takeaway="Síntese: computadores e sistemas operacionais executam aplicações; protocolos conectam redes; a Web é um dos serviços."
    source="Fonte: CERN · A short history of the Web"
  >
    <Links
      edges={[
        [250, 150, 760, 150],
        [250, 150, 500, 335],
        [760, 150, 500, 335],
      ]}
    />
    <Box x={70} y={70} w={310} label="NAVEGADOR" detail="URLs e hipertexto" />
    <Box
      x={635}
      y={70}
      w={310}
      label="SERVIDOR WEB"
      detail="HTTP e recursos"
      accent={colors.cyan}
      delay={3}
    />
    <Box
      x={330}
      y={280}
      w={350}
      label="INTERNET · TCP/IP"
      detail="Infraestrutura de rede"
      accent={colors.amber}
      delay={5}
    />
  </Scene>
);
