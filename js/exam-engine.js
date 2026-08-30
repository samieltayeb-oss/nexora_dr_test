// NEXORA DR TEST — Examination Session Engine
// Core state machine managing Real Exam Simulation, Practice, Timed, and Smart Review sessions

import { QuestionEngine } from './question-engine.js';
import { albertaConfig } from './config.js';

export class ExamEngine {
  constructor(options = {}) {
    this.storageKey = options.storageKey || 'nexora_active_exam_session';
    this.session = null;
    this.onStateChange = options.onStateChange || (() => {});
    this.onExamComplete = options.onExamComplete || (() => {});
  }

  /**
   * Starts a new examination session
   */
  startSession(mode = 'real-exam', questionBank = [], options = {}) {
    let questions = [];

    if (mode === 'real-exam') {
      questions = QuestionEngine.generateExam(questionBank, albertaConfig.questionsPerExam);
    } else if (mode === 'timed') {
      questions = QuestionEngine.generateExam(questionBank, albertaConfig.questionsPerExam);
    } else if (mode === 'smart-review') {
      questions = QuestionEngine.generateSmartReview(questionBank, options.weakCategories || [], albertaConfig.questionsPerExam);
    } else if (mode === 'road-signs') {
      questions = QuestionEngine.generateRoadSignChallenge(questionBank, 25);
    } else if (mode === 'practice') {
      questions = QuestionEngine.generatePracticeSet(questionBank, options.category, options.difficulty, options.count || 20);
    } else {
      questions = QuestionEngine.generateExam(questionBank, albertaConfig.questionsPerExam);
    }

    this.session = {
      id: 'SESS-' + Date.now(),
      mode,
      questions,
      currentIndex: 0,
      totalQuestions: questions.length,
      passingScore: mode === 'road-signs' ? Math.ceil(questions.length * 0.85) : albertaConfig.passingScore,
      score: 0,
      wrongCount: 0,
      skippedCount: 0,
      answeredCount: 0,
      startTime: Date.now(),
      endTime: null,
      durationSeconds: 0,
      isCompleted: false,
      passed: false,
      earlyFailed: false,
      instantFeedback: mode === 'practice' // Only practice mode shows immediate feedback
    };

    this.saveSession();
    this.notifyState();
    return this.session;
  }

  getCurrentQuestion() {
    if (!this.session || !this.session.questions) return null;
    return this.session.questions[this.session.currentIndex] || null;
  }

  /**
   * User submits an answer for the current question
   */
  answerCurrentQuestion(answerIndex) {
    if (!this.session || this.session.isCompleted) return null;

    const q = this.getCurrentQuestion();
    if (!q) return null;

    const isCorrect = answerIndex === q.correctIndex;
    const isFirstTimeAnswered = !q.isAnswered;

    q.userAnswerIndex = answerIndex;
    q.userAnswerText = q.shuffledAnswers[answerIndex];
    q.isAnswered = true;
    q.isSkipped = false;
    q.isCorrect = isCorrect;
    q.answeredAt = Date.now();

    // Recompute session stats
    this.recomputeStats();

    // Real Exam Simulation Early-Failure Check:
    // Once 6 incorrect answers are reached, achieving 25 is mathematically impossible
    if (this.session.mode === 'real-exam' && this.session.wrongCount >= albertaConfig.earlyFailureWrongThreshold) {
      this.session.earlyFailed = true;
      // In real exam simulator, finalize fail
      return this.finishSession(true);
    }

    this.saveSession();
    this.notifyState();

    return {
      isCorrect,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      instantFeedback: this.session.instantFeedback
    };
  }

  /**
   * User skips current question to review later
   */
  skipCurrentQuestion() {
    if (!this.session || this.session.isCompleted) return;

    const q = this.getCurrentQuestion();
    if (q && !q.isAnswered) {
      q.isSkipped = true;
    }

    this.recomputeStats();
    this.goToNextQuestion();
  }

  goToNextQuestion() {
    if (!this.session) return;
    if (this.session.currentIndex < this.session.totalQuestions - 1) {
      this.session.currentIndex++;
      this.saveSession();
      this.notifyState();
    } else {
      // At the end, if there are unanswered skipped questions, cycle back to the first unanswered
      const firstUnanswered = this.session.questions.findIndex(q => !q.isAnswered);
      if (firstUnanswered !== -1 && firstUnanswered !== this.session.currentIndex) {
        this.session.currentIndex = firstUnanswered;
        this.saveSession();
        this.notifyState();
      }
    }
  }

  goToPreviousQuestion() {
    if (!this.session) return;
    if (this.session.currentIndex > 0) {
      this.session.currentIndex--;
      this.saveSession();
      this.notifyState();
    }
  }

  goToQuestion(index) {
    if (!this.session || index < 0 || index >= this.session.totalQuestions) return;
    this.session.currentIndex = index;
    this.saveSession();
    this.notifyState();
  }

  recomputeStats() {
    let score = 0;
    let wrong = 0;
    let skipped = 0;
    let answered = 0;

    for (const q of this.session.questions) {
      if (q.isAnswered) {
        answered++;
        if (q.isCorrect) {
          score++;
        } else {
          wrong++;
        }
      } else if (q.isSkipped) {
        skipped++;
      }
    }

    this.session.score = score;
    this.session.wrongCount = wrong;
    this.session.skippedCount = skipped;
    this.session.answeredCount = answered;
  }

  /**
   * Finalizes and grades the examination session
   */
  finishSession(earlyFailed = false) {
    if (!this.session) return null;

    this.session.endTime = Date.now();
    this.session.durationSeconds = Math.round((this.session.endTime - this.session.startTime) / 1000);
    this.session.isCompleted = true;

    this.recomputeStats();

    this.session.percentage = Math.round((this.session.score / this.session.totalQuestions) * 100);
    this.session.passed = !earlyFailed && this.session.score >= this.session.passingScore;
    this.session.earlyFailed = earlyFailed;

    this.session.categoryBreakdown = this.computeCategoryBreakdown();
    this.session.mistakes = this.getMistakes();

    this.clearSavedSession();
    this.notifyState();
    this.onExamComplete(this.session);

    return this.session;
  }

  computeCategoryBreakdown() {
    const breakdown = {};
    for (const q of this.session.questions) {
      const cat = q.category || 'General';
      if (!breakdown[cat]) {
        breakdown[cat] = { total: 0, correct: 0, wrong: 0, percentage: 0 };
      }
      breakdown[cat].total++;
      if (q.isCorrect) {
        breakdown[cat].correct++;
      } else if (q.isAnswered) {
        breakdown[cat].wrong++;
      }
    }

    for (const cat of Object.keys(breakdown)) {
      breakdown[cat].percentage = Math.round((breakdown[cat].correct / breakdown[cat].total) * 100);
    }

    return breakdown;
  }

  getMistakes() {
    if (!this.session) return [];
    return this.session.questions.filter(q => q.isAnswered && !q.isCorrect);
  }

  saveSession() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.session));
    } catch (e) {}
  }

  restoreSession() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const session = JSON.parse(saved);
        if (session && !session.isCompleted) {
          this.session = session;
          this.notifyState();
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  clearSavedSession() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (e) {}
  }

  notifyState() {
    this.onStateChange(this.session);
  }
}
