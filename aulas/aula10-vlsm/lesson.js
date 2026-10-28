window.LESSON_DATA = {
  "slug": "aula10-vlsm",
  "flashcards": [
    [
      "VLSM",
      "Uso de prefixos de tamanhos diferentes no mesmo plano de endereçamento."
    ],
    [
      "Demanda",
      "Quantidade de interfaces a atender, incluindo infraestrutura conforme o inventário."
    ],
    [
      "Capacidade",
      "Quantidade de endereços utilizáveis do bloco escolhido."
    ],
    [
      "Alinhamento",
      "Correspondência do início do bloco com seu limite binário correto."
    ],
    [
      "Contenção",
      "Condição de uma sub-rede estar inteiramente dentro da rede-base."
    ],
    [
      "Sobreposição",
      "Interseção entre os intervalos de duas sub-redes."
    ],
    [
      "Reserva",
      "Espaço ainda livre ou capacidade planejada para crescimento."
    ],
    [
      "Maior primeiro",
      "Estratégia de ordenar demandas em ordem decrescente para alocar blocos."
    ],
    [
      "/25",
      "Bloco de 128 endereços, com 126 utilizáveis numa LAN convencional."
    ],
    [
      "/27",
      "Bloco de 32 endereços, com 30 utilizáveis numa LAN convencional."
    ],
    [
      "Agregação",
      "Representação de blocos compatíveis por um prefixo menos específico."
    ],
    [
      "IPAM",
      "Práticas e ferramentas para inventariar e administrar endereços IP."
    ]
  ],
  "quiz": [
    {
      "type": "FUNDAMENTO",
      "q": "Que problema o VLSM resolve?",
      "a": [
        "Atender grupos diferentes com blocos de tamanhos diferentes",
        "Criar VLAN automaticamente",
        "Eliminar gateways",
        "Mudar a velocidade da Ethernet"
      ],
      "c": 0,
      "e": "VLSM trata do planejamento do espaço IP."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Cem interfaces, incluindo gateway, exigem qual menor bloco convencional?",
      "a": [
        "/26",
        "/25",
        "/27",
        "/28"
      ],
      "c": 1,
      "e": "/25 oferece 126 endereços utilizáveis; /26 só 62."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Cinquenta interfaces cabem em qual menor bloco convencional?",
      "a": [
        "/27",
        "/28",
        "/26",
        "/29"
      ],
      "c": 2,
      "e": "/26 oferece 62 utilizáveis."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Qual próximo bloco /26 pode seguir 192.168.20.0/25?",
      "a": [
        "192.168.20.64/26",
        "192.168.20.100/26",
        "192.168.20.127/26",
        "192.168.20.128/26"
      ],
      "c": 3,
      "e": "128 é alinhado e está após o intervalo .0–.127."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Qual afirmação sobre começar pelo maior está correta?",
      "a": [
        "É uma estratégia prática para facilitar a alocação",
        "É um campo obrigatório de IPv4",
        "É uma regra que o switch verifica",
        "Substitui a checagem de alinhamento"
      ],
      "c": 0,
      "e": "Outras ordens podem ser válidas, mas precisam preservar os limites."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Um grupo com 31 interfaces cabe num /27?",
      "a": [
        "Sim; há 32 hosts",
        "Não; há 30 utilizáveis",
        "Sim; o gateway usa broadcast",
        "Sim; a máscara não importa"
      ],
      "c": 1,
      "e": "O tamanho total inclui rede e broadcast na LAN convencional."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Após /25, /26 e /27 no /24 do exemplo, qual reserva resta?",
      "a": [
        "192.168.20.192/26",
        "192.168.20.0/25",
        "192.168.20.224/27",
        "192.168.21.0/24"
      ],
      "c": 2,
      "e": "Os blocos anteriores ocupam .0–.223."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Como detectar sobreposição?",
      "a": [
        "Comparar só nomes das VLANs",
        "Ver se todas têm gateway .1",
        "Somar velocidades dos links",
        "Comparar intervalos de endereço de cada bloco"
      ],
      "c": 3,
      "e": "Nomes distintos não garantem intervalos distintos."
    },
    {
      "type": "FUNDAMENTO",
      "q": "CIDR/VLSM cria a fronteira de broadcast sozinho?",
      "a": [
        "Não; a arquitetura L2/L3 também precisa ser configurada",
        "Sim, basta escrever /26",
        "Sim, sem VLAN ou roteador",
        "Sim, se usar endereços privados"
      ],
      "c": 0,
      "e": "O plano IP e a segmentação são aspectos relacionados, mas distintos."
    },
    {
      "type": "APLICAÇÃO",
      "q": "O que o inventário de demanda precisa considerar?",
      "a": [
        "Somente notebooks",
        "Todas as interfaces e a reserva acordada",
        "Somente endereços de usuários autenticados",
        "Somente o número de cabos"
      ],
      "c": 1,
      "e": "Infraestrutura e crescimento podem consumir endereços do bloco."
    }
  ],
  "videoTranscript": "0–20 s: demandas de 100, 50 e 20 interfaces são ordenadas. 20–40 s: os blocos /25, /26 e /27 são alocados numa rede /24. 40–60 s: a reserva .224/27 é destacada sem sobreposição."
};
