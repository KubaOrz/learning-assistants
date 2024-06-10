import React, { FC, useEffect, useState, useRef } from 'react';
import { Button, TextInput } from 'flowbite-react';
import { io, Socket } from 'socket.io-client';
import { useCreateNewChatMutation } from '../../../api/api.service';

type Message = {
    author: 'USER' | 'ASSISTANT';
    text: string;
}

type AssistantChatProps = {
    courseId: number;
}

const AssistantChat: FC<AssistantChatProps> = ({ courseId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState('');
    const [createNewChat] = useCreateNewChatMutation();
    const [chatId, setChatId] = useState(0);
    const socketRef = useRef<Socket | null>(null);

    const initializeChat = async () => {
        const { data: creationResponse } = await createNewChat(courseId);
        if (creationResponse) {
            const socket = io('http://localhost:3000');
            socketRef.current = socket;

            socket.emit('joinChatRoom', creationResponse.chatId);

            socket.on('receiveMessage', (message) => {
                setMessages((prevMessages) => [...prevMessages, { author: message.author, text: message.content }]);
            });

            setChatId(creationResponse.chatId);
        }
    }

    useEffect(() => {
        initializeChat();

        return () => {
            if (socketRef.current) {
                socketRef.current.off('receiveMessage');
                socketRef.current.disconnect();
            }
        };
    }, []);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = () => {
        if (message.trim() && socketRef.current) {
            socketRef.current.emit('sendMessage', { message, author: 'USER', chatId: chatId });
            setMessage('');
        }
    };

    return (
        <div className="fixed right-5 bottom-5">
            <div className={`transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} fixed bottom-20 right-0 bg-white w-1/4 h-1/2 shadow-lg rounded-t-lg flex flex-col`}>
                <div className="flex justify-between items-center p-4 bg-primary text-white rounded-t-lg">
                    <h2 className="text-lg font-semibold">Chat</h2>
                    <Button color="secondary" className='text-gray-800' size="sm" onClick={toggleChat}>Zamknij</Button>
                </div>
                <div className="flex flex-1 flex-col p-4 overflow-y-auto">
                    {messages.map((msg, idx) => (
                        <div key={idx}
                            className={`max-w-80 bg-${msg.author === 'USER' ? 'secondary' : 'white'} ${msg.author === 'USER' ? 'text-gray-600 self-end' : 'self-start'
                                } p-2 rounded-md shadow-md my-2`}
                        >
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                        <TextInput
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1"
                        />
                        <Button color="primary" onClick={handleSendMessage}>Wyślij</Button>
                    </div>
                </div>
            </div>
            <Button color="primary" className="fixed right-5 bottom-5" onClick={toggleChat}>
                {isOpen ? 'Schowaj Chat' : 'Pokaż Chat'}
            </Button>
        </div>
    );
};

export default AssistantChat;
