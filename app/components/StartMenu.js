'use client';
import React from 'react';
import Image from 'next/image';
import styles from './startmenu.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  {
    name: 'Windows Update',
    icon: '/windows-update.png',
  },
  {
    name: 'Programs',
    icon: '/file-icon.png',
    type: 'submenu',
    items: [
      { name: 'Command Prompt', icon: '/cmd-icon.png' },
      { name: 'Notepad', icon: '/file-icon.png' },
      { name: 'Snake', icon: '/file-icon.png' }
    ]
  },
  {
    name: 'Favorites',
    icon: '/favorites.png',
  },
  {
    name: 'Documents',
    icon: '/file-icon.png',
  },
  {
    name: 'Settings',
    icon: '/settings-folder.png',
  },
  {
    name: 'Find',
    icon: '/find-icon.png',
  },
  {
    name: 'Help',
    icon: '/file-icon.png',
  },
  {
    name: 'Run...',
    icon: '/cmd-icon.png',
  },
  {
    name: 'Log Off...',
    icon: '/cmd-icon.png',
    separator: true
  },
  {
    name: 'Shut Down...',
    icon: '/cmd-icon.png',
  }
];

export default function StartMenu({ isOpen, onClose, activeDocument, cursorLine, openDocuments, activeCodeItem }) {
  const router = useRouter();
  const { logout } = useAuth();
  
  if (!isOpen) return null;

  const handleItemClick = async (e, item) => {
    e.stopPropagation();
    
    if (item.type === 'submenu') return;

    onClose();
    
    if (item.name === 'Log Off...') {
      logout(); // This should trigger the auth context to update
      router.push('/');
    } else if (item.name === 'Shut Down...') {
      router.push('/shutdown');
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.startMenu} onClick={(e) => e.stopPropagation()}>
        <div className={styles.banner}>
          <span className={styles.windows98}>Windows</span>
          <span className={styles.ninety8}>98</span>
        </div>
        <div className={styles.systemInfo}>
          <div className={styles.timeDisplay}>
            {new Date().toLocaleTimeString()}
          </div>
          <div className={styles.activeDocument}>
            <small>Active: {activeDocument}</small>
          </div>
          <div className={styles.cursorInfo}>
            <small>Line: {cursorLine}</small>
          </div>
          {activeCodeItem && (
            <div className={styles.codeItem}>
              <small>Item: {activeCodeItem}</small>
            </div>
          )}
        </div>
        <div className={styles.menuContent}>
          {menuItems.map((item) => (
            <React.Fragment key={item.name}>
              <div 
                className={`${styles.menuItem} ${item.type === 'submenu' ? styles.hasSubmenu : ''}`}
                onClick={(e) => handleItemClick(e, item)}
              >
                <div className={styles.menuItemContent}>
                  <Image 
                    src={item.icon} 
                    alt={item.name} 
                    width={24} 
                    height={24} 
                    className={styles.icon}
                  />
                  <span>{item.name}</span>
                  {item.type === 'submenu' && (
                    <span className={styles.submenuArrow}>▶</span>
                  )}
                </div>
                {item.type === 'submenu' && (
                  <div className={styles.submenu}>
                    {item.items.map((subItem) => (
                      <div 
                        key={subItem.name}
                        className={styles.menuItem}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(e, { ...subItem });
                        }}
                      >
                        <Image 
                          src={subItem.icon} 
                          alt={subItem.name} 
                          width={24} 
                          height={24} 
                        />
                        <span>{subItem.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {item.separator && <div className={styles.separator} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
