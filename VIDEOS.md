# Vídeos incorporados das Aulas 01–04

Os arquivos MP4 e as imagens de capa ficam em assets/ dentro de cada aula.
O player usa controles nativos, reprodução manual e carregamento inicial apenas de metadados. Os vídeos não têm áudio.

O código de edição está em animacoes-remotion/. Instale as dependências nessa pasta com npm.cmd ci e abra a prévia com npm.cmd run dev -- --no-open. Exporte com npx.cmd remotion render ID out/arquivo.mp4 --codec=h264 --crf=23 --muted.

Composições:
- Aula01-Historia: 162 segundos.
- Aula02-Redes: 28 segundos.
- Aula03-Encapsulamento: 28 segundos.
- Aula04-Sinais: 28 segundos.

Os blocos de incorporação no Moodle estão em moodle/. Cole o HTML da aula correspondente no editor de código-fonte do Moodle. Não é necessário carregar os vídeos no AVA: o iframe exibe a aula hospedada no GitHub Pages.

Se o FFmpeg empacotado pelo Remotion falhar neste computador, use o FFmpeg do sistema com --disable-shared-memory-capture e --binaries-directory apontando para uma pasta que contenha os binários do compositor Remotion e as cópias locais de ffmpeg.exe e ffprobe.exe. Essa pasta de execução não deve ser versionada.
