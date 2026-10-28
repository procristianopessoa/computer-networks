import { Scene, Box, Links } from "./Scene";
import { colors } from "../Design";
export const Downsizing = () => (
  <Scene
    chapter={8}
    era="ANOS 1980–1990 · PCs, LANs E DOWNSIZING"
    title="Parte do trabalho sai do grande centro"
    lead="Workstations, computadores pessoais e servidores distribuem aplicações."
    points={[
      "LANs aproximam usuários, arquivos, impressoras e aplicações.",
      "Cliente-servidor distribui tarefas entre máquinas com papéis distintos.",
      "Downsizing migra parte das cargas para sistemas menores; mainframes continuam em uso.",
    ]}
    takeaway="A mudança é de arquitetura e distribuição do trabalho. Sistemas centrais e distribuídos podem coexistir."
    source="Contexto histórico: IPSJ Computer Museum · UNIX Servers / Brief History"
  >
    <Links
      edges={[
        [260, 100, 510, 215],
        [260, 330, 510, 215],
        [510, 215, 800, 215],
      ]}
    />
    <Box
      x={75}
      y={45}
      w={250}
      label="PC / CLIENTE"
      detail="Interface e aplicação"
    />
    <Box
      x={75}
      y={285}
      w={250}
      label="WORKSTATION"
      detail="Processamento local"
      delay={2}
    />
    <Box
      x={405}
      y={160}
      w={220}
      label="LAN"
      detail="Conectividade"
      accent={colors.cyan}
      delay={3}
    />
    <Box
      x={700}
      y={145}
      w={270}
      label="SERVIDOR"
      detail="Dados e serviços"
      delay={5}
    />
  </Scene>
);
