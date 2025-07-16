export type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
  image?: string;
};

export type Chatroom = {
  id: string;
  title: string;
  messages: Message[];
};
