
import React, { useState } from 'react';
import ChatList from './components/ChatList';
import ChatScreen from './components/ChatScreen';
import BottomNav from './components/BottomNav';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import CallHistoryPage from './components/CallHistoryPage';
import StatusPage from './components/StatusPage';
import EditProfilePage from './components/EditProfilePage';
import CreateGroupPage from './components/CreateGroupPage';
import ContactInfoPage from './components/ContactInfoPage';
import { CURRENT_USER, MOCK_CHATS } from './constants';
import { ChatSession, NavTab, User } from './types';
import { VoiceCallPage, VideoCallPage } from './components/CallPages';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.CHATS);
  const [chats, setChats] = useState<ChatSession[]>(MOCK_CHATS);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [activeCall, setActiveCall] = useState<{ type: 'voice' | 'video', chat: ChatSession } | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [viewingContactInfo, setViewingContactInfo] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    setViewingContactInfo(false); // Reset contact info view when selecting new chat
  };

  const handleBackToHome = () => {
    setSelectedChatId(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCreateGroup = (newGroup: ChatSession) => {
      setChats([newGroup, ...chats]);
      setIsCreatingGroup(false);
      setSelectedChatId(newGroup.id); // Optionally open the new chat immediately
  };

  const handleSaveProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setIsEditingProfile(false);
  };

  // If user is not logged in, show Login Page
  if (!isAuthenticated) {
    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <LoginPage onLogin={() => setIsAuthenticated(true)} />
        </div>
    );
  }

  const activeChatSession = chats.find(c => c.id === selectedChatId);

  // Render Call Screens Overlay
  if (activeCall) {
      if (activeCall.type === 'voice') {
          return <VoiceCallPage chat={activeCall.chat} onEnd={() => setActiveCall(null)} />;
      } else {
          return <VideoCallPage chat={activeCall.chat} onEnd={() => setActiveCall(null)} />;
      }
  }

  return (
    <div className={`${isDarkMode ? 'dark' : ''} w-full h-full`}>
        <div className="w-full h-full relative bg-[#F2F4F7] dark:bg-slate-950 flex flex-col overflow-hidden transition-colors duration-300">
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative">
            {/* Active Chat Screen */}
            {selectedChatId && activeChatSession ? (
            <div className="absolute inset-0 z-20 bg-[#F2F4F7] dark:bg-slate-950 animate-[slideIn_0.3s_ease-out]">
                <ChatScreen 
                    chatSession={activeChatSession} 
                    onBack={handleBackToHome}
                    onVoiceCall={() => setActiveCall({ type: 'voice', chat: activeChatSession })}
                    onVideoCall={() => setActiveCall({ type: 'video', chat: activeChatSession })}
                    onHeaderClick={() => setViewingContactInfo(true)}
                />
                
                {/* Contact Info Page Overlay */}
                {viewingContactInfo && (
                  <div className="absolute inset-0 z-30 bg-[#F2F4F7] dark:bg-slate-950">
                    <ContactInfoPage 
                      contact={activeChatSession.participants[0]}
                      onBack={() => setViewingContactInfo(false)}
                    />
                  </div>
                )}
            </div>
            ) : isEditingProfile ? (
            // Edit Profile Screen
            <div className="absolute inset-0 z-30 bg-[#F2F4F7] dark:bg-slate-950">
                <EditProfilePage 
                    user={currentUser} 
                    onBack={() => setIsEditingProfile(false)} 
                    onSave={handleSaveProfile} 
                />
            </div>
            ) : isCreatingGroup ? (
            // Create Group Screen
            <div className="absolute inset-0 z-30 bg-[#F2F4F7] dark:bg-slate-950">
                <CreateGroupPage 
                    onBack={() => setIsCreatingGroup(false)}
                    onCreate={handleCreateGroup}
                />
            </div>
            ) : (
            // Tab Views
            <>
                {activeTab === NavTab.CHATS && (
                <ChatList 
                    currentUser={currentUser} 
                    chats={chats} 
                    onChatSelect={handleChatSelect} 
                    onProfileClick={() => setIsEditingProfile(true)}
                    onCreateGroupClick={() => setIsCreatingGroup(true)}
                />
                )}

                {activeTab === NavTab.CALLS && (
                <CallHistoryPage />
                )}
                
                {activeTab === NavTab.SETTINGS && (
                <ProfilePage 
                    user={currentUser} 
                    onLogout={() => setIsAuthenticated(false)} 
                    onEditProfile={() => setIsEditingProfile(true)}
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={toggleDarkMode}
                />
                )}
                
                {/* Status/Updates Grid Tab */}
                {activeTab === NavTab.GRID && (
                <StatusPage currentUser={currentUser} />
                )}
            </>
            )}
        </div>

        {/* Bottom Navigation - Only show on home screen */}
        {!selectedChatId && !isEditingProfile && !isCreatingGroup && (
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
    </div>
  );
};

export default App;
