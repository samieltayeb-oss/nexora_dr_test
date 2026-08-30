// NEXORA DR TEST — Student Progress & Readiness Engine
// Handles local privacy-first performance analytics, category mastery, and readiness calculation

export class ProgressEngine {
  constructor(storageKey = 'nexora_dr_test_progress_v1') {
    this.storageKey = storageKey;
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage unavailable, running in memory-only mode');
    }

    return this.getInitialState();
  }

  getInitialState() {
    return {
      testsAttempted: 0,
      testsPassed: 0,
      bestScore: 0,
      latestScore: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      totalIncorrectAnswers: 0,
      categoryStats: {}, // { [category]: { attempts: 0, correct: 0, wrong: 0 } }
      recentExams: [],   // Array of { id, mode, score, total, percentage, passed, date, duration, categoryBreakdown }
      readinessScore: 0, // 0 - 100%
      readinessLabel: 'Building Knowledge',
      lastUpdated: Date.now()
    };
  }

  saveData() {
    try {
      this.data.lastUpdated = Date.now();
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.warn('Failed to save progress to localStorage');
    }
  }

  recordExamResult(examSession) {
    const { mode, score, total, percentage, passed, durationSeconds, categoryBreakdown } = examSession;

    this.data.testsAttempted++;
    if (passed) this.data.testsPassed++;

    if (score > this.data.bestScore) {
      this.data.bestScore = score;
    }
    this.data.latestScore = score;

    // Record category statistics from this exam
    if (categoryBreakdown) {
      for (const [cat, stats] of Object.entries(categoryBreakdown)) {
        if (!this.data.categoryStats[cat]) {
          this.data.categoryStats[cat] = { attempts: 0, correct: 0, wrong: 0 };
        }
        this.data.categoryStats[cat].attempts += stats.total;
        this.data.categoryStats[cat].correct += stats.correct;
        this.data.categoryStats[cat].wrong += (stats.total - stats.correct);
        this.data.totalQuestionsAnswered += stats.total;
        this.data.totalCorrectAnswers += stats.correct;
        this.data.totalIncorrectAnswers += (stats.total - stats.correct);
      }
    }

    // Append to recent exams (keep last 20)
    this.data.recentExams.unshift({
      id: 'EX-' + Date.now(),
      mode: mode || 'Real Exam Simulation',
      score,
      total,
      percentage,
      passed,
      date: new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      durationSeconds: durationSeconds || 0,
      categoryBreakdown: categoryBreakdown || {}
    });

    if (this.data.recentExams.length > 20) {
      this.data.recentExams.pop();
    }

    this.calculateReadiness();
    this.saveData();
  }

  recordSingleAnswer(category, isCorrect) {
    if (!category) return;
    if (!this.data.categoryStats[category]) {
      this.data.categoryStats[category] = { attempts: 0, correct: 0, wrong: 0 };
    }

    this.data.categoryStats[category].attempts++;
    if (isCorrect) {
      this.data.categoryStats[category].correct++;
      this.data.totalCorrectAnswers++;
    } else {
      this.data.categoryStats[category].wrong++;
      this.data.totalIncorrectAnswers++;
    }
    this.data.totalQuestionsAnswered++;

    this.calculateReadiness();
    this.saveData();
  }

  /**
   * Transparent Readiness Calculation Algorithm:
   * 1. Average of last 5 exams (weight: 50%)
   * 2. Overall category accuracy (weight: 30%)
   * 3. Volume and topic coverage bonus (weight: 20%)
   */
  calculateReadiness() {
    if (this.data.testsAttempted === 0 && this.data.totalQuestionsAnswered === 0) {
      this.data.readinessScore = 0;
      this.data.readinessLabel = 'Building Knowledge';
      return;
    }

    // 1. Recent exam performance (last 5 exams)
    const recent = this.data.recentExams.slice(0, 5);
    let recentAvg = 0;
    if (recent.length > 0) {
      const sum = recent.reduce((acc, ex) => acc + (ex.score / ex.total) * 100, 0);
      recentAvg = sum / recent.length;
    }

    // 2. Category accuracy
    let totalCatPct = 0;
    let catCount = 0;
    for (const stats of Object.values(this.data.categoryStats)) {
      if (stats.attempts > 0) {
        totalCatPct += (stats.correct / stats.attempts) * 100;
        catCount++;
      }
    }
    const catAvg = catCount > 0 ? (totalCatPct / catCount) : recentAvg;

    // 3. Experience factor (scales up to 100 questions)
    const experienceFactor = Math.min(1.0, this.data.totalQuestionsAnswered / 90);

    // Weighted formula
    let rawReadiness = 0;
    if (recent.length > 0) {
      rawReadiness = (recentAvg * 0.55) + (catAvg * 0.35) + (experienceFactor * 10);
    } else {
      rawReadiness = (catAvg * 0.85) + (experienceFactor * 15);
    }

    const finalScore = Math.min(100, Math.max(0, Math.round(rawReadiness)));
    this.data.readinessScore = finalScore;

    if (finalScore >= 85 && this.data.testsPassed >= 2) {
      this.data.readinessLabel = 'Exam Ready';
    } else if (finalScore >= 70) {
      this.data.readinessLabel = 'Almost Ready';
    } else {
      this.data.readinessLabel = 'Building Knowledge';
    }
  }

  getWeakCategories(threshold = 75) {
    const weak = [];
    for (const [cat, stats] of Object.entries(this.data.categoryStats)) {
      if (stats.attempts >= 2) {
        const accuracy = (stats.correct / stats.attempts) * 100;
        if (accuracy < threshold) {
          weak.push({ category: cat, accuracy: Math.round(accuracy), ...stats });
        }
      }
    }
    return weak.sort((a, b) => a.accuracy - b.accuracy);
  }

  getStrongCategories(threshold = 85) {
    const strong = [];
    for (const [cat, stats] of Object.entries(this.data.categoryStats)) {
      if (stats.attempts >= 2) {
        const accuracy = (stats.correct / stats.attempts) * 100;
        if (accuracy >= threshold) {
          strong.push({ category: cat, accuracy: Math.round(accuracy), ...stats });
        }
      }
    }
    return strong.sort((a, b) => b.accuracy - a.accuracy);
  }

  resetProgress() {
    this.data = this.getInitialState();
    this.saveData();
  }
}
