import { useMemo } from 'react';
import { useWorksheetStore } from '../../store/worksheetStore';
import { parseTextWithKeywords, renderHighlightedText } from '../../utils/textHighlighter';
import { useTTS } from '../../hooks/useTTS';
import styles from './EnglishText.module.css';

export default function EnglishText() {
  const englishText = useWorksheetStore((s) => s.englishText);
  const vocabularyItems = useWorksheetStore((s) => s.vocabularyItems);
  const { speakWord } = useTTS();

  const segments = useMemo(
    () => parseTextWithKeywords(englishText, vocabularyItems),
    [englishText, vocabularyItems]
  );

  if (!englishText) {
    return (
      <div className={styles.placeholder}>
        请在右侧输入英文原文...
      </div>
    );
  }

  return (
    <div className={styles.englishText}>
      {renderHighlightedText(segments, speakWord, -1)}
    </div>
  );
}
