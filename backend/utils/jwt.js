const jwt = require('jsonwebtoken');

const secret = () => process.env.JWT_SECRET || 'jobra_secret_key';

exports.generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        secret(),
        { expiresIn: '7d' }
    );
};

exports.getJwtSecret = secret;