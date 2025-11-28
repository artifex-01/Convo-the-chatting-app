
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeftIcon, MoreVerticalIcon, SendIcon } from './Icon';

export interface StoryItem {
  id: string;
  type: 'image' | 'video' | 'text';
  url?: string;
  content?: string;
  bgClass?: string;
  duration: number; // in seconds
  timestamp: string;
}

export interface StatusSession {
    id: string;
    name: string;
    avatar: string;
    timestamp: string; // Latest timestamp for the list
    isViewed: boolean;
    items: StoryItem[];
}

interface StatusViewerProps {
  status: StatusSession;
  onClose: () => void;
}

const StatusViewer: React.FC<StatusViewerProps> = ({ status, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  
  const currentStory = status.items[currentIndex];

  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused) return;

    const duration = currentStory.duration * 1000;
    const interval = 20; // Update frequency (ms)
    
    const intervalId = setInterval(() => {
        setProgress((prev) => {
            const increment = (interval / duration) * 100;
            if (prev + increment >= 100) {
                if (currentIndex < status.items.length - 1) {
                    setCurrentIndex(c => c + 1);
                    return 0;
                } else {
                    onClose();
                    return 100;
                }
            }
            return prev + increment;
        });
    }, interval);

    return () => clearInterval(intervalId);
  }, [currentIndex, isPaused, status.items.length, onClose, currentStory.duration]);

  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // Don't trigger navigation if clicking on controls/inputs (though z-index handles most)
      const width = e.currentTarget.offsetWidth;
      const x = e.nativeEvent.offsetX;
      
      if (x < width * 0.3) {
          // Previous (Left 30% of screen)
          if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
          } else {
              // Restart first story if at beginning
              setProgress(0);
          }
      } else {
          // Next (Right 70% of screen)
          if (currentIndex < status.items.length - 1) {
              setCurrentIndex(currentIndex + 1);
          } else {
              onClose();
          }
      }
  };

  // Use a Portal to render this component at the body level
  // This avoids z-index and overflow clipping issues from parent containers
  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-[fadeIn_0.2s_ease-out]">
      {/* Progress Bars */}
      <div className="flex gap-1.5 pt-4 px-2 z-20 safe-top">
        {status.items.map((item, index) => (
            <div key={item.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                    className="h-full bg-white transition-all duration-linear ease-linear"
                    style={{ 
                        width: index < currentIndex ? '100%' : 
                               index === currentIndex ? `${progress}%` : '0%'
                    }}
                ></div>
            </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 z-20 mt-1">
         <div className="flex items-center gap-3">
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-white hover:opacity-80 p-1 rounded-full hover:bg-white/10 transition-colors">
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 cursor-pointer">
                <img src={status.avatar} className="w-10 h-10 rounded-full border border-white/20 object-cover" alt={status.name} />
                <div className="flex flex-col">
                    <h3 className="text-white font-bold text-sm leading-tight drop-shadow-md">{status.name}</h3>
                    <p className="text-white/80 text-xs font-medium drop-shadow-md">{currentStory.timestamp}</p>
                </div>
            </div>
         </div>
         <button className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
             <MoreVerticalIcon className="w-5 h-5" />
         </button>
      </div>

      {/* Content Layer */}
      <div 
        className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900"
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleScreenClick}
      >
        {currentStory.type === 'image' && (
            <div className="w-full h-full relative">
                 {/* Blurry background for fit */}
                 {currentStory.url && (
                   <>
                    <img src={currentStory.url} className="absolute inset-0 w-full h-full object-cover opacity-50 blur-xl scale-110" alt="background" />
                    <img src={currentStory.url} className="absolute inset-0 w-full h-full object-contain z-10" alt="status" />
                   </>
                 )}
            </div>
        )}
        
        {currentStory.type === 'video' && (
            <div className="w-full h-full flex items-center justify-center bg-black relative">
                 {/* Simulated video using image placeholder */}
                 {currentStory.url && <img src={currentStory.url} className="w-full h-full object-cover opacity-90" alt="video_placeholder" />}
                 <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                 <div className="absolute bottom-32 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-xs font-bold border border-white/20">
                     Video
                 </div>
                 {/* Play Button Overlay Simulation */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 animate-[ping_1s_ease-out_1]">
                    <div className="bg-white/30 p-4 rounded-full"></div>
                 </div>
            </div>
        )}
        
        {currentStory.type === 'text' && (
            <div className={`w-full h-full flex items-center justify-center p-8 text-center ${currentStory.bgClass || 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'}`}>
                <h2 className="text-white font-black text-3xl md:text-5xl leading-snug font-sans drop-shadow-lg select-none break-words max-w-full">
                    {currentStory.content}
                </h2>
            </div>
        )}
      </div>

      {/* Footer Reply */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
         <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-[2rem] pl-5 pr-2 py-3 border border-white/10 focus-within:bg-white/20 focus-within:border-white/30 transition-all flex items-center shadow-lg">
            <input 
                type="text" 
                placeholder={`Reply to ${status.name}...`} 
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-white/70 text-sm font-medium flex-1"
                onKeyDown={(e) => e.stopPropagation()} 
                onFocus={handleTouchStart} // Pause when typing
                onBlur={handleTouchEnd}
            />
         </div>
         <button className="p-3.5 bg-[#22C55E] rounded-full text-white shadow-lg shadow-green-900/20 hover:scale-105 active:scale-95 transition-all">
             <SendIcon className="w-5 h-5 ml-0.5" />
         </button>
      </div>

      <style>{`
        .safe-top {
            padding-top: max(1rem, env(safe-area-inset-top));
        }
      `}</style>
    </div>,
    document.body
  );
};

export default StatusViewer;
