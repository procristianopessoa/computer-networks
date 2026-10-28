---
layout: default
title: Redes de Computadores · IFSP
description: Trilha interativa de Redes de Computadores do IFSP, com teoria, visualizações, laboratórios, flashcards e avaliações.
---

{% assign total_aulas = site.data.aulas | size %}
{% assign aulas_disponiveis = site.data.aulas | where: "status", "disponível" %}
{% assign total_disponiveis = aulas_disponiveis | size %}
{% assign progresso = total_disponiveis | times: 100 | divided_by: total_aulas %}
{% assign aula_inicial = site.data.aulas[0] %}

<section class="hero" id="inicio">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <div class="eyebrow-row">
        <p class="kicker">DISCIPLINA · IFSP</p>
        <div class="language-switch" aria-label="Idioma da apresentação">
          <button class="active" type="button" data-lang="pt">PT</button>
          <button type="button" data-lang="en">EN</button>
          <button type="button" data-lang="es">ES</button>
        </div>
      </div>
      <h1 id="course-title">Redes de<br><em>Computadores</em></h1>
      <p class="lead" id="course-subtitle">Uma trilha interativa para compreender como as redes funcionam, construir soluções e diagnosticar problemas com evidências.</p>
      <div class="hero-actions">
        {% if aula_inicial.url != "" %}
          <a class="button button-primary" id="course-action" href="{{ aula_inicial.url | relative_url }}">Começar pela Aula 01 <span aria-hidden="true">→</span></a>
        {% else %}
          <a class="button button-primary" id="course-action" href="#trilha">Explorar a trilha <span aria-hidden="true">↓</span></a>
        {% endif %}
        <a class="button button-ghost" href="#metodo">Conhecer o método</a>
      </div>
      <nav class="ready-lessons" aria-label="Aulas prontas para estudar">
        <span>Aulas prontas</span>
        {% for aula in aulas_disponiveis limit:4 %}
          <a href="{{ aula.url | relative_url }}"><b>{{ aula.numero }}</b><span>{{ aula.titulo }}</span><i aria-hidden="true">↗</i></a>
        {% endfor %}
      </nav>
      <p class="hero-note"><span aria-hidden="true">●</span> Material web como experiência principal; vídeo como recurso opcional.</p>
    </div>
    <aside class="course-status" aria-label="Situação da trilha">
      <p class="status-label">PROGRESSO DE PUBLICAÇÃO</p>
      <div class="status-number"><strong>{{ total_disponiveis }}</strong><span>/ {{ total_aulas }} aulas</span></div>
      <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="{{ total_aulas }}" aria-valuenow="{{ total_disponiveis }}"><span style="width: {{ progresso }}%"></span></div>
      <p>{{ total_disponiveis }} aulas disponíveis para estudo. A trilha cresce continuamente sem perder a sequência didática.</p>
      <dl>
        <div><dt>Referência</dt><dd>CCNA I ou equivalente</dd></div>
        <div><dt>Formato</dt><dd>Web interativa</dd></div>
        <div><dt>Verificação</dt><dd>10 questões por aula</dd></div>
      </dl>
    </aside>
  </div>
</section>

<section class="course-facts" aria-label="Características do curso">
  <div class="wrap facts-grid">
    <div><strong>14</strong><span>aulas em sequência</span></div>
    <div><strong>5</strong><span>momentos de aprendizagem</span></div>
    <div><strong>10</strong><span>questões em cada aula</span></div>
    <div><strong>∞</strong><span>possibilidades de exploração</span></div>
  </div>
</section>

<section class="method-section" id="metodo">
  <div class="wrap section-grid">
    <div class="section-intro">
      <p class="kicker">COMO VOCÊ VAI APRENDER</p>
      <h2>Entender primeiro.<br><em>Configurar depois.</em></h2>
      <p>O estudante começa pelo problema, constrói o modelo mental, observa o comportamento da rede e só então aplica o conhecimento. Cada aula termina com revisão ativa e evidência de aprendizagem.</p>
    </div>
    <ol class="method-flow">
      <li><span>01</span><div><b>Problema</b><p>Uma situação real cria propósito para o conceito.</p></div></li>
      <li><span>02</span><div><b>Teoria</b><p>A explicação organiza os fundamentos sem excesso de abstração.</p></div></li>
      <li><span>03</span><div><b>Visualização</b><p>Animações e experiências tornam o comportamento observável.</p></div></li>
      <li><span>04</span><div><b>Prática</b><p>Atividades e laboratórios transformam conceito em decisão.</p></div></li>
      <li><span>05</span><div><b>Verificação</b><p>Flashcards e quiz revelam o que foi consolidado.</p></div></li>
    </ol>
  </div>
</section>

<section class="journey-section" aria-labelledby="journey-title">
  <div class="wrap">
    <div class="section-heading">
      <div><p class="kicker">MAPA DE APRENDIZAGEM</p><h2 id="journey-title">Uma rede é construída <em>por camadas.</em></h2></div>
      <p>A trilha acompanha a mesma lógica: fundamentos, transmissão, comunicação local, endereçamento e operação.</p>
    </div>
    <div class="journey-grid">
      <article><span>01</span><b>Fundamentos</b><p>História, componentes, protocolos e modelos.</p><small>Aulas 01–03</small></article>
      <article><span>02</span><b>Transmissão</b><p>Meios físicos, sinais e acesso ao enlace.</p><small>Aulas 04–06</small></article>
      <article><span>03</span><b>Comunicação local</b><p>Ethernet, MAC, quadros e switching.</p><small>Aula 07</small></article>
      <article><span>04</span><b>Interconexão</b><p>Sub-redes, CIDR, VLSM, gateways e routing.</p><small>Aulas 08–11</small></article>
      <article><span>05</span><b>Operação segura</b><p>Troubleshooting, Wi-Fi, segurança e monitoramento.</p><small>Aulas 12–14</small></article>
    </div>
  </div>
</section>

<section class="trail-section" id="trilha">
  <div class="wrap">
    <div class="section-heading trail-heading">
      <div><p class="kicker">TRILHA DE ESTUDO</p><h2>Do primeiro pacote ao <em>troubleshooting.</em></h2></div>
      <div class="filter-group" aria-label="Filtrar aulas">
        <button class="active" type="button" data-filter="all" aria-pressed="true">Todas</button>
        <button type="button" data-filter="available" aria-pressed="false">Disponíveis</button>
        <button type="button" data-filter="pending" aria-pressed="false">Em preparação</button>
      </div>
    </div>
    <div class="cards" id="course-cards">
    {% for aula in site.data.aulas %}
      {% if aula.url != "" %}
        <a class="card available" data-status="available" href="{{ aula.url | relative_url }}">
          <div class="card-top"><b>{{ aula.numero }}</b><span class="state"><i></i>{{ aula.status }}</span></div>
          <div><h3>{{ aula.titulo }}</h3><p>{{ aula.tema }}</p></div>
          <span class="open">Abrir aula <span aria-hidden="true">→</span></span>
        </a>
      {% else %}
        <article class="card pending" data-status="pending">
          <div class="card-top"><b>{{ aula.numero }}</b><span class="state">{{ aula.status }}</span></div>
          <div><h3>{{ aula.titulo }}</h3><p>{{ aula.tema }}</p></div>
          <span class="open muted-open">Em desenvolvimento</span>
        </article>
      {% endif %}
    {% endfor %}
    </div>
    <p class="empty-state" id="empty-state" hidden>Nenhuma aula corresponde a este filtro.</p>
  </div>
</section>

<section class="competency-section" id="competencias">
  <div class="wrap section-grid">
    <div class="section-intro">
      <p class="kicker">COMPETÊNCIAS</p>
      <h2>Conhecimento que vira <em>capacidade técnica.</em></h2>
      <p>A trilha não termina na memorização de protocolos. O objetivo é interpretar evidências, justificar escolhas e diagnosticar o comportamento de uma rede.</p>
    </div>
    <div class="competency-grid">
      <article><span>COMPREENDER</span><h3>Explicar o que acontece</h3><p>Relacionar camadas, protocolos, padrões e dispositivos ao fluxo real dos dados.</p></article>
      <article><span>REPRESENTAR</span><h3>Modelar a rede</h3><p>Ler e produzir diagramas, planos de endereçamento e documentação técnica.</p></article>
      <article><span>APLICAR</span><h3>Construir soluções</h3><p>Selecionar tecnologias e configurar serviços coerentes com cada cenário.</p></article>
      <article><span>DIAGNOSTICAR</span><h3>Investigar por evidências</h3><p>Isolar falhas por camadas, testar hipóteses e validar a correção.</p></article>
    </div>
  </div>
</section>

<section class="closing-section">
  <div class="wrap closing-card">
    <div><p class="kicker">PRÓXIMO PASSO</p><h2>A rede começa com uma pergunta.</h2><p>Por que computadores isolados precisaram aprender a conversar?</p></div>
    {% if aula_inicial.url != "" %}
      <a class="button button-light" href="{{ aula_inicial.url | relative_url }}">Abrir Aula 01 <span aria-hidden="true">→</span></a>
    {% else %}
      <a class="button button-light" href="#trilha">Explorar a trilha <span aria-hidden="true">↑</span></a>
    {% endif %}
  </div>
</section>
