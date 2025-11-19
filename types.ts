
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
}

export enum NavTab {
  CHATS = 'Chats',
  GRID = 'Grid',
  CALLS = 'Calls',
  SETTINGS = 'Settings'
}

export enum FilterTab {
  ALL = 'ALL',
  OFFICE = 'OFFICE',
  FAMILY = 'FAMILY',
  ARCHIVE = 'ARCHIVE'
}

export interface ChatSession {
  id: string;
  participants: User[];
  lastMessage: string;
  lastMessageTime: string; // Display string like "10:24 AM"
  unreadCount: number;
  messages: Message[];
  category: FilterTab;
}
