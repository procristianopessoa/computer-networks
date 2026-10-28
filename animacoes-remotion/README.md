# Animações de Redes de Computadores

Full HD (1920 × 1080), 30 fps e sem narração. Aula 01: 2min42s; Aulas 02–04: 28s; Aulas 05–12: 1min cada.

Execute nesta pasta:

```powershell
npm.cmd ci
npm.cmd run dev -- --no-open
```

Para validar: `npm.cmd run lint`. Exemplo de exportação:

```powershell
npx.cmd remotion render Aula05-Ethernet out/aula05-ethernet.mp4 --codec=h264 --crf=23 --pixel-format=yuv420p --muted
```

## Composições do bloco 05–12

- `Aula05-Ethernet` → `aula05-ethernet.mp4`
- `Aula06-Acesso` → `aula06-acesso.mp4`
- `Aula07-Switching` → `aula07-switching.mp4`
- `Aula08-Segmentacao` → `aula08-segmentacao.mp4`
- `Aula09-Subnetting` → `aula09-subnetting.mp4`
- `Aula10-Vlsm` → `aula10-vlsm.mp4`
- `Aula11-Routing` → `aula11-routing.mp4`
- `Aula12-Diagnostico` → `aula12-diagnostico.mp4`

Consulte `../VIDEOS.md` para publicação, capas e a alternativa de FFmpeg utilizada neste computador. O Studio é uma prévia local; só os MP4s e as capas entram nas páginas das aulas.
