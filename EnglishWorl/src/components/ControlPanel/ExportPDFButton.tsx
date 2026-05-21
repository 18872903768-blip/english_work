import { Button } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import { useWorksheetStore } from '../../store/worksheetStore';
import { exportToPDF } from '../../services/exportService';
import styles from './ControlPanel.module.css';

export default function ExportPDFButton() {
  const englishText = useWorksheetStore((s) => s.englishText);
  const isExportingPDF = useWorksheetStore((s) => s.isExportingPDF);
  const setIsExportingPDF = useWorksheetStore((s) => s.setIsExportingPDF);

  const handleExport = async () => {
    const paperEl = document.querySelector('[data-paper]') as HTMLElement | null;
    if (!paperEl) return;
    setIsExportingPDF(true);
    try {
      await exportToPDF(paperEl);
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className={styles.section}>
      <Button
        icon={<FilePdfOutlined />}
        onClick={handleExport}
        loading={isExportingPDF}
        disabled={!englishText.trim()}
        block
        style={{ background: '#52c41a', borderColor: '#52c41a', color: '#fff' }}
      >
        导出 PDF
      </Button>
    </div>
  );
}
