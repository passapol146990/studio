"use client";

import React from 'react';
import { AppHeader } from './AppHeader';
import { UserList } from './UserList';
import { ChatView } from './ChatView';
import { useChat } from '@/contexts/ChatProvider';

export function ChatLayout() {
  const { friends, activeChatId, setActiveChatId } = useChat();

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 min-w-[280px] max-w-[360px] h-full border-r">
          <UserList
            friends={friends}
            activeChatId={activeChatId}
            onSelectUser={setActiveChatId}
          />
        </aside>
        <main className="flex-1 h-full">
          <ChatView />
        </main>
      </div>
    </div>
  );
}
