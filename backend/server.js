const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS_ORIGIN: single URL or comma-separated (https only, no trailing slash). Required for production with credentials.
// When unset, origin reflects the request (fine for local dev only).
let corsOriginOption = true;
if (process.env.CORS_ORIGIN) {
    const list = process.env.CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean);
    corsOriginOption = list.length > 1 ? list : list.length === 1 ? list[0] : true;
}
app.use(
    cors({
        origin: corsOriginOption,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Jobra Hospital Backend Running');
});

const PORT = process.env.PORT || 5000;

// Routes
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const reportRoutes = require('./routes/reportRoutes');
const patientRoutes = require('./routes/patientRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

// Mount route prefixes (all under /api to match frontend)
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/complaint', complaintRoutes);

// Railway sets PORT (e.g. 8080). Never hardcode app.listen(5000).
// 0.0.0.0 lets Railway’s proxy reach the container (PORT still comes from env).
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});