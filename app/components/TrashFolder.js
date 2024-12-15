'use client';
import { useState } from 'react';

export default function TrashFolder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trashedItems] = useState([
    { name: 'old_notes.txt', deletedAt: '2024-12-13' },
    { name: 'draft_portfolio.md', deletedAt: '2024-12-12' },
  ]);

  return (
    <div>
      <div
        className="flex flex-col items-center cursor-pointer"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="xp-window w-96">
            <div className="xp-window-title flex justify-between items-center">
              <span>Recycle Bin</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              {trashedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 hover:bg-blue-100 rounded"
                >
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.deletedAt}</span>
                </div>
              ))}
              <div className="mt-4 flex justify-end">
                <button 
                  className="px-4 py-2 bg-[#E1E1E1] border border-gray-400 rounded hover:bg-[#CCCCCC]"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
