'use client';
import { useState, useRef } from 'react';
import Draggable from 'react-draggable';

export default function WindowComponent({ 
  title, 
  icon, 
  children, 
  onClose,
  onClick,
  isActive = true,
  defaultPosition = { x: 50, y: 50 },
  defaultSize = { width: 800, height: 500 }
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef(null);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <Draggable
      handle=".window-titlebar"
      defaultPosition={defaultPosition}
      disabled={isMaximized}
      bounds="parent"
    >
      <div
        ref={windowRef}
        onClick={onClick}
        className={`vista-window ${isMaximized ? 'maximized' : ''} ${
          isActive ? 'active' : ''
        }`}
        style={
          !isMaximized
            ? {
                width: defaultSize.width,
                height: defaultSize.height,
                backgroundColor: '#f0f0f0',
                zIndex: isActive ? 10 : 1
              }
            : {}
        }
      >
        <div className="window-titlebar">
          <div className="window-title">
            {icon && <span className="window-icon">{icon}</span>}
            <span>{title}</span>
          </div>
          <div className="window-controls">
            <button
              className="window-button minimize"
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
              }}
              title="Minimize"
            >
              <span style={{ fontSize: '16px', lineHeight: 1 }}>‒</span>
            </button>
            <button
              className="window-button maximize"
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              title="Maximize"
            >
              <span style={{ fontSize: '14px', lineHeight: 1 }}>□</span>
            </button>
            <button
              className="window-button close"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              title="Close"
            >
              <span style={{ fontSize: '16px', lineHeight: 1 }}>×</span>
            </button>
          </div>
        </div>
        <div className="window-content">
          {children}
        </div>
      </div>
    </Draggable>
  );
}
