import React from 'react';
import { ChatSession } from '../types';
import { MicIcon, MicOffIcon, PhoneOffIcon, VideoIcon } from './Icon';

interface CallPageProps {
  chat: ChatSession;
  onEnd: () => void;
}

export const VoiceCallPage: React.FC<CallPageProps> = ({ chat, onEnd }) => {
  const user = chat.participants[0];
  const [isMuted, setIsMuted] = React.useState(false);

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-between text-white relative overflow-hidden">
      {/* Background Ambient Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-50"></div>
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[60%] bg-blue-500/20 blur-[120px] rounded-full animate-pulse"></div>
      
      <div className="flex flex-col items-center justify-center flex-1 z-10 w-full">
        <div className="relative">
          {/* Pulsing Ring Animation */}
          <div className="absolute inset-0 rounded-full border-4 border-white/10 animate-[ping_2s_ease-in-out_infinite]"></div>
          <div className="absolute inset-[-20px] rounded-full border border-white/5 animate-[ping_3s_ease-in-out_infinite_0.5s]"></div>
          
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-32 h-32 rounded-full border-4 border-gray-800 shadow-2xl object-cover relative z-10"
          />
        </div>
        
        <h2 className="mt-8 text-3xl font-bold tracking-tight">{user.name}</h2>
        <p className="text-blue-200 mt-2 animate-pulse">00:12</p>
      </div>

      {/* Controls */}
      <div className="w-full bg-gray-800/50 backdrop-blur-md p-8 pb-12 rounded-t-[3rem] z-10 border-t border-white/5">
        <div className="flex items-center justify-center gap-8">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-all duration-300 ${isMuted ? 'bg-white text-gray-900' : 'bg-gray-700/50 text-white hover:bg-gray-700'}`}
          >
            {isMuted ? <MicOffIcon className="w-6 h-6" /> : <MicIcon className="w-6 h-6" />}
          </button>
          
          <button 
            onClick={onEnd}
            className="p-5 bg-red-500 rounded-full text-white shadow-lg shadow-red-500/30 hover:bg-red-600 hover:scale-105 transition-all duration-300"
          >
            <PhoneOffIcon className="w-8 h-8" />
          </button>

          <button className="p-4 bg-gray-700/50 rounded-full text-white hover:bg-gray-700 transition-colors">
             {/* Placeholder for speaker or other secondary action */}
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
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
    <div className="w-full h-full bg-gray-900 relative overflow-hidden">
      {/* Main Video Feed (Simulated remote user) */}
      <div className="absolute inset-0 z-0">
        <img 
          src={user.avatar} 
          alt="Remote" 
          className="w-full h-full object-cover opacity-80 blur-sm scale-110" 
        />
         <div className="absolute inset-0 bg-black/30" />
         <div className="absolute inset-0 flex items-center justify-center">
            <img 
                src={user.avatar}
                className="w-24 h-24 rounded-full border-2 border-white/20 shadow-xl"
            />
            <p className="absolute mt-32 font-medium text-white drop-shadow-md">Connecting...</p>
         </div>
      </div>

      {/* Self View (PIP) */}
      <div className="absolute top-8 right-4 w-28 h-40 bg-black/80 rounded-2xl border border-white/10 shadow-2xl z-20 overflow-hidden">
        {!cameraOff ? (
             <div className="w-full h-full bg-gray-700 flex items-center justify-center text-xs text-gray-400">
                 Me
             </div>
        ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
                 <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs">Me</div>
            </div>
        )}
      </div>

      {/* Back Button / Header */}
      <div className="absolute top-0 left-0 p-6 z-20 w-full bg-gradient-to-b from-black/50 to-transparent h-32">
         <h3 className="text-white font-bold text-lg">{user.name}</h3>
         <span className="text-white/70 text-sm">00:00</span>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 pb-10 pt-20 px-6 z-20 bg-gradient-to-t from-black/90 to-transparent flex justify-center items-end">
        <div className="flex items-center gap-6">
             <button 
                onClick={() => setCameraOff(!cameraOff)}
                className={`p-3.5 rounded-full backdrop-blur-md transition-all ${cameraOff ? 'bg-white text-black' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
                <VideoIcon className="w-6 h-6" />
            </button>

            <button 
                onClick={onEnd}
                className="p-5 bg-red-500 rounded-full text-white shadow-lg hover:bg-red-600 transform hover:scale-105 transition-all"
            >
                <PhoneOffIcon className="w-7 h-7" />
            </button>

             <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3.5 rounded-full backdrop-blur-md transition-all ${isMuted ? 'bg-white text-black' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
                {isMuted ? <MicOffIcon className="w-6 h-6" /> : <MicIcon className="w-6 h-6" />}
            </button>
        </div>
      </div>
    </div>
  );
};
