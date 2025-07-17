import ToDoList from "./ToDoList";
import Spline from "@splinetool/react-spline";
import ChatBox from "./ChatBox";
import { Toaster } from 'react-hot-toast';

function App() {
  const handleTaskFromChat = (task) => {
    console.log("Task from chat:", task);
    // Later you can pass this to ToDoList if needed
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
{/* Header container */}
    <div style={{ position: "relative" }}>

{/* Spline container */}
  <div style={{ marginRight: '420px' }}>
    <Spline
        scene="https://prod.spline.design/bTdcmqeyvP-I3UIz/scene.splinecode"
        style={{
          width: '400px',
          height: '600px',
          position: 'fixed',
          right: 0,
          bottom:-95,        // Use fixed to keep in place
          zIndex: 1,               // Behind UI but above background
          pointerEvents: 'none'     // So it doesn’t block clicks
        }}
      />
  </div>
{/* TO-DO-LIST ChatBox!!!  */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <ToDoList />
        <ChatBox onSend={handleTaskFromChat} />
      </div>
    </div>
    </>
  );
}

export default App;
