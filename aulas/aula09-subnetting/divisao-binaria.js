(() => {
  const get = id => document.getElementById(id);
  const base = get('binaryBase'), target = get('binaryTarget'), grid = get('binaryGrid');
  const prev = get('binaryPrev'), next = get('binaryNext'), play = get('binaryPlay');
  let current = 24, selected = 0, zoomOctet = 0, timer = null;
  const cells = Array.from({length: 256}, (_, i) => {
    const cell = document.createElement('button');
    cell.type = 'button'; cell.className = 'binary-cell';
    cell.addEventListener('keydown', event => { const offsets = {ArrowLeft:-1, ArrowRight:1, ArrowUp:-16, ArrowDown:16}; if (!(event.key in offsets)) return; event.preventDefault(); const destination = Math.max(0, Math.min(255, i + offsets[event.key])); cells[destination].focus(); });
    cell.addEventListener('click', () => { selected = i; if (current < 24) zoomOctet = i; render(); });
    grid.append(cell); return cell;
  });
  const number = n => n.toLocaleString('pt-BR');
  const address = n => [24,16,8,0].map(shift => Math.floor(n / 2 ** shift) % 256).join('.');
  const initialAddress = () => Number(base.value) === 16 ? 2886729728 : 3232238080; // 172.16.0.0 or 192.168.10.0
  const stop = () => { if (timer !== null) clearInterval(timer); timer = null; play.textContent = '▶ Reproduzir'; };
  function render() {
    const initial = Number(base.value), goal = Number(target.value), borrowed = current - initial;
    const size = 2 ** (32 - current), networks = 2 ** borrowed;
    const pre24 = current < 24;
    const perGroup = pre24 ? 2 ** (24-current) : size;
    const group = Math.floor(selected / perGroup);
    const blockStart = pre24 ? initialAddress() + group * size : initialAddress() + (initial === 16 ? zoomOctet * 256 : 0) + group * size;
    const maskNumber = 2 ** 32 - size;
    get('binaryStep').textContent = `PASSO ${borrowed} DE ${goal-initial} · /${current}`;
    get('binaryChange').textContent = borrowed === 0 ? 'O espaço inicial está inteiro. Escolha o próximo corte.' : `/${current-1} → /${current}: 1 bit emprestado · sub-redes × 2 · endereços por bloco ÷ 2`;
    const mask = get('binaryMasks'); mask.replaceChildren();
    for (let i=0; i<32; i++) {
      if (i && i%8===0) mask.append(document.createTextNode('.'));
      const bit=document.createElement('span'); bit.textContent=i<current?'1':'0';
      bit.className=i<initial?'bit-original':i===current-1&&borrowed>0?'bit-new':i<current?'bit-borrowed':'bit-host';
      mask.append(bit);
    }
    const history = get('binaryHistory'); history.replaceChildren();
    for (let p=initial; p<=current; p++) { const row=document.createElement('div'); row.textContent = `/${p}  ` + Array.from({length:4}, (_,o)=>Array.from({length:8}, (_,b)=>o*8+b<p?'1':'0').join('')).join('.'); history.append(row); }
    get('binaryDecimal').textContent = `Máscara /${current}: ${address(maskNumber)} · ${32-current} bits para endereços de host`;
    get('binaryMath').textContent = `${borrowed} bits emprestados: 2^${borrowed} = ${number(networks)} ${networks===1?'bloco':'sub-redes'} dentro da rede /${initial}. Cada bloco tem 2^${32-current} = ${number(size)} endereços; ${number(size-2)} utilizáveis na convenção IPv4 tradicional.`;
    const zone = initial === 16 ? `172.16.${zoomOctet}.0/24` : '192.168.10.0/24';
    get('binaryGridTitle').textContent=pre24?'A rede 172.16.0.0/16':`Quadro de ${zone}`;
    get('binaryScale').textContent=pre24?'1 célula = 1 bloco /24':'1 célula = 1 endereço IPv4';
    get('binaryLegend').textContent=pre24?'Cada célula é um /24. Selecione uma célula para escolher em qual /24 faremos o zoom. Os contornos mostram os blocos do prefixo atual.':'Selecione uma posição para examinar sua sub-rede. Os contornos marcam os cortes; no bloco selecionado, as cores identificam rede, hosts e broadcast.';
    const zoom=get('binaryZoom'); zoom.hidden=initial!==16 || current<24;
    zoom.textContent=`Zoom: exibimos os 256 endereços do bloco ${zone}. A contagem de sub-redes considera todo o /16 inicial.`;
    cells.forEach((cell,i)=>{
      const g=Math.floor(i/perGroup), within=i%perGroup, active=g===group;
      cell.className='binary-cell'+(active?' selected':'');
      if(!pre24&&active) cell.classList.add(within===0?'network':within===perGroup-1?'broadcast':'usable');
      cell.style.borderLeftWidth=(i%16===0 || Math.floor((i-1)/perGroup)!==g)?'3px':'1px';
      cell.style.borderTopWidth=(i<16 || Math.floor((i-16)/perGroup)!==g)?'3px':'1px';
      cell.style.borderRightWidth=(i%16===15 || Math.floor((i+1)/perGroup)!==g)?'3px':'1px';
      cell.style.borderBottomWidth=(i>=240 || Math.floor((i+16)/perGroup)!==g)?'3px':'1px';
      cell.setAttribute('aria-label',pre24?`Selecionar bloco 172.16.${i}.0/24`:`Selecionar endereço ${address(initialAddress()+(initial===16?zoomOctet*256:0)+i)}`);
      cell.setAttribute('aria-pressed',i===selected?'true':'false'); cell.tabIndex=i===selected?0:-1;
    });
    const details=get('binaryDetails'); details.replaceChildren();
    const values=[['Prefixo',`/${current}`],['Endereço de rede',address(blockStart)],['Primeiro utilizável',address(blockStart+1)],['Último utilizável',address(blockStart+size-2)],['Broadcast',address(blockStart+size-1)]];
    values.forEach(([label,value])=>{ const row=document.createElement('div'), left=document.createElement('span'), right=document.createElement('strong'); left.textContent=label; right.textContent=value; row.append(left,right); details.append(row); });
    get('binaryChallenge').hidden=current!==30;
    prev.disabled=current<=initial; next.disabled=current>=goal;
  }
  function configure() {
    stop(); const first=Number(base.value), previous=Number(target.value)||30;
    target.replaceChildren(); for(let p=first;p<=30;p++){ const option=document.createElement('option'); option.value=String(p); option.textContent=`/${p}`; target.append(option); }
    target.value=String(Math.max(first,previous)); current=first; selected=0; zoomOctet=0; render();
  }
  function advance() { if(current>=Number(target.value)){stop();return;} if(current===23 && Number(base.value)===16){zoomOctet=selected;selected=0;} current++; render(); if(current>=Number(target.value))stop(); }
  base.addEventListener('change',configure);
  target.addEventListener('change',()=>{stop();current=Number(base.value);selected=0;zoomOctet=0;render();});
  prev.addEventListener('click',()=>{stop(); if(current>Number(base.value)){if(current===24 && Number(base.value)===16)selected=zoomOctet;current--;render();}});
  next.addEventListener('click',()=>{stop();advance();});
  get('binaryReset').addEventListener('click',()=>{stop();current=Number(base.value);selected=0;zoomOctet=0;render();});
  play.addEventListener('click',()=>{if(timer!==null){stop();return;} if(current>=Number(target.value)){current=Number(base.value);selected=0;zoomOctet=0;render();} if(current<Number(target.value)){play.textContent='❚❚ Pausar';timer=setInterval(advance,3000);}});
  configure();
})();
