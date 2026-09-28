---
layout: default
title: Redes de Computadores · IFSP
---

<section class="hero">
  <p class="kicker">DISCIPLINA · IFSP</p>
  <div class="language-switch" aria-label="Idioma da capa">
    <button class="active" type="button" data-lang="pt">Português</button>
    <button type="button" data-lang="en">English</button>
    <button type="button" data-lang="es">Español</button>
  </div>
  <h1 id="course-title">Redes de<br>Computadores</h1>
  <p class="lead" id="course-subtitle">Uma trilha interativa para compreender, configurar, utilizar e diagnosticar redes — do enlace Ethernet ao endereçamento, switching e routing.</p>
  <a class="primary" href="#trilha">Explorar trilha</a>
</section>

<script src="{{ '/assets/js/catalogo.js' | relative_url }}"></script>

<section id="trilha">
  <p class="kicker">TRILHA DE ESTUDO</p>
  <h2>Da comunicação local ao troubleshooting</h2>
  <div class="cards">
    {% for aula in site.data.aulas %}
      {% if aula.url != "" %}
        <a class="card available" href="{{ aula.url | relative_url }}">
          <b>{{ aula.numero }}</b>
          <span class="state">{{ aula.status }}</span>
          <h3>{{ aula.titulo }}</h3>
          <p>{{ aula.tema }}</p>
          <span class="open">Abrir aula →</span>
        </a>
      {% else %}
        <article class="card pending">
          <b>{{ aula.numero }}</b>
          <span class="state">{{ aula.status }}</span>
          <h3>{{ aula.titulo }}</h3>
          <p>{{ aula.tema }}</p>
        </article>
      {% endif %}
    {% endfor %}
  </div>
</section>

<section class="method">
  <p class="kicker">MÉTODO DA DISCIPLINA</p>
  <h2>Problema → teoria → visualização → evidência → prática.</h2>
  <p>Cada aula combina explicações diretas, diagramas, interações, laboratório seguro, flashcards, troubleshooting e verificação de aprendizagem.</p>
</section>
