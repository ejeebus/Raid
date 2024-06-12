import React, { useState, useEffect } from 'react';

const GroupChat = ({ groupChats, user, onSendMessage }) => {
    const [currentGroup, setCurrentGroup] = useState(null);
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        if (currentGroup && user) {
            await onSendMessage({ groupId: currentGroup._id, sender: user._id, content: message });
            setMessage('');
        }
    };

    return (
        <div>
            <div>
                {groupChats.map(chat => (
                    <div key={chat._id} onClick={() => setCurrentGroup(chat)}>
                        {chat.groupName}
                    </div>
                ))}
            </div>
            <div>
                {currentGroup && (
                    <div>
                        <div>
                            {currentGroup.messages.map(msg => (
                                <div key={msg._id}>{msg.content}</div>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupChat;
