"use client";

import { useAppDispatch } from "@/redux/hooks";
import { createChatroom } from "@/redux/slices/chatSlice";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function CreateChatroomModal() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");

  const handleCreate = () => {
    if (!title.trim()) return;
    dispatch(createChatroom({ title }));
    toast.success("Chatroom created", {
      position: "top-right",
      type: "default",
      autoClose: 5000,
      theme: "dark",
      transition: Bounce,
    });
    setTitle("");
  };

  return (
    <div className="my-4 flex gap-2">
      <input
        type="text"
        placeholder="New Chatroom Title"
        className="border p-2 rounded w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={handleCreate}
        className="bg-indigo-500 text-white px-4 py-2 rounded-sm cursor-pointer"
      >
        Create
      </button>
    </div>
  );
}
