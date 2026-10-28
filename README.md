# Redes de Computadores · IFSP Guarulhos

Material didático interativo da disciplina de Redes de Computadores, com explicações, laboratórios, flashcards, quizzes e animações complementares sem narração.

- **Portal:** https://procristianopessoa.github.io/computer-networks/
- **Trilha:** https://procristianopessoa.github.io/computer-networks/#trilha
- **Repositório:** https://github.com/procristianopessoa/computer-networks

## Sequência didática

| Aula | Tema | Percurso |
|---|---|---|
| 01 | História das redes e da Internet | Mainframes, Unix, ARPANET, NCP, TCP/IP, OSI, downsizing e Web |
| 02 | Componentes, topologias e tipos de rede | Dispositivos, meios, alcance e requisitos |
| 03 | Protocolos e modelos de referência | Camadas e encapsulamento |
| 04 | Camada física e meios de transmissão | Sinais, cobre, fibra e rádio |
| 05 | Ethernet e redes locais | Família IEEE 802.3, interfaces e desempenho |
| 06 | Acesso ao meio e fundamentos de enlace | Enquadramento, FCS, CSMA/CD, full duplex e CSMA/CA |
| 07 | Camada de enlace e Ethernet | MAC, quadros, aprendizagem e encaminhamento |
| 08 | Domínios, CIDR e VLSM | Segmentação e introdução ao planejamento IPv4 |
| 09 | Subnetting IPv4 na prática | Máscaras, rede, broadcast e hosts |
| 10 | VLSM e planejamento de endereços | Demandas, alocação, alinhamento e reserva |
| 11 | Switching e routing na prática | VLANs, trunks, gateways e rotas |
| 12 | Troubleshooting integrado | Hipóteses, evidências, correção e validação |
| 13 | Redes sem fio | Planejada |
| 14 | Segurança e operação de redes | Planejada |

O estado de publicação de cada aula é definido em `_data/aulas.yml`. As Aulas 08, 09 e 10 têm escopos complementares: introdução e segmentação; cálculo de blocos iguais; planejamento com blocos de tamanhos diferentes.

## Publicação e manutenção

O projeto existente chama-se **computer-networks**. Não é necessário criar um segundo repositório. O GitHub Pages compila o Jekyll a partir de `main`, diretório `/(root)`, e o histórico da publicação aparece em **Actions → pages build and deployment**.

O catálogo da home é gerado a partir de `_data/aulas.yml`. Os filtros, cartões, contagem de aulas e atalhos de animação usam esses dados. As páginas das aulas são HTML independentes.

Depois de revisar as alterações:

```powershell
git status --short
git add CAMINHOS_DOS_ARQUIVOS_REVISADOS
git commit -m "Descreva a alteração"
git push origin main
```

Confira o sucesso da publicação no GitHub Actions e teste os links no portal. Se uma aba antiga continuar exibindo o catálogo anterior, atualize com `Ctrl+F5`.

## Estrutura

- `_data/aulas.yml`: sequência, títulos, status, URLs e metadados dos vídeos;
- `_layouts/default.html`: estrutura da página principal;
- `index.md`: catálogo e trilha renderizados pelo Jekyll;
- `assets/css/catalogo.css` e `assets/js/catalogo.js`: aparência e interações da home;
- `aulas/`: páginas independentes, scripts, MP4s e imagens de capa;
- `aulas/assets/fundamentos.*`: componentes visuais, flashcards e quiz das aulas que usam o modelo compartilhado;
- `aulas/assets/lesson-labs.js`: laboratórios didáticos e cálculos de IPv4/VLSM;
- `aulas/assets/video-aulas.css`: aparência dos players;
- `animacoes-remotion/`: código-fonte reproduzível das animações;
- `moodle/`: blocos HTML para incorporar cada aula no AVA;
- `VIDEOS.md`: exportação e organização dos vídeos.

As pastas `animacoes-remotion/` e `moodle/` permanecem disponíveis no repositório, mas são excluídas da compilação pública do Jekyll.

## Como adicionar ou atualizar uma aula

1. Crie `aulas/aulaNN-tema/index.html`, reutilizando o padrão de navegação e acessibilidade adotado no curso.
2. Acrescente teoria, exemplos, atividade com instruções e critérios de conferência, revisão e avaliação.
3. Use caminhos relativos para CSS, scripts, imagens e vídeos; teste links de retorno e de próxima aula.
4. Acrescente o vídeo exportado e sua capa à pasta `assets/` da aula.
5. Atualize a entrada correspondente em `_data/aulas.yml`; somente marque como `disponível` depois de verificar os arquivos e interações.
6. Se houver vídeo, inclua `animacao: true` e `duracao_animacao`, além de uma seção com `id="animacao"`.
7. Crie ou atualize o bloco em `moodle/moodle-aulaNN.html`.
8. Publique e confira a página e o vídeo no endereço final.

Exemplo de catálogo:

```yaml
- numero: "05"
  titulo: "Ethernet e redes locais"
  tema: "Padrões IEEE 802.3, interfaces e desempenho"
  status: "disponível"
  url: "/aulas/aula05-ethernet-redes-locais/"
  animacao: true
  duracao_animacao: "1min"
```

## Animações Remotion

Execute os comandos dentro da pasta de fontes das animações:

```powershell
cd animacoes-remotion
npm.cmd ci
npm.cmd run dev -- --no-open
```

Abra a URL informada no terminal. Para verificar o código e exportar uma composição:

```powershell
npm.cmd run lint
npx.cmd remotion render Aula05-Ethernet out/aula05-ethernet.mp4 --codec=h264 --crf=23 --pixel-format=yuv420p --muted
```

As composições usam Full HD, 30 fps e não têm narração. Copie o MP4 final para `aulas/<pasta-da-aula>/assets/` e atualize o `poster` quando mudar o conteúdo. A prévia local do Studio não publica os arquivos no portal. Consulte `VIDEOS.md` para detalhes e para o modo alternativo de exportação usado neste computador.

## Incorporação no Moodle

Abra o modo HTML (`</>`) do editor do Moodle e cole o bloco de `moodle/moodle-aulaNN.html`. Cada bloco contém um link para tela cheia e um iframe da aula hospedada no GitHub Pages, com altura inicial de 1200 pixels e permissão de tela cheia. O vídeo é reproduzido dentro da própria página.

Atualizações na mesma URL do GitHub Pages passam a aparecer no material incorporado. O Moodle pode filtrar iframes conforme as permissões locais do editor; confira a visualização final após salvar.

**Os quizzes salvam resultados apenas no navegador. Eles não enviam notas, conclusão ou identidade do estudante ao Moodle.** Esta entrega não é um pacote SCORM nem uma integração LTI. Laboratórios descritos como simulados não acessam a rede real do aluno.

## Conferência antes de publicar

Verifique a sequência anterior/próxima, links do catálogo, controles de teclado, laboratório (incluindo entradas inválidas), flashcards, quiz e revisão de erros. Confira o MP4, a capa, a duração, a reprodução manual e o layout em tela estreita. Preserve as exceções de /31 e /32 ao tratar IPv4 e diferencie Ethernet compartilhada de full duplex.
