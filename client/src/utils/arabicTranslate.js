// Helper utility for real-time English to Arabic transliteration & translation

const WORD_MAP = {
  // Company & Industry terms
  'transport': 'نقليات',
  'transports': 'نقليات',
  'transportation': 'نقليات',
  'co': 'شركة',
  'company': 'شركة',
  'establishment': 'مؤسسة',
  'est': 'مؤسسة',
  'group': 'مجموعة',
  'trading': 'للتجارة',
  'contracting': 'للمقاولات',
  'services': 'للخدمات',
  'limited': 'المحدودة',
  'ltd': 'المحدودة',
  'llc': 'ذ.م.م',
  'general': 'العامة',

  // Common Names
  'hussein': 'حسين',
  'hussain': 'حسين',
  'mahdi': 'مهدي',
  'al': 'ال',
  'el': 'ال',
  'salah': 'صلاح',
  'salim': 'سالم',
  'salman': 'سلمان',
  'mohammed': 'محمد',
  'muhammad': 'محمد',
  'md': 'محمد',
  'ahmed': 'أحمد',
  'ali': 'علي',
  'hassan': 'حسن',
  'hasan': 'حسن',
  'khan': 'خان',
  'rahman': 'رحمن',
  'karim': 'كريم',
  'abdullah': 'عبدالله',
  'abdul': 'عبد',
  'aziz': 'عزيز',
  'said': 'سعيد',
  'saeed': 'سعيد',
  'salauddin': 'صلاح الدين',
  'taher': 'طاهر',
  'tariq': 'طارق',
  'omar': 'عمر',
  'osman': 'عثمان',
  'uthman': 'عثمان',
  'ibrahim': 'إبراهيم',
  'youssef': 'يوسف',
  'yousuf': 'يوسف'
};

// Character phonetic mapping for unrecognized words
const CHAR_MAP = {
  'a': 'ا', 'b': 'ب', 'c': 'ك', 'd': 'د', 'e': 'ي', 'f': 'ف', 'g': 'ج',
  'h': 'ه', 'i': 'ي', 'j': 'ج', 'k': 'ك', 'l': 'ل', 'm': 'م', 'n': 'ن',
  'o': 'و', 'p': 'ب', 'q': 'ق', 'r': 'ر', 's': 'س', 't': 'ت', 'u': 'و',
  'v': 'ف', 'w': 'و', 'x': 'كس', 'y': 'ي', 'z': 'ز',
  'kh': 'خ', 'sh': 'ش', 'th': 'ث', 'gh': 'غ', 'ph': 'ف'
};

/**
 * Transliterates English text to Arabic
 * @param {string} text 
 * @returns {string} Arabic transliterated string
 */
export function translateEnToAr(text) {
  if (!text || typeof text !== 'string') return '';

  const words = text.trim().toLowerCase().split(/\s+/);
  const arabicWords = words.map(word => {
    // Clean punctuation
    const cleanWord = word.replace(/[^a-z]/g, '');
    if (!cleanWord) return word;

    // Check direct word dictionary match
    if (WORD_MAP[cleanWord]) {
      return WORD_MAP[cleanWord];
    }

    // Phonetic character replacement
    let result = '';
    let i = 0;
    while (i < cleanWord.length) {
      if (i < cleanWord.length - 1) {
        const pair = cleanWord.substring(i, i + 2);
        if (CHAR_MAP[pair]) {
          result += CHAR_MAP[pair];
          i += 2;
          continue;
        }
      }
      const char = cleanWord[i];
      result += CHAR_MAP[char] || char;
      i++;
    }

    return result;
  });

  return arabicWords.join(' ');
}
