
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeftIcon, MoreVerticalIcon, SendIcon, XIcon } from './Icon';

export interface StoryItem {
  id: string;
  type: 'image' | 'video' | 'text' | 'promo';
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
      // Don't trigger navigation if clicking on controls/inputs
      if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input')) return;

      const width = e.currentTarget.offsetWidth;
      const x = e.nativeEvent.offsetX;
      
      if (x < width * 0.3) {
          // Previous (Left 30% of screen)
          if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
          } else {
              // Restart first story
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

  // Render specific content based on type
  const renderContent = () => {
      switch (currentStory.type) {
          case 'image':
              return (
                <div className="w-full h-full relative">
                    {currentStory.url && (
                    <>
                        {/* Blurred background */}
                        <img src={currentStory.url} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-2xl scale-110" alt="bg" />
                        <img src={currentStory.url} className="absolute inset-0 w-full h-full object-contain z-10" alt="status" />
                    </>
                    )}
                </div>
              );
          case 'video':
              return (
                <div className="w-full h-full flex items-center justify-center bg-black relative">
                    {currentStory.url && <img src={currentStory.url} className="w-full h-full object-cover opacity-90" alt="video_placeholder" />}
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                    <div className="absolute bottom-32 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-xs font-bold border border-white/20">
                        Video
                    </div>
                </div>
              );
          case 'text':
              return (
                <div className={`w-full h-full flex items-center justify-center p-8 text-center ${currentStory.bgClass || 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'}`}>
                    <h2 className="text-white font-black text-3xl md:text-5xl leading-snug font-sans drop-shadow-lg select-none break-words max-w-full">
                        {currentStory.content}
                    </h2>
                </div>
              );
          case 'promo':
              // Replicating the specific design from the screenshot
              return (
                  <div className="w-full h-full relative bg-[#635BCA] overflow-hidden select-none">
                      {/* Background Decor */}
                      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                          <div className="absolute top-20 left-[-50px] w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
                          <div className="absolute bottom-20 right-[-50px] w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
                      </div>

                      {/* Content Layer */}
                      <div className="absolute inset-0 z-10">
                          {/* Pink Pill */}
                          <div className="absolute top-[22%] left-[10%] bg-[#FFB6C1] px-6 py-3 rounded-full transform -rotate-12 shadow-lg animate-[float_4s_ease-in-out_infinite]">
                              <span className="text-black font-bold text-lg whitespace-nowrap">Festival Collection</span>
                          </div>

                          {/* Yellow Pill (Vertical) */}
                          <div className="absolute top-[42%] right-[8%] bg-[#FFFACD] px-8 py-3 rounded-full transform rotate-90 shadow-lg animate-[float_5s_ease-in-out_infinite_1s]">
                              <span className="text-black font-bold text-lg whitespace-nowrap">Summer Sale</span>
                          </div>

                          {/* Blue Pill */}
                          <div className="absolute top-[48%] left-[12%] bg-[#AEEEEE] px-6 py-3 rounded-full shadow-lg animate-[float_4.5s_ease-in-out_infinite_0.5s]">
                              <span className="text-black font-bold text-lg whitespace-nowrap">50% Discount</span>
                          </div>

                          {/* Purple Pill */}
                          <div className="absolute bottom-[30%] left-[15%] bg-[#E6E6FA] px-6 py-3 rounded-full transform rotate-12 shadow-lg animate-[float_4s_ease-in-out_infinite_1.5s]">
                              <span className="text-black font-bold text-lg whitespace-nowrap">Kids Collection</span>
                          </div>

                          {/* Decorative Elements */}
                          <div className="absolute top-[20%] right-[15%] text-[#FFFACD] transform rotate-12">
                               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                          </div>
                          
                          <div className="absolute top-[35%] left-[50%] opacity-10">
                              <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                          </div>

                          <div className="absolute top-[32%] right-[30%] text-white/30 transform rotate-45 border-2 border-white/30 w-16 h-16 rounded-xl"></div>
                          
                          {/* Flower/Star bottom right */}
                          <div className="absolute bottom-[25%] right-[20%] text-white/40">
                              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                  <path d="M12 8a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z" />
                              </svg>
                          </div>
                      </div>

                      {/* Bottom Large Text */}
                      <div className="absolute bottom-[8%] left-0 right-0 text-center z-0">
                          <h1 className="text-7xl font-black text-white/10 tracking-[0.2em] font-serif">COLLECTION</h1>
                      </div>

                      <style>{`
                          @keyframes float {
                              0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
                              50% { transform: translateY(-10px) rotate(var(--rot, 0deg)); }
                          }
                      `}</style>
                  </div>
              );
          default:
              return null;
      }
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-[fadeIn_0.2s_ease-out]">
      {/* Progress Bars */}
      <div className="flex gap-1.5 pt-4 px-2 z-30 safe-top">
        {status.items.map((item, index) => (
            <div key={item.id} className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
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
      <div className="flex items-center justify-between px-4 py-3 z-30 mt-1">
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 cursor-pointer">
                <img src={status.avatar} className="w-10 h-10 rounded-full border border-white/20 object-cover" alt={status.name} />
                <div className="flex flex-col">
                    <h3 className="text-white font-bold text-sm leading-tight drop-shadow-md">{status.name}</h3>
                    <p className="text-white/80 text-[11px] font-medium drop-shadow-md">{currentStory.timestamp}</p>
                </div>
            </div>
         </div>
         <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            className="text-white bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-colors"
         >
             <XIcon className="w-6 h-6" />
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
          {renderContent()}
      </div>

      {/* Footer Reply - Only for non-promo or if needed */}
      {currentStory.type !== 'promo' && (
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-[2rem] pl-5 pr-2 py-3 border border-white/10 focus-within:bg-white/20 focus-within:border-white/30 transition-all flex items-center shadow-lg">
                <input 
                    type="text" 
                    placeholder={`Reply to ${status.name}...`} 
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    className="bg-transparent border-none outline-none text-white placeholder-white/70 text-sm font-medium flex-1"
                    onKeyDown={(e) => e.stopPropagation()} 
                    onFocus={handleTouchStart}
                    onBlur={handleTouchEnd}
                />
            </div>
            <button className="p-3.5 bg-[#22C55E] rounded-full text-white shadow-lg shadow-green-900/20 hover:scale-105 active:scale-95 transition-all">
                <SendIcon className="w-5 h-5 ml-0.5" />
            </button>
        </div>
      )}

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
