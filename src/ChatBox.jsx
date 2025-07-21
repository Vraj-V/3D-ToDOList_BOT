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

    // Check for date in input (e.g., add task date:7/24/2025)
    // Accepts formats like: add task date:7/24/2025 or add task date: 2025-07-24
    const dateMatch = value.match(/date\s*[:=\-]\s*([\d\/-]+)/i);
    let dateValue = null;
    let cleanValue = value;
    if (dateMatch) {
      dateValue = dateMatch[1];
      cleanValue = value.replace(/date\s*[:=\-]\s*[\d\/-]+/i, '').replace(/\s{2,}/g, ' ').trim();
    }

    // If it's an add command and no date is provided, show alert and do not send
    if (/^add\s+/i.test(value) && !dateValue) {
      alert('⚠️ Please provide a date using date:MM/DD/YYYY or date:YYYY-MM-DD');
      return;
    }

    // Use functional update to avoid blocking UI
    setMessages((prev) => {
      const newMessages = [...prev, { from: "user", text: value }];
      const botReply = { from: "bot", text: getBotReply(value) };
      return [...newMessages, botReply];
    });
    if (onSend) {
      if (dateValue) {
        onSend({ text: cleanValue, date: dateValue });
      } else if (/^(delete|remove)\s+/i.test(value)) {
        onSend(value); // Only send as delete/remove command
      } else if (/^add\s+/i.test(value)) {
        onSend(value); // Only send as add command
      } else if (/^edit\s+/i.test(value)) {
        onSend(value); // Only send as edit command
      } else if (/^complete\s+/i.test(value)) {
        onSend(value); // Only send as complete command
      } else if (/^(delete|remove)\b/i.test(value)) {
        onSend(value); // Only send as delete/remove command (catch any missed cases)
      } else {
        // Only treat as add if it does NOT start with delete/remove
        if (!/^(delete|remove)\b/i.test(value)) {
          onSend(value); // Fallback, treat as add
        }
      }
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
