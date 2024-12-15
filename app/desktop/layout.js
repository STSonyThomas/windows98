'use client';

import { useState } from 'react';
import styles from './desktop.module.css';
import HomeScreen from '../components/HomeScreen';
import Taskbar from '../components/Taskbar';

export default function Layout({ children }) {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);

  const handleOpenWindow = (id) => {
    const windowTitle = {
      computer: 'My Computer',
      portfolio: 'portfolio.txt - Notepad',
      recycle: 'Recycle Bin'
    }[id];

    const existingWindow = windows.find(w => w.id === id);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(windows.map(w => ({
          ...w,
          isActive: w.id === id,
          isMinimized: w.id === id ? false : w.isMinimized
        })));
      } else {
        setWindows(windows.map(w => ({
          ...w,
          isActive: w.id === id
        })));
      }
    } else {
      const newWindow = {
        id,
        title: windowTitle,
        isMinimized: false,
        isMaximized: false,
        isActive: true
      };
      setWindows([...windows.map(w => ({ ...w, isActive: false })), newWindow]);
    }
    setActiveWindowId(id);
  };

  const handleToggleWindow = (id) => {
    setWindows(windows.map(w => {
      if (w.id === id) {
        return {
          ...w,
          isMinimized: !w.isMinimized,
          isActive: !w.isMinimized
        };
      }
      return {
        ...w,
        isActive: false
      };
    }));
    setActiveWindowId(!windows.find(w => w.id === id)?.isMinimized ? id : null);
  };

  const handleActivateWindow = (id) => {
    setWindows(windows.map(w => ({
      ...w,
      isActive: w.id === id,
      isMinimized: w.id === id ? false : w.isMinimized
    })));
    setActiveWindowId(id);
  };

  const handleCloseWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) {
      const remainingWindows = windows.filter(w => w.id !== id);
      setActiveWindowId(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  };

  const handleMaximizeWindow = (id) => {
    setWindows(windows.map(w => ({
      ...w,
      isMaximized: w.id === id ? !w.isMaximized : w.isMaximized,
      isActive: w.id === id
    })));
    setActiveWindowId(id);
  };

  return (
    <div className={styles.layout}>
      <HomeScreen
        openWindows={windows}
        activeWindowId={activeWindowId}
        onOpenWindow={handleOpenWindow}
        onCloseWindow={handleCloseWindow}
        onMinimizeWindow={handleToggleWindow}
        onMaximizeWindow={handleMaximizeWindow}
        onActivateWindow={handleActivateWindow}
      />
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onToggleWindow={handleToggleWindow}
        onActivateWindow={handleActivateWindow}
      />
    </div>
  );
}
