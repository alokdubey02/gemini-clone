"use client";

import ChatMessage from "@/components/ChatMessage";
import MessageInput from "@/components/MessageInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sendMessage } from "@/redux/slices/chatSlice";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const { roomId } = useParams();
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isGeminiTyping, setIsGeminiTyping] = useState(false);

  const room = useAppSelector((state) =>
    state.chat.chatrooms.find((r) => r.id === roomId)
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [room?.messages.length, isGeminiTyping]);

  const handleSend = (text: string, image?: string) => {
    dispatch(
      sendMessage({ roomId: roomId as string, text, sender: "user", image })
    );
    setIsGeminiTyping(true);
    setTimeout(() => {
      dispatch(
        sendMessage({
          roomId: roomId as string,
          text: "That's an interesting question! Based on the information available, it seems like we're exploring the nuances of UI/UX design. Is there anything specific you'd like to delve into regarding responsive layouts or component interaction?",
          sender: "ai",
        })
      );
      setIsGeminiTyping(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <h2 className="text-xl font-bold mb-2">
        {"Chat room name: " + room?.title}
      </h2>
      <div className="flex-1 overflow-y-auto space-y-1 pr-2">
        {room?.messages.map((msg) => (
          <ChatMessage key={msg.id} {...msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 mb-5">
        {isGeminiTyping && "Gemini is typing..."}
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
