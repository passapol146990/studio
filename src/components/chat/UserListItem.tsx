"use client";

import React from 'react';
import type { Friend } from '@/types/chat';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { cn } from '@/lib/utils';

interface UserListItemProps {
  friend: Friend;
  isSelected: boolean;
  onSelect: (userId: string) => void;
}

export function UserListItem({ friend, isSelected, onSelect }: UserListItemProps) {
  return (
    <button
      onClick={() => onSelect(friend.id)}
      className={cn(
        "flex items-center w-full p-3 gap-3 rounded-lg hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
        isSelected ? "bg-accent text-accent-foreground" : "text-foreground"
      )}
      aria-current={isSelected ? "page" : undefined}
    >
      <UserAvatar name={friend.name} isOnline={friend.isOnline} size="md" />
      <div className="flex-1 text-left">
        <p className="font-medium truncate">{friend.name}</p>
        <p className={cn("text-xs truncate", isSelected ? "text-accent-foreground/80" : "text-muted-foreground")}>
          {friend.isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </button>
  );
}
