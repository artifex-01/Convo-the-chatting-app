
import React, { useState, useEffect, useRef } from 'react';
import { ChatSession, Message } from '../types';
import { ChevronLeftIcon, MoreVerticalIcon, PhoneIcon, SendIcon, VideoIcon } from './Icon';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';
import { Chat } from "@google/genai";

interface ChatScreenProps {
  chatSession: ChatSession;
  onBack: () => void;
  onVoiceCall: () => void;
  onVideoCall: () => void;
  onHeaderClick: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ chatSession, onBack, onVoiceCall, onVideoCall, onHeaderClick }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const geminiChatRef = useRef<Chat | null>(null);
  
  // Determine display details
  const isGroup = chatSession.isGroup;
  const displayAvatar = isGroup && chatSession.groupAvatar ? chatSession.groupAvatar : chatSession.participants[0].avatar;
  const displayName = isGroup && chatSession.groupName ? chatSession.groupName : chatSession.participants[0].name;
  const statusText = isGroup 
    ? `${chatSession.participants.length} participants`
    : (chatSession.participants[0].status === 'online' ? 'Online' : 'Last seen recently');
  const isOnline = !isGroup && chatSession.participants[0].status === 'online';

  // Initialize chat with existing messages or history (simulated)
  useEffect(() => {
    // Initialize Gemini Chat
    // For groups, we'll just use the group name as context or generic
    geminiChatRef.current = createChatSession(displayName);
    
    // Set initial messages
    // Include the last message as history if the messages array is empty
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
        
        // Simulate response from "someone" in the chat
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

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7] dark:bg-slate-950 transition-colors duration-300">
      {/* Chat Header */}
      <div className="bg-white dark:bg-slate-900 pt-8 pb-4 px-4 shadow-sm dark:shadow-none z-10 rounded-b-[2rem] transition-colors duration-300">
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
          <div className="flex gap-1 text-gray-600 dark:text-gray-400">
            <button onClick={onVoiceCall} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"><PhoneIcon className="w-5 h-5" /></button>
            <button onClick={onVideoCall} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"><VideoIcon className="w-5 h-5" /></button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"><MoreVerticalIcon className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <div className="text-center text-xs text-gray-400 font-medium my-4">Today</div>
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
      <div className="p-4 pb-6 bg-[#F2F4F7] dark:bg-slate-950 transition-colors duration-300">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm border border-gray-100 dark:border-slate-800">
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-transparent px-4 py-2 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none text-sm"
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
      </div>
    </div>
  );
};

export default ChatScreen;
