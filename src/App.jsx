import ToDoList from "./ToDoList";
import Spline from "@splinetool/react-spline";
import ChatBox from "./ChatBox";
import { Toaster } from 'react-hot-toast';
import React, { useState } from "react";

function App() {
  const [showChat, setShowChat] = useState(false);
  const [externalTask, setExternalTask] = useState(null);
  const quotes = [
    "Keep going, champ! 💪",
    "You’re doing great 🚀",
    "One task at a time!",
    "Robot is watching 👀"
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const handleTaskFromChat = (task) => {
    setExternalTask(task);
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          reverseOrder: false,
          success: {
            style: {
              background: 'green',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px'
            },
          },
          error: {
            style: {
              background: 'red',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px'
            },
          },
        }}
      />
      <div style={{ position: "relative" }}>
        <div className="spline-wrapper">
          <div className="robot-message">{randomQuote}</div>
          <div
            style={{
              width: '400px',
              height: '600px',
              position: 'fixed',
              right: 0,
              bottom: -95,
              zIndex: 10,
              cursor: 'pointer',
            }}
            onClick={() => setShowChat((v) => !v)}
            title="Click the robot to chat!"
          >
            <Spline
              scene="https://prod.spline.design/bTdcmqeyvP-I3UIz/scene.splinecode"
              style={{
                width: '100%',
                height: '100%',
                pointerEvents: 'auto',
              }}
            />
          </div>
          {showChat && (
            <div style={{ position: 'fixed', bottom: 40, right: 40, zIndex: 2001 }}>
              <ChatBox onSend={handleTaskFromChat} />
            </div>
          )}
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <ToDoList externalTask={externalTask} />
        </div>
      </div>
    </>
  );
}

export default App;