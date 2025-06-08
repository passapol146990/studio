"use client";

import React from 'react';
import { AddFriendDialog } from '@/components/friends/AddFriendDialog';
import { Button } from '@/components/ui/button';
import { MessageSquareText, Copy } from 'lucide-react';
import { useChat } from '@/contexts/ChatProvider';
import { useToast } from '@/hooks/use-toast';

export function AppHeader() {
  const { currentUser } = useChat();
  const { toast } = useToast();

  const copyUserId = () => {
    if (currentUser?.id) {
      navigator.clipboard.writeText(currentUser.id)
        .then(() => {
          toast({ title: "ID Copied!", description: "Your unique ID has been copied to the clipboard." });
        })
        .catch(err => {
          toast({ title: "Error", description: "Failed to copy ID.", variant: "destructive" });
        });
    }
  };

  return (
    <header className="flex items-center justify-between p-4 border-b bg-card shadow-sm">
      <div className="flex items-center gap-2">
        <MessageSquareText className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-headline font-semibold text-primary">WhisperLink</h1>
      </div>
      <div className="flex items-center gap-2">
        {currentUser && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Your ID: {currentUser.id.substring(0, 8)}...</span>
            <Button variant="ghost" size="icon" onClick={copyUserId} title="Copy your ID">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
        <AddFriendDialog />
      </div>
    </header>
  );
}
