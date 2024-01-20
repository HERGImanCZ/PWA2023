import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
    const {user} = useContext(AuthContext);
    const {currentChat, messages, isMessagesLoading, sendTextMessage} = useContext(ChatContext);
    const {recipientUser} = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState("");

    console.log("Message text", textMessage);

    if(!recipientUser) return(
        <p className="info">Nebyla vybrána žádná konverzace</p>
    );
    if(isMessagesLoading) return(
        <p className="info">Konverzace se načítá...</p>
    );

    return (
        
        <Stack gap={4} className="chatbox">
            
            <div>
                <strong>Píšete si s uživatelem {recipientUser.name}</strong>
            </div>
            <Stack gap={3} className="scroll">
                {messages && messages.slice(0).reverse().map((message, index) => <div key={index} className={`message-def ${message?.senderId === user?._id ? "message-self" : "message"}`}>
                    <span>{message.text}</span>
                    <span>{moment(message.createdAt).calendar}</span>
                </div>)}
            </Stack>
            <Stack direction="horizontal" gap={3}>
                <InputEmoji
                    value={textMessage} 
                    onChange={setTextMessage}
                    language="cs"
                    placeholder="Text vaší zprávy"
                    fontSize={20}
                    borderRadius={18}
                />
                <button className="sendbtn" onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>ODESLAT</button>
            </Stack>
        </Stack>
    );
};
 
export default ChatBox;
