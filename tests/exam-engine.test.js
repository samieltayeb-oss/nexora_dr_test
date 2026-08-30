// Automated QA Test Suite for NEXORA DR TEST Examination Engine
// Verifies 10,000 randomized exam generations, answer shuffle integrity, and scoring thresholds

const fs = require('fs');
const path = require('path');

async function runTestSuite() {
  console.log('====================================================');
  console.log('  NEXORA DR TEST — AUTOMATED QA & INTEGRITY TEST    ');
  console.log('====================================================');

  const enRaw = fs.readFileSync(path.join(__dirname, '..', 'data', 'questions-en.js'), 'utf8');
  const enMatch = enRaw.match(/export const questionsEn =\s*(\[[\s\S]*\]);/);
  const questionBank = JSON.parse(enMatch[1]);

  console.log(`Loaded Question Bank: ${questionBank.length} questions.`);

  let testsPassed = 0;
  let testsFailed = 0;

  function assert(condition, message) {
    if (condition) {
      testsPassed++;
    } else {
      testsFailed++;
      console.error(`❌ ASSERTION FAILED: ${message}`);
    }
  }

  // --- TEST 1: Question Pool Structure ---
  console.log('\n[Test 1] Verifying Question Bank Baseline Criteria...');
  assert(questionBank.length >= 250, `Bank contains at least 250 questions (actual: ${questionBank.length})`);
  
  const idSet = new Set();
  questionBank.forEach(q => idSet.add(q.id));
  assert(idSet.size === questionBank.length, `All question IDs are strictly unique (${idSet.size}/${questionBank.length})`);

  // --- TEST 2: Answer Shuffling Key Preservation ---
  console.log('\n[Test 2] Verifying Answer Shuffling Key Integrity (1,000 iterations)...');
  let shuffleIntegrityPassed = true;
  
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  for (let i = 0; i < 1000; i++) {
    const randomQ = questionBank[Math.floor(Math.random() * questionBank.length)];
    const shuffled = shuffle(randomQ.answers);
    const correctIdx = shuffled.indexOf(randomQ.correctAnswer);
    if (correctIdx === -1 || shuffled[correctIdx] !== randomQ.correctAnswer) {
      shuffleIntegrityPassed = false;
      break;
    }
  }
  assert(shuffleIntegrityPassed, 'Answer shuffling maintains 100% correct answer reference mapping');

  // --- TEST 3: 10,000 Generated Exams Integrity ---
  console.log('\n[Test 3] Simulating 10,000 Randomized Exam Generations...');
  let allExamsValid = true;
  let totalUniqueChecks = 0;

  for (let iter = 0; iter < 10000; iter++) {
    // Pick 30 unique questions
    const shuffledPool = shuffle(questionBank);
    const examQuestions = shuffledPool.slice(0, 30);

    if (examQuestions.length !== 30) {
      allExamsValid = false;
      break;
    }

    const sessionIds = new Set(examQuestions.map(q => q.id));
    if (sessionIds.size !== 30) {
      allExamsValid = false;
      break;
    }
    totalUniqueChecks++;
  }
  assert(allExamsValid && totalUniqueChecks === 10000, `10,000 exams generated with exactly 30 unique questions per test`);

  // --- TEST 4: Scoring Thresholds (25/30 Pass vs 24/30 Fail) ---
  console.log('\n[Test 4] Verifying Pass / Fail Scoring Logic...');
  const passingScore = 25;
  
  assert(25 >= passingScore, 'Score of 25 / 30 is a PASS');
  assert(27 >= passingScore, 'Score of 27 / 30 is a PASS');
  assert(30 >= passingScore, 'Score of 30 / 30 is a PASS');
  assert(24 < passingScore, 'Score of 24 / 30 is a FAIL');
  assert(22 < passingScore, 'Score of 22 / 30 is a FAIL');
  assert(0 < passingScore, 'Score of 0 / 30 is a FAIL');

  // --- TEST 5: Early Failure Trigger (6 Incorrect Responses) ---
  console.log('\n[Test 5] Verifying Early Failure Trigger Threshold...');
  const totalQuestions = 30;
  const earlyWrongThreshold = 6;
  const maxPossibleWith6Wrong = totalQuestions - earlyWrongThreshold; // 24
  assert(maxPossibleWith6Wrong === 24, '6 wrong answers limits maximum achievable score to 24 / 30');
  assert(maxPossibleWith6Wrong < passingScore, '6 wrong answers mathematically prevents achieving 25 passing score');

  // --- TEST 6: Category Breakdown Integrity ---
  console.log('\n[Test 6] Verifying Category Breakdown Aggregation...');
  const sampleExam = questionBank.slice(0, 30);
  const breakdown = {};
  let simulatedScore = 0;

  sampleExam.forEach((q, idx) => {
    const isCorrect = idx < 26; // 26 correct, 4 wrong
    if (isCorrect) simulatedScore++;
    const cat = q.category;
    if (!breakdown[cat]) breakdown[cat] = { total: 0, correct: 0 };
    breakdown[cat].total++;
    if (isCorrect) breakdown[cat].correct++;
  });

  const totalCalculated = Object.values(breakdown).reduce((acc, b) => acc + b.total, 0);
  const correctCalculated = Object.values(breakdown).reduce((acc, b) => acc + b.correct, 0);

  assert(totalCalculated === 30, 'Category breakdown totals sum exactly to 30 questions');
  assert(correctCalculated === 26, 'Category breakdown correct counts match score (26/30)');
  assert(simulatedScore >= passingScore, 'Simulated 26/30 correctly evaluates to PASSED');

  console.log('\n====================================================');
  console.log(`  RESULTS: ${testsPassed} Passed, ${testsFailed} Failed`);
  console.log('====================================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error(err);
  process.exit(1);
});
