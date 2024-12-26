const authenticate = require('./authMiddleware');

const authorize = (roles) => {
    return (req, res, next) => {
        authenticate(req, res, () => {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
            }
            next();
        });
    };
};

module.exports = authorize;
