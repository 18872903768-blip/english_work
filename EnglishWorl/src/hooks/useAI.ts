import { useState, useCallback } from 'react';
import { useWorksheetStore } from '../store/worksheetStore';
import { translateText, extractVocabulary } from '../services/aiService';
import type { Grade } from '../types';

export function useAI() {
  const [error, setError] = useState<string | null>(null);
  const aiConfig = useWorksheetStore((s) => s.aiConfig);
  const setIsLoadingAI = useWorksheetStore((s) => s.setIsLoadingAI);

  const doTranslate = useCallback(
    async (text: string): Promise<string> => {
      if (!aiConfig.apiKey) {
        setError('请先配置 API Key');
        return '';
      }
      setIsLoadingAI(true);
      setError(null);
      try {
        const result = await translateText(text, aiConfig);
        return result;
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : '翻译请求失败';
        setError(`翻译失败: ${msg}`);
        return '';
      } finally {
        setIsLoadingAI(false);
      }
    },
    [aiConfig, setIsLoadingAI]
  );

  const doExtractVocabulary = useCallback(
    async (text: string, grade: Grade) => {
      if (!aiConfig.apiKey) {
        setError('请先配置 API Key');
        return;
      }
      setIsLoadingAI(true);
      setError(null);
      try {
        const items = await extractVocabulary(text, grade, aiConfig);
        useWorksheetStore.getState().setVocabularyItems(items);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : '词汇提取失败';
        setError(`词汇提取失败: ${msg}`);
      } finally {
        setIsLoadingAI(false);
      }
    },
    [aiConfig, setIsLoadingAI]
  );

  return { doTranslate, doExtractVocabulary, error, setError };
}
