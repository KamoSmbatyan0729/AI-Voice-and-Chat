import React, { createContext, useContext, useMemo, useState } from "react";

/**
 * @typedef {Object} ConversationMessage
 * @property {string} id
 * @property {"user" | "assistant"} role
 * @property {string} content
 * @property {number} timestamp
 */

/** @type {React.Context<{
 *   messages: ConversationMessage[],
 *   addUserMessage: (content: string) => void,
 *   addAssistantMessage: (content: string) => void,
 *   clear: () => void
 * } | undefined>} */
const ChatContext = createContext(undefined);

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("chat_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const persist = (next) => {
    setMessages(next);
    try {
      localStorage.setItem("chat_history", JSON.stringify(next));
    } catch {
      // Ignore localStorage errors
    }
  };

  const addUserMessage = (content) => {
    const message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: Date.now(),
    };
    persist([...messages, message]);
  };

  const addAssistantMessage = (content) => {
    const message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content,
      timestamp: Date.now(),
    };
    persist([...messages, message]);
  };

  const clear = () => persist([]);

  const value = useMemo(
    () => ({ messages, addUserMessage, addAssistantMessage, clear }),
    [messages]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
