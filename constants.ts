
import { ChatSession, FilterTab, User } from './types';

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
    messages: [],
    category: FilterTab.OFFICE
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
    messages: [],
    category: FilterTab.OFFICE
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
    messages: [],
    category: FilterTab.OFFICE
  },
  {
    id: 'c4',
    participants: [
      {
        id: 'p4',
        name: 'Mom',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
        status: 'online',
        isStoryActive: false
      }
    ],
    lastMessage: 'Dinner is ready!',
    lastMessageTime: '12:30 PM',
    unreadCount: 1,
    messages: [],
    category: FilterTab.FAMILY
  },
  {
    id: 'c5',
    participants: [
      {
        id: 'p5',
        name: 'Dad',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        status: 'offline',
        isStoryActive: false
      }
    ],
    lastMessage: 'Call me when you are free.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [],
    category: FilterTab.FAMILY
  },
  {
    id: 'c6',
    participants: [
      {
        id: 'p6',
        name: 'Brother',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop',
        status: 'online',
        isStoryActive: true
      }
    ],
    lastMessage: 'Did you see the game?',
    lastMessageTime: 'Yesterday',
    unreadCount: 3,
    messages: [],
    category: FilterTab.FAMILY
  },
  {
    id: 'c7',
    participants: [
      {
        id: 'p7',
        name: 'Farhan',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop',
        status: 'busy',
        isStoryActive: false
      }
    ],
    lastMessage: 'Project files sent.',
    lastMessageTime: 'Mon',
    unreadCount: 0,
    messages: [],
    category: FilterTab.ARCHIVE
  }
];
