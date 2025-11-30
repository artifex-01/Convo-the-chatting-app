import { getDatabase } from 'firebase/database';
import { app } from "./firebase";
import React, { useState, useEffect } from 'react';
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
import MediaGalleryPage from './components/MediaGalleryPage';

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
  const [viewingMedia, setViewingMedia] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chatBackground, setChatBackground] = useState<string | null>(null);

  /* --------------------------------------
     PERSIST LOGIN CHECK ON APP LOAD
  -------------------------------------- */
  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn");
    if (logged === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    setViewingContactInfo(false);
    setViewingMedia(false);
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
    setSelectedChatId(newGroup.id);
  };

  const handleSaveProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setIsEditingProfile(false);
  };

  const handleCallFromHistory = (name: string, avatar: string, type: 'voice' | 'video') => {
    let chatToUse = chats.find(c => !c.isGroup && c.participants[0].name === name);

    if (!chatToUse) {
      chatToUse = {
        id: `temp_${Date.now()}`,
        participants: [{
          id: `temp_u_${Date.now()}`,
          name: name,
          avatar: avatar,
          status: 'online'
        }],
        lastMessage: '',
        lastMessageTime: '',
        unreadCount: 0,
        messages: []
      };
    }

    setActiveCall({ type, chat: chatToUse });
  };

  /* --------------------------------------
      SHOW LOGIN PAGE UNTIL AUTHENTICATED
  -------------------------------------- */
  if (!isAuthenticated) {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <LoginPage
          onLogin={() => {
            localStorage.setItem("isLoggedIn", "true");   // store login session
            setIsAuthenticated(true);
          }}
        />
      </div>
    );
  }

  const activeChatSession = chats.find(c => c.id === selectedChatId);

  /* --------------------------------------
      ACTIVE CALL RENDER
  -------------------------------------- */
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

        <div className="flex-1 overflow-hidden relative">

          {/* Chat Screen */}
          {selectedChatId && activeChatSession ? (
            <div className="absolute inset-0 z-20 bg-[#F2F4F7] dark:bg-slate-950 animate-[slideIn_0.3s_ease-out]">
              <ChatScreen
                chatSession={activeChatSession}
                onBack={handleBackToHome}
                onVoiceCall={() => setActiveCall({ type: 'voice', chat: activeChatSession })}
                onVideoCall={() => setActiveCall({ type: 'video', chat: activeChatSession })}
                onHeaderClick={() => setViewingContactInfo(true)}
                backgroundImage={chatBackground}
                onWallpaperChange={setChatBackground}
              />

              {/* Contact Info Overlay */}
              {viewingContactInfo && (
                <div className="absolute inset-0 z-30 bg-[#F2F4F7] dark:bg-slate-950">
                  <ContactInfoPage
                    contact={activeChatSession.participants[0]}
                    onBack={() => setViewingContactInfo(false)}
                    onVoiceCall={() => setActiveCall({ type: 'voice', chat: activeChatSession })}
                    onVideoCall={() => setActiveCall({ type: 'video', chat: activeChatSession })}
                    onMediaClick={() => setViewingMedia(true)}
                    onWallpaperChange={setChatBackground}
                    currentWallpaper={chatBackground}
                  />

                  {viewingMedia && (
                    <div className="absolute inset-0 z-40 bg-[#F2F4F7] dark:bg-slate-950">
                      <MediaGalleryPage onBack={() => setViewingMedia(false)} />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : isEditingProfile ? (

            // Edit Profile
            <div className="absolute inset-0 z-30 bg-[#F2F4F7] dark:bg-slate-950">
              <EditProfilePage
                user={currentUser}
                onBack={() => setIsEditingProfile(false)}
                onSave={handleSaveProfile}
              />
            </div>

          ) : isCreatingGroup ? (

            // Create Group
            <div className="absolute inset-0 z-30 bg-[#F2F4F7] dark:bg-slate-950">
              <CreateGroupPage
                onBack={() => setIsCreatingGroup(false)}
                onCreate={handleCreateGroup}
              />
            </div>

          ) : (
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
                <CallHistoryPage onCallClick={handleCallFromHistory} />
              )}

              {activeTab === NavTab.SETTINGS && (
                <ProfilePage
                  user={currentUser}
                  onLogout={() => {
                    localStorage.removeItem("isLoggedIn");
                    setIsAuthenticated(false);
                  }}
                  onEditProfile={() => setIsEditingProfile(true)}
                  isDarkMode={isDarkMode}
                  onToggleDarkMode={toggleDarkMode}
                />
              )}

              {activeTab === NavTab.GRID && (
                <StatusPage currentUser={currentUser} />
              )}
            </>
          )}
        </div>

        {!selectedChatId && !isEditingProfile && !isCreatingGroup && (
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        )}

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

const db = getDatabase(app);
