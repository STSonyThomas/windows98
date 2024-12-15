'use client';
import Image from 'next/image';
import styles from './startmenu.module.css';

export default function StartMenu({ onClose, onSelectProgram }) {
  const menuItems = [
    { 
      name: 'Windows Update',
      icon: '/windows-update.png',
      type: 'item'
    },
    { 
      name: 'Programs',
      icon: '/programs-folder.png',
      type: 'submenu',
      items: [
        { name: 'Command Prompt', icon: '/cmd-icon.png' },
        { name: 'Notepad', icon: '/portfolio-icon.png' }
      ]
    },
    { 
      name: 'Favorites',
      icon: '/favorites-folder.png',
      type: 'submenu'
    },
    { 
      name: 'Documents',
      icon: '/documents-folder.png',
      type: 'submenu'
    },
    { 
      name: 'Settings',
      icon: '/settings-folder.png',
      type: 'submenu'
    },
    { 
      name: 'Find',
      icon: '/find-icon.png',
      type: 'submenu'
    },
    { 
      name: 'Help',
      icon: '/help-icon.png',
      type: 'item'
    },
    { 
      name: 'Run...',
      icon: '/run-icon.png',
      type: 'item'
    },
    {
      type: 'separator'
    },
    { 
      name: 'Log Off...',
      icon: '/logoff-icon.png',
      type: 'item'
    },
    { 
      name: 'Shut Down...',
      icon: '/shutdown-icon.png',
      type: 'item'
    }
  ];

  const handleItemClick = (item) => {
    if (item.type === 'item') {
      if (item.name === 'Command Prompt') {
        onSelectProgram('cmd');
      } else if (item.name === 'Notepad') {
        onSelectProgram('portfolio');
      } else {
        onSelectProgram(item.name);
      }
      onClose();
    }
  };

  return (
    <div className={styles.startMenu} onClick={(e) => e.stopPropagation()}>
      <div className={styles.windowsLogo}>
        <div className={styles.logoText}>
          <span className={styles.windows}>Windows</span>
          <span className={styles.version}>98</span>
        </div>
      </div>
      <div className={styles.menuItems}>
        {menuItems.map((item, index) => (
          item.type === 'separator' ? (
            <div key={index} className={styles.separator} />
          ) : (
            <div
              key={index}
              className={`${styles.menuItem} ${item.type === 'submenu' ? styles.hasSubmenu : ''}`}
              onClick={() => handleItemClick(item)}
            >
              {item.icon && (
                <Image
                  src={item.icon}
                  alt=""
                  width={16}
                  height={16}
                  className={styles.icon}
                />
              )}
              <span className={styles.itemText}>{item.name}</span>
              {item.type === 'submenu' && (
                <span className={styles.submenuArrow}>▶</span>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
}
