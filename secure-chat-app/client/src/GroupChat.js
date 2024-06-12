import React, { useState } from 'react';
import { encryptMessage, decryptMessage } from './utils/encryption';
import { uploadMedia } from './api';

const GroupChat = ({ groupChats, user }) => {
    const [currentGroup, setCurrentGroup] = useState(null);
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);

    const handleSendMessage = async () => {
        const encryptedMessage = encryptMessage(message);
        // Logic to send encryptedMessage
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('media', file);
            formData.append('userId', user.identifier);

            try {
                await uploadMedia(formData);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
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
                                <div key={msg._id}>{decryptMessage(msg.content)}</div>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>Send</button>
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleFileUpload}>Upload</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupChat;
