"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizonal } from 'lucide-react';
import { useChat } from '@/contexts/ChatProvider';

export function MessageInput() {
  const [messageText, setMessageText] = useState('');
  const { sendMessage } = useChat();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() === '') return;
    sendMessage(messageText.trim());
    setMessageText('');
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="p-4 border-t bg-background flex items-center gap-2"
    >
      <Input
        type="text"
        placeholder="Type a message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className="flex-1 rounded-full px-4 py-2 focus-visible:ring-accent"
        aria-label="Message input"
      />
      <Button type="submit" size="icon" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground">
        <SendHorizonal className="h-5 w-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
