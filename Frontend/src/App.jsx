import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState } from 'react';
import {v1 as uuid} from "uuid";

function App() {
  const [promt, setPromt] = useState("");
  const [reply, setReply] = useState(null);
  const [currentThreadId, setCurrentThreadId] = useState(uuid());

  const providerValues = {
    promt, setPromt,
    reply, setReply,
    currentThreadId, setCurrentThreadId
  };

  return (
    <div className = 'app'>
      <MyContext.Provider value={providerValues}>
        <Sidebar></Sidebar> 
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  )
}

export default App
