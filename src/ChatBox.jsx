import React, { useState } from "react";
import "./ChatBox.css";

function ChatBox({ onSend }) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (chatInput.trim() === "") return;

    const newMessages = [...messages, { from: "user", text: chatInput }];
    setMessages(newMessages);

    // Simulated bot response
    const botReply = { from: "bot", text: `Got it! Task added: "${chatInput}"` };
    const updatedMessages = [...newMessages, botReply];

    setMessages(updatedMessages);
    if (onSend) onSend(chatInput);

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
              <div key={index} className={`chat-msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a task..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
