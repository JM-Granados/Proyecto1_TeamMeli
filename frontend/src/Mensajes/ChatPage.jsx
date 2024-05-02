import React, { useRef, useState, useEffect } from "react";
import "./ChatPage.css";
import axios from 'axios';
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const scroll = useRef(null);
    const navigate = useNavigate() 
    
    const getFileUrl = (avatar) => {
        return avatar ? `http://localhost:4000/send-files/${avatar}` : `http://localhost:4000/user-images/User.png`;
    };

    const getFileNow = (file) => URL.createObjectURL(file);

    const getImageUrl = (avatar) => {
        return avatar ? `http://localhost:4000/user-images/${avatar}` : `http://localhost:4000/user-images/User.png`;
    };
    
    const [users, setUsers] = useState([]);
    const [currectUserRec, setcurrectUserRec] = useState();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preSelectedFile, setPreSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    
    const handleChange = (newMessage)=> {
        setNewMessage(newMessage)
    }

    const handleFileChange = (e)=> {
        if (e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setPreSelectedFile(e.target.files[0]);
        }
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
    }, [newMessage]);

    const handleOpenChat = async (chat) => {
        try {
            const mens = await axios.get(`http://localhost:4000/api/messages/getMessages/${user.username}/${chat.username}`);
            setCurrentChat(mens.data);
            setcurrectUserRec(chat);
            
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleViewClick = (user) => {
        // Guarda la información del usuario en localStorage
        console.log(user)
        localStorage.setItem('selectedUser', JSON.stringify(user));

        // Redirige a la página "/OtherUserAcc"
        navigate('/OtherUserAcc')
    };


    const handleSend = async(e)=> {
        e.preventDefault();
        const formData = new FormData();
        const userSender = user.username;
        const userRecipient = currectUserRec.username;
        formData.append('userSender', userSender)
        formData.append('userRecipient', userRecipient)
        formData.append('text', newMessage);
        console.log(newMessage);
        console.log(selectedFile);
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        try {
            await axios.post(`http://localhost:4000/api/messages/sendMessage`, formData);
            setNewMessage('');
            setSelectedFile(null);
            fileInputRef.current.value = ""; // Reset file input
        } catch (error) {
            console.error('Error sending message:', error);
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
                                            <button 
                                                type="button" 
                                                className="btn btn-link" 
                                                style={{
                                                    padding: 0,
                                                    border: 'none',
                                                    backgroundColor: 'transparent',
                                                    color: 'black', // Ajusta el color según tu tema
                                                    fontSize: '16px', // Ajusta según el tamaño deseado
                                                    textDecoration: 'none', // Elimina subrayado de enlaces
                                                    boxShadow: 'none' // Asegúrate de que no haya sombra
                                                }}
                                                data-bs-toggle="modal" 
                                                data-bs-target="#exampleModal" 
                                                onClick={() => handleViewClick(currectUserRec)}
                                            >
                                                {currectUserRec.username}
                                            </button>
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
                                    {currentChat.map((message, index) => (
                                        <div
                                            key={message.id}
                                            className={
                                                message.userSender === user.username
                                                ? "message own"
                                                : "message"
                                            }
                                            ref={index === currentChat.length - 1 ? scroll : null}
                                        >
                                            {message.file ? (
                                                /\.(jpg|jpeg|png|gif|bmp)$/i.test(message.file) ? (
                                                    // Si el archivo es una imagen, muestra la imagen
                                                    <img src={getFileUrl(message.file)} alt="Uploaded Image" style={{ maxWidth: '100%', height: 'auto' }} onLoad={() => console.log('Image loaded successfully')} onError={() => console.log('Failed to load image', getImageUrl(message.file))} />
                                                ) : (
                                                    // Si el archivo no es una imagen, muestra un enlace para descargarlo
                                                    <a href={getFileUrl(message.file)} download target="_blank" rel="noopener noreferrer">
                                                        Download File
                                                    </a>
                                                )
                                            ) : (
                                                <span>{message.text}</span>
                                            )}
                                            <span>{format(message.createdAt)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="chat-sender">
                                    <div onClick={() => fileInputRef.current.click()}>+</div>
                                    <InputEmoji
                                        value={newMessage}
                                        onChange={handleChange}
                                    />
                                    {selectedFile && (
                                        /\.(jpg|jpeg|png|gif|bmp)$/i.test(selectedFile.name) ? (
                                            <img src={getFileNow(selectedFile)} alt="Uploaded" style={{ maxWidth: '5%', height: 'auto' }} />
                                        ) : (
                                            <a href={getFileNow(selectedFile)} download={selectedFile.name}>
                                                See {selectedFile.name}
                                            </a>
                                        )
                                    )}
                                    <Button variant="outline-success" type="submit" onClick={handleSend}>Search</Button>
                                    <input
                                        type="file"
                                        name=""
                                        id=""
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
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


