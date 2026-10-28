window.LESSON_DATA = {
  slug: "aula-03-protocolos-modelos",
  flashcards: [
    ["Protocolo", "Conjunto de regras que define formato, significado, temporização e ações de uma comunicação."],
    ["Suíte de protocolos", "Conjunto de protocolos que cooperam para oferecer comunicação completa, como a suíte TCP/IP."],
    ["Modelo OSI", "Modelo de referência de sete camadas usado para organizar funções e facilitar aprendizagem, padronização e diagnóstico."],
    ["Modelo TCP/IP", "Arquitetura em camadas implementada na Internet, normalmente apresentada com Aplicação, Transporte, Internet e Acesso à Rede."],
    ["Encapsulamento", "Processo em que cada camada adiciona informações de controle aos dados recebidos da camada superior."],
    ["Desencapsulamento", "Processo realizado no receptor para interpretar e remover informações de controle até entregar os dados à aplicação."],
    ["PDU", "Unidade de dados associada a uma camada, como segmento, pacote, quadro ou bits."],
    ["Segmento", "Nome frequentemente usado para a PDU do TCP na camada de Transporte."],
    ["Pacote", "PDU da camada de Rede/Internet, com informações como endereços IP de origem e destino."],
    ["Quadro", "PDU da camada de Enlace, preparada para atravessar um enlace específico."],
    ["IETF", "Comunidade aberta que desenvolve padrões e práticas para a Internet, publicados como RFCs."],
    ["IEEE 802", "Família de padrões para LANs e MANs, incluindo Ethernet e redes locais sem fio."],
  ],
  quiz: [
    {type:"PROTOCOLOS",q:"Qual aspecto de um protocolo define a estrutura e a ordem dos campos?",a:["Sintaxe","Semântica","Escalabilidade","Topologia"],c:0,e:"A sintaxe descreve formato, tamanho, ordem e organização dos campos de uma mensagem."},
    {type:"PROTOCOLOS",q:"Por que redes utilizam uma suíte de protocolos?",a:["Porque funções diferentes exigem regras especializadas que cooperam","Porque um protocolo deve substituir todos os demais","Porque camadas impedem interoperabilidade","Porque somente a camada física usa padrões"],c:0,e:"HTTP, TCP, IP e Ethernet, por exemplo, resolvem problemas diferentes e trabalham juntos."},
    {type:"MODELOS",q:"Qual afirmação diferencia corretamente OSI e TCP/IP?",a:["OSI é um modelo de referência; TCP/IP é a arquitetura usada pela Internet","OSI possui quatro camadas e TCP/IP sete","TCP/IP foi publicado pela ISO como substituto do Ethernet","OSI é o conjunto de protocolos usado por todos os roteadores"],c:0,e:"O OSI estrutura conceitualmente funções em sete camadas; o TCP/IP descreve a arquitetura prática da Internet."},
    {type:"CAMADAS",q:"Em qual camada OSI o roteamento IP é normalmente situado?",a:["Rede","Transporte","Apresentação","Física"],c:0,e:"A camada de Rede trata endereçamento lógico e encaminhamento entre redes."},
    {type:"CAMADAS",q:"Qual protocolo pertence à camada de Transporte?",a:["TCP","IP","Ethernet","HTTP"],c:0,e:"TCP e UDP são protocolos de Transporte; IP pertence à camada Internet/Rede."},
    {type:"ENCAPSULAMENTO",q:"Qual é a ordem correta das PDUs ao descer pela pilha?",a:["Dados → segmento → pacote → quadro → bits","Bits → quadro → pacote → segmento → dados","Quadro → dados → bits → pacote → segmento","Pacote → segmento → quadro → dados → bits"],c:0,e:"A aplicação gera dados; Transporte, Rede e Enlace acrescentam informações antes da codificação em bits/sinais."},
    {type:"ENCAPSULAMENTO",q:"O que ocorre durante o desencapsulamento?",a:["O receptor interpreta e remove informações de controle camada a camada","O emissor acrescenta cabeçalhos sem enviar dados","Todos os endereços são eliminados no primeiro roteador","O quadro é convertido diretamente em uma página Web"],c:0,e:"Cada camada do receptor processa seu controle e entrega a carga útil à camada superior."},
    {type:"PADRÕES",q:"Qual organização está diretamente associada às RFCs da Internet?",a:["IETF","ISO","IEEE 802.3","W3C exclusivamente"],c:0,e:"A IETF conduz processos abertos de desenvolvimento de muitos padrões da Internet registrados na série RFC."},
    {type:"PADRÕES",q:"Qual associação está correta?",a:["IEEE 802.3 — Ethernet","ISO 7498-1 — protocolo HTTP","RFC 8200 — modelo OSI","W3C — cabeamento de fibra óptica"],c:0,e:"O grupo IEEE 802.3 desenvolve o padrão Ethernet."},
    {type:"DIAGNÓSTICO",q:"Um host alcança o gateway por IP, mas não resolve nomes. Qual função deve ser investigada primeiro?",a:["DNS na camada de Aplicação","Sinal elétrico do enlace já comprovadamente funcional","Endereço MAC do servidor remoto","Formato do conector de fibra do provedor"],c:0,e:"A conectividade IP existe; a falha específica está na resolução de nomes, serviço oferecido pelo DNS."},
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  const layers = {
    7:["CAMADA 7 · DADOS","Aplicação","Fornece serviços de rede às aplicações e define protocolos para Web, nomes, correio e gerenciamento.",["HTTP","DNS","SMTP"],"integra a camada de Aplicação."],
    6:["CAMADA 6 · DADOS","Apresentação","Trata representação, codificação, compressão e proteção dos dados para que sistemas interpretem o mesmo conteúdo.",["UTF-8","JPEG","TLS"],"suas funções são incorporadas à Aplicação."],
    5:["CAMADA 5 · DADOS","Sessão","Organiza diálogos, pontos de sincronização e manutenção de sessões entre aplicações.",["diálogo","checkpoint","retomada"],"suas funções são incorporadas à Aplicação."],
    4:["CAMADA 4 · SEGMENTO/DATAGRAMA","Transporte","Oferece comunicação fim a fim, multiplexação por portas e, conforme o protocolo, confiabilidade e controle de fluxo.",["TCP","UDP","portas"],"corresponde à camada de Transporte."],
    3:["CAMADA 3 · PACOTE","Rede","Fornece endereçamento lógico e encaminhamento de pacotes entre redes por meio de roteadores.",["IPv4","IPv6","ICMP"],"corresponde à camada Internet."],
    2:["CAMADA 2 · QUADRO","Enlace","Organiza quadros, endereços locais, acesso ao meio e detecção de erros no enlace.",["Ethernet","Wi-Fi","MAC"],"faz parte de Acesso à Rede."],
    1:["CAMADA 1 · BITS","Física","Representa bits como sinais e define meios, conectores, sincronização e características elétricas, ópticas ou de rádio.",["cobre","fibra","rádio"],"faz parte de Acesso à Rede."],
  };
  document.querySelectorAll("[data-layer]").forEach((button) => button.addEventListener("click", () => {
    const item = layers[button.dataset.layer];
    document.querySelectorAll("[data-layer]").forEach((candidate) => candidate.classList.toggle("active", candidate === button));
    document.querySelector("#layerKicker").textContent = item[0];
    document.querySelector("#layerTitle").textContent = item[1];
    document.querySelector("#layerDescription").textContent = item[2];
    document.querySelector("#layerExamples").replaceChildren(...item[3].map((text) => { const tag = document.createElement("span"); tag.textContent = text; return tag; }));
    document.querySelector("#tcpMapping").textContent = item[4];
  }));

  const steps = [
    {html:'<div class="pdu"><span class="payload">GET /aula03 HTTP/1.1</span></div>',name:"Dados",header:"Mensagem da aplicação",purpose:"Representar a solicitação do usuário"},
    {html:'<div class="pdu"><span class="l4">TCP<br>portas</span><span class="payload">DADOS</span></div>',name:"Segmento",header:"Portas e controle TCP",purpose:"Identificar aplicações e oferecer entrega fim a fim"},
    {html:'<div class="pdu"><span class="l3">IP<br>origem/destino</span><span class="l4">TCP</span><span class="payload">DADOS</span></div>',name:"Pacote",header:"Endereços IP",purpose:"Permitir encaminhamento entre redes"},
    {html:'<div class="pdu"><span class="l2">ETH<br>MAC</span><span class="l3">IP</span><span class="l4">TCP</span><span class="payload">DADOS</span><span class="trail">FCS</span></div>',name:"Quadro",header:"Cabeçalho e trailer de enlace",purpose:"Entregar ao próximo salto e detectar erros"},
    {html:'<div class="pdu"><span class="payload" style="font-family:monospace;letter-spacing:.16em">10110100 01101001 11001010</span></div>',name:"Bits",header:"Codificação em sinais",purpose:"Atravessar o meio físico"},
  ];
  document.querySelectorAll("[data-step]").forEach((button) => button.addEventListener("click", () => {
    const step = steps[Number(button.dataset.step)];
    document.querySelectorAll("[data-step]").forEach((candidate) => candidate.classList.toggle("active", candidate === button));
    document.querySelector("#encapsulationStage").innerHTML = step.html;
    document.querySelector("#pduName").textContent = step.name;
    document.querySelector("#pduHeader").textContent = step.header;
    document.querySelector("#pduPurpose").textContent = step.purpose;
  }));
});
