import { create } from 'zustand';
import type { Grade, VocabularyItem, AIConfig } from '../types';

interface State {
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

  setEnglishText: (text: string) => void;
  setChineseTranslation: (text: string) => void;
  setSelectedGrade: (grade: Grade | null) => void;
  setVocabularyItems: (items: VocabularyItem[]) => void;
  setIsReading: (v: boolean) => void;
  setIsPaused: (v: boolean) => void;
  setIsLoadingAI: (v: boolean) => void;
  setIsExportingPDF: (v: boolean) => void;
  setShowTranslationModal: (v: boolean) => void;
  setTempTranslation: (text: string) => void;
  setAiConfig: (config: Partial<AIConfig>) => void;
  resetAll: () => void;
}

const DEFAULT_AI_CONFIG: AIConfig = {
  apiKey: '',
  baseURL: 'https://api.openai.com/v1',
  model: 'gpt-4o',
};

function loadAiConfig(): AIConfig {
  try {
    const saved = localStorage.getItem('aiConfig');
    if (saved) return { ...DEFAULT_AI_CONFIG, ...JSON.parse(saved) };
  } catch { /* ignore */ }
  return DEFAULT_AI_CONFIG;
}

function saveAiConfig(config: AIConfig) {
  localStorage.setItem('aiConfig', JSON.stringify(config));
}

export const useWorksheetStore = create<State>((set) => ({
  englishText: '',
  chineseTranslation: '',
  selectedGrade: null,
  vocabularyItems: [],
  isReading: false,
  isPaused: false,
  isLoadingAI: false,
  isExportingPDF: false,
  showTranslationModal: false,
  tempTranslation: '',
  aiConfig: loadAiConfig(),

  setEnglishText: (text) => set({ englishText: text }),
  setChineseTranslation: (text) => set({ chineseTranslation: text }),
  setSelectedGrade: (grade) => set({ selectedGrade: grade }),
  setVocabularyItems: (items) => set({ vocabularyItems: items }),
  setIsReading: (v) => set({ isReading: v }),
  setIsPaused: (v) => set({ isPaused: v }),
  setIsLoadingAI: (v) => set({ isLoadingAI: v }),
  setIsExportingPDF: (v) => set({ isExportingPDF: v }),
  setShowTranslationModal: (v) => set({ showTranslationModal: v }),
  setTempTranslation: (text) => set({ tempTranslation: text }),
  setAiConfig: (partial) =>
    set((s) => {
      const next = { ...s.aiConfig, ...partial };
      saveAiConfig(next);
      return { aiConfig: next };
    }),
  resetAll: () =>
    set({
      englishText: '',
      chineseTranslation: '',
      selectedGrade: null,
      vocabularyItems: [],
      isReading: false,
      isPaused: false,
      showTranslationModal: false,
      tempTranslation: '',
    }),
}));
