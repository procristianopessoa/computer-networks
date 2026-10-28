window.LESSON_DATA = {
  "slug": "aula05-ethernet-redes-locais",
  "flashcards": [
    [
      "IEEE 802.3",
      "Família de padrões Ethernet, abrangendo funções MAC e diferentes PHYs."
    ],
    [
      "PHY",
      "Camada física específica: sinalização, meio e características do enlace."
    ],
    [
      "MAC",
      "Controle de acesso ao meio e endereçamento de camada 2."
    ],
    [
      "NIC",
      "Interface de rede do dispositivo, integrada ou adicionada."
    ],
    [
      "Quadro",
      "Unidade de dados de enlace que transporta, por exemplo, um pacote IP."
    ],
    [
      "100BASE-TX",
      "Tecnologia Ethernet de 100 Mb/s em pares de cobre."
    ],
    [
      "1000BASE-T",
      "Tecnologia Ethernet de 1 Gb/s em pares de cobre."
    ],
    [
      "10GBASE-SR",
      "Tecnologia Ethernet de 10 Gb/s para fibra multimodo de curto alcance relativo."
    ],
    [
      "Autonegociação",
      "Troca de capacidades entre interfaces vizinhas para estabelecer parâmetros comuns."
    ],
    [
      "Full duplex",
      "Transmissão e recepção simultâneas em um enlace ponto a ponto."
    ],
    [
      "Throughput",
      "Taxa efetivamente observada em um caminho ou interface."
    ],
    [
      "Goodput",
      "Taxa de dados úteis entregues à aplicação, descontada a sobrecarga."
    ]
  ],
  "quiz": [
    {
      "type": "FUNDAMENTO",
      "q": "Qual família define Ethernet?",
      "a": [
        "IEEE 802.3",
        "IEEE 802.11",
        "HTTP",
        "DNS"
      ],
      "c": 0,
      "e": "Ethernet pertence ao IEEE 802.3; WLAN utiliza IEEE 802.11."
    },
    {
      "type": "APLICAÇÃO",
      "q": "O LED de link aceso comprova o quê?",
      "a": [
        "O DNS funciona",
        "Um enlace físico foi estabelecido entre vizinhos",
        "A Internet está acessível",
        "O servidor atende em 1 Gb/s"
      ],
      "c": 1,
      "e": "As demais condições exigem testes de camadas superiores."
    },
    {
      "type": "FUNDAMENTO",
      "q": "1000BASE-T usa tipicamente qual meio?",
      "a": [
        "Somente rádio",
        "Somente fibra monomodo",
        "Pares trançados de cobre",
        "Cabo coaxial obrigatório"
      ],
      "c": 2,
      "e": "O sufixo T corresponde a tecnologias de pares trançados."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Um PC de 1 Gb/s chega ao servidor por um uplink de 100 Mb/s. Qual limite deve ser considerado?",
      "a": [
        "O PC garante 1 Gb/s ponta a ponta",
        "As taxas são somadas",
        "Full duplex remove o gargalo",
        "O enlace de 100 Mb/s limita a taxa nesse caminho"
      ],
      "c": 3,
      "e": "O trecho de menor capacidade restringe o caminho."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Ethernet full duplex permite o quê?",
      "a": [
        "Enviar e receber simultaneamente",
        "Eliminar cabeçalhos",
        "Dispensar compatibilidade física",
        "Executar CSMA/CD a cada quadro"
      ],
      "c": 0,
      "e": "Os dois sentidos operam ao mesmo tempo no enlace."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Qual afirmação sobre MAC e IP está correta?",
      "a": [
        "São sempre iguais",
        "Eles representam funções de endereçamento de camadas diferentes",
        "MAC é o endereço do site Web",
        "IP substitui o MAC em qualquer enlace Ethernet"
      ],
      "c": 1,
      "e": "O quadro usa endereços MAC locais e pode transportar um pacote IP."
    },
    {
      "type": "FUNDAMENTO",
      "q": "O que verificar ao ligar dois transceptores ópticos?",
      "a": [
        "Somente a cor do gabinete",
        "Somente o endereço IP",
        "Compatibilidade do padrão, ópticas, fibra e alcance",
        "A quantidade de páginas Web"
      ],
      "c": 2,
      "e": "A conexão depende de características físicas compatíveis."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Qual métrica considera os dados úteis da aplicação?",
      "a": [
        "Taxa nominal",
        "Quantidade de portas",
        "Tamanho do gabinete",
        "Goodput"
      ],
      "c": 3,
      "e": "Goodput desconta sobrecargas que não são os dados úteis entregues."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Para alcançar um destino IP fora da sub-rede local, o quadro inicial geralmente se destina a quem?",
      "a": [
        "Ao MAC do gateway",
        "Ao MAC remoto atravessando todos os roteadores",
        "Ao servidor DNS em todos os casos",
        "A um endereço MAC vazio"
      ],
      "c": 0,
      "e": "O próximo salto local é o gateway, quando existe uma rota que o utilize."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Qual conduta inicia um diagnóstico confiável?",
      "a": [
        "Forçar duplex de uma ponta aleatoriamente",
        "Medir e documentar estado, taxas e caminho",
        "Trocar todos os cabos sem teste",
        "Reiniciar o servidor antes de observar"
      ],
      "c": 1,
      "e": "A investigação deve se apoiar em evidências antes de alterar configurações."
    }
  ],
  "videoTranscript": "0–20 s: três tecnologias mostram que Ethernet é uma família com PHYs diferentes. 20–40 s: um quadro percorre host, switch e servidor. 40–60 s: as barras comparam o enlace local, o gargalo do caminho e os dados úteis da aplicação."
};
