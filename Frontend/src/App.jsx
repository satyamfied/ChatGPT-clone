import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";

function App() {
  const [promt, setPromt] = useState("");
  const [reply, setReply] = useState(null);
  const [currentThreadId, setCurrentThreadId] = useState(uuidv1());
  const [prevChats , setPrevChats] = useState([]); //Stores All previous chats
  const [newChats , setNewChats] = useState(true); //Stores all new chats
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    promt, setPromt,
    reply, setReply,
    currentThreadId, setCurrentThreadId,
    newChats , setNewChats,
    prevChats , setPrevChats,
    allThreads, setAllThreads
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
