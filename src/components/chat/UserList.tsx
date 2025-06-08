"use client";

import React from 'react';
import type { Friend } from '@/types/chat';
import { UserListItem } from './UserListItem';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from '@/components/ui/separator';

interface UserListProps {
  friends: Friend[];
  activeChatId: string | null;
  onSelectUser: (userId: string) => void;
}

export function UserList({ friends, activeChatId, onSelectUser }: UserListProps) {
  return (
    <div className="h-full w-full bg-sidebar border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Contacts</h2>
      </div>
      <ScrollArea className="flex-1 custom-scrollbar">
        {friends.length === 0 ? (
          <p className="p-4 text-sm text-sidebar-foreground/70">No contacts yet. Add some friends to start chatting!</p>
        ) : (
          <div className="p-2 space-y-1">
            {friends.map((friend, index) => (
              <React.Fragment key={friend.id}>
                <UserListItem
                  friend={friend}
                  isSelected={activeChatId === friend.id}
                  onSelect={onSelectUser}
                />
                {index < friends.length - 1 && <Separator className="my-1 bg-sidebar-border/50" />}
              </React.Fragment>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
