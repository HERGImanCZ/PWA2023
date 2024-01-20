import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
    const {user} = useContext(AuthContext);
    const {potentialChats, createChat} = useContext(ChatContext);
    //console.log("PotentialChats", potentialChats)
    return <>
    <h3>Začít novou koverzaci</h3>
        {potentialChats && potentialChats.map((u, index)=>{
            return(
            <div type="button" className="btn btn-primary ptchats chattingperson" key={index} onClick={() => createChat(user._id, u._id)}>
                {u.name}
            </div>);
        })}
    </> ;
}
 
export default PotentialChats;