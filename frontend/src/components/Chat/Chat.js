import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import "./chat.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/users/usersSlice";

const socket = io.connect("http://localhost:4000");

const Chat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { user } = useSelector(selectUser);

    const [messageList, setMessageList] = useState([
        {
            message:
                "Hello Welcom to our support chat, please fell free to ask anything.",
            sentTime: "don't know",
            sender: "Admin",
            direction: "incoming",
        },
    ]);

    useEffect(() => {
        socket?.on("receive_message", (message) => {
            const data = {
                message,
                sentTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                sender: "Admin",
                direction: "incoming",
            };

            setMessageList((currentList) => {
                return [...currentList, data];
            });
        });
    }, []);

    const handleSend = (messageText) => {
        const data = {
            message: messageText,
            sentTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
            sender: user ? user.username : "User",
            user_id: user?.id,
            direction: "outgoing",
        };
        socket.emit("send_message", { ...data, id: socket.id });
        setMessageList((currMessList) => {
            return [...currMessList, data];
        });
    };

    return (
        <>
            {!isChatOpen && (
                <div className="open-chat">
                    <button onClick={() => setIsChatOpen(!isChatOpen)}>
                        Chat
                    </button>
                </div>
            )}
            {isChatOpen && (
                <div className="chat-cnt">
                    <MainContainer>
                        <ChatContainer>
                            <ConversationHeader
                                className="chat-header"
                                onClick={() => setIsChatOpen(!isChatOpen)}
                            >
                                <ConversationHeader.Content
                                    className="chat-header-content"
                                    userName="Admin"
                                />
                            </ConversationHeader>
                            <MessageList>
                                {messageList?.map((data, i) => (
                                    <Message key={i} model={data}></Message>
                                ))}
                            </MessageList>
                            <MessageInput
                                onSend={handleSend}
                                placeholder="Type message here"
                            />
                        </ChatContainer>
                    </MainContainer>
                </div>
            )}
        </>
    );
};

export default Chat;
