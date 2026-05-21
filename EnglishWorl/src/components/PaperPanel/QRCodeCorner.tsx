import { QRCodeSVG } from 'qrcode.react';
import styles from './QRCodeCorner.module.css';

export default function QRCodeCorner() {
  // Local dev: placeholder QR that links to current page
  const audioUrl = window.location.href + '?mode=audio';

  return (
    <div className={styles.qrCorner}>
      <QRCodeSVG
        value={audioUrl}
        size={70}
        level="M"
        fgColor="#333"
        bgColor="#ffffff"
      />
      <div className={styles.qrLabel}>扫码听音频</div>
    </div>
  );
}
