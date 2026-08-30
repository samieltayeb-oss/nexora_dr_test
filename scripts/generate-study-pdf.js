const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// NEXORA DR TEST — Automated PDF Study Guide Generator (V1.1)
// Generates English and Arabic print-ready PDFs using Edge Chromium engine

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

if (!fs.existsSync(edgePath)) {
  console.error("Microsoft Edge not found at expected path:", edgePath);
  process.exit(1);
}

// 1. Load Data
const enPath = path.join(__dirname, '..', 'data', 'questions-en.js');
const arPath = path.join(__dirname, '..', 'data', 'questions-ar.js');
const studyPackPath = path.join(__dirname, '..', 'data', 'top30-study-pack.js');

const enRaw = fs.readFileSync(enPath, 'utf8');
const arRaw = fs.readFileSync(arPath, 'utf8');
const packRaw = fs.readFileSync(studyPackPath, 'utf8');

const enQuestions = JSON.parse(enRaw.match(/export const questionsEn =\s*(\[[\s\S]*\]);/)[1]);
const arQuestions = JSON.parse(arRaw.match(/export const questionsAr =\s*(\[[\s\S]*\]);/)[1]);

const packMatch = packRaw.match(/export const top30StudyPack =\s*(\[[\s\S]*\]);/)[1];
// Strip single line comments from JS object notation
const cleanPackJson = packMatch.replace(/\/\/.*/g, '');
const studyPack = eval(`(${cleanPackJson})`);

const enMap = new Map(enQuestions.map(q => [q.id, q]));
const arMap = new Map(arQuestions.map(q => [q.id, q]));

// Ensure downloads directory exists
const downloadsDir = path.join(__dirname, '..', 'downloads');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// Helper to encode image asset to base64
function getBase64Asset(relPath) {
  if (!relPath) return null;
  const cleanPath = relPath.startsWith('/') ? relPath.substring(1) : relPath;
  const fullPath = path.join(__dirname, '..', cleanPath);
  if (!fs.existsSync(fullPath)) {
    console.warn("Asset not found for base64 encoding:", fullPath);
    return null;
  }
  const ext = path.extname(fullPath).toLowerCase();
  let mime = 'image/jpeg';
  if (ext === '.svg') mime = 'image/svg+xml';
  else if (ext === '.png') mime = 'image/png';
  
  const b64 = fs.readFileSync(fullPath).toString('base64');
  return `data:${mime};base64,${b64}`;
}

const logoPrimaryB64 = getBase64Asset('/assets/brand/logo-primary.png') || '';

// Common Styles for Premium Light / Cream Print Booklet
const commonStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

  @page {
    size: letter portrait;
    margin: 15mm 15mm 15mm 15mm;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #FAF8F5;
    color: #1A1A1A;
    font-family: 'DM Sans', -apple-system, sans-serif;
    font-size: 9.5pt;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page-break {
    page-break-after: always;
    break-after: page;
  }

  .avoid-break {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Typography */
  h1, h2, h3, h4 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 600;
    color: #0E0E0E;
    line-height: 1.15;
  }

  .font-mono {
    font-family: 'Space Mono', monospace;
    text-transform: uppercase;
  }

  /* Cover Page Styles */
  .cover-container {
    height: 92vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2.5rem 1.5rem;
    border: 0.5px solid rgba(196, 154, 16, 0.35);
    background: #FFFFFF;
    position: relative;
    border-radius: 4px;
  }

  .cover-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.5px solid #EAE5DB;
    padding-bottom: 1.5rem;
  }

  .cover-logo {
    height: 38px;
    width: auto;
    filter: invert(1) brightness(0.2);
  }

  .cover-badge {
    font-family: 'Space Mono', monospace;
    font-size: 7pt;
    letter-spacing: 0.2em;
    color: #8C6D07;
    background: #FAF2DA;
    border: 0.5px solid #C49A10;
    padding: 0.3rem 0.7rem;
    border-radius: 2px;
    font-weight: 700;
  }

  .cover-hero {
    text-align: center;
    margin: 3rem 0;
  }

  .cover-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 8pt;
    letter-spacing: 0.28em;
    color: #8C6D07;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  .cover-title {
    font-size: 34pt;
    margin-bottom: 1rem;
    color: #0A0A0A;
  }

  .cover-subtitle {
    font-size: 13pt;
    color: #555555;
    max-width: 500px;
    margin: 0 auto 2.5rem;
    font-weight: 300;
  }

  .personalization-box {
    background: #FAF8F5;
    border: 0.5px solid #C49A10;
    border-left: 3px solid #C49A10;
    padding: 1.25rem 2rem;
    margin: 0 auto;
    max-width: 480px;
    text-align: center;
    border-radius: 0 4px 4px 0;
  }

  .personalization-label {
    font-family: 'Space Mono', monospace;
    font-size: 7.5pt;
    letter-spacing: 0.2em;
    color: #8C6D07;
    text-transform: uppercase;
    margin-bottom: 0.3rem;
  }

  .personalization-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 18pt;
    font-weight: 700;
    color: #111111;
  }

  .personalization-meta {
    font-family: 'Space Mono', monospace;
    font-size: 7pt;
    color: #777777;
    letter-spacing: 0.12em;
    margin-top: 0.25rem;
  }

  .cover-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 0.5px solid #EAE5DB;
    padding-top: 1.5rem;
    font-size: 7.5pt;
    color: #777777;
    font-family: 'Space Mono', monospace;
  }

  /* Content Pages */
  .section-header {
    margin-bottom: 1.5rem;
    border-bottom: 0.5px solid #C49A10;
    padding-bottom: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .section-title {
    font-size: 18pt;
    color: #0A0A0A;
  }

  .section-meta {
    font-family: 'Space Mono', monospace;
    font-size: 7pt;
    color: #8C6D07;
    letter-spacing: 0.15em;
  }

  /* Question Card */
  .question-card {
    background: #FFFFFF;
    border: 0.5px solid #E2DCD1;
    border-radius: 4px;
    padding: 1.1rem 1.25rem;
    margin-bottom: 1.25rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
  }

  .q-top-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .q-number {
    font-family: 'Space Mono', monospace;
    font-size: 8pt;
    font-weight: 700;
    color: #8C6D07;
    letter-spacing: 0.12em;
  }

  .q-category-tag {
    font-family: 'Space Mono', monospace;
    font-size: 6.5pt;
    text-transform: uppercase;
    background: #FAF2DA;
    color: #6B4F08;
    padding: 0.15rem 0.5rem;
    border-radius: 2px;
    border: 0.5px solid rgba(196, 154, 16, 0.4);
  }

  .q-text {
    font-size: 10pt;
    font-weight: 500;
    color: #111111;
    line-height: 1.45;
    margin-bottom: 0.75rem;
  }

  .q-visual-container {
    text-align: center;
    margin: 0.5rem 0 0.85rem;
    padding: 0.5rem;
    background: #F8F6F0;
    border: 0.5px solid #EAE5DB;
    border-radius: 3px;
  }

  .q-visual-img {
    max-height: 120px;
    max-width: 90%;
    object-fit: contain;
    border-radius: 2px;
  }

  .q-options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
    margin-bottom: 0.75rem;
  }

  .q-option-box {
    padding: 0.35rem 0.6rem;
    border-radius: 3px;
    border: 0.5px solid #EAE5DB;
    background: #FAF8F5;
    font-size: 8.5pt;
    display: flex;
    align-items: flex-start;
    gap: 0.4rem;
    color: #333333;
  }

  .q-option-box.is-correct {
    background: #F0FDF4;
    border-color: #86EFAC;
    color: #14532D;
    font-weight: 600;
  }

  .q-opt-marker {
    font-family: 'Space Mono', monospace;
    font-size: 7.5pt;
    font-weight: 700;
    color: #777777;
    flex-shrink: 0;
  }

  .is-correct .q-opt-marker {
    color: #15803D;
  }

  .q-explanation-box {
    background: #FAF8F5;
    border-left: 2px solid #C49A10;
    padding: 0.5rem 0.75rem;
    font-size: 8pt;
    color: #333333;
    line-height: 1.45;
    margin-bottom: 0.4rem;
  }

  .q-tip-box {
    background: #FEF9C3;
    border: 0.5px solid #FDE047;
    border-radius: 2px;
    padding: 0.4rem 0.65rem;
    font-size: 7.5pt;
    color: #713F12;
    margin-bottom: 0.35rem;
  }

  .q-source-meta {
    font-family: 'Space Mono', monospace;
    font-size: 6.5pt;
    color: #888888;
    text-align: right;
  }

  /* Summary Table */
  .summary-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 8.5pt;
  }

  .summary-table th, .summary-table td {
    border: 0.5px solid #DDD7CC;
    padding: 0.5rem 0.75rem;
    text-align: left;
  }

  .summary-table th {
    background: #F4EFE6;
    font-family: 'Space Mono', monospace;
    font-size: 7.5pt;
    color: #6B4F08;
    text-transform: uppercase;
  }

  .disclaimer-box {
    border-top: 0.5px solid #C49A10;
    padding-top: 1rem;
    margin-top: 2rem;
    font-size: 7pt;
    color: #777777;
    line-height: 1.5;
  }
`;

// Build English HTML
function buildEnglishHtml() {
  const letters = ['A', 'B', 'C', 'D'];

  const questionsHtml = studyPack.map((item, idx) => {
    const q = enMap.get(item.questionId);
    if (!q) throw new Error(`Missing English question ${item.questionId}`);

    let visualHtml = '';
    if (q.visualType === 'sign' && q.signAsset) {
      const b64 = getBase64Asset(q.signAsset);
      if (b64) visualHtml = `<div class="q-visual-container"><img src="${b64}" class="q-visual-img" alt="Road Sign" /></div>`;
    } else if (q.visualType === 'nano-banana' && q.image) {
      const b64 = getBase64Asset(q.image);
      if (b64) visualHtml = `<div class="q-visual-container"><img src="${b64}" class="q-visual-img" alt="Driving Scenario" /></div>`;
    }

    const optionsHtml = q.answers.map((ans, aIdx) => {
      const isCorrect = ans === q.correctAnswer;
      return `
        <div class="q-option-box ${isCorrect ? 'is-correct' : ''}">
          <span class="q-opt-marker">${letters[aIdx]}.</span>
          <span>${ans} ${isCorrect ? '✓' : ''}</span>
        </div>
      `;
    }).join('');

    const isPageBreak = (idx + 1) % 3 === 0 && (idx + 1) !== 30;

    return `
      <div class="question-card avoid-break">
        <div class="q-top-meta">
          <span class="q-number">QUESTION ${String(idx + 1).padStart(2, '0')} OF 30</span>
          <span class="q-category-tag">${item.categoryGroup}</span>
        </div>
        <div class="q-text">${q.question}</div>
        ${visualHtml}
        <div class="q-options-grid">
          ${optionsHtml}
        </div>
        <div class="q-explanation-box">
          <strong>WHY:</strong> ${q.explanation}
        </div>
        <div class="q-tip-box">
          <strong>💡 STUDY TIP:</strong> ${item.studyTip}
        </div>
        <div class="q-source-meta">
          Alberta Driver's Guide — ${q.sourceTopic || q.category}
        </div>
      </div>
      ${isPageBreak ? '<div class="page-break"></div>' : ''}
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>NEXORA DR TEST — Top 30 Alberta Class 7 Study Questions</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      <!-- Page 1: Cover -->
      <div class="cover-container page-break">
        <div class="cover-header">
          <span class="cover-badge">STUDY ESSENTIALS</span>
          <span style="font-family: 'Space Mono', monospace; font-size: 7.5pt; color: #8C6D07;">ALBERTA CLASS 7</span>
        </div>

        <div class="cover-hero">
          <div class="cover-eyebrow">High-Priority Study Pack</div>
          <h1 class="cover-title">Top 30 Alberta Class 7<br><span style="font-style: italic; color: #8C6D07;">Study Questions</span></h1>
          <p class="cover-subtitle">30 high-priority Alberta Class 7 practice questions covering the essential rules, road signs, and situations every learner should understand before the knowledge test.</p>

          <div class="personalization-box">
            <div class="personalization-label">Made Especially For</div>
            <div class="personalization-name">Ahmed Sami Suliman</div>
            <div class="personalization-meta">17 YEARS OLD • ALBERTA CLASS 7 PREPARATION</div>
          </div>
        </div>

        <div class="cover-footer">
          <div>
            <strong>NEXORA DR TEST</strong> • Content Version V1.1<br>
            Official Alberta Driver's Guide Curriculum
          </div>
          <div style="text-align: right;">
            Rules Verified: August 2026<br>
            Target Passing Score: 25 / 30 (83.3%)
          </div>
        </div>
      </div>

      <!-- Page 2: Instructions & Methodology -->
      <div class="page-break">
        <div class="section-header">
          <h2 class="section-title">How to Use This Study Pack</h2>
          <span class="section-meta">STUDY METHODOLOGY</span>
        </div>

        <p style="margin-bottom: 1.25rem; font-size: 10pt; color: #333333; line-height: 1.6;">
          This study guide is designed to reinforce the highest-priority rules of the road from the official <em>Driver's Guide to Operation, Safety and Licensing: Cars and Light Trucks</em>. 
          Use this pack to self-test core concepts, memorize key distances, and master crucial right-of-way rules.
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: #FFFFFF; border: 0.5px solid #E2DCD1; padding: 1.25rem; border-radius: 4px;">
            <h3 style="font-size: 13pt; margin-bottom: 0.5rem; color: #0E0E0E;">The Alberta Knowledge Test</h3>
            <ul style="padding-left: 1.2rem; font-size: 8.5pt; color: #444444; line-height: 1.6;">
              <li>The official registry test consists of <strong>30 multiple-choice questions</strong>.</li>
              <li>You must answer at least <strong>25 questions correctly (83.3%)</strong> to pass.</li>
              <li>The real registry computer test has <strong>no countdown timer</strong>.</li>
              <li>You can take the official knowledge test once per calendar day.</li>
            </ul>
          </div>

          <div style="background: #FFFFFF; border: 0.5px solid #E2DCD1; padding: 1.25rem; border-radius: 4px;">
            <h3 style="font-size: 13pt; margin-bottom: 0.5rem; color: #0E0E0E;">Effective Study Strategy</h3>
            <ul style="padding-left: 1.2rem; font-size: 8.5pt; color: #444444; line-height: 1.6;">
              <li>Read the question and cover the answers with your hand.</li>
              <li>Recall the rule before checking the highlighted correct answer.</li>
              <li>Read the <strong>WHY</strong> explanation to understand the legal reasoning.</li>
              <li>Memorize the <strong>💡 STUDY TIP</strong> as a mental checklist on test day.</li>
            </ul>
          </div>
        </div>

        <div class="disclaimer-box" style="margin-top: 1rem;">
          <strong>IMPORTANT LEGAL NOTICE:</strong> NEXORA DR TEST is an independent educational practice tool and is not affiliated with, endorsed by, or operated by the Government of Alberta. Questions in this study pack are original educational practice questions based on Alberta driving rules and are not actual or leaked government examination questions. Always consult the current Alberta Driver's Guide and Alberta.ca for official licensing information.
        </div>
      </div>

      <!-- Pages 3 to 12+: Questions -->
      <div class="section-header">
        <h2 class="section-title">Top 30 High-Priority Questions</h2>
        <span class="section-meta">QUESTIONS 01 — 30</span>
      </div>

      ${questionsHtml}

      <!-- Final Page: Ahmed's Quick Review -->
      <div class="page-break">
        <div class="section-header">
          <h2 class="section-title">Ahmed's Quick Reference & Exam Day Tips</h2>
          <span class="section-meta">HIGH-YIELD REVISION</span>
        </div>

        <table class="summary-table">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Key Rule / Metric to Remember</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Uncontrolled Intersections</strong></td>
              <td>Vehicle on the LEFT must yield to the vehicle on the RIGHT.</td>
            </tr>
            <tr>
              <td><strong>Four-Way Stop</strong></td>
              <td>First vehicle to stop completely proceeds first. Simultaneous arrival yields to the RIGHT.</td>
            </tr>
            <tr>
              <td><strong>School Zones</strong></td>
              <td><strong>30 km/h</strong> during active hours. Passing any moving vehicle is strictly prohibited.</td>
            </tr>
            <tr>
              <td><strong>School Bus Flashing Red</strong></td>
              <td>Traffic in <strong>BOTH directions</strong> on undivided roads must stop at least <strong>20 metres</strong> away.</td>
            </tr>
            <tr>
              <td><strong>Passing Emergency Vehicles</strong></td>
              <td>Slow to <strong>60 km/h</strong> (or posted limit if lower) when passing stopped emergency vehicles with flashing lights.</td>
            </tr>
            <tr>
              <td><strong>Railway Crossings</strong></td>
              <td>Stop between <strong>5 metres and 15 metres</strong> from the nearest rail track.</td>
            </tr>
            <tr>
              <td><strong>Fire Hydrant Parking</strong></td>
              <td>Do not park within <strong>5 metres</strong> of a fire hydrant.</td>
            </tr>
            <tr>
              <td><strong>Uphill Parking With Curb</strong></td>
              <td>Turn wheels <strong>LEFT</strong> (away from curb) and roll back gently to touch the curb.</td>
            </tr>
            <tr>
              <td><strong>Class 7 Demerit Suspension</strong></td>
              <td>Suspended upon reaching <strong>8 demerit points</strong> (zero alcohol 0.00% tolerance).</td>
            </tr>
            <tr>
              <td><strong>Following Distance</strong></td>
              <td>At least <strong>2 seconds</strong> under ideal conditions; <strong>4+ seconds</strong> in snow, rain, or fog.</td>
            </tr>
          </tbody>
        </table>

        <div style="background: #FAF2DA; border: 0.5px solid #C49A10; border-radius: 4px; padding: 1.5rem; text-align: center; margin: 2rem 0;">
          <div style="font-family: 'Space Mono', monospace; font-size: 8pt; color: #8C6D07; letter-spacing: 0.18em; text-transform: uppercase;">Final Benchmark Target</div>
          <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 26pt; font-weight: 700; color: #0E0E0E; margin: 0.35rem 0;">Score 25+ / 30 Consistently</div>
          <p style="font-size: 8.5pt; color: #555555; max-width: 460px; margin: 0 auto;">Aim to achieve 25/30 or higher across 3 consecutive practice exams in the NEXORA DR TEST simulation before booking your official Class 7 knowledge test at the registry.</p>
        </div>

        <div class="disclaimer-box">
          NEXORA DR TEST • Published for Ahmed Sami Suliman • Alberta Class 7 Learner Knowledge Preparation • Version 1.1
        </div>
      </div>
    </body>
    </html>
  `;
}

// Build Arabic HTML with True RTL
function buildArabicHtml() {
  const arLetters = ['أ', 'ب', 'ج', 'د'];

  const questionsHtml = studyPack.map((item, idx) => {
    const q = arMap.get(item.questionId);
    if (!q) throw new Error(`Missing Arabic question ${item.questionId}`);

    let visualHtml = '';
    if (q.visualType === 'sign' && q.signAsset) {
      const b64 = getBase64Asset(q.signAsset);
      if (b64) visualHtml = `<div class="q-visual-container"><img src="${b64}" class="q-visual-img" alt="شاخصة مرور" /></div>`;
    } else if (q.visualType === 'nano-banana' && q.image) {
      const b64 = getBase64Asset(q.image);
      if (b64) visualHtml = `<div class="q-visual-container"><img src="${b64}" class="q-visual-img" alt="موقف مروري" /></div>`;
    }

    const optionsHtml = q.answers.map((ans, aIdx) => {
      const isCorrect = ans === q.correctAnswer;
      return `
        <div class="q-option-box ${isCorrect ? 'is-correct' : ''}">
          <span class="q-opt-marker">${arLetters[aIdx]}.</span>
          <span>${ans} ${isCorrect ? '✓' : ''}</span>
        </div>
      `;
    }).join('');

    const isPageBreak = (idx + 1) % 3 === 0 && (idx + 1) !== 30;

    return `
      <div class="question-card avoid-break" dir="rtl">
        <div class="q-top-meta">
          <span class="q-number">السؤال ${idx + 1} من 30</span>
          <span class="q-category-tag">${item.categoryGroup}</span>
        </div>
        <div class="q-text">${q.question}</div>
        ${visualHtml}
        <div class="q-options-grid">
          ${optionsHtml}
        </div>
        <div class="q-explanation-box" style="border-left: none; border-right: 2px solid #C49A10;">
          <strong>التفسير القانوني:</strong> ${q.explanation}
        </div>
        <div class="q-tip-box">
          <strong>💡 نصيحة للمراجعة:</strong> ${item.studyTipAr}
        </div>
        <div class="q-source-meta" style="text-align: left;">
          دليل السائق في ألبرتا — ${q.sourceTopic || q.category}
        </div>
      </div>
      ${isPageBreak ? '<div class="page-break"></div>' : ''}
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>نكسورا — أهم 30 سؤالاً للمراجعة لاختبار قيادة ألبرتا (Class 7)</title>
      <style>
        ${commonStyles}
        body {
          font-family: 'IBM Plex Sans Arabic', 'DM Sans', sans-serif;
          text-align: right;
        }
        .personalization-box {
          border-left: 0.5px solid #C49A10;
          border-right: 3px solid #C49A10;
          border-radius: 4px 0 0 4px;
        }
        .summary-table th, .summary-table td {
          text-align: right;
        }
      </style>
    </head>
    <body dir="rtl">
      <!-- Page 1: Cover -->
      <div class="cover-container page-break">
        <div class="cover-header">
          <span class="cover-badge">أساسيات المراجعة</span>
          <span style="font-family: 'Space Mono', monospace; font-size: 7.5pt; color: #8C6D07;">ALBERTA CLASS 7</span>
        </div>

        <div class="cover-hero">
          <div class="cover-eyebrow">حزمة المراجعة المكثفة</div>
          <h1 class="cover-title" style="font-family: 'IBM Plex Sans Arabic', serif; font-size: 30pt;">أهم 30 سؤالاً للمراجعة<br><span style="color: #8C6D07;">لاختبار قيادة ألبرتا (Class 7)</span></h1>
          <p class="cover-subtitle" style="font-size: 11pt;">30 سؤالاً تدريبياً عالي الأهمية تغطي أهم القواعد وشواخص المرور والمواقف الحيوية التي يحتاجها كل متقدم لاجتياز اختبار المعرفة النظري.</p>

          <div class="personalization-box">
            <div class="personalization-label" style="font-family: 'IBM Plex Sans Arabic', sans-serif; letter-spacing: 0.05em;">صُمم خصيصاً لـ</div>
            <div class="personalization-name" style="font-family: 'IBM Plex Sans Arabic', serif; font-size: 18pt;">أحمد سامي سليمان</div>
            <div class="personalization-meta" style="font-family: 'IBM Plex Sans Arabic', sans-serif; letter-spacing: 0.05em;">17 عاماً • التحضير لاختبار رخصة المتعلم في ألبرتا</div>
          </div>
        </div>

        <div class="cover-footer">
          <div>
            <strong>نكسورا لاختبار القيادة</strong> • الإصدار V1.1<br>
            استناداً إلى دليل السائق الرسمي في مقاطعة ألبرتا
          </div>
          <div style="text-align: left;">
            تاريخ التحقق من القواعد: أغسطس 2026<br>
            درجة النجاح المطلوبة: 25 / 30 (83.3%)
          </div>
        </div>
      </div>

      <!-- Page 2: Instructions -->
      <div class="page-break">
        <div class="section-header">
          <h2 class="section-title" style="font-family: 'IBM Plex Sans Arabic', serif;">كيف تستفيد من حزمة المراجعة</h2>
          <span class="section-meta">منهجية الدراسة</span>
        </div>

        <p style="margin-bottom: 1.25rem; font-size: 10pt; color: #333333; line-height: 1.7;">
          تم إعداد هذا الدليل لترسيخ أهم القواعد المرورية المستمدة من <em>دليل السائق لتشغيل المركبات والسلامة والترخيص</em> الصادر عن حكومة ألبرتا.
          استخدم هذه الحزمة لاختبار معلوماتك، وحفظ المسافات القانونية، وإتقان قواعد حق الأولوية.
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: #FFFFFF; border: 0.5px solid #E2DCD1; padding: 1.25rem; border-radius: 4px;">
            <h3 style="font-size: 12pt; margin-bottom: 0.5rem; color: #0E0E0E; font-family: 'IBM Plex Sans Arabic', serif;">عن اختبار المعرفة الرسمي بألبرتا</h3>
            <ul style="padding-right: 1.2rem; font-size: 8.5pt; color: #444444; line-height: 1.7;">
              <li>يتكون الاختبار في مراكز السجل من <strong>30 سؤالاً من خيارات متعددة</strong>.</li>
              <li>يلزم الإجابة على <strong>25 سؤالاً بشكل صحيح (83.3%)</strong> للنجاح.</li>
              <li>اختبار الحاسوب في السجل <strong>لا يحتوي على مؤقت زمني</strong>.</li>
              <li>يُسمح بإجراء الاختبار مرة واحدة في اليوم التقويمي.</li>
            </ul>
          </div>

          <div style="background: #FFFFFF; border: 0.5px solid #E2DCD1; padding: 1.25rem; border-radius: 4px;">
            <h3 style="font-size: 12pt; margin-bottom: 0.5rem; color: #0E0E0E; font-family: 'IBM Plex Sans Arabic', serif;">طريقة المراجعة الفعالة</h3>
            <ul style="padding-right: 1.2rem; font-size: 8.5pt; color: #444444; line-height: 1.7;">
              <li>اقرأ السؤال وحاول تذكر الإجابة الصحيحة قبل قراءة الخيارات.</li>
              <li>تأكد من قراءة قسم <strong>التفسير القانوني</strong> لفهم سبب صحة الإجابة.</li>
              <li>احفظ <strong>💡 نصيحة المراجعة</strong> لتكون مرجعاً ذهنياً سريعاً يوم الاختبار.</li>
              <li>تدرب على المحاكاة الكاملة في الموقع بعد إنهاء قراءة هذا الدليل.</li>
            </ul>
          </div>
        </div>

        <div class="disclaimer-box" style="margin-top: 1rem;">
          <strong>إشعار قانوني هام:</strong> منصة نكسورا لاختبار القيادة هي أداة تدريبية وتعليمية مستقلة ولا تتبع أو ترتبط بحكومة مقاطعة ألبرتا. الأسئلة الواردة في هذه الحزمة هي أسئلة تدريبية أصلية مبنية على لوائح المرور بألبرتا وليست أسئلة حكومية مسربة. يُرجى دائماً الرجوع إلى دليل السائق الرسمي وموقع Alberta.ca للمعلومات المعتمدة.
        </div>
      </div>

      <!-- Pages 3 to 12+: Questions -->
      <div class="section-header">
        <h2 class="section-title" style="font-family: 'IBM Plex Sans Arabic', serif;">أهم 30 سؤالاً تدريبياً</h2>
        <span class="section-meta">الأسئلة من 01 إلى 30</span>
      </div>

      ${questionsHtml}

      <!-- Final Page: Quick Review -->
      <div class="page-break">
        <div class="section-header">
          <h2 class="section-title" style="font-family: 'IBM Plex Sans Arabic', serif;">مراجعة سريعة لأهم أرقام وقواعد الاختبار</h2>
          <span class="section-meta">جدول المراجعة المركزة</span>
        </div>

        <table class="summary-table">
          <thead>
            <tr>
              <th>الموضوع</th>
              <th>القاعدة / الرقم الواجب تذكره</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>التقاطعات غير المنظمة</strong></td>
              <td>السائق على اليسار يفسح الطريق للسائق القادم من اليمين.</td>
            </tr>
            <tr>
              <td><strong>التوقف الرباعي (4-Way Stop)</strong></td>
              <td>الأولوية لمن توقف أولاً تماماً. عند الوصول معاً، الأولوية لليمين.</td>
            </tr>
            <tr>
              <td><strong>مناطق المدارس</strong></td>
              <td>السرعة <strong>30 كم/ساعة</strong> خلال الأوقات المحددة. التجاوز ممنوع تماماً.</td>
            </tr>
            <tr>
              <td><strong>حافلة المدرسة (أضواء حمراء وامضة)</strong></td>
              <td>يجب التوقف في <strong>كلا الاتجاهين</strong> على مسافة <strong>20 متراً</strong> على الطرق غير المقسمة.</td>
            </tr>
            <tr>
              <td><strong>تجاوز مركبات الطوارئ</strong></td>
              <td>خفض السرعة إلى <strong>60 كم/ساعة</strong> في المسار المحاذي لمركبات الطوارئ المتوقفة.</td>
            </tr>
            <tr>
              <td><strong>تقاطعات السكك الحديدية</strong></td>
              <td>التوقف على مسافة بين <strong>5 أمتار و 15 متراً</strong> من أقرب سكة.</td>
            </tr>
            <tr>
              <td><strong>صنبور إطفاء الحريق</strong></td>
              <td>ممنوع الوقوف على مسافة أقل من <strong>5 أمتار</strong>.</td>
            </tr>
            <tr>
              <td><strong>الوقوف صعوداً مع رصيف</strong></td>
              <td>توجيه العجلات نحو <strong>اليسار</strong> (بعيداً عن الرصيف) والرجوع برفق للمس الرصيف.</td>
            </tr>
            <tr>
              <td><strong>نقاط تعليق رخصة GDL</strong></td>
              <td>يتم تعليق الرخصة عند تجميع <strong>8 نقاط مرورية</strong> (مع نسبة كحول 0.00% مطلقة).</td>
            </tr>
            <tr>
              <td><strong>مسافة الأمان</strong></td>
              <td><strong>ثانيتان</strong> في الظروف العادية؛ و <strong>4 ثوانٍ أو أكثر</strong> في المطر والثلج والضباب.</td>
            </tr>
          </tbody>
        </table>

        <div style="background: #FAF2DA; border: 0.5px solid #C49A10; border-radius: 4px; padding: 1.5rem; text-align: center; margin: 2rem 0;">
          <div style="font-family: 'Space Mono', monospace; font-size: 8pt; color: #8C6D07; letter-spacing: 0.18em; text-transform: uppercase;">الهدف المطلوب قبل التقديم الرسمي</div>
          <div style="font-family: 'IBM Plex Sans Arabic', serif; font-size: 22pt; font-weight: 700; color: #0E0E0E; margin: 0.35rem 0;">تحقيق 25+ / 30 بشكل متكرر</div>
          <p style="font-size: 8.5pt; color: #555555; max-width: 460px; margin: 0 auto;">احرص على تحقيق درجة 25 من 30 أو أعلى في 3 اختبارات تجريبية متتالية في محاكي نكسورا قبل حجز موعد اختبار المعرفة في مركز السجل.</p>
        </div>

        <div class="disclaimer-box">
          نكسورا لاختبار القيادة • تم النشر لـ أحمد سامي سليمان • التحضير لاختبار رخصة القيادة بألبرتا • الإصدار 1.1
        </div>
      </div>
    </body>
    </html>
  `;
}

// Generate PDFs using Edge CLI
async function generatePdfs() {
  console.log("====================================================");
  console.log("  NEXORA DR TEST — TOP 30 STUDY PDF GENERATOR (V1.1) ");
  console.log("====================================================");

  const scratchDir = path.join(__dirname, '..', 'scratch');
  if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir, { recursive: true });
  }

  // 1. English PDF Generation
  console.log("\n[1/2] Rendering English Study Pack HTML & PDF...");
  const enHtml = buildEnglishHtml();
  const enHtmlPath = path.join(scratchDir, 'top-30-en.html');
  fs.writeFileSync(enHtmlPath, enHtml, 'utf8');

  const enPdfPath = path.join(downloadsDir, 'nexora-dr-test-top-30-en.pdf');
  const enCmd = `"${edgePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${enPdfPath}" "file:///${enHtmlPath.replace(/\\/g, '/')}"`;
  
  execSync(enCmd);
  const enStats = fs.statSync(enPdfPath);
  console.log(`✓ Generated English PDF: ${enPdfPath}`);
  console.log(`  File size: ${(enStats.size / 1024).toFixed(1)} KB`);

  // 2. Arabic PDF Generation
  console.log("\n[2/2] Rendering Arabic Study Pack HTML & PDF (RTL)...");
  const arHtml = buildArabicHtml();
  const arHtmlPath = path.join(scratchDir, 'top-30-ar.html');
  fs.writeFileSync(arHtmlPath, arHtml, 'utf8');

  const arPdfPath = path.join(downloadsDir, 'nexora-dr-test-top-30-ar.pdf');
  const arCmd = `"${edgePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${arPdfPath}" "file:///${arHtmlPath.replace(/\\/g, '/')}"`;
  
  execSync(arCmd);
  const arStats = fs.statSync(arPdfPath);
  console.log(`✓ Generated Arabic PDF: ${arPdfPath}`);
  console.log(`  File size: ${(arStats.size / 1024).toFixed(1)} KB`);

  console.log("\n====================================================");
  console.log("  PDF GENERATION COMPLETE & VALIDATED               ");
  console.log("====================================================");
}

generatePdfs().catch(err => {
  console.error("PDF Generation Error:", err);
  process.exit(1);
});
