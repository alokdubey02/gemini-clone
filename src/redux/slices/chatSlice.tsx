import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
  image?: string;
}

interface Chatroom {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatState {
  chatrooms: Chatroom[];
}

const initialState: ChatState = {
  chatrooms: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createChatroom: (state, action: PayloadAction<{ title: string }>) => {
      state.chatrooms.push({
        id: nanoid(),
        title: action.payload.title,
        messages: [],
      });
    },
    deleteChatroom: (state, action: PayloadAction<string>) => {
      state.chatrooms = state.chatrooms.filter((r) => r.id !== action.payload);
    },
    sendMessage: (
      state,
      action: PayloadAction<{
        roomId: string;
        text: string;
        sender: "user" | "ai";
        image?: string;
      }>
    ) => {
      const room = state.chatrooms.find((r) => r.id === action.payload.roomId);
      if (room) {
        room.messages.push({
          id: nanoid(),
          text: action.payload.text,
          sender: action.payload.sender,
          timestamp: new Date().toISOString(),
          image: action.payload.image,
        });
      }
    },
  },
});

export const { createChatroom, deleteChatroom, sendMessage } =
  chatSlice.actions;
export default chatSlice.reducer;
