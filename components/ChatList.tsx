
import React, { useState } from 'react';
import { ChatSession, FilterTab, User } from '../types';
import { BriefcaseIcon, MoreVerticalIcon, SearchIcon, PlusIcon, XIcon, UsersIcon, UserPlusIcon } from './Icon';

interface ChatListProps {
  currentUser: User;
  chats: ChatSession[];
  onChatSelect: (chatId: string) => void;
  onProfileClick: () => void;
  onCreateGroupClick: () => void;
}

const ChatList: React.FC<ChatListProps> = ({ currentUser, chats, onChatSelect, onProfileClick, onCreateGroupClick }) => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>(FilterTab.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showNewMenu, setShowNewMenu] = useState(false);

  // Filter chats based on active tab and search query
  const filteredChats = chats.filter(chat => {
    // 1. Filter by Search Query
    const isGroup = chat.isGroup;
    const displayTitle = isGroup && chat.groupName ? chat.groupName : chat.participants[0].name;
    const matchesSearch = displayTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // 2. Filter by Tab Category
    switch (activeFilter) {
      case FilterTab.UNREAD:
        return chat.unreadCount > 0;
      case FilterTab.GROUP:
        return chat.isGroup === true;
      case FilterTab.NEW:
        return chat.category === FilterTab.NEW;
      case FilterTab.ALL:
      default:
        return true;
    }
  });

  // Handle Keyboard Navigation for Tabs (Roving Tabindex)
  const handleTabKeyDown = (e: React.KeyboardEvent, currentTab: FilterTab) => {
    const tabs = [FilterTab.ALL, FilterTab.UNREAD, FilterTab.GROUP, FilterTab.NEW];
    const currentIndex = tabs.indexOf(currentTab);
    let nextTab: FilterTab | null = null;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextTab = tabs[(currentIndex + 1) % tabs.length];
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextTab = tabs[(currentIndex - 1 + tabs.length) % tabs.length];
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextTab = tabs[0];
    } else if (e.key === 'End') {
      e.preventDefault();
      nextTab = tabs[tabs.length - 1];
    }

    if (nextTab) {
      setActiveFilter(nextTab);
      // Focus the next tab element after state update
      setTimeout(() => {
        const element = document.getElementById(`tab-${nextTab}`);
        element?.focus();
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7] dark:bg-slate-950 relative transition-colors duration-300">
      {/* Header Section */}
      <div className="pt-8 pb-4 px-6 bg-[#F2F4F7] dark:bg-slate-950 transition-colors duration-300">
        {isSearchActive ? (
           <div className="flex items-center gap-3 mb-6 animate-[slideDownFade_0.3s_cubic-bezier(0.16,1,0.3,1)] origin-top">
            <div className="flex-1 h-[3.25rem] bg-white dark:bg-slate-900 rounded-full flex items-center px-2 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-transparent focus-within:border-gray-200 dark:focus-within:border-slate-700 focus-within:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15)] transition-all duration-300">
               <div className="pl-3 pr-2">
                  <SearchIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
               </div>
               <input 
                 type="text" 
                 placeholder="Search chats, messages..." 
                 className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 text-[15px] font-medium h-full w-full"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 autoFocus
               />
               {searchQuery && (
                 <button onClick={() => setSearchQuery('')} className="p-2 mr-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 transition-colors animate-[scaleIn_0.2s_ease-out]">
                     <XIcon className="w-4 h-4" />
                 </button>
               )}
            </div>
            <button 
                onClick={() => { setIsSearchActive(false); setSearchQuery(''); }} 
                className="px-4 py-3 rounded-full text-sm font-bold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
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
                aria-label="Search"
              >
                  <SearchIcon className="w-6 h-6" />
              </button>
              <button 
                className="p-2 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm rounded-full transition-all hover:scale-110 active:scale-95"
                aria-label="More options"
              >
                  <MoreVerticalIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        <div className={`flex items-center gap-3 mb-6 transition-all duration-300 ${isSearchActive ? 'opacity-50 translate-y-2 blur-[1px]' : 'opacity-100 translate-y-0 blur-0'}`}>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Chat</h1>
          <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-sm font-bold text-gray-800 dark:text-white shadow-sm">{filteredChats.length}</span>
        </div>

        {/* Tabs with Accessibility */}
        <div 
          className="flex items-center justify-start gap-8 border-b border-gray-200/50 dark:border-slate-700/50 pb-0"
          role="tablist"
          aria-label="Chat filters"
        >
          {[
            { label: 'All', id: FilterTab.ALL },
            { label: 'Unread', id: FilterTab.UNREAD },
            { label: 'Group', id: FilterTab.GROUP },
            { label: 'New', id: FilterTab.NEW },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={activeFilter === tab.id}
              aria-controls="chat-list-panel"
              tabIndex={activeFilter === tab.id ? 0 : -1}
              onClick={() => setActiveFilter(tab.id)}
              onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
              className={`pb-3 text-[15px] relative transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:rounded-sm ${
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
      <div 
        id="chat-list-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeFilter}`}
        className="flex-1 overflow-y-auto px-4 pb-32 no-scrollbar space-y-3"
      >
        {filteredChats.length > 0 ? (
          filteredChats.map((chat, index) => {
            const isGroup = chat.isGroup;
            const displayAvatar = isGroup && chat.groupAvatar ? chat.groupAvatar : chat.participants[0].avatar;
            const displayName = isGroup && chat.groupName ? chat.groupName : chat.participants[0].name;
            const isStoryActive = !isGroup && chat.participants[0].isStoryActive;
            const status = !isGroup ? chat.participants[0].status : null;

            return (
              <div
                key={chat.id}
                onClick={() => onChatSelect(chat.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onChatSelect(chat.id);
                  }
                }}
                tabIndex={0}
                role="button"
                className="bg-white dark:bg-slate-900 rounded-[20px] p-4 flex items-center gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none cursor-pointer active:scale-[0.98] transition-transform animate-[fadeIn_0.3s_ease-out_fill-mode-backwards] outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative">
                  {/* Avatar Ring */}
                  <div className={`rounded-full p-[2px] ${isStoryActive ? 'bg-gradient-to-tr from-rose-400 to-red-500' : 'bg-transparent'}`}>
                      <div className="bg-white dark:bg-slate-900 p-[2px] rounded-full">
                          <img
                          src={displayAvatar}
                          alt={displayName}
                          className="w-12 h-12 rounded-full object-cover"
                          />
                      </div>
                  </div>
                  {/* Online Status Dot - only for single users */}
                  {status === 'online' && (
                    <span className="absolute bottom-1 right-0 w-3.5 h-3.5 bg-[#22C55E] border-2 border-white dark:border-slate-900 rounded-full shadow-sm"></span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white truncate">
                        {/* Highlight search query if exists */}
                        {searchQuery ? (
                            <span>
                                {displayName.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => 
                                    part.toLowerCase() === searchQuery.toLowerCase() ? <span key={i} className="bg-yellow-200 text-black rounded-sm px-0.5">{part}</span> : part
                                )}
                            </span>
                        ) : displayName}
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

      {/* New Action Menu & Button */}
      <div className="absolute bottom-28 right-6 z-20 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Create Group Option */}
        <div className={`transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom ${showNewMenu ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'}`}>
             <button 
               onClick={() => {
                   onCreateGroupClick();
                   setShowNewMenu(false);
               }}
               className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 px-5 py-3 flex items-center gap-3 hover:scale-105 transition-transform text-gray-700 dark:text-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500"
               aria-label="Create a new group"
             >
                 <UsersIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                 <span className="font-bold text-sm">Create Group</span>
             </button>
        </div>

        {/* Invite Option */}
        <div className={`transition-all duration-300 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom ${showNewMenu ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'}`}>
             <button 
                 className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 px-5 py-3 flex items-center gap-3 hover:scale-105 transition-transform text-gray-700 dark:text-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500"
                 aria-label="Invite friends"
             >
                 <UserPlusIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                 <span className="font-bold text-sm">Invite</span>
             </button>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setShowNewMenu(!showNewMenu)}
          aria-expanded={showNewMenu}
          aria-label={showNewMenu ? "Close menu" : "Create new"}
          className={`pointer-events-auto bg-black dark:bg-white dark:text-black text-white px-5 py-3 rounded-2xl shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] dark:shadow-slate-900 flex items-center gap-2 font-bold tracking-wide hover:scale-105 active:scale-95 transition-all z-30 ${showNewMenu ? 'bg-gray-800 dark:bg-gray-200' : ''} focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
        >
          <div className={`transition-transform duration-300 ${showNewMenu ? 'rotate-[135deg]' : 'rotate-0'}`}>
               <PlusIcon className="w-5 h-5 stroke-[3px]" />
          </div>
          <span className="min-w-[40px] text-center transition-all">{showNewMenu ? 'Close' : 'New'}</span>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes scaleIn {
            from { transform: scale(0); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ChatList;
