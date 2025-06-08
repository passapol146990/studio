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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from 'lucide-react';
import { useChat } from '@/contexts/ChatProvider';
import { useToast } from '@/hooks/use-toast';

export function AddFriendDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [friendId, setFriendId] = useState('');
  const [friendName, setFriendName] = useState('');
  const { addFriend, currentUser } = useChat();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!friendId.trim()) {
      toast({ title: "Friend ID Required", description: "Please enter the friend's unique ID.", variant: "destructive" });
      return;
    }
    if (!friendName.trim()) {
      toast({ title: "Friend Name Required", description: "Please enter the friend's name.", variant: "destructive" });
      return;
    }

    const success = await addFriend(friendId.trim(), friendName.trim());
    if (success) {
      setFriendId('');
      setFriendName('');
      setIsOpen(false);
    }
  };

  if (!currentUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="mr-2 h-4 w-4" /> Add Friend
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Friend</DialogTitle>
          <DialogDescription>
            Enter your friend's unique ID and name to add them to your contacts.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="friendId" className="text-right">
              Friend's ID
            </Label>
            <Input
              id="friendId"
              value={friendId}
              onChange={(e) => setFriendId(e.target.value)}
              className="col-span-3"
              placeholder="Enter unique ID"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="friendName" className="text-right">
              Friend's Name
            </Label>
            <Input
              id="friendName"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              className="col-span-3"
              placeholder="Enter name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Add Friend</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
