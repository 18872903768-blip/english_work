import { Modal } from 'antd';
import { useWorksheetStore } from '../../store/worksheetStore';

export default function TranslationModal() {
  const show = useWorksheetStore((s) => s.showTranslationModal);
  const tempTranslation = useWorksheetStore((s) => s.tempTranslation);
  const setShow = useWorksheetStore((s) => s.setShowTranslationModal);
  const setTemp = useWorksheetStore((s) => s.setTempTranslation);
  const setChineseTranslation = useWorksheetStore((s) => s.setChineseTranslation);

  const handleConfirm = () => {
    setChineseTranslation(tempTranslation);
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <Modal
      title="AI 翻译结果（可编辑）"
      open={show}
      onOk={handleConfirm}
      onCancel={handleCancel}
      okText="确认并填充到纸张"
      cancelText="取消"
      width={640}
    >
      <textarea
        value={tempTranslation}
        onChange={(e) => setTemp(e.target.value)}
        style={{
          width: '100%',
          minHeight: '200px',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          padding: '12px',
          fontFamily: '"Noto Serif SC", "SimSun", serif',
          fontSize: '14px',
          lineHeight: '1.8',
          resize: 'vertical',
        }}
      />
    </Modal>
  );
}
