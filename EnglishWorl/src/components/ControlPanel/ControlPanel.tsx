import { Input, Button } from 'antd';
import { SettingOutlined, DeleteOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useWorksheetStore } from '../../store/worksheetStore';
import TextInput from './TextInput';
import TranslateButton from './TranslateButton';
import GradeSelector from './GradeSelector';
import VocabButton from './VocabButton';
import ReadAloudButton from './ReadAloudButton';
import ExportPDFButton from './ExportPDFButton';
import styles from './ControlPanel.module.css';

export default function ControlPanel() {
  const aiConfig = useWorksheetStore((s) => s.aiConfig);
  const setAiConfig = useWorksheetStore((s) => s.setAiConfig);
  const resetAll = useWorksheetStore((s) => s.resetAll);
  const [showConfig, setShowConfig] = useState(false);
  const [showKey, setShowKey] = useState(false);

  return (
    <div className={styles.panel}>
      <div className={styles.panelTitle}>控制面板</div>
      <TextInput />
      <TranslateButton />
      <GradeSelector />
      <VocabButton />
      <ReadAloudButton />
      <ExportPDFButton />

      <div className={styles.aiConfig}>
        <div
          className={styles.configTitle}
          style={{ cursor: 'pointer', userSelect: 'none' }}
          onClick={() => setShowConfig(!showConfig)}
        >
          <SettingOutlined /> AI 配置 {showConfig ? '▲' : '▼'}
        </div>
        {showConfig && (
          <div className={styles.configRow}>
            <div>
              <div className={styles.configLabel}>API Key</div>
              <Input.Password
                value={aiConfig.apiKey}
                onChange={(e) => setAiConfig({ apiKey: e.target.value })}
                placeholder="sk-..."
                size="small"
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <div>
              <div className={styles.configLabel}>Base URL</div>
              <Input
                value={aiConfig.baseURL}
                onChange={(e) => setAiConfig({ baseURL: e.target.value })}
                placeholder="https://api.openai.com/v1"
                size="small"
              />
            </div>
            <div>
              <div className={styles.configLabel}>Model</div>
              <Input
                value={aiConfig.model}
                onChange={(e) => setAiConfig({ model: e.target.value })}
                placeholder="gpt-4o"
                size="small"
              />
            </div>
          </div>
        )}
      </div>

      <div className={styles.resetBtn}>
        <Button
          icon={<DeleteOutlined />}
          onClick={resetAll}
          size="small"
          danger
          type="text"
        >
          清空所有内容
        </Button>
      </div>
    </div>
  );
}
