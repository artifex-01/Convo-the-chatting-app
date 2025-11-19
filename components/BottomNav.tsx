import React from 'react';
import { NavTab } from '../types';
import { GridIcon, MessageIcon, PhoneIcon, SettingsIcon } from './Icon';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: NavTab.CHATS, icon: MessageIcon, label: 'Chats' },
    { id: NavTab.GRID, icon: GridIcon, label: 'Status' },
    { id: NavTab.CALLS, icon: PhoneIcon, label: 'Calls', hasBadge: true },
    { id: NavTab.SETTINGS, icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <div className="absolute bottom-6 left-0 right-0 px-6 z-30">
      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.2)] px-3 py-3 flex justify-between items-center h-20">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full transition-all duration-300 ease-out ${
                isActive ? 'bg-black text-white flex-grow-[0.5]' : 'text-gray-400 hover:bg-gray-50 bg-transparent flex-grow-0'
              }`}
            >
              <div className="relative flex-shrink-0">
                <Icon className="w-6 h-6" fill={isActive && item.id === NavTab.CHATS} />
                {item.hasBadge && !isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              
              {isActive && (
                <span className="font-bold text-sm whitespace-nowrap animate-[fadeIn_0.2s_ease-in-out]">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-5px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default BottomNav;