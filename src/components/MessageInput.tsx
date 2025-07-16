"use client";

import { useRef, useState } from "react";

type Props = {
  onSend: (text: string, image?: string) => void;
};

export default function MessageInput({ onSend }: Props) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [showFileUpload, setShowFileUpload] = useState(false); // State to toggle file upload visibility
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the hidden file input

  const handleSend = () => {
    if (!text.trim() && !image) return; // Ensure there's text or an image
    onSend(text, image || undefined);
    setText("");
    setImage(null);
    setShowFileUpload(false); // Hide file upload options after sending
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click(); // Programmatically click the hidden file input
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input value
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {image && (
        <div className="relative mb-4 w-full h-48 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <img
            src={image}
            alt="Preview"
            className="w-full h-full object-contain"
          />
          <button
            onClick={clearImage}
            className="absolute top-1 right-2 text-red-600 p-1 text-3xl cursor-pointer"
            aria-label="Clear image"
          >
            x
          </button>
        </div>
      )}

      <div className="flex items-center w-full gap-2">
        <button
          onClick={() => setShowFileUpload(!showFileUpload)}
          className="p-0.5 h-10 w-10 rounded-full bg-gradient-to-br from-[#6A0DAD] via-[#8A2BE2] to-[#FFD700] text-white text-3xl shadow-md
                     hover:from-[#8A2BE2] hover:via-[#FFD700] hover:to-[#6A0DAD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8A2BE2] cursor-pointer"
          aria-label="Add attachment"
        >
          +
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                       py-2 pl-4 pr-12 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] focus:border-transparent"
            placeholder="Type a message..."
            aria-label="Message input"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-600 dark:text-gray-300
                       hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] cursor-pointer"
            aria-label="Send message"
            disabled={!text.trim() && !image}
          >
            Send
          </button>
        </div>
      </div>

      {showFileUpload && (
        <div className="mt-4 w-full flex justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={triggerFileInput}
            className="px-4 py-2 rounded-full bg-blue-400 text-white shadow-md
                       hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            Upload Image
          </button>
        </div>
      )}
    </div>
  );
}
