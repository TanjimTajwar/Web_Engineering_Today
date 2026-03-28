import axios from 'axios';

const API = axios.create({
    baseURL:
        process.env.REACT_APP_API_URL?.replace(/\/$/, '') ||
        'http://localhost:5000/api',
});

// attach token automatically
API.interceptors.request.use((req) => {
    try {
        const raw = localStorage.getItem('user');
        if (raw) {
            const user = JSON.parse(raw);
            if (user?.token) {
                req.headers.Authorization = user.token;
            }
        }
    } catch {
        // ignore corrupt or invalid stored user
    }
    return req;
});

export default API;
