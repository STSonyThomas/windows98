'use client';
import { useState } from 'react';

export default function StartMenu({ onClose, onSelectProgram }) {
  const [searchTerm, setSearchTerm] = useState('');

  const menuItems = [
    { name: 'Notepad', icon: '📝' },
    { name: 'Portfolio', icon: '📋' },
    { name: 'Computer', icon: '💻' },
    { name: 'Trash', icon: '🗑️' },
  ];

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[400px]">
      <div className="p-4 bg-gradient-to-r from-[#0058ee] to-[#3f9eff]">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded border border-[#0842C9] focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              onSelectProgram(item.name);
              onClose();
            }}
            className="start-menu-item"
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-300 p-2 bg-[#D3E5FA] flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-1 bg-[#E1E1E1] border border-gray-400 rounded hover:bg-[#CCCCCC]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
