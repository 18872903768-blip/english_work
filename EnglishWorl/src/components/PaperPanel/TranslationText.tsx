import { useWorksheetStore } from '../../store/worksheetStore';
import styles from './TranslationText.module.css';

export default function TranslationText() {
  const chineseTranslation = useWorksheetStore((s) => s.chineseTranslation);

  if (!chineseTranslation) return null;

  return (
    <div className={styles.translation}>
      <div className={styles.label}>【中文翻译】</div>
      <div className={styles.content}>{chineseTranslation}</div>
    </div>
  );
}
