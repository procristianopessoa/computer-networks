(() => {
  'use strict';

  const storageKey = 'ifsp-redes-portal';
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  } catch (_) {
    saved = {};
  }

  const root = document.documentElement;
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = saved.theme || (systemDark ? 'dark' : 'light');

  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    saved.theme = root.dataset.theme;
    localStorage.setItem(storageKey, JSON.stringify(saved));
  });

  const coverCopy = {
    pt: {
      title: 'Redes de<br><em>Computadores</em>',
      subtitle: 'Uma trilha interativa para compreender como as redes funcionam, construir soluções e diagnosticar problemas com evidências.',
      action: 'Começar pela Aula 01',
      explore: 'Explorar a trilha'
    },
    en: {
      title: 'Computer<br><em>Networks</em>',
      subtitle: 'An interactive path to understand how networks work, build solutions and troubleshoot problems using evidence.',
      action: 'Start with Lesson 01',
      explore: 'Explore learning path'
    },
    es: {
      title: 'Redes de<br><em>Computadoras</em>',
      subtitle: 'Una ruta interactiva para comprender cómo funcionan las redes, construir soluciones y diagnosticar problemas con evidencias.',
      action: 'Comenzar por la Clase 01',
      explore: 'Explorar la ruta'
    }
  };

  document.querySelectorAll('.language-switch button').forEach((button) => {
    button.addEventListener('click', () => {
      const copy = coverCopy[button.dataset.lang];
      const title = document.querySelector('#course-title');
      const subtitle = document.querySelector('#course-subtitle');
      const action = document.querySelector('#course-action');
      if (title) title.innerHTML = copy.title;
      if (subtitle) subtitle.textContent = copy.subtitle;
      if (action) {
        const arrow = action.querySelector('span')?.outerHTML || '';
        const hasFirstLesson = !action.getAttribute('href')?.endsWith('#trilha');
        action.innerHTML = `${hasFirstLesson ? copy.action : copy.explore} ${arrow}`;
      }
      document.querySelectorAll('.language-switch button').forEach((item) => {
        item.classList.toggle('active', item === button);
      });
    });
  });

  const cards = [...document.querySelectorAll('#course-cards [data-status]')];
  const emptyState = document.querySelector('#empty-state');
  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let visible = 0;
      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.status === filter;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (emptyState) emptyState.hidden = visible !== 0;
      document.querySelectorAll('[data-filter]').forEach((item) => {
        item.classList.toggle('active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
    });
  });
})();
