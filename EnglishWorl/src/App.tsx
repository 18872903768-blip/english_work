import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import PaperPanel from './components/PaperPanel/PaperPanel';
import ControlPanel from './components/ControlPanel/ControlPanel';
import TranslationModal from './components/TranslationModal/TranslationModal';
import styles from './App.module.css';

export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.app}>
        <div className={styles.leftPanel}>
          <PaperPanel />
        </div>
        <ControlPanel />
      </div>
      <TranslationModal />
    </ConfigProvider>
  );
}
