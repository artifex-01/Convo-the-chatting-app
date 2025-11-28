
import React, { useState, useEffect } from 'react';
import { CameraIcon, EditIcon, MoreVerticalIcon, PlusIcon, SearchIcon } from './Icon';
import { User } from '../types';
import StatusViewer, { StatusSession } from './StatusViewer';

// Rich Mock Status Data
const MOCK_STATUS_DATA: StatusSession[] = [
  {
    id: 's1',
    name: 'Arshad Khan',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
    timestamp: 'Just now',
    isViewed: false,
    items: [
        {
            id: 'st1_1',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000&auto=format&fit=crop', // Nature
            duration: 5,
            timestamp: '15m ago'
        },
        {
            id: 'st1_2',
            type: 'text',
            content: 'Hiking trip this weekend! 🏔️ Who is in?',
            bgClass: 'bg-gradient-to-tr from-green-400 to-blue-500',
            duration: 4,
            timestamp: '10m ago'
        },
        {
            id: 'st1_3',
            type: 'video',
            url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop', // Simulating video frame
            duration: 6,
            timestamp: 'Just now'
        }
    ]
  },
  {
    id: 's2',
    name: 'Gulam Sarwar',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
    timestamp: 'Today, 10:23 AM',
    isViewed: false,
    items: [
        {
            id: 'st2_1',
            type: 'text',
            content: 'Big announcement coming soon... 🚀',
            bgClass: 'bg-gradient-to-bl from-orange-500 to-yellow-500',
            duration: 5,
            timestamp: 'Today, 10:23 AM'
        },
        {
            id: 'st2_2',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop', // Office
            duration: 5,
            timestamp: 'Today, 10:25 AM'
        }
    ]
  },
  {
    id: 's3',
    name: 'Rehan Khan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    timestamp: 'Today, 09:45 AM',
    isViewed: true,
    items: [
        {
            id: 'st3_1',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1000&auto=format&fit=crop', // House
            duration: 5,
            timestamp: 'Today, 09:45 AM'
        }
    ]
  },
  {
    id: 's4',
    name: 'Design Team',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a3694fb60ed?q=80&w=100&auto=format&fit=crop',
    timestamp: 'Yesterday',
    isViewed: true,
    items: [
         {
            id: 'st4_1',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop', // Meeting
            duration: 5,
            timestamp: 'Yesterday'
        }
    ]
  }
];

interface StatusPageProps {
  currentUser: User;
}

const StatusPage: React.FC<StatusPageProps> = ({ currentUser }) => {
  const [activeStatus, setActiveStatus] = useState<StatusSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching stories
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const recentUpdates = MOCK_STATUS_DATA.filter(s => !s.isViewed);
  const viewedUpdates = MOCK_STATUS_DATA.filter(s => s.isViewed);
  const allStories = [...recentUpdates, ...viewedUpdates];

  // Mock My Status for demonstration when clicked
  const handleMyStatusClick = () => {
      const myMockStatus: StatusSession = {
          id: 'my_status',
          name: 'My Status',
          avatar: currentUser.avatar,
          timestamp: 'Just now',
          isViewed: false,
          items: [
              {
                  id: 'myst1',
                  type: 'text',
                  content: 'Working on something cool! 👨‍💻',
                  bgClass: 'bg-gradient-to-r from-violet-600 to-indigo-600',
                  duration: 5,
                  timestamp: 'Just now'
              }
          ]
      };
      setActiveStatus(myMockStatus);
  };

  if (isLoading) {
      return <StatusSkeleton />;
  }

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7] dark:bg-slate-950 relative transition-colors duration-300 animate-[fadeIn_0.3s_ease-out]">
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
        
        {/* My Status Row */}
        <div 
            onClick={handleMyStatusClick}
            className="bg-white dark:bg-slate-900 rounded-[20px] p-4 flex items-center gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none cursor-pointer active:scale-[0.98] transition-transform"
        >
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

        {/* NEW SECTION: Stories (Cards) */}
        <div>
            <h3 className="px-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Stories</h3>
            <div className="flex gap-4 overflow-x-auto px-1 pb-4 no-scrollbar">
                {allStories.map((status) => (
                    <StoryCard 
                        key={`card-${status.id}`} 
                        status={status} 
                        onClick={() => setActiveStatus(status)} 
                    />
                ))}
            </div>
        </div>

        {/* Recent Updates List */}
        {recentUpdates.length > 0 && (
            <div>
                <h3 className="px-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Recent updates</h3>
                <div className="space-y-3">
                    {recentUpdates.map((status) => (
                        <div 
                            key={status.id} 
                            onClick={() => setActiveStatus(status)}
                            className="bg-white dark:bg-slate-900 rounded-[20px] p-4 flex items-center gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none cursor-pointer active:scale-[0.98] transition-transform"
                        >
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

        {/* Viewed Updates List */}
        {viewedUpdates.length > 0 && (
            <div>
                <h3 className="px-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Viewed updates</h3>
                 <div className="space-y-3">
                    {viewedUpdates.map((status) => (
                        <div 
                            key={status.id} 
                            onClick={() => setActiveStatus(status)}
                            className="bg-white dark:bg-slate-900 rounded-[20px] p-4 flex items-center gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none cursor-pointer active:scale-[0.98] transition-transform opacity-75"
                        >
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
      <div className="absolute bottom-28 right-6 flex flex-col gap-4 z-10">
         <button className="w-12 h-12 bg-gray-200 dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors">
             <EditIcon className="w-5 h-5" />
         </button>
         <button className="w-14 h-14 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-lg text-white dark:text-black hover:scale-105 transition-transform">
             <CameraIcon className="w-6 h-6" />
         </button>
      </div>

      {/* Full Screen Status Viewer */}
      {activeStatus && (
          <StatusViewer 
            status={activeStatus} 
            onClose={() => setActiveStatus(null)} 
          />
      )}
      
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const StoryCard = ({ status, onClick }: { status: StatusSession, onClick: () => void }) => {
    // Find first image/video for thumbnail, or use text bg
    const mediaItem = status.items.find(i => i.type === 'image' || i.type === 'video');
    const bgUrl = mediaItem?.url;
    
    return (
        <div 
            onClick={onClick}
            className="flex-shrink-0 w-32 h-48 rounded-2xl relative overflow-hidden cursor-pointer active:scale-95 transition-transform group shadow-md"
        >
            {bgUrl ? (
                <img src={bgUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={status.name} />
            ) : (
                 <div className={`w-full h-full ${status.items[0]?.bgClass || 'bg-gradient-to-br from-indigo-500 to-pink-500'} flex items-center justify-center`}>
                    {status.items[0]?.type === 'text' && (
                        <p className="text-white text-[10px] p-2 text-center line-clamp-3 font-bold">{status.items[0].content}</p>
                    )}
                 </div>
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
            
            {/* Avatar Ring */}
            <div className="absolute top-3 left-3">
                 <div className={`p-0.5 rounded-full ${!status.isViewed ? 'bg-gradient-to-tr from-rose-500 to-orange-500' : 'bg-gray-400'}`}>
                    <img src={status.avatar} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover" alt="" />
                 </div>
            </div>
            
            {/* Text Info */}
            <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-sm font-bold truncate shadow-sm leading-tight">{status.name}</p>
                <p className="text-white/80 text-[10px] font-medium shadow-sm truncate">{status.timestamp}</p>
            </div>
        </div>
    );
}

const StatusSkeleton = () => {
    return (
        <div className="flex flex-col h-full bg-[#F2F4F7] dark:bg-slate-950 transition-colors duration-300">
             {/* Header Skeleton */}
             <div className="pt-8 pb-4 px-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="w-10" />
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-800 animate-pulse" />
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-800 animate-pulse" />
                    </div>
                </div>
                <div className="h-8 w-32 bg-gray-200 dark:bg-slate-800 rounded-lg animate-pulse mb-6" />
             </div>
             
             <div className="px-4 space-y-8">
                 {/* My Status Skeleton */}
                 <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-slate-800 animate-pulse" />
                     <div className="flex-1 space-y-2">
                         <div className="h-4 w-24 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
                         <div className="h-3 w-32 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
                     </div>
                 </div>
                 
                 {/* Stories Cards Skeleton */}
                 <div>
                     <div className="h-3 w-20 bg-gray-200 dark:bg-slate-800 rounded animate-pulse mb-3 ml-2" />
                     <div className="flex gap-4 overflow-hidden">
                         {[1,2,3,4].map(i => (
                             <div key={i} className="w-32 h-48 flex-shrink-0 bg-gray-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
                         ))}
                     </div>
                 </div>

                 {/* List Skeleton */}
                 <div className="space-y-4">
                     <div className="h-3 w-24 bg-gray-200 dark:bg-slate-800 rounded animate-pulse mb-2 ml-2" />
                     {[1,2,3].map(i => (
                         <div key={i} className="flex items-center gap-4 p-2">
                             <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-800 animate-pulse" />
                             <div className="flex-1 space-y-2">
                                 <div className="h-4 w-32 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
                                 <div className="h-3 w-20 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </div>
    )
}

export default StatusPage;
