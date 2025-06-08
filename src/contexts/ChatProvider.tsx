"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { User, Friend, Message, ChatContextType } from '@/types/chat';
import { useToast } from "@/hooks/use-toast";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Helper function to create a consistent chat ID
const getChatId = (userId1: string, userId2: string): string => {
  return [userId1, userId2].sort().join('_');
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('whisperlink_user', null);
  const [friends, setFriends] = useLocalStorage<Friend[]>('whisperlink_friends', []);
  const [allMessages, setAllMessages] = useLocalStorage<Record<string, Message[]>>('whisperlink_messages', {});
  const [activeChatId, setActiveChatIdState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(false); 
  }, []);

  const setActiveChatId = (userId: string | null) => {
    if (userId && currentUser) {
      setActiveChatIdState(getChatId(currentUser.id, userId));
    } else {
      setActiveChatIdState(null);
    }
  };
  
  const addFriend = async (friendId: string, friendName: string): Promise<boolean> => {
    if (!currentUser) {
      toast({ title: "Error", description: "You must be logged in to add friends.", variant: "destructive" });
      return false;
    }
    if (friendId === currentUser.id) {
      toast({ title: "Error", description: "You cannot add yourself as a friend.", variant: "destructive" });
      return false;
    }
    if (friends.find(f => f.id === friendId)) {
      toast({ title: "Info", description: "This user is already your friend." });
      return false;
    }

    // In a real app, you'd verify the friendId and fetch their actual name.
    // Here, we're taking the name as provided, assuming the ID is valid.
    const newFriend: Friend = { id: friendId, name: friendName || `User ${friendId.substring(0,4)}`, isOnline: false }; // Simulate offline status
    setFriends(prevFriends => [...prevFriends, newFriend]);
    toast({ title: "Friend Added!", description: `${newFriend.name} has been added to your contacts.` });
    return true;
  };

  const sendMessage = (text: string) => {
    if (!currentUser || !activeChatId) return;

    const friendId = activeChatId.replace(currentUser.id, '').replace('_', '');
    if (!friendId) return;


    const newMessage: Message = {
      id: crypto.randomUUID(),
      senderId: currentUser.id,
      receiverId: friendId,
      text,
      timestamp: Date.now(),
      isSender: true, 
    };
    
    setAllMessages(prev => {
      const updatedMessages = { ...prev };
      if (!updatedMessages[activeChatId]) {
        updatedMessages[activeChatId] = [];
      }
      updatedMessages[activeChatId] = [...updatedMessages[activeChatId], newMessage];
      return updatedMessages;
    });
  };

  const messages = activeChatId ? (allMessages[activeChatId] || []).map(msg => ({
    ...msg,
    isSender: msg.senderId === currentUser?.id
  })) : [];


  const contextValue: ChatContextType = {
    currentUser,
    setCurrentUser,
    friends,
    addFriend,
    activeChatId: activeChatId ? activeChatId.split('_').find(id => id !== currentUser?.id) || null : null, // Return the friend's ID part of the chat ID
    setActiveChatId,
    messages,
    sendMessage,
    isLoading,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
