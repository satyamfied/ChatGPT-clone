import "./Chat.css";
import {useContext} from "react";
import { MyContext } from "./MyContext.jsx";

function Chat(){
    const {newChats , prevChats} = useContext(MyContext);
    console.log("prevChats in Chat component:", prevChats);
    return(
        <>
            {newChats && <h1>Start A New Chat!</h1>}
            <div className="chats">
                {
                    prevChats?.map((chat , idx) => 
                        <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
                            {
                                chat.role === "user" ?
                                 <p className="userMessage">{chat.content}</p> : 
                                 <p className="gptMessage">{chat.content}</p>
                            }
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default Chat;