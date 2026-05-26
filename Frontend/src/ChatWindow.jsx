import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext } from "react";

function ChatWindow() {
    const { promt, setPromt, reply, setReply , currentThreadId } = useContext(MyContext);
    const getReply = async () => {
        console.log("message : ", promt , "threadID : ", currentThreadId);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message : promt,
                threadId : currentThreadId
            })
        };

        try {
            const response = await fetch("http://localhost:8080/api/chat" , options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>ChatGPT <i className="fa-solid fa-angle-down"></i></span>
                <div className="userIconDiv">
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>

            <Chat></Chat>

            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything" value={promt}
                        onChange={(e) => setPromt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter'? getReply() : ''}
                    >
                        
                    </input>
                    <div id="submit" onClick={getReply}> <i className="fa-solid fa-arrow-up"></i> </div>
                </div>
                <p className="info"> 
                    ChatGPT can make mistakes. Check important info.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;