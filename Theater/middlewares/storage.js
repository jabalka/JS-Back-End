const playService = require('../services/play');

module.exports = () => (req, res, next) => {
    const playInstance = playService;
    // TODO import and decorate services
    req.storage = {
        ...playInstance
    };

    next(); 
};