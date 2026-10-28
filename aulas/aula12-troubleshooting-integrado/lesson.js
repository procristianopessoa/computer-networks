window.LESSON_DATA = {
  "slug": "aula12-troubleshooting-integrado",
  "flashcards": [
    [
      "Sintoma",
      "Comportamento observado pelo usuário ou pelo monitoramento."
    ],
    [
      "Hipótese",
      "Explicação testável para o sintoma."
    ],
    [
      "Evidência",
      "Resultado observado que apoia ou enfraquece uma hipótese."
    ],
    [
      "Escopo",
      "Conjunto de usuários, locais e serviços afetados."
    ],
    [
      "Baseline",
      "Referência de funcionamento normal usada em comparações."
    ],
    [
      "ICMP",
      "Protocolo usado, entre outras funções, por testes de eco e mensagens de erro."
    ],
    [
      "DNS",
      "Sistema de resolução de nomes e outros registros."
    ],
    [
      "Porta TCP",
      "Identificador de serviço no transporte; conexão não prova sucesso de aplicação."
    ],
    [
      "Caminho de retorno",
      "Trajeto necessário à resposta do destino."
    ],
    [
      "Mudança controlada",
      "Alteração com justificativa, escopo e reversão definidos."
    ],
    [
      "Validação",
      "Repetição dos testes e conferência do serviço após a correção."
    ],
    [
      "Registro do incidente",
      "Documentação do sintoma, causa, ações e resultado."
    ]
  ],
  "quiz": [
    {
      "type": "FUNDAMENTO",
      "q": "Qual pergunta delimita o escopo?",
      "a": [
        "Quais usuários e serviços falham e desde quando?",
        "Qual cabo trocar primeiro?",
        "Qual firewall desativar?",
        "Qual IP escolher aleatoriamente?"
      ],
      "c": 0,
      "e": "Escopo e temporalidade orientam as hipóteses."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Um ping sem resposta prova que o host está desligado?",
      "a": [
        "Sim, sempre",
        "Não; ICMP pode ser filtrado ou limitado",
        "Sim, se for IPv4",
        "Sim, se DNS resolver"
      ],
      "c": 1,
      "e": "A ausência de eco não identifica sozinha a causa."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Qual teste consulta resolução de nomes?",
      "a": [
        "show vlan brief",
        "Get-NetAdapter",
        "nslookup",
        "ip link"
      ],
      "c": 2,
      "e": "A consulta DNS investiga uma dependência diferente do enlace."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Conexão TCP 443 estabelecida prova que o login Web funciona?",
      "a": [
        "Sim, autenticação está garantida",
        "Sim, o certificado foi aprovado",
        "Sim, o conteúdo está correto",
        "Não; transporte e aplicação precisam de verificações distintas"
      ],
      "c": 3,
      "e": "TCP não valida todos os requisitos de HTTPS ou da aplicação."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Por que evitar várias alterações simultâneas?",
      "a": [
        "Porque dificultam identificar a causa e reverter com precisão",
        "Porque nenhum equipamento aceita mudanças",
        "Porque DNS proíbe",
        "Porque toda mudança gera broadcast"
      ],
      "c": 0,
      "e": "Uma variável por vez melhora o vínculo entre hipótese e resultado."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Qual evidência examinar antes de alterar a máscara de um host?",
      "a": [
        "A cor do patch cord",
        "Plano de endereçamento, VLAN e configuração observada",
        "A página inicial do navegador",
        "O nome do usuário"
      ],
      "c": 1,
      "e": "A máscara deve corresponder ao segmento planejado."
    },
    {
      "type": "FUNDAMENTO",
      "q": "Qual aspecto pode faltar mesmo com rota de ida correta?",
      "a": [
        "Endereço MAC universal",
        "Cabo coaxial obrigatório",
        "Rota ou permissão no caminho de retorno",
        "Um segundo servidor DNS em todos os casos"
      ],
      "c": 2,
      "e": "A resposta também precisa atravessar a rede."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Resolver um nome com sucesso garante que o serviço está disponível?",
      "a": [
        "Sim, DNS abre todas as portas",
        "Sim, o switch valida HTTP",
        "Sim, desde que use /24",
        "Não; o serviço e o caminho ainda podem falhar"
      ],
      "c": 3,
      "e": "DNS e serviço são dependências distintas."
    },
    {
      "type": "FUNDAMENTO",
      "q": "O que deve acontecer após uma correção?",
      "a": [
        "Repetir os testes e validar o serviço esperado",
        "Fechar o chamado sem testar",
        "Apagar as evidências",
        "Mudar as demais configurações"
      ],
      "c": 0,
      "e": "A validação confirma o efeito e busca regressões relevantes."
    },
    {
      "type": "APLICAÇÃO",
      "q": "Qual registro é mais útil?",
      "a": [
        "Apenas a frase rede lenta",
        "Sintoma, horário, comandos, resultados, causa e validação",
        "Somente o nome do técnico",
        "Apenas a última senha usada"
      ],
      "c": 1,
      "e": "O registro deve permitir entender e reproduzir o diagnóstico sem expor credenciais."
    }
  ],
  "videoTranscript": "0–20 s: o sintoma é delimitado por usuário, serviço e horário. 20–40 s: evidências de enlace, IP, DNS e TCP reduzem as hipóteses. 40–60 s: uma mudança justificada é seguida por validação do serviço e registro."
};
