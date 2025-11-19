
import React, { useState, useMemo } from 'react';
import { ChatSession, FilterTab, User } from '../types';
import { CameraIcon, CheckIcon, ChevronLeftIcon, SearchIcon } from './Icon';
import { MOCK_CHATS } from '../constants';

interface CreateGroupPageProps {
  onBack: () => void;
  onCreate: (newGroup: ChatSession) => void;
}

const CreateGroupPage: React.FC<CreateGroupPageProps> = ({ onBack, onCreate }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Derive unique contacts from mock chats to simulate a contact list
  const contacts = useMemo(() => {
    const uniqueUsers = new Map<string, User>();
    MOCK_CHATS.forEach(chat => {
      chat.participants.forEach(p => {
        if (!uniqueUsers.has(p.id)) {
          uniqueUsers.set(p.id, p);
        }
      });
    });
    return Array.from(uniqueUsers.values());
  }, []);

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelection = (id: string) => {
    setSelectedContactIds(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    if (!groupName.trim() || selectedContactIds.length === 0) return;

    const selectedParticipants = contacts.filter(c => selectedContactIds.includes(c.id));

    const newGroup: ChatSession = {
      id: `g_${Date.now()}`,
      participants: selectedParticipants,
      lastMessage: 'Group created',
      lastMessageTime: 'Just now',
      unreadCount: 0,
      messages: [],
      category: FilterTab.ALL,
      isGroup: true,
      groupName: groupName,
      groupAvatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=100&auto=format&fit=crop' // Placeholder group image
    };

    onCreate(newGroup);
  };

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7] dark:bg-slate-950 relative z-30 animate-[slideIn_0.3s_ease-out] transition-colors duration-300">
      {/* Header */}
      <div className="pt-8 pb-4 px-4 flex items-center justify-between bg-[#F2F4F7] dark:bg-slate-950 transition-colors duration-300">
        <button onClick={onBack} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-all">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">New Group</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 no-scrollbar">
        {/* Group Info Section */}
        <div className="flex items-center gap-4 mt-4 mb-8">
          <div className="w-16 h-16 rounded-[20px] bg-gray-200 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors">
            <CameraIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex-1">
             <input 
                type="text" 
                placeholder="Group Subject"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full bg-transparent border-b border-gray-300 dark:border-slate-700 py-2 px-1 text-lg font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
             />
          </div>
        </div>

        {/* Search Contacts */}
        <div className="mb-6 relative">
             <SearchIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
             <input 
                type="text" 
                placeholder="Search contacts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium text-gray-800 dark:text-white shadow-sm border-none outline-none"
             />
        </div>

        {/* Contact List */}
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Participants ({selectedContactIds.length})</h3>
        <div className="space-y-3">
          {filteredContacts.map(contact => {
             const isSelected = selectedContactIds.includes(contact.id);
             return (
                <div 
                    key={contact.id} 
                    onClick={() => toggleSelection(contact.id)}
                    className={`bg-white dark:bg-slate-900 rounded-[20px] p-3 flex items-center gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none cursor-pointer transition-all ${isSelected ? 'ring-2 ring-black dark:ring-white bg-gray-50 dark:bg-slate-800' : ''}`}
                >
                    <div className="relative">
                        <img src={contact.avatar} className="w-12 h-12 rounded-full object-cover" alt={contact.name} />
                        {isSelected && (
                            <div className="absolute bottom-0 right-0 bg-black dark:bg-white text-white dark:text-black rounded-full p-0.5 border-2 border-white dark:border-slate-900">
                                <CheckIcon className="w-3 h-3" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{contact.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{contact.tagline || 'Available'}</p>
                    </div>
                </div>
             );
          })}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-8 right-6">
         <button 
            onClick={handleCreate}
            disabled={!groupName.trim() || selectedContactIds.length === 0}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all transform hover:scale-105 active:scale-95 ${
                !groupName.trim() || selectedContactIds.length === 0
                ? 'bg-gray-300 dark:bg-slate-800 text-gray-500 cursor-not-allowed'
                : 'bg-black dark:bg-white text-white dark:text-black'
            }`}
         >
            <CheckIcon className="w-8 h-8" />
         </button>
      </div>
      
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CreateGroupPage;
