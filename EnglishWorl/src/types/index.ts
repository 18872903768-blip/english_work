export type Grade = 'primary' | 'middle' | 'high';

export interface VocabularyItem {
  word: string;
  partOfSpeech: string;
  meaning: string;
}

export interface AIConfig {
  apiKey: string;
  baseURL: string;
  model: string;
}

export interface WorksheetState {
  englishText: string;
  chineseTranslation: string;
  selectedGrade: Grade | null;
  vocabularyItems: VocabularyItem[];
  isReading: boolean;
  isPaused: boolean;
  isLoadingAI: boolean;
  isExportingPDF: boolean;
  showTranslationModal: boolean;
  tempTranslation: string;
  aiConfig: AIConfig;
}
