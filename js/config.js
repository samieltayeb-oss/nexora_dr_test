// NEXORA DR TEST — Centralized Alberta Regulatory Configuration
// Authoritative rules for Alberta Class 7 Learner Knowledge Examination

export const albertaConfig = {
  jurisdiction: "Alberta, Canada",
  licenceClass: "Class 7 (Learner's Licence)",
  questionsPerExam: 30,
  passingScore: 25,
  passPercentage: 83.33,
  earlyFailureWrongThreshold: 6, // 6 wrong answers => max possible 24/30 = mathematical fail
  officialTimer: false, // Authoritative Alberta Registry examination has no countdown timer
  defaultChallengeTimeMinutes: 30,
  minAge: 14,
  accompanyingSupervisorMinAge: 18,
  accompanyingSupervisorClass: "Class 5 (Full / Non-Probationary)",
  curfewStartHour: 0, // Midnight 12:00 AM
  curfewEndHour: 5,   // 5:00 AM
  gdlDemeritSuspensionThreshold: 8,
  fullDemeritSuspensionThreshold: 15,
  alcoholDrugLimitBAC: 0.00, // Zero tolerance
  contentVersion: "1.0.0",
  lastVerifiedDate: "August 2026",
  officialResourceUrl: "https://www.alberta.ca/driver-knowledge-tests",
  officialGuideUrl: "https://www.alberta.ca/driver-guides",
  disclaimer: "NEXORA DR TEST is an independent educational practice tool and is not affiliated with, endorsed by, or operated by the Government of Alberta. Always consult the current Alberta Driver's Guide and Alberta.ca for official licensing requirements."
};
