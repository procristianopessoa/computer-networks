(() => {
  const data = window.LESSON_DATA;
  if (!data) return;

  const storageKey = `ifsp-redes-${data.slug}`;
  const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");

  const save = (patch) => {
    Object.assign(saved, patch);
    localStorage.setItem(storageKey, JSON.stringify(saved));
  };

  const root = document.documentElement;
  const themeButton = document.querySelector("#themeToggle");
  const preferredTheme = saved.theme || localStorage.getItem("ifsp-redes-theme") || "light";
  root.dataset.theme = preferredTheme;
  if (themeButton) {
    themeButton.setAttribute("aria-label", preferredTheme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
    themeButton.addEventListener("click", () => {
      const theme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = theme;
      localStorage.setItem("ifsp-redes-theme", theme);
      save({theme});
      themeButton.setAttribute("aria-label", theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
    });
  }

  document.querySelector("#printLesson")?.addEventListener("click", () => window.print());

  const progressBar = document.querySelector("#globalProgress");
  const progressLabel = document.querySelector("#progressLabel");
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? Math.min(100, Math.round((window.scrollY / scrollable) * 100)) : 100;
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressLabel) progressLabel.textContent = `${percent}% concluído`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, {passive: true});

  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
    }, {rootMargin: "-24% 0px -60%", threshold: [0.05, 0.2, 0.5]});
    sections.forEach((section) => observer.observe(section));
  }

  const flashcard = document.querySelector("#flashcard");
  const flashDots = document.querySelector("#flashDots");
  let flashIndex = 0;
  if (flashcard && flashDots && data.flashcards?.length) {
    data.flashcards.forEach((_, index) => {
      const dot = document.createElement("i");
      if (index === 0) dot.classList.add("active");
      flashDots.append(dot);
    });
    const renderFlash = () => {
      flashcard.classList.remove("flipped");
      document.querySelector("#flashTerm").textContent = data.flashcards[flashIndex][0];
      document.querySelector("#flashDefinition").textContent = data.flashcards[flashIndex][1];
      document.querySelector("#flashCounter").textContent = `${flashIndex + 1}/${data.flashcards.length}`;
      [...flashDots.children].forEach((dot, index) => dot.classList.toggle("active", index === flashIndex));
    };
    flashcard.addEventListener("click", () => flashcard.classList.toggle("flipped"));
    document.querySelector("#flashPrev")?.addEventListener("click", () => {
      flashIndex = (flashIndex - 1 + data.flashcards.length) % data.flashcards.length;
      renderFlash();
    });
    document.querySelector("#flashNext")?.addEventListener("click", () => {
      flashIndex = (flashIndex + 1) % data.flashcards.length;
      renderFlash();
    });
    renderFlash();
  }

  const shuffle = (values) => values
    .map((value) => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);

  let quiz = [];
  let questionIndex = 0;
  let score = 0;
  let wrongBank = [];
  let reviewMode = false;

  const renderQuestion = () => {
    const item = quiz[questionIndex];
    document.querySelector("#questionNumber").textContent = `${reviewMode ? "Revisão" : "Questão"} ${questionIndex + 1} de ${quiz.length}`;
    document.querySelector("#quizProgressBar").style.width = `${((questionIndex + 1) / quiz.length) * 100}%`;
    document.querySelector("#questionType").textContent = item.type;
    document.querySelector("#questionText").textContent = item.q;
    const answers = document.querySelector("#answers");
    const feedback = document.querySelector("#answerFeedback");
    const next = document.querySelector("#nextQuestion");
    answers.replaceChildren();
    feedback.hidden = true;
    feedback.className = "answer-feedback";
    next.hidden = true;
    item.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.innerHTML = `<b>${String.fromCharCode(65 + index)}</b><span>${option.text}</span>`;
      button.addEventListener("click", () => {
        if ([...answers.children].some((candidate) => candidate.disabled)) return;
        [...answers.children].forEach((candidate, candidateIndex) => {
          candidate.disabled = true;
          if (item.options[candidateIndex].correct) candidate.classList.add("correct");
        });
        if (option.correct) {
          score += 1;
          button.classList.add("correct");
        } else {
          button.classList.add("wrong");
          wrongBank.push(item.original);
        }
        document.querySelector("#quizScore").textContent = `${score}/${quiz.length}`;
        feedback.hidden = false;
        feedback.classList.add(option.correct ? "correct" : "wrong");
        feedback.innerHTML = `<strong>${option.correct ? "Correto." : "Ainda não."}</strong> ${item.e}`;
        next.hidden = false;
        next.textContent = questionIndex === quiz.length - 1 ? "Ver resultado →" : "Próxima questão →";
      });
      answers.append(button);
    });
  };

  const finishQuiz = () => {
    document.querySelector("#quizCard").hidden = true;
    const result = document.querySelector("#quizResult");
    result.hidden = false;
    const passed = score >= Math.ceil(quiz.length * .7);
    document.querySelector("#resultScore").textContent = score;
    document.querySelector("#resultTotal").textContent = `/${quiz.length}`;
    document.querySelector("#resultStatus").textContent = passed ? "AULA CONCLUÍDA" : "REVISÃO RECOMENDADA";
    document.querySelector("#resultMessage").textContent = passed
      ? "O resultado foi salvo neste navegador. Retome os flashcards quando quiser consolidar os conceitos."
      : "Revise a síntese e os flashcards e tente novamente. A meta de conclusão é 70%.";
    const best = Math.max(saved.bestScore || 0, score);
    save({bestScore: best, completed: passed || saved.completed || false});
    document.querySelector("#reviewErrors").hidden = wrongBank.length === 0;
  };

  const startQuiz = (bank = data.quiz, reviewing = false) => {
    reviewMode = reviewing;
    wrongBank = [];
    quiz = bank.map((item) => ({
      ...item,
      original: item,
      options: shuffle(item.a.map((text, index) => ({text, correct: index === item.c}))),
    }));
    questionIndex = 0;
    score = 0;
    document.querySelector("#quizIntro").hidden = true;
    document.querySelector("#quizResult").hidden = true;
    document.querySelector("#quizCard").hidden = false;
    document.querySelector("#quizScore").textContent = `0/${quiz.length}`;
    renderQuestion();
  };

  document.querySelector("#startQuiz")?.addEventListener("click", () => startQuiz());
  document.querySelector("#nextQuestion")?.addEventListener("click", () => {
    if (questionIndex < quiz.length - 1) {
      questionIndex += 1;
      renderQuestion();
    } else {
      finishQuiz();
    }
  });
  document.querySelector("#retryQuiz")?.addEventListener("click", () => startQuiz());
  document.querySelector("#reviewErrors")?.addEventListener("click", () => startQuiz(wrongBank, true));
  if (saved.bestScore != null) document.querySelector("#quizScore").textContent = `melhor ${saved.bestScore}/10`;
})();
