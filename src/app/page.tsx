"use client";

import React, { useEffect, useState } from 'react';
import { ChatLayout } from '@/components/chat/ChatLayout';
import { SetupUserDialog } from '@/components/auth/SetupUserDialog';
import { useChat } from '@/contexts/ChatProvider';
import type { User } from '@/types/chat';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { currentUser, setCurrentUser, isLoading } = useChat();
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    if (!isLoading && !currentUser) {
      setShowSetup(true);
    } else if (currentUser) {
      setShowSetup(false);
    }
  }, [currentUser, isLoading]);

  const handleUserSetup = (user: User) => {
    setCurrentUser(user);
    setShowSetup(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {currentUser ? (
        <ChatLayout />
      ) : (
        <div className="flex items-center justify-center h-screen bg-background text-center p-4">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-4">Welcome to WhisperLink</h1>
            <p className="text-muted-foreground mb-6">Please set up your profile to begin chatting.</p>
            {/* The dialog will be triggered by showSetup state */}
          </div>
        </div>
      )}
      <SetupUserDialog isOpen={showSetup} onSetupComplete={handleUserSetup} />
    </>
  );
}
