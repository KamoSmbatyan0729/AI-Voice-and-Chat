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
  const [messages, setMessages] = useState([]);

  // const persist = (next) => {
  //   setMessages(next);
  //   try {
  //     localStorage.setItem("chat_history", JSON.stringify(next));
  //   } catch {
  //     // Ignore localStorage errors
  //   }
  // };

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
