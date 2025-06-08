"use client";

import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { useChat } from '@/contexts/ChatProvider';
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from '@/components/shared/UserAvatar';
import { AlertCircle } from 'lucide-react';

export function ChatView() {
  const { messages, activeChatId, friends, currentUser } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeFriend = friends.find(f => f.id === activeChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentUser) {
     return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background p-6 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold text-foreground">Loading...</h2>
        <p className="text-muted-foreground">Please wait while we set things up.</p>
      </div>
    );
  }

  if (!activeChatId || !activeFriend) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background p-6 text-center">
        <MessageSquareTextIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold text-foreground">Select a chat</h2>
        <p className="text-muted-foreground">Choose a contact from the list to start messaging.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      <header className="p-4 border-b bg-card flex items-center gap-3 shadow-sm">
        <UserAvatar name={activeFriend.name} isOnline={activeFriend.isOnline} size="md" />
        <div>
          <h2 className="text-lg font-semibold text-foreground">{activeFriend.name}</h2>
          <p className="text-xs text-muted-foreground">{activeFriend.isOnline ? "Online" : "Offline"}</p>
        </div>
      </header>
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>
      
      <MessageInput />
    </div>
  );
}

// Placeholder for MessageSquareTextIcon if not available, using a simple SVG
function MessageSquareTextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M13 8H7" />
      <path d="M17 12H7" />
    </svg>
  );
}
