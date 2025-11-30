
export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  tagline?: string;
  isStoryActive?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  attachment?: {
    type: 'image' | 'video' | 'file';
    url: string;
    name?: string;
    size?: string;
  };
}

export enum NavTab {
  CHATS = 'Chats',
  GRID = 'Grid',
  CALLS = 'Calls',
  SETTINGS = 'Settings'
}

export enum FilterTab {
  ALL = 'ALL',
  UNREAD = 'UNREAD',
  GROUP = 'GROUP',
  NEW = 'NEW'
}

export interface AppChatSession {
  id: string;
  participants: User[];
  lastMessage: string;
  lastMessageTime: string; // Display string like "10:24 AM"
  unreadCount: number;
  messages: Message[];
  category?: FilterTab; // Optional, primarily for the 'New' tab or custom categorization
  isGroup?: boolean;
  groupName?: string;
  groupAvatar?: string;
}
