const fs = require('fs');
const path = require('path');

// Automated Validation Suite for Top 30 High-Priority Study Pack & PDFs (V1.1)

async function runTop30Tests() {
  console.log('====================================================');
  console.log('  NEXORA DR TEST — TOP 30 STUDY PACK VALIDATOR (V1.1)');
  console.log('====================================================');

  const enPath = path.join(__dirname, '..', 'data', 'questions-en.js');
  const arPath = path.join(__dirname, '..', 'data', 'questions-ar.js');
  const packPath = path.join(__dirname, '..', 'data', 'top30-study-pack.js');
  const enPdfPath = path.join(__dirname, '..', 'downloads', 'nexora-dr-test-top-30-en.pdf');
  const arPdfPath = path.join(__dirname, '..', 'downloads', 'nexora-dr-test-top-30-ar.pdf');

  const enRaw = fs.readFileSync(enPath, 'utf8');
  const arRaw = fs.readFileSync(arPath, 'utf8');
  const packRaw = fs.readFileSync(packPath, 'utf8');

  const enQuestions = JSON.parse(enRaw.match(/export const questionsEn =\s*(\[[\s\S]*\]);/)[1]);
  const arQuestions = JSON.parse(arRaw.match(/export const questionsAr =\s*(\[[\s\S]*\]);/)[1]);
  const cleanPackJson = packRaw.match(/export const top30StudyPack =\s*(\[[\s\S]*\]);/)[1].replace(/\/\/.*/g, '');
  const studyPack = eval(`(${cleanPackJson})`);

  const enMap = new Map(enQuestions.map(q => [q.id, q]));
  const arMap = new Map(arQuestions.map(q => [q.id, q]));

  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      passed++;
    } else {
      failed++;
      console.error(`❌ FAILED: ${msg}`);
    }
  }

  // 1. Pack Count
  assert(studyPack.length === 30, `Study pack contains exactly 30 questions (actual: ${studyPack.length})`);

  // 2. Unique Question IDs
  const idSet = new Set(studyPack.map(item => item.questionId));
  assert(idSet.size === 30, `All 30 question IDs in study pack are strictly unique (${idSet.size}/30)`);

  // 3. ID Existence & Parity
  let allExistInEn = true;
  let allExistInAr = true;
  let allHaveTips = true;
  let allHaveAssets = true;

  studyPack.forEach((item, idx) => {
    const qEn = enMap.get(item.questionId);
    const qAr = arMap.get(item.questionId);

    if (!qEn) {
      allExistInEn = false;
      console.error(`Missing question in EN bank: ${item.questionId}`);
    }
    if (!qAr) {
      allExistInAr = false;
      console.error(`Missing question in AR bank: ${item.questionId}`);
    }

    if (!item.studyTip || !item.studyTipAr) {
      allHaveTips = false;
      console.error(`Missing study tip in item ${idx + 1} (${item.questionId})`);
    }

    if (qEn) {
      if (qEn.visualType === 'sign' && qEn.signAsset) {
        const full = path.join(__dirname, '..', qEn.signAsset);
        if (!fs.existsSync(full)) allHaveAssets = false;
      } else if (qEn.visualType === 'nano-banana' && qEn.image) {
        const full = path.join(__dirname, '..', qEn.image);
        if (!fs.existsSync(full)) allHaveAssets = false;
      }
    }
  });

  assert(allExistInEn, '100% of study pack questions exist in English question bank');
  assert(allExistInAr, '100% of study pack questions exist in Arabic question bank');
  assert(allHaveTips, '100% of study pack entries have English and Arabic study tips');
  assert(allHaveAssets, '100% of referenced visual assets exist on disk');

  // 4. Category Coverage Balance
  const categories = new Set(studyPack.map(i => i.categoryGroup));
  assert(categories.size >= 8, `Study pack covers broad curriculum categories (actual: ${categories.size} groups)`);

  // 5. PDF Files Existence & Size
  assert(fs.existsSync(enPdfPath), `English PDF exists at ${enPdfPath}`);
  assert(fs.existsSync(arPdfPath), `Arabic PDF exists at ${arPdfPath}`);

  if (fs.existsSync(enPdfPath)) {
    const sizeEn = fs.statSync(enPdfPath).size;
    assert(sizeEn > 500000, `English PDF has substantial content size (${(sizeEn / 1024).toFixed(1)} KB)`);
  }

  if (fs.existsSync(arPdfPath)) {
    const sizeAr = fs.statSync(arPdfPath).size;
    assert(sizeAr > 500000, `Arabic PDF has substantial content size (${(sizeAr / 1024).toFixed(1)} KB)`);
  }

  console.log(`\nResults: ${passed} Passed, ${failed} Failed`);
  if (failed > 0) process.exit(1);
}

runTop30Tests().catch(err => {
  console.error(err);
  process.exit(1);
});
