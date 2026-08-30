// NEXORA DR TEST — Question Engine
// Handles deterministic randomized exam generation, category weighting, and answer shuffling

import { albertaConfig } from './config.js';

export class QuestionEngine {
  /**
   * Fisher-Yates array shuffler (deterministic clone)
   */
  static shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Shuffles answers for a question while maintaining correct answer mapping integrity
   */
  static prepareQuestion(question, sessionIndex = 0) {
    const shuffledAnswers = this.shuffle(question.answers);
    const correctIndex = shuffledAnswers.indexOf(question.correctAnswer);

    if (correctIndex === -1) {
      throw new Error(`Corrupted correct answer mapping for question ${question.id}`);
    }

    return {
      ...question,
      sessionIndex,
      shuffledAnswers,
      correctIndex, // 0=A, 1=B, 2=C, 3=D
      userAnswerIndex: null,
      userAnswerText: null,
      isSkipped: false,
      isAnswered: false,
      isCorrect: null,
      answeredAt: null
    };
  }

  /**
   * Generates a balanced 30-question Real Exam Simulation
   */
  static generateExam(bank, count = albertaConfig.questionsPerExam) {
    if (!Array.isArray(bank) || bank.length < count) {
      throw new Error(`Insufficient question bank: requires at least ${count} questions`);
    }

    // Categorize questions for weighted topic distribution
    const roadSigns = bank.filter(q => q.visualType === 'sign' || q.category === 'Road Signs' || q.category === 'شواخص وإشارات المرور');
    const scenarios = bank.filter(q => q.visualType === 'nano-banana');
    const rightOfWay = bank.filter(q => q.category === 'Right-of-Way' || q.category === 'Intersections' || q.category === 'Stop Signs' || q.category === 'Yield Signs' || q.category === 'Traffic Circles' || q.category === 'حق الأولوية' || q.category === 'التقاطعات وحركة السير' || q.category === 'إشارات التوقف');
    const rulesAndSafety = bank.filter(q => !roadSigns.includes(q) && !scenarios.includes(q) && !rightOfWay.includes(q));

    const selectedIds = new Set();
    const selected = [];

    // Helper to pick random unique
    const pickFrom = (pool, num) => {
      const shuffledPool = this.shuffle(pool);
      for (const q of shuffledPool) {
        if (!selectedIds.has(q.id) && selected.length < count) {
          selectedIds.add(q.id);
          selected.push(q);
          if (selected.length === count) break;
        }
      }
    };

    // Guarantee diversity:
    // 5-7 Road Signs
    pickFrom(roadSigns, 6);
    // 4-6 Visual Nano Banana scenarios
    pickFrom(scenarios, 5);
    // 6-8 Right of way / intersections
    pickFrom(rightOfWay, 7);
    // Fill remaining from general rules, speed, parking, licence, emergencies
    pickFrom(rulesAndSafety, count - selected.length);

    // If still under count, fill from any remaining
    if (selected.length < count) {
      pickFrom(bank, count - selected.length);
    }

    // Final shuffle of the 30 questions to randomize question appearance order
    const finalQuestions = this.shuffle(selected).map((q, idx) => this.prepareQuestion(q, idx));

    return finalQuestions;
  }

  /**
   * Generates a practice set filtered by category and/or difficulty
   */
  static generatePracticeSet(bank, category = null, difficulty = null, count = 20) {
    let filtered = [...bank];

    if (category && category !== 'all') {
      filtered = filtered.filter(q => q.category === category);
    }
    if (difficulty && difficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === difficulty);
    }

    const shuffled = this.shuffle(filtered);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    return selected.map((q, idx) => this.prepareQuestion(q, idx));
  }

  /**
   * Generates Smart Review questions weighted toward user's weakest categories
   */
  static generateSmartReview(bank, weakCategories = [], count = 30) {
    if (!weakCategories || weakCategories.length === 0) {
      return this.generateExam(bank, count);
    }

    const weakPool = bank.filter(q => weakCategories.includes(q.category));
    const normalPool = bank.filter(q => !weakCategories.includes(q.category));

    const selectedIds = new Set();
    const selected = [];

    // Prioritize 60-70% weak area questions
    const weakTarget = Math.min(Math.floor(count * 0.7), weakPool.length);
    for (const q of this.shuffle(weakPool)) {
      if (!selectedIds.has(q.id) && selected.length < weakTarget) {
        selectedIds.add(q.id);
        selected.push(q);
      }
    }

    // Fill the rest with normal pool
    for (const q of this.shuffle(normalPool)) {
      if (!selectedIds.has(q.id) && selected.length < count) {
        selectedIds.add(q.id);
        selected.push(q);
      }
    }

    return this.shuffle(selected).map((q, idx) => this.prepareQuestion(q, idx));
  }

  /**
   * Generates a focused Road Sign recognition challenge
   */
  static generateRoadSignChallenge(bank, count = 25) {
    const signs = bank.filter(q => q.visualType === 'sign' || q.category === 'Road Signs' || q.category === 'شواخص وإشارات المرور');
    const shuffled = this.shuffle(signs);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    return selected.map((q, idx) => this.prepareQuestion(q, idx));
  }
}
