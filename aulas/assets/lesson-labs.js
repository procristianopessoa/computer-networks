(() => {
  'use strict';
  const ipv4 = (text) => {
    if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(text)) throw new Error('Digite quatro octetos IPv4 entre 0 e 255.');
    const parts = text.split('.').map(Number);
    if (parts.some(n => n < 0 || n > 255)) throw new Error('Cada octeto deve estar entre 0 e 255.');
    return parts.reduce((sum, n) => sum * 256 + n, 0);
  };
  const dotted = n => [24,16,8,0].map(shift => Math.floor(n / 2 ** shift) % 256).join('.');
  const block = (address, prefix) => {
    if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) throw new Error('O prefixo deve ser um inteiro de 0 a 32.');
    const ip = ipv4(address), size = 2 ** (32 - prefix), network = Math.floor(ip / size) * size;
    return {ip,prefix,size,network,last:network + size - 1,mask:2 ** 32 - size,hosts:prefix < 31 ? size - 2 : prefix === 31 ? 2 : 1};
  };
  const plan = (cidr, demands) => {
    const match = cidr.trim().match(/^(\d{1,3}(?:\.\d{1,3}){3})\/(\d{1,2})$/);
    if (!match) throw new Error('Use uma rede-base no formato 192.168.20.0/24.');
    const base = block(match[1], Number(match[2]));
    if (base.prefix < 16 || base.prefix > 30) throw new Error('Neste exercício, use uma base de /16 a /30.');
    if (base.ip !== base.network) throw new Error('A base precisa ser um endereço de rede alinhado. Rede correta: ' + dotted(base.network) + '/' + base.prefix + '.');
    if (!Array.isArray(demands) || !demands.length || demands.length > 16 || demands.some(n => !Number.isInteger(n) || n < 1 || n > 65534)) throw new Error('Informe de 1 a 16 demandas inteiras, entre 1 e 65534 interfaces cada.');
    let cursor = base.network;
    const rows = demands.map((need,index) => ({need,index,size:2 ** Math.max(2, Math.ceil(Math.log2(need+2)))})).sort((a,b) => b.size - a.size || a.index - b.index).map(row => {
      const network = Math.ceil(cursor / row.size) * row.size;
      const last = network + row.size - 1;
      if (last > base.last) throw new Error('As demandas não cabem na rede-base. Revise a base ou a quantidade de interfaces.');
      cursor = last + 1;
      return {...row,network,last,prefix:32-Math.log2(row.size),hosts:row.size-2};
    });
    return {base,rows,cursor,free:base.last-cursor+1};
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = {ipv4,dotted,block,plan};
  if (typeof document === 'undefined') return;
  document.addEventListener('DOMContentLoaded', () => {
    const lab = document.querySelector('[data-lab]');
    const transcript = document.querySelector('#videoTranscript');
    if (transcript) transcript.textContent = window.LESSON_DATA?.videoTranscript || '';
    if (!lab) return;
    const output = document.querySelector('#labOutput');
    const get = id => document.getElementById(id);
    const show = text => { output.innerHTML = text; };
    const safe = fn => { try { fn(); } catch (error) { output.replaceChildren(); const p = document.createElement('p'); p.className='lab-error'; p.textContent=error.message; output.append(p); } };
    const run = (label,fn) => get(label).addEventListener('click', () => safe(fn));
    const kind = lab.dataset.lab;
    if (kind === 'ethernet') {
      const update = () => { const local=Math.min(Number(get('hostRate').value),Number(get('switchRate').value)); const uplink=Number(get('uplinkRate').value); const limit=Math.min(local,uplink); show(`<h3>Limite nominal do caminho: ${limit} Mb/s</h3><p>Enlace do host: ${local} Mb/s. Enlace seguinte: ${uplink} Mb/s.</p><p>O throughput real pode ser menor; o goodput também desconta a sobrecarga. A simulação pressupõe compatibilidade física e não mede disco, CPU, filas nem concorrência.</p>`); };
      ['hostRate','switchRate','uplinkRate'].forEach(id => get(id).addEventListener('change',update)); update();
    }
    if (kind === 'access') {
      const steps={hub:['A e B escutam: o meio parece livre.','A e B iniciam antes que o sinal da outra ponta seja percebido. As transmissões colidem.','As estações detectam a colisão, interrompem e aplicam backoff.','Tempos de espera diferentes permitem que A tente primeiro.','B transmite após o meio ficar disponível. A sequência é simplificada.'],full:['A e B têm um enlace Ethernet ponto a ponto full duplex.','A envia para B enquanto B envia para A no mesmo enlace.','Não há colisões normais nesse enlace. CSMA/CD não é usado.','Uma saída congestionada de um switch pode criar fila ou descarte, sem ser uma colisão.','Compare: acesso dedicado não significa capacidade ilimitada ou ausência de erros.'],wifi:['A estação observa o canal, no exemplo de acesso por contenção.','Após os intervalos pertinentes, um backoff aleatório coordena a disputa.','O contador é congelado se o canal ficar ocupado; a transmissão aguarda.','Ao obter acesso, a estação envia um quadro unicast com confirmação neste exemplo.','O ACK confirma a troca de enlace. Perdas ainda podem ocorrer; broadcast/multicast não usa esse mesmo ACK individual.']};
      let index=0;const update=()=>{const list=steps[get('accessMode').value];show(`<h3>Etapa ${index+1} de ${list.length}</h3><p>${list[index]}</p>`);get('stepLab').disabled=index===list.length-1;};
      get('accessMode').addEventListener('change',()=>{index=0;update();});run('stepLab',()=>{index=Math.min(4,index+1);update();});run('resetLab',()=>{index=0;update();});update();
    }
    if (kind === 'subnet') {
      const calculate=()=>{const raw=get('subnetPrefix').value;if(!/^\d+$/.test(raw))throw new Error('Informe um prefixo inteiro.');const b=block(get('subnetIp').value.trim(),Number(raw)); const conventional=b.prefix<31;show(`<h3>${dotted(b.network)}/${b.prefix}</h3><p>Máscara: <code>${dotted(b.mask)}</code> · Total: ${b.size} endereços.</p><p>${conventional?`Rede: ${dotted(b.network)} · Broadcast: ${dotted(b.last)}<br>Faixa utilizável: ${dotted(b.network+1)} até ${dotted(b.last-1)} · ${b.hosts} hosts.`:b.prefix===31?`Ponto a ponto /31: ${dotted(b.network)} e ${dotted(b.last)} podem identificar as duas interfaces, conforme RFC 3021. Não há broadcast dirigido nesse uso.`:`/32: um único endereço (${dotted(b.network)}), sem uma faixa LAN ou broadcast de sub-rede convencional.`}</p><p>${conventional?`Posição do IP informado: ${b.ip===b.network?'ID da rede':b.ip===b.last?'broadcast':'endereço utilizável na aritmética convencional'}.`:'A regra de subtrair dois não se aplica aqui.'}</p><p>Cálculo: 32 − ${b.prefix} = ${32-b.prefix} bits de sufixo; 2^${32-b.prefix} = ${b.size} endereços. ID da rede = IP AND máscara.</p>`);};run('calculateLab',calculate);safe(calculate);
    }
    if (kind === 'vlsm') {
      const calculate=()=>{const raw=get('vlsmNeeds').value.trim();if(!/^\d+(\s*,\s*\d+)*$/.test(raw))throw new Error('Separe demandas inteiras por vírgula, sem campos vazios.');const p=plan(get('vlsmBase').value,raw.split(',').map(Number));show(`<h3>Plano em ordem decrescente de blocos</h3><table><thead><tr><th>Grupo</th><th>Demanda</th><th>Rede/prefixo</th><th>Faixa de hosts</th><th>Broadcast</th><th>Capacidade</th></tr></thead><tbody>${p.rows.map(r=>`<tr><td>${r.index+1}</td><td>${r.need}</td><td>${dotted(r.network)}/${r.prefix}</td><td>${dotted(r.network+1)}–${dotted(r.last-1)}</td><td>${dotted(r.last)}</td><td>${r.hosts}</td></tr>`).join('')}</tbody></table><p>Endereços alocados: ${p.base.size-p.free} de ${p.base.size}. Reserva livre: ${p.free}${p.free?` (${dotted(p.cursor)}–${dotted(p.base.last)})`:''}.</p><p>Gateway e crescimento devem estar incluídos na demanda. Os números dos grupos preservam a ordem em que foram informados.</p>`);};run('calculateLab',calculate);safe(calculate);
    }
    if (kind === 'routing') {
      const steps=['Host decide: 192.168.20.20 está fora do /24 local. Usa o próximo salto 192.168.10.1.','O quadro sai pela VLAN 10 e chega à interface L3 do gateway.','A função L3 consulta a rota para 192.168.20.0/24 e o tráfego da VLAN 20 cruza o trunk adequado.','A política permite HTTPS e o pacote chega ao servidor 192.168.20.20.','O servidor responde via 192.168.20.1; há rota de retorno para a VLAN 10.'];
      const failures={vlan:{step:1,text:'Porta de acesso está na VLAN 20, mas o host pertence ao segmento da VLAN 10. Verifique show vlan brief e show interfaces switchport.'},trunk:{step:2,text:'A VLAN 20 não está permitida no trunk do caminho. Verifique show interfaces trunk e a configuração das duas pontas.'},gateway:{step:0,text:'Gateway configurado no host não corresponde ao próximo salto do segmento. Compare IP, máscara, rota e plano de endereçamento.'},return:{step:4,text:'A resposta não encontra rota para a origem neste cenário. Examine a tabela de rotas e o retorno, além das políticas.'},policy:{step:3,text:'Neste caso conhecido, a política bloqueia TCP 443. Confira a regra e os registros; não desative o controle inteiro.'}};
      let index=0;const update=()=>{const failure=failures[get('routingCase').value];const stopped=failure&&index>=failure.step;show(`<h3>Etapa ${index+1} de 5</h3><p>${stopped?'Interrupção: '+failure.text:steps[index]}</p><p>Sem NAT neste exemplo: os IPs de origem/destino são preservados, enquanto os cabeçalhos de enlace são refeitos ao rotear.</p>`);get('stepLab').disabled=Boolean(stopped)||index===4;};get('routingCase').addEventListener('change',()=>{index=0;update();});run('stepLab',()=>{index=Math.min(4,index+1);update();});run('resetLab',()=>{index=0;update();});update();
    }
    if (kind === 'diagnostic') {
      const tests={link:{interface:'Estado da interface: desconectado. Nenhum enlace ativo nesta interface.',address:'Há configuração IP cadastrada, mas o enlace está inativo.',icmp:'Sem resposta. Esse resultado isolado não localiza a falha.',dns:'Consulta falhou, sem conectividade de base para realizá-la.',tcp:'Não foi possível estabelecer conexão TCP.'},mask:{interface:'Interface ativa, enlace de 1 Gb/s.',address:'Host: 192.168.10.65/26; gateway: 192.168.10.1. O gateway não pertence ao /26 do host; o plano previa /24.',icmp:'Gateway sem resposta no cenário de configuração incorreta.',dns:'O resolvedor remoto não está alcançável neste cenário.',tcp:'A conexão com o destino remoto não se estabelece.'},dns:{interface:'Interface ativa, enlace de 1 Gb/s.',address:'192.168.10.10/24, gateway 192.168.10.1, de acordo com o plano.',icmp:'O gateway responde a ICMP no cenário.',dns:'O resolvedor configurado não retorna o registro esperado; o resolvedor de referência retorna o IP do serviço.',tcp:'Teste TCP direto ao IP conhecido do serviço: conexão estabelecida. Isso não valida sozinho HTTP/TLS.'},service:{interface:'Interface ativa, enlace de 1 Gb/s.',address:'IP, máscara e gateway coincidem com o plano.',icmp:'Gateway e destino respondem a ICMP neste cenário.',dns:'O nome resolve para o endereço esperado.',tcp:'O destino recusa a conexão TCP 443. Investigue listener, serviço e política; o teste não escolhe sozinho uma causa.'}};
      let evidence=new Map();const reset=()=>{evidence=new Map();show('<h3>Reúna evidências</h3><p>Escolha um teste. O modelo não executa comandos na sua máquina.</p>');};get('diagnosticCase').addEventListener('change',reset);run('testLab',()=>{const key=get('diagnosticTest').value;const item=tests[get('diagnosticCase').value][key];evidence.set(key,item);show('<h3>Evidências coletadas</h3><ol>'+[...evidence.values()].map(text=>'<li>'+text+'</li>').join('')+'</ol>');});run('explainLab',()=>{const correct=get('diagnosticCase').value===get('diagnosticAnswer').value; const p=document.createElement('p');const necessary={link:'interface',mask:'address',dns:'dns',service:'tcp'};p.textContent=evidence.size<2?'Reúna pelo menos duas evidências de testes diferentes antes de concluir.':!evidence.has(necessary[get('diagnosticCase').value])?'Ainda falta um teste que discrimine a hipótese. Compare interface, configuração, DNS e serviço.':correct?'Hipótese coerente com a causa conhecida deste cenário. Num incidente real, confirme com um teste que discrimine causas semelhantes.':'A hipótese não corresponde ao conjunto de evidências deste cenário. Compare o teste de configuração, resolução e conexão.';output.append(p);});reset();
    }
  });
})();
