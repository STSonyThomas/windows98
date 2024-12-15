'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '../desktop/desktop.module.css';

export default function Window({ 
  title, 
  icon, 
  children, 
  initialPosition, 
  onClose,
  onMinimize,
  onMaximize,
  isActive,
  isMaximized,
  isMinimized
}) {
  const [position, setPosition] = useState(initialPosition || { x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [previousPosition, setPreviousPosition] = useState(null);
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest(`.${styles.windowControls}`)) return; // Don't drag when clicking controls
    if (isMaximized) return; // Don't drag when maximized
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Save position before maximizing
  useEffect(() => {
    if (isMaximized && !previousPosition) {
      setPreviousPosition(position);
    } else if (!isMaximized && previousPosition) {
      setPosition(previousPosition);
      setPreviousPosition(null);
    }
  }, [isMaximized]);

  const handleCloseClick = () => {
    onClose && onClose();
  };

  const handleMinimizeClick = () => {
    onMinimize && onMinimize();
  };

  const handleMaximizeClick = () => {
    onMaximize && onMaximize();
  };

  if (isMinimized) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className={`${styles.window} ${isActive ? styles.active : ''} ${isMaximized ? styles.maximized : ''}`}
      style={!isMaximized ? {
        left: position.x,
        top: position.y,
        width: '800px',
        height: '600px'
      } : undefined}
      onMouseDown={handleMouseDown}
    >
      <div className={`${styles.windowHeader} ${isActive ? styles.active : ''}`}>
        <div className={styles.windowTitle}>
          {icon && <Image src={icon} alt={title} width={16} height={16} className={styles.titleIcon} />}
          <span>{title}</span>
        </div>
        <div className={styles.windowControls}>
          <button className={styles.windowButton} onClick={handleMinimizeClick} title="Minimize">
            <div className={styles.minimizeIcon}></div>
          </button>
          <button className={styles.windowButton} onClick={handleMaximizeClick} title="Maximize">
            <div className={styles.maximizeIcon}></div>
          </button>
          <button className={styles.windowButton} onClick={handleCloseClick} title="Close">
            <span className={styles.closeIcon}>×</span>
          </button>
        </div>
      </div>
      <div className={styles.windowContent}>
        {children}
      </div>
    </div>
  );
}
