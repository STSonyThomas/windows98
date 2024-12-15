'use client';
import { useState } from 'react';

export default function ComputerIcon() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="xp-window w-96">
            <div className="xp-window-title flex justify-between items-center">
              <span>My Computer</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-4 p-2 hover:bg-blue-100 cursor-pointer rounded">
                <svg
                  className="w-8 h-8 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                <span>Portfolio (D:)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
