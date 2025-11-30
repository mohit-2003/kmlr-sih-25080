const DEPARTMENTS = [
  "Engineering",
  "HR",
  "Finance",
  "Safety",
  "Legal",
  "Procurement",
  "Operations",
  "IT",
  "Administration",
];

const PRIORITY_LEVELS = ["low", "medium", "high", "critical"];

const DOCUMENT_CATEGORIES = [
  "policy",
  "procedure",
  "request",
  "report",
  "directive",
  "approval",
  "information",
  "complaint",
  "general",
];

// Helper function to extract potential deadlines from text
function extractDeadlines(text) {
  // Simple regex patterns for common date formats
  const datePatterns = [
    /\b\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}\b/g, // MM/DD/YYYY or DD/MM/YYYY
    /\b\d{4}[-\/]\d{1,2}[-\/]\d{1,2}\b/g, // YYYY/MM/DD
    /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4}\b/gi, // Month DD, YYYY
    /\b\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b/gi, // DD Month YYYY
  ];

  const dates = [];
  datePatterns.forEach((pattern) => {
    const matches = text.match(pattern);
    if (matches) {
      dates.push(...matches);
    }
  });

  return dates.length > 0 ? dates.join(", ") : "Not applicable";
}

// Helper function to detect document language
function detectLanguage(text) {
  // Simple Malayalam character detection
  const malayalamPattern = /[\u0D00-\u0D7F]/;
  const hasmalayalam = malayalamPattern.test(text);

  if (hasmalayalam && text.match(/[a-zA-Z]/)) {
    return "mixed"; // Both Malayalam and English
  } else if (hasmalayalam) {
    return "malayalam";
  } else {
    return "english";
  }
}

const ALLOWED_FILE_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".txt",
  ".png",
  ".jpg",
  ".jpeg",
];

export {
  DEPARTMENTS,
  PRIORITY_LEVELS,
  DOCUMENT_CATEGORIES,
  extractDeadlines,
  detectLanguage,
  ALLOWED_FILE_EXTENSIONS,
};
