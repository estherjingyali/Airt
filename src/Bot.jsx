import { useState, useEffect } from 'react';
import './Bot.css';

const Bot = ({ username }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'This is Airt-Bot.', sender: 'bot' },
        { id: 2, text: 'Feel free to ask me anything about Airt. ', sender: 'bot' },
        { id: 3, text: 'Q&A List: -1- how can i purchase artworks in the gallery -2- what is kittyxoin', sender: 'bot' }
    ]);

    const [messageText, setMessageText] = useState('');

    const keywordResponse = new Map([
        ['how can i purchase artworks in the gallery', 'Please click the add button at the bottom right corner of the specific artwork, then click the cart button at the top right of the page, use kittyxoin for checkout, and they will be yours.'],
        ['what is kittyxoin', 'Kittyxoin is our exclusive kryptokurrency for transactions. If you are not familiar, you can just simply enjoy the artworks in the gallery!'],
        ['thank you', 'You are welcome! Enjoy your time at Airt.']
    ]);

    const sendMessage = () => {
        addBotMessage(messageText, 'user');
        setMessageText('');
    };

    useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
            const lastUserMessage = messages[messages.length - 1].text.toLowerCase();

            for (const [keyword, response] of keywordResponse) {
                if (lastUserMessage.includes(keyword)) {
                    addBotMessage(response);
                    return;
                }
            }
        }
    }, [messages, keywordResponse]);


    const addBotMessage = (text, sender = 'bot') => {
        const newMessage = {
            id: messages.length + 1,
            text: `${sender === 'user' ? username + ': ' : ''}${text}`,
            sender: sender
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="bot-container">
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.sender}`}>
                        <span>{message.text}</span>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input type="text" placeholder="Type your message..." value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                <button onClick={sendMessage} className="bot-button">send</button>
            </div>
        </div>
    );
};

export default Bot;