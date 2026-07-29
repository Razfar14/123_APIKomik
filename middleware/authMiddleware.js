const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json
                ({
                    error: 'Authorization tidak ditemukan'
                });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json
                ({
                    error: 'Token tidak valid'
                });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token tidak valid atau telah kedaluwarsa'
        });
    }
};

module.exports = authMiddleware;