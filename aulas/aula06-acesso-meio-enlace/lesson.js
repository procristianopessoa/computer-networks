window.LESSON_DATA = {
  "slug": "aula06-acesso-meio-enlace",
  "flashcards": [
    [
      "Enquadramento",
      "Organização do fluxo em quadros com limites e campos reconhecíveis."
    ],
    [
      "FCS",
      "Campo de verificação de integridade do quadro."
    ],
    [
      "CRC",
      "Cálculo usado para detectar padrões de erro; não é correção nem criptografia."
    ],
    [
      "Meio compartilhado",
      "Recurso de transmissão usado por múltiplas estações que precisam coordenar o acesso."
    ],
    [
      "Half duplex",
      "Comunicação nos dois sentidos, mas não simultaneamente no enlace."
    ],
    [
      "Full duplex",
      "Comunicação simultânea nos dois sentidos de um enlace ponto a ponto."
    ],
    [
      "CSMA/CD",
      "Método da Ethernet compartilhada half duplex com detecção de colisão."
    ],
    [
      "Colisão",
      "Sobreposição de transmissões no contexto de um meio compartilhado."
    ],
    [
      "Backoff",
      "Espera aleatória usada para reduzir novas disputas simultâneas."
    ],
    [
      "CSMA/CA",
      "Mecanismos de contenção do Wi-Fi que procuram evitar colisões."
    ],
    [
      "ACK de enlace",
      "Confirmação usada em determinados intercâmbios de enlace, como unicast Wi-Fi confirmado."
    ],
    [
      "Congestionamento",
      "Demanda superior à capacidade disponível, podendo gerar filas e descartes."
    ]
  ],
  "quiz": [
    {
      "type": "FUNDAMENTO",
      "q": "Em que cenário se aplica CSMA/CD?",
      "a": [
        "Ethernet compartilhada em half duplex",
        "Todo enlace Ethernet full duplex",
        "Toda navegação HTTPS",
        "Roteamento IP obrigatório"
      ],
      "c": 0,
      "e": "CSMA/CD está associado à Ethernet compartilhada half duplex."
    },
    {
      "type": "APLICAÇÃO",
      "q": "O que o FCS permite fazer?",
      "a": [
        "Corrigir qualquer bit automaticamente",
        "Detectar muitos padrões de erro no quadro",
        "Criptografar a mensagem",
        "Garantir que a aplicação leu os dados"
      ],
      "c": 1,
      "e": "CRC/FCS verifica integridade, sem fornecer correção universal."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Por que pode haver colisão após escutar o meio livre?",
      "a": [
        "Porque um switch sempre cria colisões",
        "Porque todo cabo transmite sem atraso",
        "Outra estação pode iniciar antes que os sinais se propaguem",
        "Porque DNS escolhe o mesmo IP"
      ],
      "c": 2,
      "e": "O atraso de propagação impede uma visão instantânea do meio inteiro."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Qual é o objetivo do backoff?",
      "a": [
        "Eliminar fisicamente a interferência",
        "Aumentar a taxa nominal do cabo",
        "Substituir os endereços MAC",
        "Reduzir a chance de novas transmissões simultâneas"
      ],
      "c": 3,
      "e": "A aleatoriedade evita tentativas permanentemente sincronizadas."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Um enlace Ethernet full duplex usa CSMA/CD?",
      "a": [
        "Não, nesse enlace não há colisões normais",
        "Sim, a cada pacote",
        "Somente depois de consultar DNS",
        "Apenas em fibras"
      ],
      "c": 0,
      "e": "O ponto a ponto full duplex dispensa o método de colisões."
    },
    {
      "type": "APLICAÇÃO",
      "q": "1 Gb/s full duplex significa o quê?",
      "a": [
        "500 Mb/s em cada sentido por definição",
        "Até 1 Gb/s em cada sentido simultaneamente",
        "Uma cópia de arquivo sempre a 2 Gb/s",
        "Ausência de qualquer gargalo"
      ],
      "c": 1,
      "e": "A capacidade é especificada por sentido, não como garantia de goodput."
    },
    {
      "type": "FUNDAMENTO",
      "q": "CSMA/CA elimina toda colisão Wi-Fi?",
      "a": [
        "Sim, por definição",
        "Sim, se existir um AP",
        "Não; reduz a probabilidade em acesso por contenção",
        "Sim, porque não há meio compartilhado"
      ],
      "c": 2,
      "e": "Colisões e perdas ainda podem ocorrer em redes sem fio."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Ethernet retransmite todo quadro com erro usando um ACK próprio?",
      "a": [
        "Sim, sempre",
        "Apenas quando o IP termina em 1",
        "Somente em full duplex",
        "Não; esse não é um serviço geral do MAC Ethernet"
      ],
      "c": 3,
      "e": "A recuperação pode ser de camadas superiores; não deve ser confundida com unicast Wi-Fi confirmado."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Filas e descartes num switch cheio caracterizam necessariamente colisões?",
      "a": [
        "Não; podem indicar congestionamento",
        "Sim, são sinônimos",
        "Sim, mesmo em full duplex",
        "Não existe descarte em switch"
      ],
      "c": 0,
      "e": "Compartilhar capacidade interna ou saída não é o mesmo que colisão física."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Qual comparação é correta?",
      "a": [
        "Wi-Fi oferece canal exclusivo para cada usuário",
        "Hub half duplex compartilha acesso; switch full duplex dedica enlaces",
        "Hub aprende MAC por porta",
        "Full duplex elimina a necessidade de FCS"
      ],
      "c": 1,
      "e": "Os métodos dependem da tecnologia e da forma de ligação."
    }
  ],
  "videoTranscript": "0–20 s: duas transmissões num meio compartilhado colidem e recuam antes de tentar novamente. 20–40 s: setas em sentidos opostos mostram full duplex, sem CSMA/CD. 40–60 s: escuta, backoff, envio e ACK ilustram uma troca unicast Wi-Fi por contenção."
};
