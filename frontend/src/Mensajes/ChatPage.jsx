import React, { useRef, useState, useEffect } from "react";
import "./ChatPage.css";
import axios from 'axios';
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'

const ChatPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const scroll = useRef(null);
    const imageRef = useRef();
    
    const getImageUrl = (avatar) => {
        return avatar ? `http://localhost:4000/user-images/${avatar}` : `http://localhost:4000/user-images/User.png`;
    };

    const getFileUrl = (avatar) => {
        return avatar ? `http://localhost:4000/user-images/${avatar}` : `http://localhost:4000/user-images/User.png`;
    };
    
    const [users, setUsers] = useState([]);
    const [currectUserRec, setcurrectUserRec] = useState();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    
    const handleChange = (newMessage)=> {
        setNewMessage(newMessage)
    }

    useEffect(() => {
        const getChats = async() => {
            try {
                const response = await axios.get(`http://localhost:4000/api/messages/usuarios/${user.username}`);
                setUsers(response.data)
                
            } catch (error) {
                console.log(error);
            }
        }
        getChats()
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const selectedUser = JSON.parse(localStorage.getItem('selectedUser'));
            if (selectedUser) {
                handleOpenChat(selectedUser);
            }
        };
    
        // Escuchar eventos de cambio en localStorage
        window.addEventListener('storage', handleStorageChange);
    
        // Llamar a handleStorageChange en caso de que ya haya un selectedUser al cargar la página
        handleStorageChange();
    
        // Limpiar el event listener al desmontar el componente
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const fetchChats = async() => {
            try {
                const mens = await axios.get(`http://localhost:4000/api/messages/getMessages/${user.username}/${currectUserRec.username}`);
                setCurrentChat(mens.data);
                setcurrectUserRec(chat);
                
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchChats();
    }, [currentChat])

    useEffect(() => {
        scroll.current?.scrollIntoView({behavior: "smooth"})
    }, []);

    const handleOpenChat = async (chat) => {
        try {
            const mens = await axios.get(`http://localhost:4000/api/messages/getMessages/${user.username}/${chat.username}`);
            setCurrentChat(mens.data);
            setcurrectUserRec(chat);
            
            
        } catch (error) {
            console.log(error);
        }
    };


    const handleSend = async(e)=> {
        e.preventDefault()

        const userSender = user.username;
        const userRecipient = currectUserRec.username;
        let text = newMessage;
        let file = null;
        const value = imageRef.current.value;

        if(value !== "") {
            text = null;
            file = value;
            try {
                const response = await axios.post(`http://localhost:4000/api/messages/sendFile`, {userSender, userRecipient, text, file});
            }
            catch{
                console.log("error")
            }    
        } else {
            try {
                const response = await axios.post(`http://localhost:4000/api/messages/sendMessage`, {userSender, userRecipient, text, file});
                
            }
            catch
            {
                console.log("error")
            }
        }
    }    
    
    return (
        <div className="Chat">
            {/*Left side*/}
            <div className="Left-side-chat">
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-List">
                    {users.map((chat, index) => (
                        <div key={chat.id || index} className="chat-item" onClick={() => handleOpenChat(chat)}>
                            <div className="follower-conversation">
                                <img
                                    src={getImageUrl(chat.avatar)}
                                    alt="Profile"
                                    className="rounded-circle avatar"
                                />
                                <div className="name-status">
                                    <span className="username">{chat.username}</span>
                                </div>
                            </div>
                            <hr
                                style={{
                                width: "95%",
                                border: "1px solid #555",
                                marginTop: "30px",
                                }}
                            />
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            {/*Right side*/}
            <div className="Right-side-chat">
                <>
                    <div className="ChatBox-container">
                        {currectUserRec ? (
                            <>
                                <div className="chat-header">
                                    <div className="follower">
                                        <div>
                                            <img
                                                src={getImageUrl(currectUserRec.avatar)}
                                                alt="Profile"
                                                className="rounded-circle avatarIntoChat"
                                            />
                                            <span className="username">{currectUserRec.username}</span>
                                        </div>
                                    </div>
                                    <hr
                                        style={{
                                            width: "95%",
                                            border: "1px solid #555",
                                            marginTop: "10px",
                                        }}
                                    />
                                </div>

                                <div className="chat-body" >
                                    {currentChat.map((message) => (
                                        <div
                                            key={message.id}
                                            className={
                                                message.userSender === user.username
                                                ? "message own"
                                                : "message"
                                            }
                                        >
                                            <span>{message.text}</span>{" "}
                                            <span>{format(message.createdAt)}</span>
                                        </div>
                                    ))}
                                    <div ref={scroll} />
                                </div>

                                <div className="chat-sender">
                                    <div onClick={() => imageRef.current.click()}>+</div>
                                    <InputEmoji
                                        value={newMessage}
                                        onChange={handleChange}
                                    />
                                    <div className="send-button button" onClick = {handleSend}>Send</div>
                                    <input
                                        type="file"
                                        name=""
                                        id=""
                                        style={{ display: "none" }}
                                        ref={imageRef}
                                    />
                                </div>{" "}
                            </>
                        ) : (
                            <span className="chatbox-empty-message">
                                Tap on a chat to start conversation...
                            </span>
                        )}
                    </div>
                </>
            </div>
        </div>
    )
}

export default ChatPage;


