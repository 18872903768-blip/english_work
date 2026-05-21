import { useState, useCallback, useRef } from 'react';
import EnglishText from './EnglishText';
import TranslationText from './TranslationText';
import VocabularySidebar from './VocabularySidebar';
import QRCodeCorner from './QRCodeCorner';
import styles from './PaperPanel.module.css';

const DEFAULT_SIDEBAR_WIDTH = 160; // px
const MIN_SIDEBAR_WIDTH = 90;
const MAX_SIDEBAR_WIDTH = 280;

function loadSidebarWidth(): number {
  try {
    const saved = localStorage.getItem('paperSidebarWidth');
    const n = parseInt(saved ?? '', 10);
    if (!isNaN(n) && n >= MIN_SIDEBAR_WIDTH && n <= MAX_SIDEBAR_WIDTH) return n;
  } catch { /* ignore */ }
  return DEFAULT_SIDEBAR_WIDTH;
}

function saveSidebarWidth(w: number) {
  localStorage.setItem('paperSidebarWidth', String(w));
}

export default function PaperPanel() {
  const [sidebarWidth, setSidebarWidth] = useState(loadSidebarWidth);
  const [dragging, setDragging] = useState(false);
  const widthRef = useRef(sidebarWidth);
  widthRef.current = sidebarWidth;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    const startX = e.clientX;
    const startWidth = widthRef.current;

    const onMouseMove = (ev: MouseEvent) => {
      const delta = startX - ev.clientX;
      const next = Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, startWidth + delta));
      widthRef.current = next;
      setSidebarWidth(next);
    };

    const onMouseUp = () => {
      setDragging(false);
      saveSidebarWidth(widthRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.paper} data-paper>
        <QRCodeCorner />
        <div className={styles.header}>
          <h1 className={styles.title}>English Reading Worksheet</h1>
          <div className={styles.line} />
        </div>
        <div className={styles.mainArea}>
          <div className={styles.content}>
            <EnglishText />
            <TranslationText />
          </div>
          <div
            className={`${styles.divider} ${dragging ? styles.dividerActive : ''}`}
            onMouseDown={handleMouseDown}
          >
            <div className={styles.dividerHandle} />
          </div>
          <div style={{ width: sidebarWidth, flexShrink: 0 }}>
            <VocabularySidebar />
          </div>
        </div>
        <div className={styles.footer}>
          <span>Name: ___________</span>
          <span>Date: ___________</span>
        </div>
      </div>
    </div>
  );
}
