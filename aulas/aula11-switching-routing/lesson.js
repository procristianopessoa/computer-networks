window.LESSON_DATA = {
  "slug": "aula11-switching-routing",
  "flashcards": [
    [
      "Switching",
      "Encaminhamento de quadros dentro do contexto de camada 2."
    ],
    [
      "Routing",
      "Encaminhamento de pacotes entre redes usando uma tabela de rotas."
    ],
    [
      "VLAN",
      "Segmentação lógica de camada 2 que normalmente delimita um domínio de broadcast."
    ],
    [
      "Porta access",
      "Porta associada a uma VLAN de dados no cenário básico."
    ],
    [
      "Trunk",
      "Enlace capaz de transportar tráfego de múltiplas VLANs."
    ],
    [
      "802.1Q",
      "Mecanismo de identificação de VLANs no tráfego Ethernet."
    ],
    [
      "SVI",
      "Interface lógica de VLAN que pode fornecer uma função de camada 3."
    ],
    [
      "Gateway padrão",
      "Próximo salto usado por uma rota default no contexto do host."
    ],
    [
      "ARP",
      "Resolução de endereços IPv4 para endereços de enlace no segmento local."
    ],
    [
      "Longest prefix match",
      "Escolha da rota que corresponde ao destino com o prefixo mais longo."
    ],
    [
      "Rota de retorno",
      "Caminho para que a resposta volte à origem."
    ],
    [
      "Política entre zonas",
      "Controle que determina quais comunicações podem cruzar segmentos."
    ]
  ],
  "quiz": [
    {
      "type": "FUNDAMENTO",
      "q": "Para comunicar entre duas sub-redes/VLANs, o que normalmente é necessário?",
      "a": [
        "Uma função L3 com rotas e políticas adequadas",
        "Somente um hub",
        "Apenas trocar o cabo por fibra",
        "Um endereço MAC igual em todos"
      ],
      "c": 0,
      "e": "A comunicação entre redes depende de encaminhamento L3."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Qual é a função de um trunk?",
      "a": [
        "Criar DNS automaticamente",
        "Transportar tráfego de múltiplas VLANs",
        "Garantir Internet sem roteamento",
        "Remover a necessidade de MAC"
      ],
      "c": 1,
      "e": "802.1Q identifica VLANs no enlace conforme a configuração."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Um host envia um pacote IP remoto em um quadro para qual MAC inicial?",
      "a": [
        "O MAC remoto através de todos os roteadores",
        "O MAC do servidor DNS sempre",
        "O MAC de seu próximo salto local",
        "O MAC de broadcast em toda transmissão"
      ],
      "c": 2,
      "e": "A resolução de próximo salto ocorre no enlace local."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Ao rotear sem NAT, o que geralmente muda entre os enlaces?",
      "a": [
        "O destino IP para o IP do switch",
        "O endereço de origem para o DNS",
        "O payload para o nome da VLAN",
        "Os cabeçalhos e endereços de camada 2"
      ],
      "c": 3,
      "e": "Os IPs do exemplo permanecem, com atualização de TTL/checksum."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Qual rota vence para 10.1.2.8: /16, /24 ou /0, todas correspondentes?",
      "a": [
        "A /24",
        "A /0",
        "A /16",
        "A primeira linha da tela"
      ],
      "c": 0,
      "e": "O encaminhamento utiliza longest prefix match."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Qual comando consulta a tabela de rotas em Cisco IOS?",
      "a": [
        "show vlan brief",
        "show ip route",
        "show interfaces trunk",
        "show mac address-table"
      ],
      "c": 1,
      "e": "Os outros comandos examinam outros aspectos do caminho."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Se uma VLAN não é permitida no trunk, o link pode continuar ativo?",
      "a": [
        "Não, todo trunk fica fisicamente desligado",
        "Não, o DNS apaga a VLAN",
        "Sim; enlace físico ativo não garante transporte daquela VLAN",
        "Sim, e o tráfego dessa VLAN sempre passa"
      ],
      "c": 2,
      "e": "A lista de VLANs é uma dependência lógica do caminho."
    },
    {
      "type": "APLICAÇÃO",
      "q": "O tráfego de resposta exige o quê?",
      "a": [
        "Somente rota na origem",
        "Apenas o mesmo MAC remoto",
        "Nunca precisa de gateway",
        "Rota e permissões também no sentido de retorno"
      ],
      "c": 3,
      "e": "Sem retorno, a troca pode falhar mesmo com ida correta."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Uma VLAN isoladamente equivale a firewall?",
      "a": [
        "Não; políticas entre zonas ainda são necessárias",
        "Sim, toda comunicação é inspecionada",
        "Sim, todos os ataques são bloqueados",
        "Sim, ACLs deixam de existir"
      ],
      "c": 0,
      "e": "Segmentação cria fronteiras, mas não substitui o controle de fluxos."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Qual sequência favorece diagnóstico?",
      "a": [
        "Alterar todas as VLANs ao mesmo tempo",
        "Verificar enlace, VLAN, L3, rotas, políticas e serviço",
        "Desativar firewall antes de observar",
        "Criar rota default para qualquer falha"
      ],
      "c": 1,
      "e": "A observação progressiva reduz mudanças sem fundamento."
    }
  ],
  "videoTranscript": "0–20 s: o host distingue um destino de outra sub-rede e escolhe o gateway. 20–40 s: o pacote cruza a função L3; os cabeçalhos de enlace mudam. 40–60 s: são verificados rota de retorno e política entre zonas."
};
