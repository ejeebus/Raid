import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchProfile, fetchGroupChats } from './api';
import GroupChat from './GroupChat';
import GlobalStyle from './styles.js';
import { generateIdentifier } from './utils/identifier';

const App = () => {
    const [user, setUser] = useState(null);
    const [groupChats, setGroupChats] = useState([]);

    useEffect(() => {
        const registerUser = async () => {
            const identifier = generateIdentifier();
            setUser({ identifier });
            localStorage.setItem('identifier', identifier);
        };

        const fetchData = async () => {
            const storedIdentifier = localStorage.getItem('identifier');
            if (!storedIdentifier) {
                await registerUser();
            } else {
                setUser({ identifier: storedIdentifier });
            }

            try {
                const groupChatsResponse = await fetchGroupChats();
                setGroupChats(groupChatsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Router>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<h1>Welcome to Secure Chat App</h1>} />
                <Route path="/groupchats" element={<GroupChat groupChats={groupChats} user={user} />} />
            </Routes>
        </Router>
    );
};

export default App;

