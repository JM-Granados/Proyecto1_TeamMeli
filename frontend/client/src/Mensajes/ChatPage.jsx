import { PrettyChatWindow } from "react-chat-engine-pretty";

const ChatPage = (props) => {
    return (
        <div style={{ height: "94vh", width: "100vw" }}>
            <PrettyChatWindow
                projectId="Proyecto prueba"
                username="Jose" // adam
                secret="secretito" // pass1234
                style={{
                    height: '100%',
                    width: '100%',
                    maxWidth: 'none', 
                    margin: '0',
                    padding: '0',
                    boxSizing: 'border-box'
                }}
            />
        </div>
    );
};

export default ChatPage;

