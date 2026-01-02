import { useState, useRef, useEffect } from "react";
import { useChatbot } from "@/contexts/ChatbotContext";
import { IconButton, Popover } from "@radix-ui/themes";
import { RiSendPlaneFill, RiArrowDownSLine } from "react-icons/ri";
import clsx from "clsx";
import "./chatbot.scss";
import GeminiLogo from "@/assets/images/gemini-logo.png";
import { MdFullscreen } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

export const Chatbot = () => {
  const { isOpen, messages, closeChatbot, toggleChatbot, sendMessage } =
    useChatbot();

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <>
      <button
        className={clsx("chatbot-toggle", { "chatbot-toggle--hidden": isOpen })}
        onClick={toggleChatbot}
        aria-label="Open chatbot"
      >
        <img src={GeminiLogo} />
      </button>

      <div
        className={clsx("chatbot-window", { "chatbot-window--open": isOpen })}
      >
        <div className="chatbot-header">
          <div className="chatbot-header__info">
            <img className="chatbot-header__avatar" src={GeminiLogo} />
            <div className="title-container">
              <h3 className="title">{`{session name}`}</h3>
              <Popover.Root>
                <Popover.Trigger>
                  <IconButton variant="ghost">
                    <RiArrowDownSLine size={24} />
                  </IconButton>
                </Popover.Trigger>
                <Popover.Content width="300px" size="1" className="popover">
                  <div className="session-list">
                    <div className="session-item">Kế hoạch tài chính nhà đất</div>
                    <div className="session-item">Kế hoạch ôn phỏng vấn HDBank</div>
                    <div className="session-item">Dự đoán giá vàng</div>
                    <div className="session-item">Swimlane diagram hướng dẫn</div>
                  </div>
                </Popover.Content>
              </Popover.Root>
            </div>
            <div className="chatbot-header__actions">
              <IconButton variant="ghost">
                <MdFullscreen size={24} />
              </IconButton>
              <IconButton variant="ghost" onClick={closeChatbot}>
                <IoMdClose size={24} />
              </IconButton>
            </div>
          </div>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={clsx("chatbot-message", {
                "chatbot-message--user": message.sender === "user",
                "chatbot-message--bot": message.sender === "bot",
              })}
            >
              <div className="chatbot-message__content">
                <p className="chatbot-message__text">{message.text}</p>
                <span className="chatbot-message__time">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="chatbot-input__field"
          />
          <IconButton
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="chatbot-input__button"
            size="3"
          >
            <RiSendPlaneFill size={18} />
          </IconButton>
        </div>
      </div>
    </>
  );
};
