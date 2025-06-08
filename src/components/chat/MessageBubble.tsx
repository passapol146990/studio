"use client";

import React from 'react';
import type { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { text, timestamp, isSender } = message;

  return (
    <div
      className={cn(
        "flex animate-message-in mb-3",
        isSender ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] p-3 rounded-xl shadow-md",
          isSender
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-card text-card-foreground rounded-bl-none border"
        )}
      >
        <p className="text-sm break-words">{text}</p>
        <p
          className={cn(
            "text-xs mt-1 text-right",
            isSender ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {format(new Date(timestamp), "p")}
        </p>
      </div>
    </div>
  );
}
