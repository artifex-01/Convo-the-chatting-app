
import React, { useState } from 'react';
import { ChevronLeftIcon, FileTextIcon, ImageIcon, LinkIcon } from './Icon';

interface MediaGalleryPageProps {
  onBack: () => void;
}

const MediaGalleryPage: React.FC<MediaGalleryPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'media' | 'docs' | 'links'>('media');

  const mediaItems = [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593642632823-8f7853670c9a?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550029402-226113b0c090?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526779218898-0f2a31e95a0c?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
  ];

  const docItems = [
    { name: 'Project_Proposal.pdf', size: '2.4 MB', date: 'Yesterday', type: 'PDF' },
    { name: 'Q3_Financials.xlsx', size: '1.1 MB', date: 'Last week', type: 'XLSX' },
    { name: 'Design_Guidelines.docx', size: '8.5 MB', date: '2 weeks ago', type: 'DOCX' },
    { name: 'Invoice_INV-2024-001.pdf', size: '450 KB', date: '3 weeks ago', type: 'PDF' },
  ];

  const linkItems = [
    { title: 'Design Resources', url: 'https://dribbble.com', date: 'Yesterday' },
    { title: 'Reference Article', url: 'https://medium.com', date: '2 days ago' },
    { title: 'React Documentation', url: 'https://react.dev', date: '1 week ago' },
    { title: 'Tailwind CSS', url: 'https://tailwindcss.com', date: '2 weeks ago' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7] dark:bg-slate-950 relative z-40 animate-[slideIn_0.3s_ease-out] transition-colors duration-300">
      {/* Header */}
      <div className="pt-8 pb-2 px-4 flex items-center gap-3 bg-[#F2F4F7] dark:bg-slate-950 transition-colors duration-300">
        <button onClick={onBack} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-all">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Sent Items</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-around px-4 mt-2 border-b border-gray-200 dark:border-slate-800">
        {['media', 'docs', 'links'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-3 px-4 text-sm font-bold capitalize transition-all relative ${
              activeTab === tab 
                ? 'text-black dark:text-white' 
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white rounded-t-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {activeTab === 'media' && (
          <div className="grid grid-cols-3 gap-2">
            {mediaItems.map((src, i) => (
              <div key={i} className="aspect-square bg-gray-200 dark:bg-slate-800 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                <img src={src} alt="media" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="space-y-3">
            {docItems.map((doc, i) => (
              <div key={i} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-[20px] shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 flex-shrink-0">
                  <FileTextIcon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 dark:text-white truncate">{doc.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'links' && (
          <div className="space-y-3">
            {linkItems.map((link, i) => (
              <div key={i} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-[20px] shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 flex-shrink-0">
                  <LinkIcon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 dark:text-white truncate">{link.title}</h3>
                  <p className="text-xs text-blue-500 truncate underline">{link.url}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-1">{link.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default MediaGalleryPage;
