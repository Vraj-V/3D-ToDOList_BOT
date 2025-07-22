import React, { useState } from "react";
import "./ChatBox.css";


function ChatBox({ onSend }) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I am your ToDoList Bot.\nYou can type commands like: add Buy milk, delete 2, edit 1 New name, complete 3, or just type a task to add it!" }
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  const getBotReply = (input) => {
    const trimmed = input.trim();
    if (/^add\s+/i.test(trimmed)) {
      return `✅ Task added: "${trimmed.replace(/^add\s+/i, '')}"`;
    } else if (/^(delete|remove)\s+/i.test(trimmed)) {
      return `🗑️ Task deleted (if found).`;
    } else if (/^edit\s+/i.test(trimmed)) {
      return `✏️ Task edited (if found).`;
    } else if (/^complete\s+/i.test(trimmed)) {
      return `🎉 Task completed (if found).`;
    } else {
      return `✅ Task added: "${trimmed}"`;
    }
  };

  const handleSend = () => {
    const value = chatInput.trim();
    if (value === "") return;
    setMessages((prev) => {
      const newMessages = [...prev, { from: "user", text: value }];
      const botReply = { from: "bot", text: getBotReply(value) };
      return [...newMessages, botReply];
    });
    if (onSend) {
      onSend(value);
    }
    setChatInput("");
  };

  return (
    <div className="chat-wrapper">
      {!isOpen && (
        <button className="chat-toggle" onClick={toggleChat}>
          💬
        </button>
      )}

      {isOpen && (
        <div className="chatbox">
          <div className="chat-header">
            ChatBot 🤖
            <button className="close-chat" onClick={toggleChat}>✖</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              msg.from === 'user' ? (
                <div key={index} className="chat-msg user"><span className="user-bubble">{msg.text}</span></div>
              ) : (
                <div key={index} className={`chat-msg ${msg.from}`}>{msg.text}</div>
              )
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={chatInput}
              onChange={e => {
                // Use requestAnimationFrame to avoid blocking UI
                const value = e.target.value;
                window.requestAnimationFrame(() => setChatInput(value));
              }}
              placeholder="Type a task..."
              onKeyDown={e => {
                if (e.key === "Enter") handleSend();
              }}
              style={{ color: '#222', background: '#fff' }}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
