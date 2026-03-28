import axios from 'axios';

/**
 * Netlify / local API base. Prefer REACT_APP_API_URL (full base, e.g. https://host/api).
 * Or REACT_APP_BACKEND_URL: host or full URL; https is added if missing, /api is appended if missing.
 */
function resolveApiBaseUrl() {
    const fromApiUrl = process.env.REACT_APP_API_URL?.trim().replace(/\/$/, '');
    if (fromApiUrl) return fromApiUrl;

    const fromBackend = process.env.REACT_APP_BACKEND_URL?.trim();
    if (fromBackend) {
        let base = fromBackend.replace(/\/$/, '');
        if (!/^https?:\/\//i.test(base)) {
            base = `https://${base}`;
        }
        if (!/\/api$/i.test(base)) {
            base = `${base}/api`;
        }
        return base;
    }

    return 'http://localhost:5000/api';
}

const API = axios.create({
    baseURL: resolveApiBaseUrl(),
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
