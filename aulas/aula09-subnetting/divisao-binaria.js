(() => {
  const base = document.querySelector('#binaryBase');
  const target = document.querySelector('#binaryTarget');
  const play = document.querySelector('#binaryPlay');
  const reset = document.querySelector('#binaryReset');
  const grid = document.querySelector('#binaryGrid');
  const masks = document.querySelector('#binaryMasks');
  const legend = document.querySelector('#binaryLegend');
  const step = document.querySelector('#binaryStep');
  const math = document.querySelector('#binaryMath');
  const challenge = document.querySelector('#binaryChallenge');
  let current = 24, timer = null;
  for (let i = 0; i < 256; i++) {
    const cell = document.createElement('span');
    cell.setAttribute('aria-hidden', 'true');
    grid.appendChild(cell);
  }
  const mask = p => Array.from({length:4}, (_,octet) => Array.from({length:8}, (_,bit) => octet * 8 + bit < p ? '1' : '0').join('')).join('.');
  const stop = () => { if (timer !== null) clearInterval(timer); timer = null; play.textContent = 'Continuar'; };
  function render() {
    const initial = Number(base.value), chosen = Number(target.value), borrowed = current - initial;
    const networks = 2 ** borrowed, size = 2 ** (32-current), usable = size - 2;
    step.textContent = `Passo ${borrowed} de ${chosen-initial}: /${current}`;
    math.textContent = `${borrowed} bit(s) emprestado(s) → 2^${borrowed} = ${networks.toLocaleString('pt-BR')} sub-rede(s) dentro do /${initial}; 2^${32-current} = ${size.toLocaleString('pt-BR')} endereços por sub-rede; ${usable.toLocaleString('pt-BR')} utilizáveis em LAN convencional.`;
    const rows = [];
    for (let prefix=initial; prefix<=current; prefix++) rows.push(`/${prefix}  ${mask(prefix)}${prefix===current && prefix>initial ? '  ← novo bit' : ''}`);
    masks.textContent = rows.join('\n');
    const pre24 = current < 24;
    const cellsPerGroup = pre24 ? 2 ** (24-current) : 2 ** (32-current);
    const localGroups = 256 / cellsPerGroup;
    [...grid.children].forEach((cell, index) => {
      const group = Math.floor(index / cellsPerGroup);
      const selected = group % 2 === 0;
      cell.style.background = selected ? '#188447' : '#078c9b';
      cell.style.borderColor = index % cellsPerGroup === 0 ? '#071d2b' : 'rgba(255,255,255,.24)';
      cell.style.opacity = current === 30 && (index % 4 === 0 || index % 4 === 3) ? '.4' : '1';
    });
    legend.textContent = pre24 ? `Cada célula representa um bloco /24 da rede /16. Em /${current}, cada sub-rede agrupa ${cellsPerGroup} dessas células; o quadro mostra ${localGroups} sub-redes.` : `Cada célula representa um endereço de um /24 escolhido. O quadro mostra ${localGroups} bloco(s) /${current} dentro dele${initial===16 ? '; o total calculado acima considera toda a rede /16' : ''}. Cores alternadas distinguem blocos vizinhos.`;
    challenge.hidden = current !== 30;
  }
  function choices() {
    const first=Number(base.value), previous=Number(target.value)||30;
    target.replaceChildren();
    for(let p=first;p<=30;p++){const option=document.createElement('option');option.value=p;option.textContent=`/${p}`;target.append(option);}
    target.value=String(Math.max(first,previous)); current=first; stop(); play.textContent='Iniciar passo a passo'; render();
  }
  base.addEventListener('change',choices);
  target.addEventListener('change',()=>{stop();current=Number(base.value);play.textContent='Iniciar passo a passo';render();});
  reset.addEventListener('click',()=>{stop();current=Number(base.value);play.textContent='Iniciar passo a passo';render();});
  play.addEventListener('click',()=>{
    if(timer!==null){stop();return;}
    if(current>=Number(target.value)) current=Number(base.value);
    render();
    if(current===Number(target.value)){play.textContent='Recomeçar';return;}
    play.textContent='Pausar';
    timer=setInterval(()=>{current++;render();if(current>=Number(target.value)){stop();play.textContent='Recomeçar';}},1200);
  });
  target.value='30'; choices();
})();
