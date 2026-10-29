window.LESSON_DATA = {
  "slug": "aula09-subnetting",
  "flashcards": [
    [
      "Prefixo",
      "Quantidade de bits que identifica a rede, escrita como /p."
    ],
    [
      "Máscara",
      "Representação com bits de rede 1 e bits de host 0 contíguos."
    ],
    [
      "ID de rede",
      "Endereço inicial alinhado que identifica o bloco."
    ],
    [
      "Broadcast",
      "Endereço final de uma sub-rede IPv4 convencional, com bits de host 1."
    ],
    [
      "Host utilizável",
      "Endereço atribuível a interface numa sub-rede conforme seu tipo de uso."
    ],
    [
      "AND",
      "Operação bit a bit entre IP e máscara que calcula o ID de rede."
    ],
    [
      "Tamanho do bloco",
      "2 elevado à quantidade de bits de host."
    ],
    [
      "FLSM",
      "Divisão em sub-redes com máscaras de mesmo tamanho."
    ],
    [
      "Gateway",
      "Próximo salto local para alcançar redes remotas conforme uma rota."
    ],
    [
      "/26",
      "Prefixo com 64 endereços totais e 62 utilizáveis numa LAN convencional."
    ],
    [
      "/31",
      "Prefixo que pode atender duas pontas de um enlace IPv4 ponto a ponto."
    ],
    [
      "/32",
      "Prefixo que identifica um único endereço IPv4."
    ]
  ],
  "quiz": [
    {
      "type": "FUNDAMENTO",
      "q": "Qual é a máscara de /26?",
      "a": [
        "255.255.255.192",
        "255.255.255.128",
        "255.255.255.224",
        "255.255.255.0"
      ],
      "c": 0,
      "e": "Os 26 bits 1 correspondem a 24 bits mais os dois primeiros do último octeto."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Quantos endereços totais contém /26?",
      "a": [
        "62",
        "64",
        "128",
        "32"
      ],
      "c": 1,
      "e": "Há seis bits de host: 2^6=64."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Qual rede contém 192.168.10.77/26?",
      "a": [
        "192.168.10.0/26",
        "192.168.10.128/26",
        "192.168.10.64/26",
        "192.168.10.77/26"
      ],
      "c": 2,
      "e": "77 pertence ao intervalo 64–127."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Qual é o broadcast de 192.168.10.64/26?",
      "a": [
        "192.168.10.126",
        "192.168.10.128",
        "192.168.10.255",
        "192.168.10.127"
      ],
      "c": 3,
      "e": "O último endereço desse bloco é 127."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Qual faixa é utilizável em 192.168.10.64/26?",
      "a": [
        "192.168.10.65 a 192.168.10.126",
        "192.168.10.64 a 192.168.10.127",
        "192.168.10.1 a 192.168.10.62",
        "192.168.10.66 a 192.168.10.128"
      ],
      "c": 0,
      "e": "Retiram-se os extremos no modelo LAN convencional."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Um /24 dividido em quatro blocos iguais resulta em qual prefixo?",
      "a": [
        "/25",
        "/26",
        "/27",
        "/28"
      ],
      "c": 1,
      "e": "Dois bits adicionais permitem quatro blocos."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Um /26 atende 63 interfaces de uma LAN convencional?",
      "a": [
        "Sim, oferece 64 hosts",
        "Sim, basta usar o broadcast",
        "Não, oferece 62 endereços utilizáveis",
        "Sim, basta retirar o gateway"
      ],
      "c": 2,
      "e": "Endereços de rede e broadcast não são hosts convencionais."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Qual operação calcula o ID de rede?",
      "a": [
        "Soma do IP com DNS",
        "XOR do MAC com IP",
        "Subtração do gateway",
        "AND entre IP e máscara"
      ],
      "c": 3,
      "e": "A máscara preserva os bits de rede e zera os de host."
    },
    {
      "type": "FUNDAMENTO",
      "q": "O gateway deve ser sempre o primeiro IP utilizável?",
      "a": [
        "Não; isso é uma convenção de projeto",
        "Sim, o protocolo exige",
        "Sim, apenas .1 funciona",
        "Não precisa estar no segmento local"
      ],
      "c": 0,
      "e": "O endereço escolhido precisa ser válido e alcançável no contexto da rede."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Onde /31 tem uso específico previsto?",
      "a": [
        "LAN de 62 hosts",
        "Enlace IPv4 ponto a ponto",
        "Qualquer WLAN de 30 usuários",
        "Servidor DNS com 254 clientes"
      ],
      "c": 1,
      "e": "A RFC 3021 descreve a utilização dos dois endereços no ponto a ponto."
    }
  ],
  "videoTranscript": "0–30 s: a fronteira avança de /24 a /26 e cada bloco diminui. 30–60 s: a fronteira volta para /24, /16 e /8; cada bloco cresce. A contagem considera a rede-base 10.0.0.0/8."
};
