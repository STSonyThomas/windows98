'use client';

export default function TaskbarItem({ title, icon, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`taskbar-item ${
        isActive ? 'bg-[#3B6AEE]' : 'bg-[#2B5ADE]'
      }`}
    >
      <span className="text-lg">{icon}</span>
    </button>
  );
}
