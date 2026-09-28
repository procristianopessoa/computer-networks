# Redes de Computadores · IFSP

Material interativo da disciplina, preparado para GitHub Pages com Jekyll.

## Publicação no GitHub Pages

1. Crie um repositório público chamado `redes-computadores`.
2. Envie o conteúdo desta pasta para a branch `main`.
3. Em **Settings → Pages**, selecione **Deploy from a branch**, branch `main` e diretório `/(root)`.

O catálogo é gerado pelo Jekyll a partir de `_data/aulas.yml`.

## Como adicionar uma aula

1. Crie a pasta da aula em `aulas/`.
2. Atualize a entrada correspondente em `_data/aulas.yml` com a URL e o status `disponível`.
3. Envie a alteração ao GitHub. A home cria o cartão automaticamente.

## Estrutura

- `_data/aulas.yml`: catálogo e sequência didática;
- `_layouts/default.html`: estrutura da home;
- `assets/css/catalogo.css`: identidade visual do catálogo;
- `aulas/`: páginas independentes e interativas.
