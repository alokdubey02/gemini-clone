import { useEffect, useState } from "react";

type Props = {
  text: string;
  sender: "user" | "ai";
  timestamp: string;
  image?: string;
};

export default function ChatMessage({ text, sender, timestamp, image }: Props) {
  const [displayedText, setDisplayedText] = useState(
    sender === "ai" ? "" : text
  );

  useEffect(() => {
    if (sender === "ai") {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
        if (index >= text.length) clearInterval(interval);
      }, 30);

      return () => clearInterval(interval);
    }
  }, [text, sender]);

  return (
    <div
      className={`my-2 flex w-full px-4 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-3 rounded-2xl shadow-md break-words ${
          sender === "user"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
        }`}
      >
        {image && (
          <img
            src={image}
            alt="upload"
            className="mb-2 max-h-28 w-full object-cover rounded-lg"
          />
        )}
        <p className="text-sm whitespace-pre-wrap">{displayedText}</p>
        <small className="block text-xs mt-1 text-end opacity-80">
          {new Date(timestamp).toLocaleTimeString()}
        </small>
      </div>
    </div>
  );
}
