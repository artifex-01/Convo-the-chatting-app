
import React, { useState } from 'react';
import { ChatSession, FilterTab, User } from '../types';
import { BriefcaseIcon, MoreVerticalIcon, SearchIcon, PlusIcon, XIcon } from './Icon';

interface ChatListProps {
  currentUser: User;
  chats: ChatSession[];
  onChatSelect: (chatId: string) => void;
  onProfileClick: () => void;
}

const ChatList: React.FC<ChatListProps> = ({ currentUser, chats, onChatSelect, onProfileClick }) => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>(FilterTab.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Filter chats based on active tab and search query
  const filteredChats = chats.filter(chat => {
    const matchesCategory = activeFilter === FilterTab.ALL || chat.category === activeFilter;
    const matchesSearch = chat.participants[0].name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7] dark:bg-slate-950 relative transition-colors duration-300">
      {/* Header Section */}
      <div className="pt-8 pb-4 px-6 bg-[#F2F4F7] dark:bg-slate-950 transition-colors duration-300">
        {isSearchActive ? (
           <div className="flex items-center justify-between mb-6 animate-[slideInSearch_0.3s_cubic-bezier(0.16,1,0.3,1)] origin-top">
            <div className="flex-1 flex items-center bg-white dark:bg-slate-900 rounded-full px-4 py-3 shadow-lg border border-gray-100 dark:border-slate-800 focus-within:ring-2 focus-within:ring-black/5 dark:focus-within:ring-white/10 transition-all">
               <SearchIcon className="w-5 h-5 text-gray-400 mr-3" />
               <input 
                 type="text" 
                 placeholder="Search chats..." 
                 className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder-gray-400 text-sm font-medium"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 autoFocus
               />
               {searchQuery && (
                 <button onClick={() => setSearchQuery('')} className="bg-gray-200 dark:bg-slate-700 rounded-full p-1 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors animate-[fadeIn_0.2s]">
                     <XIcon className="w-3 h-3 text-gray-500 dark:text-gray-300" />
                 </button>
               )}
            </div>
            <button 
                onClick={() => { setIsSearchActive(false); setSearchQuery(''); }} 
                className="ml-3 text-sm font-bold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors whitespace-nowrap px-2 py-1 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg"
            >
                Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-start justify-between mb-6 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer" onClick={onProfileClick}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img 
                      src={currentUser.avatar} 
                      alt="Profile" 
                      className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-slate-700"
                  />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">{currentUser.name}</h2>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm font-medium">
                  <BriefcaseIcon className="w-3.5 h-3.5" />
                  <span>{currentUser.tagline}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
              <button 
                onClick={() => setIsSearchActive(true)}
                className="p-2 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm rounded-full transition-all hover:scale-110 active:scale-95"
              >
                  <SearchIcon className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm rounded-full transition-all hover:scale-110 active:scale-95">
                  <MoreVerticalIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        <div className={`flex items-center gap-3 mb-6 transition-all duration-300 ${isSearchActive ? 'opacity-50 translate-y-2 blur-[1px]' : 'opacity-100 translate-y-0 blur-0'}`}>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Chat</h1>
          <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-sm font-bold text-gray-800 dark:text-white shadow-sm">{filteredChats.length}</span>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-start gap-8 border-b border-gray-200/50 dark:border-slate-700/50 pb-0">
          {[
            { label: 'All', id: FilterTab.ALL },
            { label: 'Office', id: FilterTab.OFFICE },
            { label: 'Family', id: FilterTab.FAMILY },
            { label: 'Archive', id: FilterTab.ARCHIVE },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`pb-3 text-[15px] relative transition-all duration-200 ${
                activeFilter === tab.id 
                  ? 'font-bold text-[#0F172A] dark:text-white border-b-2 border-black dark:border-white -mb-[1px]' 
                  : 'font-medium text-[#94A3B8] dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Items List */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 no-scrollbar space-y-3">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat, index) => {
            const otherUser = chat.participants[0];
            return (
              <div
                key={chat.id}
                onClick={() => onChatSelect(chat.id)}
                className="bg-white dark:bg-slate-900 rounded-[20px] p-4 flex items-center gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none cursor-pointer active:scale-[0.98] transition-transform animate-[fadeIn_0.3s_ease-out_fill-mode-backwards]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative">
                  {/* Avatar Ring */}
                  <div className={`rounded-full p-[2px] ${otherUser.isStoryActive ? 'bg-gradient-to-tr from-rose-400 to-red-500' : 'bg-transparent'}`}>
                      <div className="bg-white dark:bg-slate-900 p-[2px] rounded-full">
                          <img
                          src={otherUser.avatar}
                          alt={otherUser.name}
                          className="w-12 h-12 rounded-full object-cover"
                          />
                      </div>
                  </div>
                  {/* Online Status Dot */}
                  {otherUser.status === 'online' && (
                    <span className="absolute bottom-1 right-0 w-3.5 h-3.5 bg-[#22C55E] border-2 border-white dark:border-slate-900 rounded-full shadow-sm"></span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white truncate">
                        {/* Highlight search query if exists */}
                        {searchQuery ? (
                            <span>
                                {otherUser.name.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => 
                                    part.toLowerCase() === searchQuery.toLowerCase() ? <span key={i} className="bg-yellow-200 text-black rounded-sm px-0.5">{part}</span> : part
                                )}
                            </span>
                        ) : otherUser.name}
                    </h3>
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{chat.lastMessageTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 dark:text-slate-400 text-sm truncate pr-4">
                         {searchQuery ? (
                            <span>
                                {chat.lastMessage.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => 
                                    part.toLowerCase() === searchQuery.toLowerCase() ? <span key={i} className="bg-yellow-200 text-black rounded-sm px-0.5">{part}</span> : part
                                )}
                            </span>
                        ) : chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="flex-shrink-0 w-5 h-5 bg-[#FF3B30] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-sm animate-[fadeIn_0.3s_ease-out]">
             <div className="bg-gray-200 dark:bg-slate-800 p-4 rounded-full mb-4">
                <SearchIcon className="w-8 h-8 text-gray-400 dark:text-slate-500" />
             </div>
             <p className="font-bold text-gray-500 dark:text-slate-400 text-lg">No results found</p>
             <p className="text-xs mt-2 text-gray-400 dark:text-slate-500">Try searching for something else</p>
          </div>
        )}
      </div>

      {/* New Contact Button */}
      <button className="absolute bottom-28 right-6 bg-black dark:bg-white dark:text-black text-white px-5 py-3 rounded-2xl shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] dark:shadow-slate-900 flex items-center gap-2 font-bold tracking-wide hover:scale-105 active:scale-95 transition-all z-10">
        <PlusIcon className="w-5 h-5 stroke-[3px]" />
        <span>New</span>
      </button>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInSearch {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ChatList;