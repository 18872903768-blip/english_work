import { Button } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import { useWorksheetStore } from '../../store/worksheetStore';
import { useAI } from '../../hooks/useAI';
import styles from './ControlPanel.module.css';

export default function VocabButton() {
  const englishText = useWorksheetStore((s) => s.englishText);
  const selectedGrade = useWorksheetStore((s) => s.selectedGrade);
  const isLoadingAI = useWorksheetStore((s) => s.isLoadingAI);
  const { doExtractVocabulary, error } = useAI();

  const handleExtract = async () => {
    if (!englishText.trim() || !selectedGrade) return;
    await doExtractVocabulary(englishText, selectedGrade);
  };

  return (
    <div className={styles.section}>
      <Button
        icon={<HighlightOutlined />}
        onClick={handleExtract}
        loading={isLoadingAI}
        disabled={!englishText.trim() || !selectedGrade}
        block
      >
        提取重点词汇
      </Button>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
