import React from 'react';
import { NavTab } from '../types';
import { GridIcon, MessageIcon, PhoneIcon, SettingsIcon } from './Icon';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="absolute bottom-6 left-0 right-0 px-6">
      <div className="bg-white rounded-[2rem] shadow-xl px-4 py-3 flex justify-between items-center h-20">
        
        {/* Chats Tab (Active Style) */}
        <button
          onClick={() => onTabChange(NavTab.CHATS)}
          className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
            activeTab === NavTab.CHATS ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-100'
          }`}
        >
          <MessageIcon className="w-5 h-5" fill={activeTab === NavTab.CHATS} />
          {activeTab === NavTab.CHATS && <span className="font-medium text-sm">Chats</span>}
        </button>

        {/* Grid Tab */}
        <button
          onClick={() => onTabChange(NavTab.GRID)}
          className={`p-3 rounded-full transition-colors ${
            activeTab === NavTab.GRID ? 'text-black' : 'text-gray-400 hover:bg-gray-100'
          }`}
        >
          <GridIcon className="w-6 h-6" />
        </button>

        {/* Calls Tab with Notification Dot */}
        <button
          onClick={() => onTabChange(NavTab.CALLS)}
          className={`p-3 rounded-full relative transition-colors ${
            activeTab === NavTab.CALLS ? 'text-black' : 'text-gray-400 hover:bg-gray-100'
          }`}
        >
          <PhoneIcon className="w-6 h-6" />
          {/* Red notification dot floating near the icon */}
          <span className="absolute top-3 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Settings Tab */}
        <button
          onClick={() => onTabChange(NavTab.SETTINGS)}
          className={`p-3 rounded-full transition-colors ${
            activeTab === NavTab.SETTINGS ? 'text-black' : 'text-gray-400 hover:bg-gray-100'
          }`}
        >
          <SettingsIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
