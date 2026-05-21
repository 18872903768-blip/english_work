import { Select } from 'antd';
import { useWorksheetStore } from '../../store/worksheetStore';
import { GRADE_OPTIONS } from '../../utils/gradeConfig';
import styles from './ControlPanel.module.css';

export default function GradeSelector() {
  const selectedGrade = useWorksheetStore((s) => s.selectedGrade);
  const setSelectedGrade = useWorksheetStore((s) => s.setSelectedGrade);

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>选择年级</div>
      <Select
        value={selectedGrade}
        onChange={setSelectedGrade}
        placeholder="请选择年级..."
        options={GRADE_OPTIONS.map((g) => ({ value: g.value, label: g.label }))}
        style={{ width: '100%' }}
      />
    </div>
  );
}
