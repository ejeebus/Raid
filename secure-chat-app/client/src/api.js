import axios from 'axios';

// Base URL for the backend server
const API_URL = 'http://localhost:5000/api';

// Register a new user
export const registerUser = (userData) => {
    return axios.post(`${API_URL}/users/register`, userData);
};

// Log in an existing user
export const loginUser = (userData) => {
    return axios.post(`${API_URL}/users/login`, userData);
};

// Fetch user profile
export const fetchProfile = () => {
    return axios.get(`${API_URL}/users/profile`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};

// Fetch group chats
export const fetchGroupChats = () => {
    return axios.get(`${API_URL}/groupchats`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};

// Create a new group chat
export const createGroupChat = (groupData) => {
    return axios.post(`${API_URL}/groupchats/create`, groupData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};

// Send a message to a group chat
export const sendMessage = (messageData) => {
    return axios.post(`${API_URL}/groupchats/send`, messageData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};

// Upload media
export const uploadMedia = (formData) => {
    return axios.post(`${API_URL}/media/upload`, formData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
        }
    });
};
