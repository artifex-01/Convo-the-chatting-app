
import React, { useState } from 'react';
import { ChatSession, FilterTab, User } from '../types';
import { BriefcaseIcon, MoreVerticalIcon, SearchIcon, PlusIcon } from './Icon';

interface ChatListProps {
  currentUser: User;
  chats: ChatSession[];
  onChatSelect: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ currentUser, chats, onChatSelect }) => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>(FilterTab.ALL);

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7] relative">
      {/* Header Section */}
      <div className="pt-8 pb-4 px-6 bg-[#F2F4F7]">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                    src={currentUser.avatar} 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                {/* Dotted pattern background circle effect behind avatar (simulated by simple overlay in this context) */}
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900 leading-tight">{currentUser.name}</h2>
              <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                <BriefcaseIcon className="w-3.5 h-3.5" />
                <span>{currentUser.tagline}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <button className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all">
                <SearchIcon className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all">
                <MoreVerticalIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Chat</h1>
          <span className="bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm">12</span>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-start gap-8 border-b border-gray-200/50 pb-0">
          {[
            { label: 'All', id: FilterTab.ALL },
            { label: 'Office', id: FilterTab.OFFICE },
            { label: 'Family', id: FilterTab.FAMILY },
            { label: 'Archive', id: FilterTab.ARCHIVE },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`pb-3 text-[15px] relative transition-colors ${
                activeFilter === tab.id ? 'font-bold text-[#0F172A]' : 'font-medium text-[#94A3B8] hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Items List */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 no-scrollbar space-y-3">
        {chats.map((chat) => {
          const otherUser = chat.participants[0];
          return (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className="bg-white rounded-[20px] p-4 flex items-center gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="relative">
                {/* Avatar Ring */}
                <div className={`rounded-full p-[2px] ${otherUser.isStoryActive ? 'bg-gradient-to-tr from-rose-400 to-red-500' : 'bg-transparent'}`}>
                    <div className="bg-white p-[2px] rounded-full">
                        <img
                        src={otherUser.avatar}
                        alt={otherUser.name}
                        className="w-12 h-12 rounded-full object-cover"
                        />
                    </div>
                </div>
                {/* Online Status Dot */}
                {otherUser.status === 'online' && (
                  <span className="absolute bottom-1 right-0 w-3.5 h-3.5 bg-[#22C55E] border-2 border-white rounded-full shadow-sm"></span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900 truncate">{otherUser.name}</h3>
                  <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{chat.lastMessageTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm truncate pr-4">{chat.lastMessage}</p>
                  {chat.unreadCount > 0 && (
                    <span className="flex-shrink-0 w-5 h-5 bg-[#FF3B30] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Contact Button */}
      <button className="absolute bottom-28 right-6 bg-black text-white px-5 py-3 rounded-2xl shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] flex items-center gap-2 font-bold tracking-wide hover:scale-105 active:scale-95 transition-all z-10">
        <PlusIcon className="w-5 h-5 stroke-[3px]" />
        <span>New</span>
      </button>
    </div>
  );
};

export default ChatList;
