
import React, { useState } from 'react';
import { User } from '../types';
import { BlockIcon, ChevronLeftIcon, FlagIcon, ImageIcon, PhoneIcon, VideoIcon, ChevronRightIcon, BellIcon, SearchIcon, PaletteIcon } from './Icon';

interface ContactInfoPageProps {
  contact: User;
  onBack: () => void;
  onVoiceCall: () => void;
  onVideoCall: () => void;
  onMediaClick: () => void;
  onWallpaperChange: (url: string | null) => void;
  currentWallpaper: string | null;
}

const ContactInfoPage: React.FC<ContactInfoPageProps> = ({ 
  contact, 
  onBack, 
  onVoiceCall, 
  onVideoCall, 
  onMediaClick,
  onWallpaperChange,
  currentWallpaper
}) => {
  // Mock data for demonstration
  const phoneNumber = "+91 98765 43210";
  const [showWallpaperPicker, setShowWallpaperPicker] = useState(false);
  
  const mockMedia = [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593642632823-8f7853670c9a?q=80&w=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550029402-226113b0c090?q=80&w=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526779218898-0f2a31e95a0c?q=80&w=100&auto=format&fit=crop'
  ];

  const sampleWallpapers = [
    { id: 'default', url: null, label: 'Default' },
    { id: 'grad', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop', label: 'Gradient' },
    { id: 'dark', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop', label: 'Texture' },
    { id: 'abstract', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop', label: 'Abstract' }
  ];

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7] dark:bg-slate-950 relative z-30 animate-[slideIn_0.3s_ease-out] transition-colors duration-300">
      {/* Header */}
      <div className="pt-8 pb-4 px-4 flex items-center justify-between bg-[#F2F4F7] dark:bg-slate-950 transition-colors duration-300">
        <button onClick={onBack} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-all">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Contact Info</h1>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-10 no-scrollbar">
        {/* Hero Section */}
        <div className="flex flex-col items-center mt-4 mb-8">
          <div className="w-32 h-32 rounded-[2.5rem] p-1 bg-white dark:bg-slate-900 shadow-lg mb-5">
             <img 
                src={contact.avatar} 
                alt={contact.name} 
                className="w-full h-full rounded-[2.3rem] object-cover"
             />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white text-center mb-1">{contact.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">{phoneNumber}</p>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-6 mt-6">
             <button onClick={onVoiceCall} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm group-hover:scale-110 active:scale-95 transition-transform">
                    <PhoneIcon className="w-5 h-5 text-gray-700 dark:text-white" />
                </div>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Audio</span>
             </button>
             <button onClick={onVideoCall} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm group-hover:scale-110 active:scale-95 transition-transform">
                    <VideoIcon className="w-5 h-5 text-gray-700 dark:text-white" />
                </div>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Video</span>
             </button>
             <button className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm group-hover:scale-110 active:scale-95 transition-transform">
                    <SearchIcon className="w-5 h-5 text-gray-700 dark:text-white" />
                </div>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Search</span>
             </button>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">About</h3>
            <div className="bg-white dark:bg-slate-900 rounded-[20px] p-5 shadow-sm">
                <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                    {contact.tagline || "Hey there! I am using Convo."}
                </p>
            </div>
        </div>

        {/* Media Section */}
        <div className="mb-6">
            <div 
                className="flex items-center justify-between mb-3 px-2 cursor-pointer group"
                onClick={onMediaClick}
            >
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Media, Links & Docs</h3>
                <div className="flex items-center text-gray-400 gap-1 text-xs font-bold group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    <span>124</span>
                    <ChevronRightIcon className="w-3 h-3" />
                </div>
            </div>
            <div 
                className="bg-white dark:bg-slate-900 rounded-[20px] p-4 shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                onClick={onMediaClick}
            >
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pointer-events-none">
                    {mockMedia.map((src, i) => (
                        <img key={i} src={src} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" alt="media" />
                    ))}
                    <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-gray-400">
                        <ImageIcon className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
        
        {/* Wallpaper Section */}
        <div className="mb-6">
             <div 
                className="flex items-center justify-between mb-3 px-2 cursor-pointer group"
                onClick={() => setShowWallpaperPicker(!showWallpaperPicker)}
            >
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Chat Wallpaper</h3>
                <div className="flex items-center text-gray-400 gap-1 text-xs font-bold group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    <ChevronRightIcon className={`w-3 h-3 transition-transform ${showWallpaperPicker ? 'rotate-90' : ''}`} />
                </div>
            </div>
            
            {showWallpaperPicker && (
                <div className="bg-white dark:bg-slate-900 rounded-[20px] p-4 shadow-sm grid grid-cols-2 gap-3 animate-[fadeIn_0.3s_ease-out]">
                    {sampleWallpapers.map((wp) => (
                        <div 
                            key={wp.id}
                            onClick={() => onWallpaperChange(wp.url)}
                            className={`h-24 rounded-xl overflow-hidden cursor-pointer relative border-2 ${currentWallpaper === wp.url ? 'border-blue-500' : 'border-transparent'}`}
                        >
                            {wp.url ? (
                                <img src={wp.url} alt={wp.label} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-[#F2F4F7] dark:bg-slate-950 flex items-center justify-center">
                                    <span className="text-xs font-bold text-gray-400">Default</span>
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-1">
                                <p className="text-[10px] text-white text-center font-medium">{wp.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Settings/Actions */}
        <div className="space-y-3">
            <button className="w-full bg-white dark:bg-slate-900 p-4 rounded-[20px] flex items-center justify-between shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <BellIcon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-700 dark:text-gray-200">Notifications</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-300" />
            </button>
            
            <button className="w-full bg-white dark:bg-slate-900 p-4 rounded-[20px] flex items-center gap-4 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <PaletteIcon className="w-5 h-5" />
                </div>
                <span className="font-bold text-gray-700 dark:text-gray-200">Theme</span>
            </button>

            <button className="w-full bg-white dark:bg-slate-900 p-4 rounded-[20px] flex items-center gap-4 shadow-sm hover:bg-red-50 dark:hover:bg-slate-800 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500">
                    <BlockIcon className="w-5 h-5" />
                </div>
                <span className="font-bold text-red-500">Block {contact.name}</span>
            </button>

            <button className="w-full bg-white dark:bg-slate-900 p-4 rounded-[20px] flex items-center gap-4 shadow-sm hover:bg-red-50 dark:hover:bg-slate-800 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500">
                    <FlagIcon className="w-5 h-5" />
                </div>
                <span className="font-bold text-red-500">Report Contact</span>
            </button>
        </div>
        
      </div>
      
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ContactInfoPage;
