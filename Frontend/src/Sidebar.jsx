import "./Sidebar.css";
import {useContext , useEffect} from "react";
import {MyContext} from "./MyContext";
import {v1 as uuidv1} from "uuid";

function Sidebar() {
    const  {allThreads , reply , setAllThreads , currThreadId , setNewChats, setPromt , setReply , setCurrentThreadId , setPrevChats} = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();

            const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
            console.log(filteredData);
            setAllThreads(filteredData);
        } catch (error) {
            console.error("Error fetching threads:", error);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [reply]);

    const createNewChat = () => {
        setNewChats(true);
        setPromt("");
        setReply(null);
        setCurrentThreadId(uuidv1());
        setPrevChats([]);
    }

    return (
        <section className="sidebar">
            {/* New Chat Button */}
            <button onClick={createNewChat}>
                <img src="src/assets/blacklogo.png" alt="GPT logo" className="logo"></img>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>

            {/* History */}
            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                    <li key={idx}>{thread.title}</li>
                    ))
                }
            </ul>

            {/* Sign */}
            {/* <div className ="sign">
                <p>Made by Satyam Kumar</p>
            </div> */}
        </section>
    )
}

export default Sidebar;