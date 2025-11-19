import React, { useState } from 'react';
import ChatList from './components/ChatList';
import ChatScreen from './components/ChatScreen';
import BottomNav from './components/BottomNav';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import CallHistoryPage from './components/CallHistoryPage';
import { CURRENT_USER, MOCK_CHATS } from './constants';
import { ChatSession, NavTab } from './types';
import { VoiceCallPage, VideoCallPage } from './components/CallPages';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.CHATS);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [activeCall, setActiveCall] = useState<{ type: 'voice' | 'video', chat: ChatSession } | null>(null);

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleBackToHome = () => {
    setSelectedChatId(null);
  };

  // If user is not logged in, show Login Page
  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const activeChatSession = MOCK_CHATS.find(c => c.id === selectedChatId);

  // Render Call Screens Overlay
  if (activeCall) {
      if (activeCall.type === 'voice') {
          return <VoiceCallPage chat={activeCall.chat} onEnd={() => setActiveCall(null)} />;
      } else {
          return <VideoCallPage chat={activeCall.chat} onEnd={() => setActiveCall(null)} />;
      }
  }

  return (
    <div className="w-full h-full relative bg-[#F2F4F7] flex flex-col overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {selectedChatId && activeChatSession ? (
          // Chat Detail View
          <div className="absolute inset-0 z-20 bg-[#F2F4F7] animate-[slideIn_0.3s_ease-out]">
            <ChatScreen 
                chatSession={activeChatSession} 
                onBack={handleBackToHome}
                onVoiceCall={() => setActiveCall({ type: 'voice', chat: activeChatSession })}
                onVideoCall={() => setActiveCall({ type: 'video', chat: activeChatSession })}
            />
          </div>
        ) : (
          // Tab Views
          <>
            {activeTab === NavTab.CHATS && (
              <ChatList 
                currentUser={CURRENT_USER} 
                chats={MOCK_CHATS} 
                onChatSelect={handleChatSelect} 
              />
            )}

            {activeTab === NavTab.CALLS && (
              <CallHistoryPage />
            )}
            
            {activeTab === NavTab.SETTINGS && (
              <ProfilePage user={CURRENT_USER} onLogout={() => setIsAuthenticated(false)} />
            )}
            
            {/* Placeholder for Grid tab */}
            {activeTab === NavTab.GRID && (
               <div className="flex flex-col items-center justify-center h-full text-gray-400 font-medium p-8 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">🚧</span>
                  </div>
                  <p>This section is under construction.</p>
               </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Navigation - Only show on home screen */}
      {!selectedChatId && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
      
      {/* Add some custom animation styles via style tag within component for slide effect */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default App;