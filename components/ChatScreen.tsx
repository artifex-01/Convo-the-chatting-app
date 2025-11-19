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
}

const ChatScreen: React.FC<ChatScreenProps> = ({ chatSession, onBack, onVoiceCall, onVideoCall }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const geminiChatRef = useRef<Chat | null>(null);
  const otherUser = chatSession.participants[0];

  // Initialize chat with existing messages or history (simulated)
  useEffect(() => {
    // Initialize Gemini Chat
    geminiChatRef.current = createChatSession(otherUser.name);
    
    // Set initial messages (simulated history + session messages if any)
    setMessages([
        { id: 'm0', text: chatSession.lastMessage, senderId: otherUser.id, timestamp: new Date(), isOwn: false },
        ...chatSession.messages
    ]);
  }, [chatSession, otherUser]);

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
        
        const newAiMessage: Message = {
            id: (Date.now() + 1).toString(),
            senderId: otherUser.id,
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
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Chat Header */}
      <div className="bg-white pt-8 pb-4 px-4 shadow-sm z-10 rounded-b-[2rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
            </button>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img src={otherUser.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                    {otherUser.status === 'online' && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">{otherUser.name}</h3>
                    <p className="text-xs text-gray-500 font-medium">{otherUser.status === 'online' ? 'Online' : 'Last seen recently'}</p>
                </div>
            </div>
          </div>
          <div className="flex gap-1 text-gray-600">
            <button onClick={onVoiceCall} className="p-2 hover:bg-gray-100 rounded-full"><PhoneIcon className="w-5 h-5" /></button>
            <button onClick={onVideoCall} className="p-2 hover:bg-gray-100 rounded-full"><VideoIcon className="w-5 h-5" /></button>
            <button className="p-2 hover:bg-gray-100 rounded-full"><MoreVerticalIcon className="w-5 h-5" /></button>
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
                <img src={otherUser.avatar} className="w-8 h-8 rounded-full mr-2 self-end mb-1" />
            )}
            <div
              className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.isOwn
                  ? 'bg-black text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <img src={otherUser.avatar} className="w-8 h-8 rounded-full mr-2 self-end mb-1" />
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
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
      <div className="p-4 pb-6 bg-[#F2F4F7]">
        <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-sm border border-gray-100">
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-transparent px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none text-sm"
            />
            <button 
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className={`p-3 rounded-full transition-all duration-200 ${
                    inputText.trim() 
                    ? 'bg-black text-white shadow-md transform hover:scale-105' 
                    : 'bg-gray-100 text-gray-400'
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