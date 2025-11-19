
import React, { useState, useEffect, useRef } from 'react';
import { ChatSession, Message } from '../types';
import { ChevronLeftIcon, MoreVerticalIcon, PhoneIcon, SendIcon, VideoIcon, PaletteIcon, XIcon, PlusIcon, ImageIcon, FileTextIcon, PaperclipIcon } from './Icon';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';
import { Chat } from "@google/genai";

interface ChatScreenProps {
  chatSession: ChatSession;
  onBack: () => void;
  onVoiceCall: () => void;
  onVideoCall: () => void;
  onHeaderClick: () => void;
  backgroundImage: string | null;
  onWallpaperChange: (url: string | null) => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ 
  chatSession, 
  onBack, 
  onVoiceCall, 
  onVideoCall, 
  onHeaderClick,
  backgroundImage,
  onWallpaperChange
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showWallpaperPicker, setShowWallpaperPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const geminiChatRef = useRef<Chat | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Determine display details
  const isGroup = chatSession.isGroup;
  const displayAvatar = isGroup && chatSession.groupAvatar ? chatSession.groupAvatar : chatSession.participants[0].avatar;
  const displayName = isGroup && chatSession.groupName ? chatSession.groupName : chatSession.participants[0].name;
  const statusText = isGroup 
    ? `${chatSession.participants.length} participants`
    : (chatSession.participants[0].status === 'online' ? 'Online' : 'Last seen recently');
  const isOnline = !isGroup && chatSession.participants[0].status === 'online';

  const sampleWallpapers = [
    { id: 'default', url: null, label: 'Default' },
    { id: 'grad', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop', label: 'Gradient' },
    { id: 'dark', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop', label: 'Texture' },
    { id: 'abstract', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop', label: 'Abstract' }
  ];

  // Initialize chat with existing messages or history (simulated)
  useEffect(() => {
    // Initialize Gemini Chat
    geminiChatRef.current = createChatSession(displayName);
    
    // Set initial messages
    let initialMessages = chatSession.messages;
    if (initialMessages.length === 0 && chatSession.lastMessage) {
        const senderId = isGroup ? chatSession.participants[0].id : chatSession.participants[0].id;
        initialMessages = [{ 
            id: 'm0', 
            text: chatSession.lastMessage, 
            senderId: senderId, 
            timestamp: new Date(), 
            isOwn: false 
        }];
    }
    setMessages(initialMessages);
  }, [chatSession, displayName, isGroup]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);

    // Call Gemini
    if (geminiChatRef.current) {
        const responseText = await sendMessageToGemini(geminiChatRef.current, newUserMessage.text);
        
        const responderId = isGroup ? chatSession.participants[0].id : chatSession.participants[0].id;
        
        const newAiMessage: Message = {
            id: (Date.now() + 1).toString(),
            senderId: responderId,
            text: responseText,
            timestamp: new Date(),
            isOwn: false,
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, newAiMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const handleFileSelect = (type: 'media' | 'doc') => {
    if (fileInputRef.current) {
        fileInputRef.current.accept = type === 'media' ? "image/*,video/*" : ".pdf,.doc,.docx,.xls,.xlsx,.txt";
        fileInputRef.current.click();
    }
    setShowAttachMenu(false);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'file';
      const fileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

      const newMessage: Message = {
          id: Date.now().toString(),
          senderId: 'me',
          text: '', 
          timestamp: new Date(),
          isOwn: true,
          attachment: {
              type: type as any,
              url,
              name: file.name,
              size: fileSize
          }
      };
      setMessages(prev => [...prev, newMessage]);
      
      // Clear input
      e.target.value = '';
  };

  return (
    <div 
      className="flex flex-col h-full bg-[#F2F4F7] dark:bg-slate-950 transition-colors duration-300 relative z-0"
      style={backgroundImage ? { 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      } : {}}
    >
      {/* Overlay for readability if image is set */}
      {backgroundImage && <div className="absolute inset-0 bg-white/30 dark:bg-black/40 pointer-events-none z-0" />}

      {/* Chat Header */}
      <div className="bg-white dark:bg-slate-900 pt-8 pb-4 px-4 shadow-sm dark:shadow-none z-10 rounded-b-[2rem] transition-colors duration-300 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <ChevronLeftIcon className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={onHeaderClick}>
                <div className="relative">
                    <img src={displayAvatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                    {isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                    )}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{displayName}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{statusText}</p>
                </div>
            </div>
          </div>
          <div className="flex gap-1 text-gray-600 dark:text-gray-400 relative">
            <button onClick={onVoiceCall} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"><PhoneIcon className="w-5 h-5" /></button>
            <button onClick={onVideoCall} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"><VideoIcon className="w-5 h-5" /></button>
            <button 
                onClick={() => setShowMenu(!showMenu)} 
                className={`p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors ${showMenu ? 'bg-gray-100 dark:bg-slate-800' : ''}`}
            >
                <MoreVerticalIcon className="w-5 h-5" />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-50 animate-[scaleIn_0.2s_ease-out] origin-top-right">
                    <button 
                        onClick={() => {
                            setShowMenu(false);
                            setShowWallpaperPicker(true);
                        }}
                        className="w-full px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-3"
                    >
                        <PaletteIcon className="w-4 h-4" />
                        Change Wallpaper
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Wallpaper Picker Overlay */}
      {showWallpaperPicker && (
          <div className="absolute top-24 right-4 left-4 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 p-4 z-50 animate-[slideDownFade_0.3s_ease-out]">
              <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="font-bold text-gray-800 dark:text-white">Select Wallpaper</h3>
                  <button onClick={() => setShowWallpaperPicker(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full">
                      <XIcon className="w-5 h-5 text-gray-500" />
                  </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                    {sampleWallpapers.map((wp) => (
                        <div 
                            key={wp.id}
                            onClick={() => {
                                onWallpaperChange(wp.url);
                                setShowWallpaperPicker(false);
                            }}
                            className={`h-24 rounded-xl overflow-hidden cursor-pointer relative border-2 hover:scale-105 transition-transform ${backgroundImage === wp.url ? 'border-blue-500' : 'border-transparent'}`}
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
          </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar z-10">
        <div className="text-center text-xs text-gray-400 dark:text-gray-300 font-medium my-4 bg-gray-100/50 dark:bg-slate-900/50 rounded-full py-1 px-3 inline-block mx-auto self-center">Today</div>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            {!msg.isOwn && (
                <img src={displayAvatar} className="w-8 h-8 rounded-full mr-2 self-end mb-1" />
            )}
            <div
              className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.isOwn
                  ? 'bg-black dark:bg-white text-white dark:text-black rounded-br-none'
                  : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
              }`}
            >
              {msg.attachment ? (
                  <div className="mb-1">
                      {msg.attachment.type === 'image' && (
                          <img src={msg.attachment.url} alt="attachment" className="rounded-lg mb-1 max-w-full max-h-60 object-cover" />
                      )}
                      {msg.attachment.type === 'video' && (
                          <video src={msg.attachment.url} controls className="rounded-lg mb-1 max-w-full max-h-60" />
                      )}
                      {msg.attachment.type === 'file' && (
                          <div className="flex items-center gap-3 bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
                               <div className="bg-white dark:bg-slate-600 p-2 rounded-lg text-gray-500 dark:text-white">
                                   <FileTextIcon className="w-6 h-6" />
                               </div>
                               <div className="min-w-0">
                                   <p className="font-bold text-sm truncate max-w-[150px] text-gray-800 dark:text-white">{msg.attachment.name}</p>
                                   <p className="text-xs text-gray-500 dark:text-gray-400">{msg.attachment.size}</p>
                               </div>
                          </div>
                      )}
                  </div>
              ) : null}
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <img src={displayAvatar} className="w-8 h-8 rounded-full mr-2 self-end mb-1" />
            <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 pb-6 transition-colors duration-300 z-10 relative">
         {/* Attachment Menu */}
         {showAttachMenu && (
             <div className="absolute bottom-20 left-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-2 flex flex-col gap-1 animate-[scaleIn_0.2s_ease-out] origin-bottom-left z-50">
                 <button 
                    onClick={() => handleFileSelect('media')}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-gray-700 dark:text-white font-bold text-sm"
                 >
                     <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-lg text-purple-600 dark:text-purple-400">
                        <ImageIcon className="w-5 h-5" />
                     </div>
                     Photo & Video
                 </button>
                 <button 
                    onClick={() => handleFileSelect('doc')}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-gray-700 dark:text-white font-bold text-sm"
                 >
                     <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-lg text-blue-600 dark:text-blue-400">
                        <FileTextIcon className="w-5 h-5" />
                     </div>
                     Document
                 </button>
             </div>
         )}

        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm border border-gray-100 dark:border-slate-800">
            <button 
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className={`p-2 rounded-full transition-all duration-200 ${showAttachMenu ? 'bg-gray-100 dark:bg-slate-800 rotate-45 text-black dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500'}`}
            >
                <PlusIcon className="w-6 h-6" />
            </button>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-transparent px-2 py-2 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none text-sm"
            />
            <button 
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className={`p-3 rounded-full transition-all duration-200 ${
                    inputText.trim() 
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-md transform hover:scale-105' 
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600'
                }`}
            >
                <SendIcon className="w-5 h-5" />
            </button>
        </div>
        <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={onFileChange} 
        />
      </div>
      
      <style>{`
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideDownFade {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ChatScreen;
