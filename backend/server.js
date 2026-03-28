const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Comma-separated list, e.g. https://webprojectjobra.netlify.app
// If set but parses to an empty list, fall back to reflecting all (same as unset) to avoid locking out every origin.
let corsOrigins = true;
if (process.env.CORS_ORIGIN) {
    const list = process.env.CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean);
    corsOrigins = list.length ? list : true;
}
app.use(
    cors({
        origin: corsOrigins,
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

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});