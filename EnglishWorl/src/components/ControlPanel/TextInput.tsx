import { Input } from 'antd';
import { useWorksheetStore } from '../../store/worksheetStore';
import styles from './ControlPanel.module.css';

export default function TextInput() {
  const englishText = useWorksheetStore((s) => s.englishText);
  const setEnglishText = useWorksheetStore((s) => s.setEnglishText);

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>英文原文输入</div>
      <Input.TextArea
        value={englishText}
        onChange={(e) => setEnglishText(e.target.value)}
        placeholder="在此粘贴或输入英文原文..."
        rows={8}
        className={styles.textArea}
      />
    </div>
  );
}
