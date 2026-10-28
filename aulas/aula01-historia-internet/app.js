(() => {
  "use strict";

  const storageKey = "ifsp-redes-aula-01";
  const state = JSON.parse(localStorage.getItem(storageKey) || "{}");
  const save = () => localStorage.setItem(storageKey, JSON.stringify(state));

  const themeButton = document.querySelector("#themeButton");
  const preferredTheme = state.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = preferredTheme;
  themeButton.addEventListener("click", () => {
    document.documentElement.dataset.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    state.theme = document.documentElement.dataset.theme;
    save();
  });
  document.querySelector("#printButton").addEventListener("click", () => print());

  const sections = [...document.querySelectorAll("[data-track]")];
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const updateScroll = () => {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    const percent = scrollable > 0 ? Math.min(100, Math.round(scrollY / scrollable * 100)) : 0;
    document.querySelector("#globalProgress").style.width = `${percent}%`;
    document.querySelector("#progressLabel").textContent = `${percent}% concluído`;
    let current = sections[0]?.id;
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 175) current = section.id; });
    navLinks.forEach(link => link.classList.toggle("active", link.hash === `#${current}`));
  };
  addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  const hypothesisFeedback = document.querySelector("#hypothesisFeedback");
  document.querySelectorAll("[data-hypothesis]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-hypothesis]").forEach(item => item.classList.remove("selected"));
    button.classList.add("selected");
    const correct = button.dataset.hypothesis === "collective";
    hypothesisFeedback.hidden = false;
    hypothesisFeedback.innerHTML = correct
      ? "<strong>Boa hipótese.</strong> A aula mostrará essa construção coletiva e progressiva."
      : "<strong>Essa explicação é comum, mas incompleta.</strong> Continue: vamos confrontá-la com a sequência histórica.";
    state.hypothesis = button.dataset.hypothesis;
    save();
  }));
  if (state.hypothesis) document.querySelector(`[data-hypothesis="${state.hypothesis}"]`)?.click();

  const sendPackets = document.querySelector("#sendPackets");
  const packets = [...document.querySelectorAll(".packet")];
  const assembly = [...document.querySelectorAll("#packetAssembly i")];
  const packetStatus = document.querySelector("#packetStatus");
  let packetTimers = [];
  sendPackets.addEventListener("click", () => {
    packetTimers.forEach(clearTimeout); packetTimers = [];
    packets.forEach(packet => { packet.classList.remove("running"); void packet.offsetWidth; packet.classList.add("running"); });
    assembly.forEach(item => { item.className = ""; item.textContent = "—"; });
    packetStatus.textContent = "Pacotes em trânsito por rotas diferentes…";
    const arrivals = [[1,2700],[3,3000],[0,3200],[2,3650]];
    arrivals.forEach(([index,time],order) => packetTimers.push(setTimeout(() => {
      assembly[index].classList.add("arrived"); assembly[index].textContent = String(index + 1);
      packetStatus.textContent = order < 3 ? `Pacote ${index+1} chegou. A ordem ainda está incompleta.` : "Todos chegaram: 1 → 2 → 3 → 4. Mensagem reconstruída.";
    }, time)));
  });

  const alohaChannel = document.querySelector(".aloha-channel");
  const alohaStatus = document.querySelector("#alohaStatus");
  let activeStation = null;
  let alohaTimer = null;
  document.querySelectorAll("[data-station]").forEach(button => button.addEventListener("click", () => {
    const station = button.dataset.station;
    const signal = document.querySelector(`.signal-${station}`);
    if (activeStation && activeStation !== station) {
      clearTimeout(alohaTimer);
      document.querySelector(`.signal-${activeStation}`)?.classList.add("transmit");
      signal.classList.add("transmit");
      alohaChannel.classList.add("collision");
      alohaStatus.innerHTML = "<strong>Colisão!</strong> As duas estações aguardam intervalos aleatórios antes de tentar novamente.";
      activeStation = null;
      setTimeout(() => { document.querySelectorAll(".signal").forEach(s => s.classList.remove("transmit")); alohaChannel.classList.remove("collision"); alohaStatus.textContent = "Canal livre após o recuo aleatório."; }, 1700);
      return;
    }
    activeStation = station;
    signal.classList.add("transmit");
    alohaStatus.textContent = `Estação ${station.toUpperCase()} transmitindo… clique na outra estação agora para provocar colisão.`;
    alohaTimer = setTimeout(() => {
      signal.classList.remove("transmit");
      alohaStatus.textContent = `Quadro de ${station.toUpperCase()} confirmado. Transmissão bem-sucedida.`;
      activeStation = null;
    }, 900);
  }));

  const protocolContent = {
    ip: ["Internet Protocol", "O IP oferece uma linguagem comum acima das redes de acesso. Um roteador pode retirar o quadro Ethernet recebido, analisar o datagrama IP e colocá-lo em outro tipo de quadro para o próximo enlace."],
    tcp: ["Transmission Control Protocol", "O TCP funciona fim a fim. Numera segmentos, identifica perdas, retransmite dados e controla o fluxo quando a aplicação precisa de uma entrega confiável."]
  };
  document.querySelectorAll("[data-protocol]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-protocol]").forEach(item => item.classList.remove("active")); button.classList.add("active");
    const [title,body] = protocolContent[button.dataset.protocol];
    document.querySelector("#protocolExplanation").innerHTML = `<strong>${title}</strong><p>${body}</p>`;
  }));

  const standardContent = {
    ieee: ["802", "IEEE 802 é uma família, não um único padrão.", "O IEEE trabalha principalmente nas camadas Física e de Enlace. Ethernet transporta o datagrama IP dentro da rede local."],
    ietf: ["RFC", "A IETF desenvolve e documenta protocolos da Internet.", "As RFCs registram padrões, boas práticas, experimentos e informação. Nem toda RFC possui status de padrão."],
    iso: ["OSI", "A ISO fornece um modelo de referência em sete camadas.", "O OSI é uma ferramenta conceitual para separar funções. A Internet, por sua vez, opera principalmente com a arquitetura TCP/IP."]
  };
  document.querySelectorAll("[data-standard]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-standard]").forEach(item => item.classList.remove("selected")); button.classList.add("selected");
    const [mark,title,body] = standardContent[button.dataset.standard];
    document.querySelector("#standardDetail").innerHTML = `<span class="detail-mark">${mark}</span><div><strong>${title}</strong><p>${body}</p></div>`;
  }));

  const layerContent = {
    7:["CAMADA 7 • APLICAÇÃO","Serviços usados pelas aplicações","Exemplos: HTTP, DNS, SMTP e protocolos de transferência de arquivos."],
    6:["CAMADA 6 • APRESENTAÇÃO","Representação dos dados","Formatação, codificação, compressão e proteção dos dados."],
    5:["CAMADA 5 • SESSÃO","Controle do diálogo","Organiza sessões e o diálogo entre aplicações."],
    4:["CAMADA 4 • TRANSPORTE","Comunicação fim a fim","TCP e UDP usam portas para entregar dados ao processo correto."],
    3:["CAMADA 3 • REDE","Endereçamento e roteamento","O IP fornece endereços lógicos; roteadores escolhem o próximo caminho."],
    2:["CAMADA 2 • ENLACE","Quadros e acesso ao meio","Ethernet e Wi‑Fi controlam a entrega local e utilizam endereços MAC."],
    1:["CAMADA 1 • FÍSICA","Sinais e bits","Cabos, fibras, rádio, conectores e características elétricas ou ópticas."]
  };
  document.querySelectorAll("[data-layer]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-layer]").forEach(item => item.classList.remove("selected")); button.classList.add("selected");
    const [label,title,body] = layerContent[button.dataset.layer];
    document.querySelector("#layerDetail").innerHTML = `<span>${label}</span><strong>${title}</strong><p>${body}</p>`;
  }));

  const timelineEvents = [
    ["1957","Sputnik","A corrida tecnológica acelera investimentos norte-americanos em pesquisa avançada."],
    ["1958","ARPA","A agência é criada para financiar projetos tecnológicos avançados."],
    ["1969","ARPANET + RFC 1","Quatro nós iniciam a ARPANET; a primeira RFC inaugura uma série documental aberta."],
    ["1971","ALOHAnet","Pacotes via rádio conectam instalações da Universidade do Havaí."],
    ["1973","Ethernet","Metcalfe e Boggs desenvolvem uma LAN baseada em quadros no Xerox PARC."],
    ["1980","IEEE 802","O comitê passa a desenvolver padrões para redes locais e metropolitanas."],
    ["1983","TCP/IP","A ARPANET substitui o NCP pela arquitetura TCP/IP."],
    ["1984","OSI","A ISO publica a primeira edição do modelo básico de referência OSI."],
    ["1989","Web","Tim Berners-Lee apresenta no CERN a proposta da World Wide Web."],
    ["1995","Internet comercial","A retirada da NSFNET como backbone marca a consolidação de provedores e backbones comerciais."]
  ];
  const timeline = document.querySelector("#timeline");
  timelineEvents.forEach(([year,title,body],index) => {
    const button = document.createElement("button"); button.type = "button"; button.innerHTML = `<strong>${year}</strong><span>${title}</span>`;
    button.addEventListener("click", () => { timeline.querySelectorAll("button").forEach(b => b.classList.remove("active")); button.classList.add("active"); document.querySelector("#timelineDetail").innerHTML = `<strong>${year} • ${title}</strong><p>${body}</p>`; });
    timeline.append(button); if(index===0) button.classList.add("active");
  });

  const flashcards = [
    ["ARPA","Agência criada em 1958 para financiar pesquisas tecnológicas avançadas nos Estados Unidos."],
    ["ARPANET","Rede experimental de comutação de pacotes que começou com quatro nós em 1969."],
    ["IMP","Equipamento intermediário da ARPANET responsável por encaminhar mensagens, comparável funcionalmente a um roteador."],
    ["Pacote","Unidade em que uma mensagem é dividida para compartilhar enlaces e atravessar a rede."],
    ["ALOHAnet","Rede de rádio da Universidade do Havaí que investigou o acesso de várias estações a um meio compartilhado."],
    ["Ethernet","Tecnologia de rede local baseada em quadros, posteriormente padronizada na família IEEE 802.3."],
    ["Endereço MAC","Identificador usado pela camada de Enlace para a entrega dentro de uma rede local."],
    ["TCP/IP","Arquitetura aberta que permitiu interligar redes com diferentes tecnologias de acesso."],
    ["RFC","Documento numerado e permanente que registra protocolos, processos, práticas ou informação relacionada à Internet."],
    ["IEEE 802","Família de padrões relacionada principalmente às camadas Física e de Enlace em LANs e MANs."],
    ["Modelo OSI","Modelo de referência em sete camadas que organiza as funções de comunicação."],
    ["World Wide Web","Serviço de hipertexto que funciona sobre a Internet utilizando recursos como URL, HTTP e HTML."]
  ];
  let flashIndex = 0;
  const flashcard = document.querySelector("#flashcard");
  const flashDots = document.querySelector("#flashDots");
  flashcards.forEach((_,i) => { const dot=document.createElement("i"); if(i===0) dot.classList.add("active"); flashDots.append(dot); });
  const renderFlash = () => {
    flashcard.classList.remove("flipped");
    document.querySelector("#flashTerm").textContent = flashcards[flashIndex][0];
    document.querySelector("#flashDefinition").textContent = flashcards[flashIndex][1];
    document.querySelector("#flashCounter").textContent = `${flashIndex+1}/${flashcards.length}`;
    [...flashDots.children].forEach((dot,i)=>dot.classList.toggle("active",i===flashIndex));
  };
  flashcard.addEventListener("click", () => flashcard.classList.toggle("flipped"));
  document.querySelector("#flashPrev").addEventListener("click", () => { flashIndex=(flashIndex-1+flashcards.length)%flashcards.length; renderFlash(); });
  document.querySelector("#flashNext").addEventListener("click", () => { flashIndex=(flashIndex+1)%flashcards.length; renderFlash(); });

  const quizData = [
    {type:"CONTEXTO HISTÓRICO",q:"Qual acontecimento contribuiu diretamente para a criação da ARPA em 1958?",a:["O lançamento do Sputnik pela União Soviética","A criação do primeiro navegador Web","A publicação do modelo OSI","A comercialização do Ethernet"],c:0,e:"O Sputnik, lançado em 1957, expôs uma percepção de desvantagem tecnológica e levou os Estados Unidos a ampliar o investimento estratégico em pesquisa."},
    {type:"ANÁLISE",q:"Por que afirmar que a ARPANET foi criada apenas para sobreviver a uma guerra nuclear é uma simplificação?",a:["Porque a rede não utilizava comutação de pacotes","Porque compartilhamento de recursos, colaboração científica e pesquisa em comunicação também eram objetivos","Porque a ARPANET foi uma iniciativa exclusivamente comercial","Porque a ARPANET surgiu depois da Web"],c:1,e:"A resiliência fazia parte do contexto, mas não explica sozinha o projeto. Compartilhar computadores caros e investigar redes distribuídas foram motivações importantes."},
    {type:"CONCEITO",q:"Qual característica torna a comutação de pacotes adequada ao tráfego de computadores?",a:["Reserva permanente de um circuito para cada host","Transmissão de todos os dados em um único bloco","Compartilhamento dos enlaces por fluxos que enviam dados em rajadas","Obrigação de todos os pacotes seguirem exatamente a mesma rota"],c:2,e:"Computadores produzem dados em rajadas. Os pacotes permitem compartilhar estatisticamente o enlace, utilizando a capacidade quando ela é necessária."},
    {type:"MARCO HISTÓRICO",q:"O que ocorreu na primeira comunicação da ARPANET em 29 de outubro de 1969?",a:["A palavra INTERNET foi transmitida integralmente","A tentativa de enviar LOGIN parou depois de LO","O protocolo TCP/IP substituiu o NCP","O primeiro site Web foi publicado"],c:1,e:"UCLA tentou enviar LOGIN ao SRI, mas o sistema caiu depois das letras LO. Mesmo incompleta, a mensagem marcou a primeira comunicação host a host da ARPANET."},
    {type:"APLICAÇÃO",q:"Em uma rede ALOHA, duas estações transmitem simultaneamente e nenhuma recebe confirmação. O que devem fazer?",a:["Reservar permanentemente o canal","Esperar intervalos aleatórios e retransmitir","Alterar o endereço IP","Enviar continuamente até uma delas vencer"],c:1,e:"O recuo aleatório reduz a chance de as estações colidirem novamente no mesmo instante."},
    {type:"RELAÇÃO ENTRE TECNOLOGIAS",q:"Qual alternativa descreve corretamente a relação entre ALOHAnet e Ethernet?",a:["Ethernet foi o nome comercial da ALOHAnet","ALOHAnet substituiu o Ethernet nas redes cabeadas","O estudo de acesso aleatório a um meio compartilhado influenciou o desenvolvimento do Ethernet","Ambas foram criadas pela ISO para implementar o modelo OSI"],c:2,e:"ALOHAnet e ARPANET foram linhas paralelas. O princípio de compartilhar e disputar um meio influenciou o Ethernet, embora as tecnologias não sejam idênticas."},
    {type:"PADRONIZAÇÃO",q:"Qual associação está correta?",a:["IEEE 802.3 — Ethernet","IETF — modelo OSI de sete camadas","ISO — protocolo TCP","RFC 8200 — Wi‑Fi"],c:0,e:"O IEEE 802.3 padroniza Ethernet. A IETF documenta protocolos da Internet; a ISO publicou o modelo de referência OSI; a RFC 8200 especifica IPv6."},
    {type:"DOCUMENTAÇÃO",q:"Por que RFC não é sinônimo de padrão da Internet?",a:["Porque RFCs são documentos secretos","Porque uma RFC pode ser informativa, experimental, histórica, uma boa prática ou parte da trilha de padrões","Porque toda RFC perde validade após um ano","Porque RFCs tratam apenas de cabeamento"],c:1,e:"RFC é uma série documental. O status e a finalidade variam; apenas uma parte integra a trilha de padrões."},
    {type:"ARQUITETURA",q:"Que problema fundamental o TCP/IP ajudou a resolver?",a:["A criação de páginas com hipertexto","A fabricação de cabos mais rápidos","A interligação de redes com tecnologias diferentes","A substituição de todos os protocolos por Ethernet"],c:2,e:"O IP oferece uma linguagem comum acima das redes de acesso, permitindo que datagramas atravessem redes heterogêneas com a ajuda de roteadores."},
    {type:"DISTINÇÃO ESSENCIAL",q:"Qual afirmação diferencia corretamente Internet e Web?",a:["A Web é a infraestrutura física e a Internet é um navegador","A Internet surgiu no CERN em 1989","Internet e Web são nomes equivalentes","A Internet é a rede global de redes; a Web é um serviço de hipertexto que funciona sobre ela"],c:3,e:"A Internet transporta muitos serviços. A Web utiliza essa infraestrutura por meio de elementos como URLs, HTTP, HTML, navegadores e servidores."}
  ];
  let quiz = [], questionIndex = 0, score = 0, answered = false, wrongBank = [], reviewMode = false;
  const shuffle = array => array.map(value => ({value,sort:Math.random()})).sort((a,b)=>a.sort-b.sort).map(({value})=>value);
  const startQuiz = (bank = quizData, reviewing = false) => {
    reviewMode = reviewing;
    wrongBank = [];
    quiz = bank.map(item => {
      const options = item.a.map((text,index)=>({text,correct:index===item.c}));
      return {...item,options:shuffle(options)};
    });
    questionIndex=0; score=0; answered=false;
    document.querySelector("#quizIntro").hidden=true; document.querySelector("#quizResult").hidden=true; document.querySelector("#quizCard").hidden=false;
    document.querySelector("#quizScore").textContent=`0/${quiz.length}`; renderQuestion();
  };
  const renderQuestion = () => {
    answered=false; const item=quiz[questionIndex];
    document.querySelector("#questionNumber").textContent=`${reviewMode ? "Revisão" : "Questão"} ${questionIndex+1} de ${quiz.length}`;
    document.querySelector("#quizProgressBar").style.width=`${(questionIndex+1)/quiz.length*100}%`;
    document.querySelector("#questionType").textContent=item.type; document.querySelector("#questionText").textContent=item.q;
    const answers=document.querySelector("#answers"); answers.innerHTML="";
    item.options.forEach((option,index)=>{
      const button=document.createElement("button"); button.type="button"; button.className="answer-button"; button.innerHTML=`<b>${String.fromCharCode(65+index)}</b><span>${option.text}</span>`;
      button.addEventListener("click",()=>answerQuestion(button,option.correct)); answers.append(button);
    });
    const feedback=document.querySelector("#answerFeedback"); feedback.hidden=true; feedback.className="answer-feedback"; document.querySelector("#nextQuestion").hidden=true;
  };
  const answerQuestion = (button,correct) => {
    if(answered) return; answered=true;
    document.querySelectorAll(".answer-button").forEach((item,index)=>{ item.disabled=true; if(quiz[questionIndex].options[index].correct) item.classList.add("correct"); });
    if(correct){ score++; button.classList.add("correct"); } else { button.classList.add("wrong"); wrongBank.push(quiz[questionIndex]); }
    document.querySelector("#quizScore").textContent=`${score}/${quiz.length}`;
    const feedback=document.querySelector("#answerFeedback"); feedback.hidden=false; feedback.classList.add(correct?"correct":"wrong"); feedback.innerHTML=`<strong>${correct?"Correto.":"Ainda não."}</strong> ${quiz[questionIndex].e}`;
    document.querySelector("#nextQuestion").hidden=false;
  };
  const finishQuiz = () => {
    document.querySelector("#quizCard").hidden=true; const result=document.querySelector("#quizResult"); result.hidden=false;
    const passed=reviewMode ? wrongBank.length===0 : score>=7; document.querySelector("#resultScore").textContent=score; document.querySelector(".result-ring span").textContent=`/${quiz.length}`; document.querySelector("#resultStatus").textContent=reviewMode?(passed?"ERROS SUPERADOS":"AINDA HÁ PONTOS A REVER"):(passed?"AULA CONCLUÍDA":"REVISÃO RECOMENDADA");
    document.querySelector("#resultTitle").textContent=reviewMode?(passed?"Revisão concluída.":"Vamos revisar novamente."):(passed?"Você conectou as ideias principais.":"Revise as conexões antes de avançar.");
    document.querySelector("#resultMessage").textContent=reviewMode?(passed?"Você respondeu corretamente às questões que havia errado.":"Leia novamente as explicações e repita apenas os itens restantes."):(passed?"O resultado foi salvo neste navegador. Você pode refazer o quiz para consolidar o conteúdo.":"Use a síntese e os flashcards e tente novamente. A meta de conclusão é 7/10.");
    const reviewButton=document.querySelector("#reviewErrors"); reviewButton.hidden=wrongBank.length===0; reviewButton.textContent=`Revisar erros (${wrongBank.length})`;
    if(!reviewMode){ state.bestScore=Math.max(state.bestScore||0,score); state.completed=state.bestScore>=7; save(); }
  };
  document.querySelector("#startQuiz").addEventListener("click",()=>startQuiz()); document.querySelector("#retryQuiz").addEventListener("click",()=>startQuiz());
  document.querySelector("#reviewErrors").addEventListener("click",()=>{ const errors=[...wrongBank]; startQuiz(errors,true); });
  document.querySelector("#nextQuestion").addEventListener("click",()=>{ if(questionIndex<quiz.length-1){questionIndex++;renderQuestion();}else finishQuiz(); });
  if(state.bestScore!=null) document.querySelector("#quizScore").textContent=`melhor ${state.bestScore}/10`;
})();
