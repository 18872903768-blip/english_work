import { useWorksheetStore } from '../../store/worksheetStore';
import { useTTS } from '../../hooks/useTTS';
import styles from './VocabularySidebar.module.css';

export default function VocabularySidebar() {
  const vocabularyItems = useWorksheetStore((s) => s.vocabularyItems);
  const { speakWord } = useTTS();

  if (!vocabularyItems.length) return null;

  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>重点单词</div>
      <div className={styles.list}>
        {vocabularyItems.map((item, i) => (
          <div
            key={i}
            className={styles.item}
            onClick={() => speakWord(item.word)}
            title="点击发音"
          >
            <div className={styles.wordRow}>
              <span className={styles.word}>{item.word}</span>
              <span className={styles.pos}>{item.partOfSpeech}</span>
            </div>
            <span className={styles.meaning}>{item.meaning}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
