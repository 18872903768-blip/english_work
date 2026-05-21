import { Button } from 'antd';
import { TranslationOutlined } from '@ant-design/icons';
import { useWorksheetStore } from '../../store/worksheetStore';
import { useAI } from '../../hooks/useAI';
import styles from './ControlPanel.module.css';

export default function TranslateButton() {
  const englishText = useWorksheetStore((s) => s.englishText);
  const isLoadingAI = useWorksheetStore((s) => s.isLoadingAI);
  const setShowTranslationModal = useWorksheetStore((s) => s.setShowTranslationModal);
  const setTempTranslation = useWorksheetStore((s) => s.setTempTranslation);
  const { doTranslate, error } = useAI();

  const handleTranslate = async () => {
    if (!englishText.trim()) return;
    const result = await doTranslate(englishText);
    if (result) {
      setTempTranslation(result);
      setShowTranslationModal(true);
    }
  };

  return (
    <div className={styles.section}>
      <Button
        type="primary"
        icon={<TranslationOutlined />}
        onClick={handleTranslate}
        loading={isLoadingAI}
        disabled={!englishText.trim()}
        block
      >
        AI 翻译
      </Button>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
