window.LESSON_DATA = {
  slug: "aula-02-componentes-topologias",
  flashcards: [
    ["Host", "Dispositivo final que origina ou recebe mensagens na rede, como notebook, servidor, telefone ou sensor."],
    ["Switch", "Dispositivo intermediário que conecta hosts em uma LAN e encaminha quadros com base em informações da camada de enlace."],
    ["Roteador", "Dispositivo que interliga redes distintas e encaminha pacotes usando endereçamento lógico e rotas."],
    ["Meio", "Suporte que transporta sinais: cobre, fibra óptica ou espaço livre para ondas de rádio."],
    ["Topologia física", "Descreve conexões, cabos, portas e a disposição física dos elementos da rede."],
    ["Topologia lógica", "Descreve como os dados circulam, independentemente da aparência física da instalação."],
    ["LAN", "Rede local normalmente administrada por uma organização em uma área limitada, como casa, escritório ou campus."],
    ["WAN", "Rede que conecta LANs ou locais geograficamente distantes, frequentemente por serviços de operadoras."],
    ["WLAN", "Rede local em que dispositivos acessam a infraestrutura por rádio através de pontos de acesso."],
    ["Escalabilidade", "Capacidade de crescer sem reconstrução completa e sem degradação imprevisível do serviço."],
    ["Tolerância a falhas", "Capacidade de continuar oferecendo serviço, ainda que um componente ou caminho deixe de funcionar."],
    ["QoS", "Mecanismos que diferenciam tráfego conforme requisitos de atraso, perda e prioridade."],
  ],
  quiz: [
    {type:"FUNDAMENTO", q:"Qual conjunto contém os cinco elementos básicos de uma comunicação?", a:["Emissor, mensagem, meio, receptor e protocolo","Switch, roteador, firewall, servidor e nuvem","Aplicação, porta, cabo, rack e energia","LAN, WAN, MAN, PAN e Internet"], c:0, e:"A comunicação depende de quem envia, do conteúdo, do caminho, de quem recebe e das regras usadas para interpretar o intercâmbio."},
    {type:"COMPONENTES", q:"Qual equipamento normalmente conecta vários hosts dentro de uma LAN Ethernet?", a:["Switch","Roteador de borda entre sistemas autônomos","Modem celular","Servidor DNS"], c:0, e:"O switch fornece conectividade local e encaminha quadros entre suas portas."},
    {type:"COMPONENTES", q:"Qual é a função mais característica de um roteador?", a:["Interligar redes distintas e encaminhar pacotes","Converter todo quadro em sinal óptico","Armazenar páginas Web","Substituir o sistema operacional dos hosts"], c:0, e:"Roteadores tomam decisões de encaminhamento entre redes usando endereços lógicos e informações de rota."},
    {type:"TOPOLOGIA", q:"Em uma LAN Ethernet comutada moderna, qual topologia física é mais comum?", a:["Estrela","Barramento único","Anel sem equipamento central","Malha completa entre todos os hosts"], c:0, e:"Cada host normalmente possui seu próprio enlace até um switch central ou de acesso, formando uma estrela física."},
    {type:"ANÁLISE", q:"Por que topologia física e lógica não devem ser tratadas como sinônimos?", a:["Porque uma descreve conexões físicas e a outra descreve o fluxo dos dados","Porque topologia lógica trata apenas de cabos","Porque topologia física existe somente em WANs","Porque redes sem fio não possuem topologia"], c:0, e:"O desenho da instalação pode permanecer igual enquanto VLANs, rotas ou domínios lógicos mudam."},
    {type:"TIPOS DE REDE", q:"Uma organização conecta dois escritórios em cidades diferentes por um serviço de operadora. Que classificação melhor descreve essa interligação?", a:["WAN","WLAN","LAN isolada","Barramento"], c:0, e:"A WAN conecta redes ou locais separados por grande distância, frequentemente usando infraestrutura de terceiros."},
    {type:"TIPOS DE REDE", q:"Qual afirmação descreve corretamente uma WLAN?", a:["É uma LAN cujo acesso dos clientes utiliza rádio","É qualquer WAN com roteadores","É uma LAN formada somente por servidores","É uma rede que dispensa protocolos"], c:0, e:"WLAN é a rede local sem fio; normalmente ela se integra à LAN cabeada por meio de pontos de acesso."},
    {type:"PROJETO", q:"Qual característica permite adicionar usuários e serviços sem reconstruir toda a rede?", a:["Escalabilidade","Latência","Colisão","Encapsulamento"], c:0, e:"Uma arquitetura escalável suporta crescimento planejado com mudanças proporcionais e controladas."},
    {type:"PROJETO", q:"Dois enlaces independentes conectam um setor ao núcleo. Qual requisito é diretamente favorecido?", a:["Tolerância a falhas","Redução do número de protocolos","Eliminação do endereçamento","Conversão da LAN em WLAN"], c:0, e:"Caminhos alternativos podem manter o serviço quando um enlace falha, desde que a arquitetura e os protocolos os utilizem adequadamente."},
    {type:"QOS", q:"Por que voz em tempo real pode receber tratamento diferente de uma cópia de arquivo?", a:["Porque voz é mais sensível a atraso e variação de atraso","Porque arquivos nunca usam a rede","Porque QoS aumenta a velocidade física do cabo","Porque voz não utiliza pacotes"], c:0, e:"QoS não cria capacidade; ela gerencia recursos e prioridades conforme as necessidades de cada classe de tráfego."},
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  const scenarios = {
    casa: {center:"⌂", label:"Roteador Wi-Fi", scope:"LAN/WLAN doméstica", device:"Roteador com AP integrado", decision:"Cobertura e segurança Wi-Fi", edges:[["▰","Notebook"],["▣","TV"],["▯","Celular"],["●","IoT"]]},
    campus: {center:"⇄", label:"Switch de distribuição", scope:"LAN de campus", device:"Switches + pontos de acesso", decision:"Escala, VLANs e redundância", edges:[["▰","Laboratório"],["▥","Servidores"],[")))","Wi-Fi"],["▤","Telefonia"]]},
    filiais: {center:"◇", label:"WAN / Internet", scope:"Múltiplas LANs + WAN", device:"Roteadores de borda", decision:"Disponibilidade e segurança", edges:[["⌂","Matriz"],["⌂","Filial A"],["⌂","Filial B"],["☁","Nuvem"]]},
  };
  const center = document.querySelector("#scenarioCenter");
  const edges = [...document.querySelectorAll(".scenario-edge")];
  document.querySelectorAll("[data-scenario]").forEach((button) => button.addEventListener("click", () => {
    const scenario = scenarios[button.dataset.scenario];
    document.querySelectorAll("[data-scenario]").forEach((candidate) => candidate.classList.toggle("active", candidate === button));
    center.textContent = scenario.center;
    center.dataset.label = scenario.label;
    edges.forEach((edge, index) => { edge.textContent = scenario.edges[index][0]; edge.dataset.label = scenario.edges[index][1]; });
    document.querySelector("#scenarioScope").textContent = scenario.scope;
    document.querySelector("#scenarioDevice").textContent = scenario.device;
    document.querySelector("#scenarioDecision").textContent = scenario.decision;
  }));
});
