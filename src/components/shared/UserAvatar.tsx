"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  imageUrl?: string;
  isOnline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function UserAvatar({ name, imageUrl, isOnline, size = 'md', className }: UserAvatarProps) {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const avatarSizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  return (
    <div className={cn("relative", className)}>
      <Avatar className={cn(avatarSizeClasses[size])}>
        {imageUrl && <AvatarImage src={imageUrl} alt={name} data-ai-hint="profile picture" />}
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      {isOnline !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-background",
            isOnline ? "bg-green-500" : "bg-gray-400"
          )}
          title={isOnline ? "Online" : "Offline"}
        />
      )}
    </div>
  );
}
