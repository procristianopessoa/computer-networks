# Animações de Redes de Computadores

Código-fonte das animações. Execute os comandos dentro desta pasta. Quatro composições em 1920 x 1080, 30 fps, sem áudio. Aula 01: 2min42s em nove cenas. Aulas 02–04: 28 segundos cada. Consulte HISTORIA-AULA01.md para o roteiro e as fontes.

- Aula01-Historia: ARPANET, TCP/IP, proposta da Web e Web na Internet.
- Aula02-Redes: hosts, switches e roteadores em duas LANs conectadas por uma WAN.
- Aula03-Encapsulamento: dados, segmento TCP, pacote IP, quadro Ethernet e sinais.
- Aula04-Sinais: exemplos esquemáticos de sinal elétrico, pulsos ópticos e modulação por fase.

## Abrir novamente

```powershell
cd animacoes-remotion
npm.cmd run dev -- --no-open
```

Abra o endereço informado no terminal. Nesta sessão: http://localhost:3001.

## Verificação

```powershell
npm.cmd run lint
```

As animações são complementos visuais, sem narração. Os diagramas são didáticos e não estão em escala. A prévia não publica os vídeos no portal: exportação e integração ao site são etapas posteriores.

