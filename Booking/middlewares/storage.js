const hotel = require('../services/hotel');

module.exports = () => (req, res, next) => {
    // TODO import and decorate services
    req.storage = {
        // desctructurated the syntax so shortened
        // the writing when to call any function from the hotel just
        // have to sat req.storage.FUNCTION_NAME() instead req.storage.hotel.getHotel()
        ...hotel
    };

    next();
};