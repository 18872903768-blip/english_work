import { Button, Space } from 'antd';
import {
  SoundOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { useWorksheetStore } from '../../store/worksheetStore';
import { useTTS } from '../../hooks/useTTS';
import styles from './ControlPanel.module.css';

export default function ReadAloudButton() {
  const englishText = useWorksheetStore((s) => s.englishText);
  const isReading = useWorksheetStore((s) => s.isReading);
  const isPaused = useWorksheetStore((s) => s.isPaused);
  const { speakFullText, pauseReading, resumeReading, stopReading } = useTTS();

  const handleRead = () => {
    if (!englishText.trim()) return;
    speakFullText(englishText);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>全文朗读</div>
      <Space>
        {!isReading ? (
          <Button
            type="primary"
            icon={<SoundOutlined />}
            onClick={handleRead}
            disabled={!englishText.trim()}
          >
            朗读全文
          </Button>
        ) : (
          <>
            {isPaused ? (
              <Button icon={<PlayCircleOutlined />} onClick={resumeReading}>
                继续
              </Button>
            ) : (
              <Button icon={<PauseCircleOutlined />} onClick={pauseReading}>
                暂停
              </Button>
            )}
            <Button icon={<StopOutlined />} onClick={stopReading} danger>
              停止
            </Button>
          </>
        )}
      </Space>
    </div>
  );
}
