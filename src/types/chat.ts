export interface User {
  id: string;
  name: string;
}

export interface Friend extends User {
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
  isSender: boolean; // Helper to determine bubble alignment and styling
}

export type ChatContextType = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  friends: Friend[];
  addFriend: (friendId: string, friendName: string) => Promise<boolean>; // Returns true on success, false on failure
  activeChatId: string | null;
  setActiveChatId: (userId: string | null) => void;
  messages: Message[];
  sendMessage: (text: string) => void;
  isLoading: boolean;
};
