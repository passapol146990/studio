"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from '@/types/chat';
import { useChat } from '@/contexts/ChatProvider';
import { useToast } from '@/hooks/use-toast';

interface SetupUserDialogProps {
  isOpen: boolean;
  onSetupComplete: (user: User) => void;
}

export function SetupUserDialog({ isOpen, onSetupComplete }: SetupUserDialogProps) {
  const [name, setName] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (name.trim() === '') {
      toast({
        title: "Name Required",
        description: "Please enter your name to continue.",
        variant: "destructive",
      });
      return;
    }
    const newUser: User = {
      id: crypto.randomUUID(),
      name: name.trim(),
    };
    onSetupComplete(newUser);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => { /* Controlled externally */ }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to WhisperLink!</DialogTitle>
          <DialogDescription>
            Please set your display name to start chatting. Your unique ID will be generated automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Your display name"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save & Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
