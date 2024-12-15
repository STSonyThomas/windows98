'use client';
import { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';

export default function Notepad({ isOpen, onClose }) {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    // Load initial content
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => {
        if (data.note) {
          setContent(data.note.content);
        }
      });
  }, []);

  const saveContent = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      
      if (response.ok) {
        setLastSaved(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
    setIsSaving(false);
  };

  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (content) {
        saveContent();
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [content]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-3/4 h-3/4 rounded-lg flex flex-col">
        <div className="flex justify-between items-center p-2 border-b">
          <h2 className="text-lg">Notepad</h2>
          <div className="flex items-center space-x-2">
            {isSaving && <span className="text-sm text-gray-500">Saving...</span>}
            {lastSaved && <span className="text-sm text-gray-500">Last saved: {lastSaved}</span>}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage="plaintext"
            value={content}
            onChange={setContent}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              wordWrap: 'on',
              lineNumbers: 'on',
              fontSize: 14,
            }}
          />
        </div>
      </div>
    </div>
  );
}
