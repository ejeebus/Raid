import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import { registerUser, loginUser, fetchProfile, fetchGroupChats, createGroupChat, sendMessage } from './api';
import GroupChat from './GroupChat';
import GlobalStyle from './styles.js';

const App = () => {
    const [user, setUser] = useState(null);
    const [groupChats, setGroupChats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileResponse = await fetchProfile();
                setUser(profileResponse.data);

                const groupChatsResponse = await fetchGroupChats();
                setGroupChats(groupChatsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleRegister = async (userData) => {
        try {
            const response = await registerUser(userData);
            setUser(response.data.user);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleLogin = async (userData) => {
        try {
            const response = await loginUser(userData);
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleCreateGroupChat = async (groupData) => {
        try {
            const response = await createGroupChat(groupData);
            setGroupChats([...groupChats, response.data.groupChat]);
        } catch (error) {
            console.error('Error creating group chat:', error);
        }
    };

    const handleSendMessage = async (messageData) => {
        try {
            const response = await sendMessage(messageData);
            // Update group chat with new message
            const updatedGroupChats = groupChats.map(groupChat => {
                if (groupChat._id === messageData.groupId) {
                    groupChat.messages.push(response.data.message);
                }
                return groupChat;
            });
            setGroupChats(updatedGroupChats);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <Router>
            <GlobalStyle />
            <Routes> {/* Updated from Switch to Routes */}
                <Route path="/groupchats" element={<GroupChat groupChats={groupChats} user={user} onSendMessage={handleSendMessage} />} />
                {/* Add more routes here */}
            </Routes>
        </Router>
    );
};

export default App;
