'use client';
import { useState } from 'react';
import Image from 'next/image';
import Window from './Window';
import Portfolio from './Portfolio';
import styles from '../desktop/desktop.module.css';

const desktopIcons = [
  {
    id: 'computer',
    title: 'My Computer',
    icon: '/computer-icon.png'
  },
  {
    id: 'portfolio',
    title: 'portfolio.txt',
    icon: '/portfolio-icon.png'
  },
  {
    id: 'recycle',
    title: 'Recycle Bin',
    icon: '/recycle-bin-icon.png'
  }
];

export default function HomeScreen({
  openWindows,
  activeWindowId,
  onOpenWindow,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onActivateWindow
}) {
  const initialIconPositions = desktopIcons.reduce((acc, icon, index) => ({
    ...acc,
    [icon.id]: { x: 20, y: 20 + (index * 100) }
  }), {});

  const [iconPositions, setIconPositions] = useState(initialIconPositions);
  const [draggedIcon, setDraggedIcon] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleIconDoubleClick = (iconId) => {
    if (!openWindows.find(w => w.id === iconId)) {
      onOpenWindow(iconId);
    } else {
      onActivateWindow(iconId);
    }
  };

  const handleDragStart = (e, iconId) => {
    const iconElement = e.currentTarget;
    const rect = iconElement.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDraggedIcon(iconId);
    setDragOffset({ x: offsetX, y: offsetY });
    e.currentTarget.style.opacity = '0.6';
  };

  const handleDrag = (e) => {
    if (!draggedIcon) return;
    
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;
    
    setIconPositions(prev => ({
      ...prev,
      [draggedIcon]: { x, y }
    }));
  };

  const handleDragEnd = (e) => {
    if (!draggedIcon) return;
    e.currentTarget.style.opacity = '1';
    setDraggedIcon(null);
  };

  return (
    <div 
      className={styles.desktop}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
    >
      <div className={styles.iconGrid}>
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className={styles.desktopIcon}
            onDoubleClick={() => handleIconDoubleClick(icon.id)}
            onMouseDown={(e) => handleDragStart(e, icon.id)}
            style={{
              position: 'absolute',
              left: iconPositions[icon.id]?.x || '20px',
              top: iconPositions[icon.id]?.y || '20px',
              cursor: 'move'
            }}
          >
            <Image
              src={icon.icon}
              alt={icon.title}
              width={32}
              height={32}
              draggable={false}
            />
            <span>{icon.title}</span>
          </div>
        ))}
      </div>

      {openWindows.map(window => {
        if (window.isMinimized) return null;
        
        if (window.id === 'portfolio') {
          return (
            <Portfolio
              key={window.id}
              isActive={window.id === activeWindowId}
              onClose={() => onCloseWindow(window.id)}
              onMinimize={() => onMinimizeWindow(window.id)}
              onMaximize={() => onMaximizeWindow(window.id)}
              isMaximized={window.isMaximized}
              onActivate={() => onActivateWindow(window.id)}
            />
          );
        }

        return (
          <Window
            key={window.id}
            title={desktopIcons.find(icon => icon.id === window.id)?.title}
            icon={desktopIcons.find(icon => icon.id === window.id)?.icon}
            isActive={window.id === activeWindowId}
            onClose={() => onCloseWindow(window.id)}
            onMinimize={() => onMinimizeWindow(window.id)}
            onMaximize={() => onMaximizeWindow(window.id)}
            isMaximized={window.isMaximized}
            onActivate={() => onActivateWindow(window.id)}
          >
            <div className={styles.windowContent}>
              {window.id === 'computer' && (
                <div className={styles.computerContent}>
                  <h2>My Computer</h2>
                  <div className={styles.driveList}>
                    <div className={styles.drive}>
                      <Image src="/drive-c-icon.png" alt="C Drive" width={32} height={32} />
                      <span>Local Disk (C:)</span>
                    </div>
                  </div>
                </div>
              )}
              {window.id === 'recycle' && (
                <div className={styles.recycleContent}>
                  <h2>Recycle Bin</h2>
                  <p>The Recycle Bin is empty</p>
                </div>
              )}
            </div>
          </Window>
        );
      })}
    </div>
  );
}
