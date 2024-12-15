'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './taskbar.module.css';
import { useRouter } from 'next/navigation';

export default function Taskbar({ 
  windows = [], 
  activeWindowId,
  onToggleWindow,
  onActivateWindow
}) {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartClick = () => {
    router.push('/login');
  };

  const getWindowIcon = (windowId) => {
    switch (windowId) {
      case 'computer':
        return '/computer-icon.png';
      case 'portfolio':
        return '/portfolio-icon.png';
      case 'recycle':
        return '/recycle-bin-icon.png';
      default:
        return '';
    }
  };

  const getWindowTitle = (windowId) => {
    switch (windowId) {
      case 'computer':
        return 'My Computer';
      case 'portfolio':
        return 'portfolio.txt - Notepad';
      case 'recycle':
        return 'Recycle Bin';
      default:
        return '';
    }
  };

  return (
    <div className={styles.taskbar}>
      <button className={styles.startButton} onClick={handleStartClick}>
        <Image src="/windows98.png" alt="Start" width={16} height={16} priority />
        <span>Start</span>
      </button>
      
      <div className={styles.taskbarWindows}>
        {windows?.map(window => (
          <button
            key={window.id}
            className={`${styles.taskbarButton} ${window.id === activeWindowId ? styles.active : ''}`}
            onClick={() => window.isMinimized ? onActivateWindow(window.id) : onToggleWindow(window.id)}
          >
            <Image 
              src={getWindowIcon(window.id)}
              alt={getWindowTitle(window.id)}
              width={16}
              height={16}
              priority
            />
            <span>{getWindowTitle(window.id)}</span>
          </button>
        ))}
      </div>

      <div className={styles.clock}>
        {currentTime}
      </div>
    </div>
  );
}
