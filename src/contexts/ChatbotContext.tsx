import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotContextType {
  isOpen: boolean;
  messages: ChatMessage[];
  toggleChatbot: () => void;
  openChatbot: () => void;
  closeChatbot: () => void;
  sendMessage: (text: string) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};

interface ChatbotProviderProps {
  children: ReactNode;
}

export const ChatbotProvider = ({ children }: ChatbotProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const toggleChatbot = () => setIsOpen((prev) => !prev);
  const openChatbot = () => setIsOpen(true);
  const closeChatbot = () => setIsOpen(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Auto-open chatbot when sending a message
    if (!isOpen) {
      setIsOpen(true);
    }
    
    // Simulate bot response (you can replace this with actual API call)
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: "I received your message. How can I help you?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        messages,
        toggleChatbot,
        openChatbot,
        closeChatbot,
        sendMessage,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
