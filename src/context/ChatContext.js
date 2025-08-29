import React, { createContext, useContext, useMemo, useState } from "react";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const addUserMessage = (content) => {
    const message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, message]);
  };

  const addAssistantMessage = (content) => {
    const message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, message]);
  };

  const clearHistory = () => setMessages([]);

  const value = useMemo(
    () => ({ messages, addUserMessage, addAssistantMessage, clearHistory }),
    [messages]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
