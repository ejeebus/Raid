import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const registerUser = (userData) => API.post('/users/register', userData);
export const loginUser = (userData) => API.post('/users/login', userData);
export const fetchProfile = () => API.get('/users/profile');
export const createGroupChat = (groupData) => API.post('/groupchats/create', groupData);
export const sendMessage = (messageData) => API.post('/groupchats/send', messageData);
export const fetchGroupChats = () => API.get('/groupchats');
