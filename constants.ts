import { ChatSession, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
  status: 'online',
  tagline: 'At work'
};

export const MOCK_CHATS: ChatSession[] = [
  {
    id: 'c1',
    participants: [
      {
        id: 'p1',
        name: 'Arshad Khan',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
        status: 'online',
        isStoryActive: true // Red ring in UI
      }
    ],
    lastMessage: 'How are you?',
    lastMessageTime: '10:24 AM',
    unreadCount: 5,
    messages: []
  },
  {
    id: 'c2',
    participants: [
      {
        id: 'p2',
        name: 'Rehan Khan',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
        status: 'offline',
        isStoryActive: false
      }
    ],
    lastMessage: 'Can we meet tomorrow?',
    lastMessageTime: '09:15 AM',
    unreadCount: 0,
    messages: []
  },
  {
    id: 'c3',
    participants: [
      {
        id: 'p3',
        name: 'Gulam Sarwar',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
        status: 'busy',
        isStoryActive: true
      }
    ],
    lastMessage: 'Are the updates ready?',
    lastMessageTime: 'Yesterday',
    unreadCount: 2,
    messages: []
  }
];