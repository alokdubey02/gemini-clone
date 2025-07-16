"use client";

import ChatRoomCard from "@/components/ChatRoomCard";
import CreateChatroomModal from "@/components/CreateChatroomModal";
import { useAppSelector } from "@/redux/hooks";

export default function DashboardPage() {
  const rooms = useAppSelector((state) => state.chat.chatrooms);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-20 text-center">Your Chatrooms</h1>
      <CreateChatroomModal />
      <div className="space-y-2">
        {rooms.map((room) => (
          <ChatRoomCard key={room.id} id={room.id} title={room.title} />
        ))}
        {rooms.length === 0 && (
          <p className="text-gray-500">No chatrooms found.</p>
        )}
      </div>
    </main>
  );
}
