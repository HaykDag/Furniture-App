import {
    ConversationList,
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Conversation,
    Sidebar,
    ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import "./adminChat.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:4000");

const AdminChat = () => {
    const [currUser, setCurrUser] = useState({});
    const [users, setUsers] = useState({});
    const [messageList, setMessageList] = useState([]);

    const filteredMessages = messageList.filter((message) => {
        return message.id === currUser.id;
    });

    useEffect(() => {
        socket?.emit("register");
        socket?.on("receive_message", (data) => {
            setMessageList((currList) => {
                return [...currList, { ...data, direction: "incoming" }];
            });
            if (!users.hasOwnProperty(data.id)) {
                users[data.id] = {
                    name: data.sender,
                    user_id: data.user_id,
                    unread: currUser.id !== data.id,
                    active: true,
                };
                setUsers((u) => u);
            } else {
                users[data.id].unread = currUser.id !== data.id;
            }
        });
        socket.on("user_disconnected", (id) => {
            users[id].active = false;
            setUsers((u) => u);
        });
    }, []);

    const handleReply = (text) => {
        if (!socket) return;
        const data = {
            message: text,
            name: currUser.name,
            id: currUser.id,
            direction: "outgoing",
        };

        setMessageList((currentList) => {
            return [...currentList, data];
        });
        socket.emit("reply", data);
    };
    const changeConversation = (id, name) => {
        setCurrUser({ id, name });
        users[id].unread = false;
    };
    return (
        <div className="Admin-chat-cnt">
            <MainContainer className="chat-main-cnt">
                <Sidebar position="left" scrollable={true}>
                    <ConversationList>
                        <div className="con-list-header">Conversations</div>
                        {Object.entries(users).map((entry) => (
                            <Conversation
                                onClick={() =>
                                    changeConversation(entry[0], entry[1].name)
                                }
                                key={entry[0]}
                                name={entry[1].name}
                                info={`User id: ${entry[1].user_id}`}
                                unreadDot={entry[1].unread}
                                active={entry[0] === currUser.id}
                            ></Conversation>
                        ))}
                    </ConversationList>
                </Sidebar>
                <ChatContainer>
                    <ConversationHeader>
                        <ConversationHeader.Content
                            className="chat-header"
                            userName={currUser.name}
                        />
                    </ConversationHeader>
                    <MessageList>
                        {filteredMessages.map((data, i) => (
                            <Message key={i} model={data}></Message>
                        ))}
                    </MessageList>
                    <MessageInput
                        onSend={handleReply}
                        placeholder="type your message here"
                    />
                </ChatContainer>
            </MainContainer>
        </div>
    );
};

export default AdminChat;
