import ToDoList from "./ToDoList";
import Spline from "@splinetool/react-spline";
import ChatBox from "./ChatBox";

function App() {
  const handleTaskFromChat = (task) => {
    console.log("Task from chat:", task);
    // Later you can pass this to ToDoList if needed
  };

  return (
        <>

    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100vw",
          height: "100vh",
        }}
      >
        <Spline scene="https://prod.spline.design/bTdcmqeyvP-I3UIz/scene.splinecode" 
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "100vw",
                  maxHeight: "100vh",
                    }}
        />

        
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <ToDoList />
        <ChatBox onSend={handleTaskFromChat} />
      </div>
    </div>
    </>
  );
}

export default App;
