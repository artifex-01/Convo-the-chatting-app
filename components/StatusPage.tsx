
import React from 'react';
import { CameraIcon, EditIcon, MoreVerticalIcon, PlusIcon, SearchIcon } from './Icon';
import { User } from '../types';

// Mock Status Data
const MOCK_STATUS = [
  {
    id: 's1',
    name: 'Arshad Khan',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
    timestamp: 'Just now',
    isViewed: false
  },
  {
    id: 's2',
    name: 'Gulam Sarwar',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
    timestamp: 'Today, 10:23 AM',
    isViewed: false
  },
  {
    id: 's3',
    name: 'Rehan Khan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    timestamp: 'Today, 09:45 AM',
    isViewed: true
  },
  {
    id: 's4',
    name: 'Design Team',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a3694fb60ed?q=80&w=100&auto=format&fit=crop',
    timestamp: 'Yesterday',
    isViewed: true
  }
];

interface StatusPageProps {
  currentUser: User;
}

const StatusPage: React.FC<StatusPageProps> = ({ currentUser }) => {
  const recentUpdates = MOCK_STATUS.filter(s => !s.isViewed);
  const viewedUpdates = MOCK_STATUS.filter(s => s.isViewed);

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7] dark:bg-slate-950 relative transition-colors duration-300">
      {/* Header */}
      <div className="pt-8 pb-4 px-6 bg-[#F2F4F7] dark:bg-slate-950 transition-colors duration-300">
        <div className="flex items-start justify-between mb-6">
          <div className="w-10"></div> {/* Spacer */}
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
             <button className="p-2 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm rounded-full transition-all">
                <SearchIcon className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm rounded-full transition-all">
                <MoreVerticalIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Updates</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 no-scrollbar space-y-6">
        
        {/* My Status */}
        <div className="bg-white dark:bg-slate-900 rounded-[20px] p-4 flex items-center gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none cursor-pointer active:scale-[0.98] transition-transform">
            <div className="relative">
                 <img 
                    src={currentUser.avatar} 
                    alt="My Status" 
                    className="w-14 h-14 rounded-full object-cover border border-gray-200 dark:border-slate-700"
                 />
                 <div className="absolute bottom-0 right-0 bg-black dark:bg-white text-white dark:text-black rounded-full p-1 border-2 border-white dark:border-slate-900">
                    <PlusIcon className="w-3 h-3" />
                 </div>
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white">My Status</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tap to add status update</p>
            </div>
        </div>

        {/* Recent Updates */}
        {recentUpdates.length > 0 && (
            <div>
                <h3 className="px-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Recent updates</h3>
                <div className="space-y-3">
                    {recentUpdates.map((status) => (
                        <div key={status.id} className="bg-white dark:bg-slate-900 rounded-[20px] p-4 flex items-center gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none cursor-pointer active:scale-[0.98] transition-transform">
                             <div className="p-[2px] rounded-full bg-gradient-to-tr from-rose-400 to-orange-500">
                                <div className="bg-white dark:bg-slate-900 p-[2px] rounded-full">
                                    <img src={status.avatar} className="w-12 h-12 rounded-full object-cover" alt={status.name} />
                                </div>
                             </div>
                             <div>
                                 <h3 className="font-bold text-gray-900 dark:text-white">{status.name}</h3>
                                 <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{status.timestamp}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Viewed Updates */}
        {viewedUpdates.length > 0 && (
            <div>
                <h3 className="px-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Viewed updates</h3>
                 <div className="space-y-3">
                    {viewedUpdates.map((status) => (
                        <div key={status.id} className="bg-white dark:bg-slate-900 rounded-[20px] p-4 flex items-center gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none cursor-pointer active:scale-[0.98] transition-transform opacity-75">
                             <div className="p-[2px] rounded-full bg-gray-300 dark:bg-slate-700">
                                <div className="bg-white dark:bg-slate-900 p-[2px] rounded-full">
                                    <img src={status.avatar} className="w-12 h-12 rounded-full object-cover grayscale" alt={status.name} />
                                </div>
                             </div>
                             <div>
                                 <h3 className="font-bold text-gray-900 dark:text-white">{status.name}</h3>
                                 <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{status.timestamp}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-28 right-6 flex flex-col gap-4">
         <button className="w-12 h-12 bg-gray-200 dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors">
             <EditIcon className="w-5 h-5" />
         </button>
         <button className="w-14 h-14 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-lg text-white dark:text-black hover:scale-105 transition-transform">
             <CameraIcon className="w-6 h-6" />
         </button>
      </div>
    </div>
  );
};

export default StatusPage;
