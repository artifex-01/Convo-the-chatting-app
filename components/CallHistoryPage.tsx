import React from 'react';
import { ArrowDownLeftIcon, ArrowUpRightIcon, MoreVerticalIcon, PhoneIcon, PhonePlusIcon, SearchIcon, VideoIcon } from './Icon';

// Mock Data for Call History
const MOCK_CALL_HISTORY = [
    {
        id: 'ch1',
        name: 'Arshad Khan',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
        type: 'incoming', // incoming, outgoing, missed
        mode: 'voice', // voice, video
        timestamp: '10:45 AM',
        date: 'Today'
    },
    {
        id: 'ch2',
        name: 'Rehan Khan',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
        type: 'missed',
        mode: 'video',
        timestamp: '09:12 AM',
        date: 'Today'
    },
    {
        id: 'ch3',
        name: 'Gulam Sarwar',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
        type: 'outgoing',
        mode: 'voice',
        timestamp: 'Yesterday',
        date: 'Yesterday'
    },
    {
        id: 'ch4',
        name: 'Arshad Khan',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
        type: 'outgoing',
        mode: 'video',
        timestamp: 'Yesterday',
        date: 'Yesterday'
    },
    {
        id: 'ch5',
        name: 'Mom',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
        type: 'incoming',
        mode: 'voice',
        timestamp: 'Mon',
        date: 'Monday'
    },
    {
        id: 'ch6',
        name: 'Dad',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        type: 'missed',
        mode: 'voice',
        timestamp: 'Sun',
        date: 'Sunday'
    }
];

const CallHistoryPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Header Section */}
      <div className="pt-8 pb-4 px-6 bg-[#F2F4F7]">
        <div className="flex items-start justify-between mb-6">
           {/* Placeholder left space or user avatar could go here if needed, keeping it cleaner for calls */}
           <div className="w-10"></div>
           
           <div className="flex items-center gap-4 text-gray-500">
            <button className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all">
                <SearchIcon className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all">
                <PhonePlusIcon className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-800">Calls</h1>
        </div>
        
        <div className="flex items-center gap-4 text-sm font-bold text-gray-400 border-b border-gray-200/50">
            <button className="pb-3 text-black border-b-2 border-black">ALL</button>
            <button className="pb-3 hover:text-gray-600">MISSED</button>
        </div>
      </div>

      {/* Call List */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 no-scrollbar space-y-3">
        {MOCK_CALL_HISTORY.map((call) => (
          <div
            key={call.id}
            className="bg-white rounded-[20px] p-4 flex items-center gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="relative">
                <img
                  src={call.avatar}
                  alt={call.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-100"
                />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate mb-1">{call.name}</h3>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                {call.type === 'incoming' && (
                    <ArrowDownLeftIcon className="w-3.5 h-3.5 text-green-500" />
                )}
                {call.type === 'outgoing' && (
                    <ArrowUpRightIcon className="w-3.5 h-3.5 text-green-500" />
                )}
                {call.type === 'missed' && (
                    <ArrowDownLeftIcon className="w-3.5 h-3.5 text-red-500" />
                )}
                
                <span className={call.type === 'missed' ? 'text-red-500' : 'text-gray-500'}>
                    {call.type === 'missed' ? 'Missed' : call.type === 'incoming' ? 'Incoming' : 'Outgoing'}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-400">{call.timestamp}</span>
              </div>
            </div>

            <button className="p-2.5 rounded-full bg-green-50 hover:bg-green-100 text-green-600 transition-colors">
                {call.mode === 'video' ? <VideoIcon className="w-5 h-5" /> : <PhoneIcon className="w-5 h-5" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallHistoryPage;