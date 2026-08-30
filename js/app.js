// NEXORA DR TEST — Master Application Controller
// Orchestrates views, state transitions, speech synthesis, and exam sessions

import { questionsEn } from '../data/questions-en.js';
import { questionsAr } from '../data/questions-ar.js';
import { LocalizationManager } from './localization.js';
import { ExamEngine } from './exam-engine.js';
import { ExamTimer } from './timer.js';
import { ProgressEngine } from './progress.js';
import { SpeechEngine } from './speech.js';
import { albertaConfig } from './config.js';

class App {
  constructor() {
    this.loc = new LocalizationManager();
    this.progress = new ProgressEngine();
    this.speech = new SpeechEngine();

    this.timer = new ExamTimer({
      durationMinutes: 30,
      onTick: (secs, formatted) => this.updateTimerDisplay(secs, formatted),
      onWarning: (mins, msg) => this.showTimerWarning(mins, msg),
      onExpire: () => this.handleTimerExpire()
    });

    this.examEngine = new ExamEngine({
      onStateChange: (session) => this.renderExamView(session),
      onExamComplete: (session) => this.handleExamComplete(session)
    });

    this.currentView = 'home';
    this.initDOM();
    this.bindEvents();
    this.updateLanguageUI();

    // Check for saved uncompleted session
    if (this.examEngine.restoreSession()) {
      this.switchView('exam');
    }
  }

  get activeBank() {
    return this.loc.currentLang === 'ar' ? questionsAr : questionsEn;
  }

  initDOM() {
    // Views
    this.viewHome = document.getElementById('view-home');
    this.viewExam = document.getElementById('view-exam');
    this.viewResults = document.getElementById('view-results');
    this.viewReadiness = document.getElementById('view-readiness');
    this.viewStudy = document.getElementById('view-study');

    // Exam elements
    this.qTracker = document.getElementById('q-tracker');
    this.categoryTag = document.getElementById('category-tag');
    this.timerPill = document.getElementById('timer-pill');
    this.timerText = document.getElementById('timer-text');
    this.progressBarFill = document.getElementById('progress-bar-fill');
    this.questionText = document.getElementById('question-text');
    this.visualContainer = document.getElementById('visual-container');
    this.answersContainer = document.getElementById('answers-container');
    this.practiceExplanation = document.getElementById('practice-explanation');
    this.explanationText = document.getElementById('explanation-text');

    // Modals & Lightbox
    this.submitModal = document.getElementById('submit-modal');
    this.resetModal = document.getElementById('reset-modal');
    this.lightbox = document.getElementById('lightbox-modal');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxCaption = document.getElementById('lightbox-caption');
  }

  bindEvents() {
    // Language Toggle
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        this.loc.toggleLanguage();
        this.updateLanguageUI();
        if (this.currentView === 'home') this.renderHome();
        if (this.currentView === 'readiness') this.renderReadiness();
        if (this.currentView === 'study') this.renderStudy();
      });
    }

    // Navigation Links
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = el.getAttribute('data-nav');
        this.switchView(targetView);
      });
    });

    // Start Mode Buttons
    document.getElementById('start-real-exam-btn')?.addEventListener('click', () => this.startExamSession('real-exam'));
    document.getElementById('start-practice-btn')?.addEventListener('click', () => this.startExamSession('practice'));
    document.getElementById('start-timed-btn')?.addEventListener('click', () => this.startExamSession('timed'));
    document.getElementById('start-smart-btn')?.addEventListener('click', () => this.startExamSession('smart-review'));
    document.getElementById('start-signs-btn')?.addEventListener('click', () => this.startExamSession('road-signs'));
    document.getElementById('start-study-btn')?.addEventListener('click', () => this.switchView('study'));

    // Exam Controls
    document.getElementById('btn-skip')?.addEventListener('click', () => this.examEngine.skipCurrentQuestion());
    document.getElementById('btn-next')?.addEventListener('click', () => this.examEngine.goToNextQuestion());
    document.getElementById('btn-prev')?.addEventListener('click', () => this.examEngine.goToPreviousQuestion());
    document.getElementById('btn-finish')?.addEventListener('click', () => this.promptFinishExam());
    document.getElementById('btn-read-audio')?.addEventListener('click', () => this.toggleAudio());

    // Modal Confirmation Actions
    document.getElementById('modal-confirm-submit')?.addEventListener('click', () => {
      this.closeModal(this.submitModal);
      this.examEngine.finishSession();
    });
    document.getElementById('modal-cancel-submit')?.addEventListener('click', () => this.closeModal(this.submitModal));

    document.getElementById('modal-confirm-reset')?.addEventListener('click', () => {
      this.progress.resetProgress();
      this.closeModal(this.resetModal);
      this.renderReadiness();
    });
    document.getElementById('modal-cancel-reset')?.addEventListener('click', () => this.closeModal(this.resetModal));

    document.getElementById('lightbox-close-btn')?.addEventListener('click', () => this.closeModal(this.lightbox));
    this.lightbox?.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.closeModal(this.lightbox);
    });

    // Results Actions
    document.getElementById('btn-results-mistakes')?.addEventListener('click', () => {
      document.getElementById('mistakes-section')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('btn-results-retry-weak')?.addEventListener('click', () => this.startExamSession('smart-review'));
    document.getElementById('btn-results-take-another')?.addEventListener('click', () => this.startExamSession('real-exam'));
    document.getElementById('btn-results-home')?.addEventListener('click', () => this.switchView('home'));

    // Keyboard Shortcuts (1-4, A-D, Space/Enter for Next)
    window.addEventListener('keydown', (e) => {
      if (this.currentView !== 'exam') return;
      if (['1', '2', '3', '4'].includes(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        this.handleAnswerSelection(index);
      } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
        const charMap = { a: 0, b: 1, c: 2, d: 3, A: 0, B: 1, C: 2, D: 3 };
        this.handleAnswerSelection(charMap[e.key]);
      } else if (e.key === 'ArrowRight') {
        if (this.loc.currentLang === 'ar') this.examEngine.goToPreviousQuestion();
        else this.examEngine.goToNextQuestion();
      } else if (e.key === 'ArrowLeft') {
        if (this.loc.currentLang === 'ar') this.examEngine.goToNextQuestion();
        else this.examEngine.goToPreviousQuestion();
      }
    });
  }

  switchView(viewName) {
    this.currentView = viewName;
    this.speech.stop();

    [this.viewHome, this.viewExam, this.viewResults, this.viewReadiness, this.viewStudy].forEach(v => {
      if (v) v.style.display = 'none';
    });

    if (viewName === 'home') {
      this.viewHome.style.display = 'block';
      this.renderHome();
    } else if (viewName === 'exam') {
      this.viewExam.style.display = 'block';
    } else if (viewName === 'results') {
      this.viewResults.style.display = 'block';
    } else if (viewName === 'readiness') {
      this.viewReadiness.style.display = 'block';
      this.renderReadiness();
    } else if (viewName === 'study') {
      this.viewStudy.style.display = 'block';
      this.renderStudy();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  startExamSession(mode) {
    this.speech.stop();
    const weakCats = this.progress.getWeakCategories().map(w => w.category);

    this.examEngine.startSession(mode, this.activeBank, {
      weakCategories: weakCats
    });

    // Start Timer ONLY for Timed Challenge Mode
    if (mode === 'timed') {
      this.timerPill.style.display = 'inline-flex';
      this.timer.start(albertaConfig.defaultChallengeTimeMinutes);
    } else {
      this.timerPill.style.display = 'none';
      this.timer.stop();
    }

    this.switchView('exam');
  }

  handleAnswerSelection(index) {
    const res = this.examEngine.answerCurrentQuestion(index);
    if (!res) return;

    const cards = this.answersContainer.querySelectorAll('.answer-card');
    cards.forEach((card, idx) => {
      card.classList.remove('selected', 'correct-feedback', 'wrong-feedback');
      if (idx === index) {
        card.classList.add('selected');
      }
      if (res.instantFeedback) {
        if (idx === res.correctIndex) card.classList.add('correct-feedback');
        else if (idx === index && !res.isCorrect) card.classList.add('wrong-feedback');
      }
    });

    if (res.instantFeedback && this.practiceExplanation) {
      this.explanationText.textContent = res.explanation;
      this.practiceExplanation.classList.add('active');
    }
  }

  renderExamView(session) {
    if (!session || !session.questions) return;
    const q = session.questions[session.currentIndex];
    if (!q) return;

    // Tracker & Category
    const qNumText = `${this.loc.t('examQuestionCount')} ${session.currentIndex + 1} ${this.loc.t('examOf')} ${session.totalQuestions}`;
    this.qTracker.textContent = qNumText;
    this.categoryTag.textContent = q.category;

    // Progress Bar
    const pct = ((session.currentIndex + 1) / session.totalQuestions) * 100;
    this.progressBarFill.style.width = `${pct}%`;

    // Question Text
    this.questionText.textContent = q.question;

    // Visual Asset Rendering
    this.visualContainer.innerHTML = '';
    if (q.visualType === 'sign' && q.signAsset) {
      this.visualContainer.style.display = 'flex';
      this.visualContainer.innerHTML = `
        <img src="${q.signAsset}" alt="${q.question}" class="question-sign-img" loading="eager" />
      `;
    } else if (q.visualType === 'nano-banana' && q.image) {
      this.visualContainer.style.display = 'flex';
      let overlaysHtml = '';
      if (q.overlayBadges && Array.isArray(q.overlayBadges)) {
        overlaysHtml = `
          <div class="overlay-badge-container">
            ${q.overlayBadges.map(b => `<span class="vehicle-badge">${b}</span>`).join('')}
          </div>
        `;
      }
      this.visualContainer.innerHTML = `
        <img src="${q.image}" alt="${q.imageAlt || q.question}" class="question-scenario-img" id="current-scenario-img" />
        <span class="visual-zoom-hint">🔍 Tap to inspect details</span>
        ${overlaysHtml}
      `;

      document.getElementById('current-scenario-img')?.addEventListener('click', () => {
        this.openLightbox(q.image, q.imageAlt || q.question);
      });
    } else {
      this.visualContainer.style.display = 'none';
    }

    // Answers Rendering
    const letters = ['A', 'B', 'C', 'D'];
    this.answersContainer.innerHTML = q.shuffledAnswers.map((ans, idx) => {
      let stateClass = '';
      if (q.userAnswerIndex === idx) stateClass = 'selected';
      if (session.instantFeedback && q.isAnswered) {
        if (idx === q.correctIndex) stateClass += ' correct-feedback';
        else if (q.userAnswerIndex === idx && !q.isCorrect) stateClass += ' wrong-feedback';
      }

      return `
        <div class="answer-card ${stateClass}" data-ans-index="${idx}" tabindex="0" role="button">
          <span class="answer-marker">${letters[idx]}</span>
          <span class="answer-text">${ans}</span>
        </div>
      `;
    }).join('');

    this.answersContainer.querySelectorAll('.answer-card').forEach(card => {
      card.addEventListener('click', () => {
        const ansIdx = parseInt(card.getAttribute('data-ans-index'), 10);
        this.handleAnswerSelection(ansIdx);
      });
    });

    // Practice Mode Instant Explanation
    if (session.instantFeedback && q.isAnswered) {
      this.explanationText.textContent = q.explanation;
      this.practiceExplanation.classList.add('active');
    } else {
      this.practiceExplanation.classList.remove('active');
    }
  }

  updateTimerDisplay(seconds, formatted) {
    if (this.timerText) {
      this.timerText.textContent = formatted;
    }
  }

  showTimerWarning(mins, msg) {
    if (mins === 5) this.timerPill.classList.add('warning-5');
    if (mins === 1) {
      this.timerPill.classList.remove('warning-5');
      this.timerPill.classList.add('warning-1');
    }
  }

  handleTimerExpire() {
    alert(this.loc.currentLang === 'ar' ? 'انتهى الوقت المخصص للتحدي الزمني! جاري تسليم الاختبار وتقييمه...' : 'Time has expired! Submitting and grading your timed challenge exam...');
    this.examEngine.finishSession();
  }

  toggleAudio() {
    if (this.speech.isSpeaking()) {
      this.speech.stop();
      document.getElementById('btn-read-audio').textContent = `🔊 ${this.loc.t('btnAudio')}`;
    } else {
      const q = this.examEngine.getCurrentQuestion();
      if (!q) return;
      const textToRead = `${q.question}. Option A: ${q.shuffledAnswers[0]}. Option B: ${q.shuffledAnswers[1]}. Option C: ${q.shuffledAnswers[2]}. Option D: ${q.shuffledAnswers[3]}.`;
      this.speech.speak(textToRead, this.loc.currentLang);
      document.getElementById('btn-read-audio').textContent = `⏹ ${this.loc.t('btnAudioStop')}`;
    }
  }

  promptFinishExam() {
    this.openModal(this.submitModal);
  }

  handleExamComplete(session) {
    this.timer.stop();
    this.speech.stop();
    this.progress.recordExamResult(session);

    this.renderResultsView(session);
    this.switchView('results');
  }

  renderResultsView(session) {
    const heroCard = document.getElementById('results-hero-card');
    const heroTitle = document.getElementById('results-hero-title');
    const heroSubtitle = document.getElementById('results-hero-subtitle');
    const scoreNum = document.getElementById('score-number');
    const scorePct = document.getElementById('score-pct');
    const scoreCircleBar = document.getElementById('score-circle-bar');

    // Passed / Failed state
    heroCard.className = `results-hero-card ${session.passed ? 'passed' : 'failed'}`;
    heroTitle.textContent = session.passed ? this.loc.t('resultsPassedTitle') : this.loc.t('resultsFailedTitle');
    heroSubtitle.textContent = session.passed ? this.loc.t('resultsPassedSubtitle') : this.loc.t('resultsFailedSubtitle');

    scoreNum.textContent = `${session.score} / ${session.totalQuestions}`;
    scorePct.textContent = `${session.percentage}%`;

    // Radial circumference is 502px
    const offset = 502 - (502 * (session.score / session.totalQuestions));
    setTimeout(() => {
      if (scoreCircleBar) scoreCircleBar.style.strokeDashoffset = offset;
    }, 100);

    // Summary numbers
    document.getElementById('res-correct').textContent = session.score;
    document.getElementById('res-incorrect').textContent = session.wrongCount;
    document.getElementById('res-skipped').textContent = session.skippedCount;
    document.getElementById('res-time').textContent = ExamTimer.formatTime(session.durationSeconds);

    // Category Breakdown Chart
    const breakdownContainer = document.getElementById('category-breakdown-list');
    if (breakdownContainer && session.categoryBreakdown) {
      breakdownContainer.innerHTML = Object.entries(session.categoryBreakdown).map(([cat, stat]) => {
        let fillClass = 'medium';
        if (stat.percentage >= 80) fillClass = 'high';
        else if (stat.percentage < 60) fillClass = 'low';

        return `
          <div class="breakdown-item">
            <div class="breakdown-item-header">
              <span>${cat}</span>
              <span><strong>${stat.correct} / ${stat.total}</strong> (${stat.percentage}%)</span>
            </div>
            <div class="breakdown-track">
              <div class="breakdown-fill ${fillClass}" style="width: ${stat.percentage}%"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Mistake Review Cards
    const mistakesContainer = document.getElementById('mistakes-cards-container');
    const mistakesSection = document.getElementById('mistakes-section');
    if (session.mistakes && session.mistakes.length > 0) {
      mistakesSection.style.display = 'block';
      mistakesContainer.innerHTML = session.mistakes.map((m, idx) => `
        <div class="mistake-card">
          <div class="mistake-q-num">Question ${m.sessionIndex + 1} • ${m.category}</div>
          <div class="mistake-question">${m.question}</div>
          <div class="mistake-answers-comparison">
            <div class="mistake-ans-box wrong">
              <span class="mistake-box-label">${this.loc.t('yourAnswerLabel')} (Incorrect)</span>
              <div>${m.userAnswerText || 'Skipped'}</div>
            </div>
            <div class="mistake-ans-box correct">
              <span class="mistake-box-label">${this.loc.t('correctAnswerLabel')} (Correct)</span>
              <div>${m.correctAnswer}</div>
            </div>
          </div>
          <div class="mistake-explanation-box">
            <strong>${this.loc.t('explanationLabel')}:</strong> ${m.explanation}
            <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--nx-dark-muted);">
              ${this.loc.t('sourceRefLabel')}: ${m.sourceDocument} (${m.sourceTopic})
            </div>
          </div>
        </div>
      `).join('');
    } else {
      mistakesSection.style.display = 'none';
    }
  }

  renderHome() {
    this.progress.calculateReadiness();
    const readinessStat = document.getElementById('stat-readiness');
    if (readinessStat) {
      readinessStat.textContent = `${this.progress.data.readinessScore}%`;
    }
  }

  renderReadiness() {
    this.progress.calculateReadiness();
    const p = this.progress.data;

    document.getElementById('readiness-score-num').textContent = `${p.readinessScore}%`;
    document.getElementById('readiness-status-label').textContent = p.readinessLabel;
    document.getElementById('readiness-tests-attempted').textContent = p.testsAttempted;
    document.getElementById('readiness-tests-passed').textContent = p.testsPassed;
    document.getElementById('readiness-best-score').textContent = `${p.bestScore} / 30`;
    document.getElementById('readiness-total-answered').textContent = p.totalQuestionsAnswered;

    // Weak & Strong Areas
    const weakList = this.progress.getWeakCategories();
    const strongList = this.progress.getStrongCategories();

    const weakContainer = document.getElementById('readiness-weak-list');
    if (weakContainer) {
      if (weakList.length > 0) {
        weakContainer.innerHTML = weakList.map(w => `
          <div class="breakdown-item">
            <div class="breakdown-item-header">
              <span>${w.category}</span>
              <span><strong style="color: var(--nx-fail-red);">${w.accuracy}%</strong></span>
            </div>
            <div class="breakdown-track">
              <div class="breakdown-fill low" style="width: ${w.accuracy}%"></div>
            </div>
          </div>
        `).join('');
      } else {
        weakContainer.innerHTML = `<p style="color: var(--nx-muted); font-size: 0.85rem;">No critical weak areas identified yet. Keep testing!</p>`;
      }
    }

    const strongContainer = document.getElementById('readiness-strong-list');
    if (strongContainer) {
      if (strongList.length > 0) {
        strongContainer.innerHTML = strongList.map(s => `
          <div class="breakdown-item">
            <div class="breakdown-item-header">
              <span>${s.category}</span>
              <span><strong style="color: var(--nx-pass-green);">${s.accuracy}%</strong></span>
            </div>
            <div class="breakdown-track">
              <div class="breakdown-fill high" style="width: ${s.accuracy}%"></div>
            </div>
          </div>
        `).join('');
      } else {
        strongContainer.innerHTML = `<p style="color: var(--nx-muted); font-size: 0.85rem;">Complete more practice exams to establish mastery metrics.</p>`;
      }
    }

    // Reset Progress trigger
    document.getElementById('btn-trigger-reset')?.addEventListener('click', () => {
      this.openModal(this.resetModal);
    });
  }

  renderStudy() {
    const studyTopics = [
      {
        title: "Class 7 GDL Licensing Restrictions",
        points: [
          "Minimum age: 14 years old (parental consent required under 18).",
          "Must be accompanied by a fully licensed non-probationary Class 5 supervisor aged 18+ in the front passenger seat.",
          "Zero alcohol (0.00% BAC) and zero drug concentration at all times.",
          "Strict curfew: Driving prohibited between midnight (12:00 AM) and 5:00 AM.",
          "Suspension threshold: 8 demerit points (compared to 15 points for full Class 5)."
        ]
      },
      {
        title: "Speed Limits & Special Zones",
        points: [
          "Urban city streets: 50 km/h unless posted otherwise.",
          "Rural primary highways: 100 km/h unless posted otherwise.",
          "Unpaved gravel / secondary roads: 80 km/h unless posted otherwise.",
          "School zones: 30 km/h on school days (8:00–9:30 AM, 11:30 AM–1:30 PM, 3:00–4:30 PM; passing prohibited).",
          "Playground zones: 30 km/h daily from 8:30 AM to 1 hour after sunset (passing prohibited).",
          "Passing stopped emergency / roadside vehicles with flashing lights: Slow to 60 km/h or posted limit if lower."
        ]
      },
      {
        title: "Parking Rules & Hill Parking Angles",
        points: [
          "Parallel parking distance: Tires must be within 50 cm (500 mm) of the curb.",
          "Prohibited zones: 5 metres from fire hydrants, crosswalks, stop signs, and yield signs; 1.5 metres from driveways and alleys.",
          "Uphill with a curb: Turn wheels LEFT (away from curb) and roll back gently to touch curb.",
          "Uphill without a curb: Turn wheels RIGHT (toward road edge/shoulder).",
          "Downhill with a curb: Turn wheels RIGHT (toward curb).",
          "Downhill without a curb: Turn wheels RIGHT (toward road edge/shoulder)."
        ]
      },
      {
        title: "Intersections & Right-of-Way",
        points: [
          "Uncontrolled intersections: Driver on the left must yield to driver on the right.",
          "Four-way stops: First vehicle to stop completely proceeds first; simultaneous arrival yields to the vehicle on the right.",
          "Left turns: Yield to oncoming straight-through traffic and pedestrians before turning.",
          "Traffic circles / Roundabouts: Yield to circulating traffic; enter right lane for 1st exit, left lane for 2nd/3rd exit."
        ]
      },
      {
        title: "School Buses & Railway Crossings",
        points: [
          "School bus with flashing red lights on undivided roads: Traffic in BOTH directions must stop at least 20 metres away.",
          "Railway crossings with flashing lights: Stop at least 5 metres (and no more than 15 metres) from the nearest rail track.",
          "Never shift gears while crossing railroad tracks to prevent stalling."
        ]
      }
    ];

    const studyContainer = document.getElementById('study-topics-grid');
    if (studyContainer) {
      studyContainer.innerHTML = studyTopics.map(t => `
        <div class="mode-card" style="cursor: default;">
          <h3 class="mode-title" style="font-size: 1.25rem;">${t.title}</h3>
          <ul style="padding-left: 1.25rem; color: var(--nx-muted); font-size: 0.875rem; line-height: 1.7; margin-top: 0.75rem;">
            ${t.points.map(p => `<li style="margin-bottom: 0.5rem;">${p}</li>`).join('')}
          </ul>
        </div>
      `).join('');
    }
  }

  updateLanguageUI() {
    const lang = this.loc.currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = this.loc.t(key);
    });

    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
      langToggleBtn.textContent = this.loc.t('langToggle');
    }
  }

  openModal(modal) {
    if (modal) modal.classList.add('active');
  }

  closeModal(modal) {
    if (modal) modal.classList.remove('active');
  }

  openLightbox(src, caption) {
    if (this.lightbox && this.lightboxImg) {
      this.lightboxImg.src = src;
      this.lightboxCaption.textContent = caption || '';
      this.lightbox.classList.add('active');
    }
  }
}

// Initialize Application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
