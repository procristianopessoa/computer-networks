import { Scene, Box, Links } from "./Scene";
export const Mainframes = () => (
  <Scene
    chapter={1}
    era="DÉCADAS DE 1950–1960"
    title="Computação centralizada"
    lead="Mainframes, terminais e compartilhamento de tempo."
    points={[
      "O processamento se concentra em um computador de grande porte.",
      "Terminais permitem que vários usuários acessem recursos centrais.",
      "Compartilhar computação não equivale a interligar redes independentes.",
    ]}
    takeaway="Ponto de partida: compartilhar uma máquina. O passo seguinte será compartilhar recursos entre máquinas."
    source="Contexto: Computer History Museum · Internet Society"
  >
    <Links
      edges={[
        [500, 220, 190, 90],
        [500, 220, 190, 340],
        [500, 220, 830, 90],
        [500, 220, 830, 340],
      ]}
    />
    <Box
      x={365}
      y={155}
      w={275}
      label="MAINFRAME"
      detail="Processamento central"
    />
    <Box x={70} y={40} label="Terminal A" delay={1} />
    <Box x={70} y={290} label="Terminal B" delay={2} />
    <Box x={710} y={40} label="Terminal C" delay={3} />
    <Box x={710} y={290} label="Terminal D" delay={4} />
  </Scene>
);
