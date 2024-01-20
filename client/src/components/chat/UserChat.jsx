import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserChat = ({chat, user}) => {
    const {recipientUser} = useFetchRecipientUser(chat, user);

    //console.log(recipientUser);
    return <>
    <Stack direction="horizontal" className="chattingperson btn btn-primary" gap={3}>
        <div className="d-flex">
            <div className="text-content">
                <div>
                    {recipientUser?.name}
                </div>
                {/*<div>
                    Text message
                </div>*/}
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            {/*<div className="date">
                12/12/2022
            </div>*/}
        </div>
    </Stack>
    </>
};
 
export default UserChat;