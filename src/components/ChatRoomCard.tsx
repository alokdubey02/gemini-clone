"use client";

import { useAppDispatch } from "@/redux/hooks";
import { deleteChatroom } from "@/redux/slices/chatSlice";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

type Props = {
  id: string;
  title: string;
};

export default function ChatRoomCard({ id, title }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDelete = () => {
    dispatch(deleteChatroom(id));
    toast.success("Chatroom deleted", {
      position: "top-right",
      type: "default",
      autoClose: 5000,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <div className="border p-4 rounded shadow flex justify-between items-center">
      <div
        onClick={() => router.push(`/chat/${id}`)}
        className="cursor-pointer"
      >
        <h3 className="font-semibold">{title}</h3>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 text-sm cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}
