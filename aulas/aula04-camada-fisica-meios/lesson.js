window.LESSON_DATA = {
  slug: "aula-04-camada-fisica-meios",
  flashcards: [
    ["Camada Física", "Responsável por representar bits como sinais e definir características de meios, interfaces, sincronização e transmissão."],
    ["Codificação", "Regra que associa bits ou símbolos a mudanças observáveis no sinal."],
    ["Largura de banda", "Capacidade nominal de um canal ou tecnologia, normalmente expressa em bits por segundo."],
    ["Throughput", "Taxa efetiva de dados observada, influenciada por sobrecarga, disputa, erros e gargalos."],
    ["Latência", "Tempo necessário para uma informação atravessar o caminho e ser processada."],
    ["Atenuação", "Redução da intensidade do sinal ao longo da propagação."],
    ["Crosstalk", "Interferência causada pelo acoplamento de sinais entre pares ou circuitos próximos."],
    ["UTP", "Cabo de pares trançados sem blindagem metálica adicional, muito usado em LANs."],
    ["Fibra monomodo", "Fibra de núcleo menor, adequada a grandes distâncias e alta capacidade com ópticas compatíveis."],
    ["Fibra multimodo", "Fibra de núcleo maior e múltiplos modos de propagação, comum em enlaces internos de menor distância."],
    ["Meio compartilhado", "Meio cuja capacidade e tempo de transmissão são disputados por múltiplas estações, como ocorre no rádio."],
    ["EMI", "Interferência eletromagnética que pode afetar sinais elétricos; fibras ópticas são imunes a esse fenômeno."],
  ],
  quiz: [
    {type:"FUNDAMENTO",q:"O que efetivamente se propaga pelo meio físico?",a:["Sinais que representam bits","Páginas Web completas sem codificação","Endereços IP isolados","Arquivos sem qualquer transformação"],c:0,e:"Bits são uma representação abstrata. O transmissor os codifica como sinais elétricos, ópticos ou de rádio."},
    {type:"DESEMPENHO",q:"Qual métrica descreve a taxa efetivamente observada por uma transferência?",a:["Throughput","Largura de banda nominal","Diâmetro do cabo","Número de camadas OSI"],c:0,e:"Throughput é a entrega real, normalmente menor que a capacidade nominal por causa de sobrecargas e condições do caminho."},
    {type:"DESEMPENHO",q:"Uma aplicação interativa responde lentamente apesar de haver capacidade disponível. Qual métrica merece atenção imediata?",a:["Latência","Cor do conector","Quantidade de pares do cabo apenas","Nome do protocolo de aplicação apenas"],c:0,e:"Aplicações interativas são sensíveis ao tempo de ida e volta, não apenas à taxa máxima do enlace."},
    {type:"COBRE",q:"Por que pares de cobre são trançados?",a:["Para reduzir efeitos de interferência e diafonia","Para converter eletricidade em luz","Para aumentar o endereço IP","Para eliminar a necessidade de conectores"],c:0,e:"O trançamento melhora o equilíbrio do par e ajuda o receptor a rejeitar ruído comum."},
    {type:"COBRE",q:"Qual limite é uma referência comum para canais Ethernet em cabeamento balanceado de quatro pares?",a:["100 metros","10 quilômetros","2 metros","Sem limite de distância"],c:0,e:"Muitas variantes Ethernet sobre pares trançados usam canal de até 100 m; o padrão específico e a categoria precisam ser verificados."},
    {type:"FIBRA",q:"Qual vantagem da fibra é especialmente relevante em um ambiente com forte interferência eletromagnética?",a:["Imunidade a EMI","Uso de sinais elétricos mais intensos","Dispensa de transceptores","Capacidade de transmitir energia elétrica ao host"],c:0,e:"A fibra transporta luz em material dielétrico e não capta interferência eletromagnética como o cobre."},
    {type:"FIBRA",q:"Qual fibra tende a ser escolhida para distâncias maiores?",a:["Monomodo","Multimodo em qualquer condição","Par trançado sem blindagem","Cabo coaxial de TV automaticamente"],c:0,e:"A fibra monomodo reduz a dispersão modal e é a base de muitos enlaces ópticos de longa distância."},
    {type:"SEM FIO",q:"Por que Wi-Fi exige planejamento de canais e capacidade?",a:["Porque o rádio é um meio compartilhado sujeito a interferência e contenção","Porque cada cliente recebe um cabo exclusivo","Porque ondas de rádio não sofrem atenuação","Porque pontos de acesso não se conectam à rede cabeada"],c:0,e:"Clientes compartilham tempo de uso do canal e o ambiente altera a propagação; cobertura e capacidade precisam ser planejadas juntas."},
    {type:"PROJETO",q:"Qual meio tende a ser o ponto de partida para conectar dois prédios separados por 600 m em ambiente industrial ruidoso?",a:["Fibra óptica","UTP comum em enlace único de 600 m","Bluetooth","Cabo de console"],c:0,e:"Distância e interferência favorecem fibra, mas transceptores, rota, orçamento óptico e redundância ainda precisam ser projetados."},
    {type:"ANÁLISE",q:"Qual afirmação é correta?",a:["Maior largura de banda não elimina automaticamente latência e perda","Throughput sempre é igual à capacidade nominal","Fibra não exige limpeza ou compatibilidade óptica","Wi-Fi elimina a necessidade de infraestrutura física"],c:0,e:"Desempenho depende de várias métricas e de todos os segmentos do caminho."},
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  const distance = document.querySelector("#distance");
  const interference = document.querySelector("#interference");
  const mobility = document.querySelector("#mobility");
  const update = () => {
    const d = Number(distance.value);
    const i = Number(interference.value);
    const m = Number(mobility.value);
    document.querySelector("#distanceValue").textContent = `${d} m`;
    document.querySelector("#interferenceValue").textContent = i < 4 ? "baixa" : i < 7 ? "média" : "alta";
    document.querySelector("#mobilityValue").textContent = m < 4 ? "fixa" : m < 7 ? "moderada" : "essencial";
    let icon = "〰", title = "Cobre de par trançado", reason = "A distância está dentro do alcance típico, a interferência é baixa e os dispositivos são fixos.";
    if (m >= 7) {
      icon = ")))"; title = "Rede local sem fio"; reason = "A mobilidade é requisito dominante. Planeje cobertura, capacidade, canais, segurança e uma infraestrutura cabeada para os pontos de acesso.";
    } else if (d > 100 || i >= 7) {
      icon = "✦"; title = "Fibra óptica"; reason = d > 100 ? "A distância excede o alcance típico de um canal Ethernet em cobre; fibra oferece maior alcance." : "A interferência eletromagnética elevada favorece um meio óptico imune a EMI.";
    } else if (i >= 4) {
      icon = "≈"; title = "Cobre com projeto reforçado"; reason = "O alcance ainda é local, mas a interferência pede rota cuidadosa, separação, componentes adequados e possível blindagem com aterramento correto.";
    }
    document.querySelector("#mediumIcon").textContent = icon;
    document.querySelector("#mediumTitle").textContent = title;
    document.querySelector("#mediumReason").textContent = reason;
  };
  [distance, interference, mobility].forEach((control) => control.addEventListener("input", update));
  update();
});
