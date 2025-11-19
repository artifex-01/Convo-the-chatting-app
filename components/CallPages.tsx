
import React from 'react';
import { ChatSession } from '../types';
import { MicIcon, MicOffIcon, PhoneOffIcon, VideoIcon, ChevronLeftIcon, MoreVerticalIcon, LockIcon, VolumeIcon } from './Icon';

interface CallPageProps {
  chat: ChatSession;
  onEnd: () => void;
}

export const VoiceCallPage: React.FC<CallPageProps> = ({ chat, onEnd }) => {
  const user = chat.participants[0];
  const [isMuted, setIsMuted] = React.useState(false);
  const [isSpeaker, setIsSpeaker] = React.useState(true);

  return (
    <div className="w-full h-full bg-[#F2F4F7] dark:bg-slate-950 flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Header / Top Actions */}
      <div className="pt-12 px-6 flex justify-between items-center z-10">
        <button 
          onClick={onEnd} // Minimizing technically ends in this mock, or could act as back
          className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm text-gray-600 dark:text-gray-300 hover:scale-105 transition-transform"
        >
             <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center opacity-60">
             <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                <LockIcon className="w-3 h-3" />
                <span>End-to-end Encrypted</span>
             </div>
        </div>
        <button className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm text-gray-600 dark:text-gray-300 hover:scale-105 transition-transform">
             <MoreVerticalIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 -mt-20">
        <div className="relative mb-10">
             {/* Rings */}
             <div className="absolute inset-0 bg-gray-200 dark:bg-slate-800 rounded-full animate-[ping_3s_linear_infinite] opacity-50"></div>
             <div className="absolute -inset-8 bg-gray-200/30 dark:bg-slate-800/30 rounded-full animate-[ping_3s_linear_infinite_1s] opacity-30"></div>
             
             <div className="relative w-40 h-40 p-1.5 bg-white dark:bg-slate-900 rounded-full shadow-2xl dark:shadow-slate-900/50 z-20">
                <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt="user" />
             </div>
        </div>
        
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight text-center px-6">{user.name}</h2>
        <p className="text-lg font-bold text-[#22C55E] tracking-wide font-mono">04:23</p>
      </div>

      {/* Bottom Controls */}
      <div className="pb-10 px-6 z-20 flex justify-center">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 px-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-black/50 flex items-center gap-8 transition-colors duration-300 border border-gray-100 dark:border-slate-800">
             
             {/* Mute */}
             <button 
                onClick={() => setIsMuted(!isMuted)} 
                className={`p-4 rounded-full transition-all duration-300 ${isMuted ? 'bg-gray-900 dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700'}`}
             >
                 {isMuted ? <MicOffIcon className="w-6 h-6" /> : <MicIcon className="w-6 h-6" />}
             </button>

             {/* End Call */}
             <button 
                onClick={onEnd} 
                className="p-5 bg-[#FF3B30] text-white rounded-full shadow-lg shadow-red-500/20 hover:scale-110 active:scale-95 transition-all duration-300"
             >
                 <PhoneOffIcon className="w-7 h-7 fill-current" />
             </button>

             {/* Speaker */}
             <button 
                onClick={() => setIsSpeaker(!isSpeaker)}
                className={`p-4 rounded-full transition-all duration-300 ${isSpeaker ? 'bg-gray-900 dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700'}`}
             >
                  <VolumeIcon className="w-6 h-6" />
             </button>
        </div>
      </div>
    </div>
  );
};

export const VideoCallPage: React.FC<CallPageProps> = ({ chat, onEnd }) => {
  const user = chat.participants[0];
  const [isMuted, setIsMuted] = React.useState(false);
  const [cameraOff, setCameraOff] = React.useState(false);

  return (
    <div className="w-full h-full bg-black relative overflow-hidden flex flex-col">
      {/* Main Video Feed */}
      <div className="absolute inset-0 z-0">
        <img 
          src={user.avatar} 
          alt="Remote" 
          className="w-full h-full object-cover opacity-90" 
        />
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* Header */}
      <div className="relative z-20 pt-12 px-6 flex justify-between items-start">
         <div className="flex items-center gap-3">
            <button onClick={onEnd} className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all">
                 <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div>
                <h3 className="text-white font-bold text-lg leading-none shadow-sm">{user.name}</h3>
                <span className="text-white/80 text-xs font-mono mt-1 block">02:14</span>
            </div>
         </div>
         
         {/* Self View (PIP) */}
         <div className="w-28 h-36 bg-gray-900 rounded-[20px] overflow-hidden shadow-2xl border border-white/10 relative">
            {!cameraOff ? (
                 <div className="w-full h-full bg-gray-800 flex items-center justify-center text-xs text-gray-400 font-medium">
                     <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
                 </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                     <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">Off</div>
                </div>
            )}
         </div>
      </div>

      <div className="flex-1"></div>

      {/* Controls */}
      <div className="relative z-20 pb-10 px-6 flex justify-center">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-3 px-6 flex items-center gap-6 shadow-2xl">
             <button 
                onClick={() => setCameraOff(!cameraOff)}
                className={`p-4 rounded-full transition-all ${cameraOff ? 'bg-white text-black' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
                <VideoIcon className="w-6 h-6" />
            </button>

            <button 
                onClick={onEnd}
                className="p-5 bg-[#FF3B30] rounded-full text-white shadow-lg hover:scale-105 transition-all mx-2"
            >
                <PhoneOffIcon className="w-7 h-7" />
            </button>

             <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full transition-all ${isMuted ? 'bg-white text-black' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
                {isMuted ? <MicOffIcon className="w-6 h-6" /> : <MicIcon className="w-6 h-6" />}
            </button>
        </div>
      </div>
    </div>
  );
};
