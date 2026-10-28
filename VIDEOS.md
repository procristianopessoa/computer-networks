# Animações incorporadas das Aulas 01–12

Os MP4s e as capas ficam em `aulas/<pasta-da-aula>/assets/`. A página usa controles nativos, reprodução manual, carregamento de metadados e descrição textual. Não há áudio nem narração. Os diagramas são didáticos.

| Aulas | Duração | Formato |
|---|---|---|
| 01 | 2min42s | 1920×1080, 30 fps, H.264/MP4 |
| 02–04 | 28s cada | 1920×1080, 30 fps, H.264/MP4 |
| 05–12 | 1min cada | 1920×1080, 30 fps, H.264/MP4 |

## Editar e exportar

O código reproduzível está em `animacoes-remotion/`. Nessa pasta:

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd run dev -- --no-open
npx.cmd remotion render Aula05-Ethernet out/aula05-ethernet.mp4 --codec=h264 --crf=23 --pixel-format=yuv420p --muted
```

O identificador de cada composição está em `src/Root.tsx`. As composições das Aulas 05–12 são `Aula05-Ethernet`, `Aula06-Acesso`, `Aula07-Switching`, `Aula08-Segmentacao`, `Aula09-Subnetting`, `Aula10-Vlsm`, `Aula11-Routing` e `Aula12-Diagnostico`.

Copie a exportação para a pasta da aula correspondente. Para extrair uma capa, usando FFmpeg instalado:

```powershell
ffmpeg -ss 33 -i out/aula05-ethernet.mp4 -frames:v 1 -q:v 3 out/aula05-ethernet-poster.jpg
```

Ajuste o tempo de captura à composição. Uma capa não é um segundo vídeo e não altera a duração.

## Compatibilidade deste computador

Nesta sessão, o FFmpeg empacotado pelo Remotion falhou ao receber os primeiros quadros. A exportação foi concluída com o FFmpeg do sistema, captura convencional e a opção `--binaries-directory` apontando para uma pasta local com os binários do compositor Remotion e as cópias de `ffmpeg.exe` e `ffprobe.exe`. O caminho precisa ser absoluto. Essa pasta de execução não é versionada.

Em outros computadores, tente primeiro a exportação normal. Não é necessário substituir binários se ela funcionar.

## Publicação

Os códigos em `moodle/` incorporam a página completa da aula. Não é necessário carregar o MP4 no AVA. Os quizzes não enviam notas ao Moodle. Depois do push, aguarde a publicação bem-sucedida do Pages e confira o player no endereço público.
