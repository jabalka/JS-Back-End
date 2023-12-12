const {getHotelById} = require('../services/hotel');

function isUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect("/auth/login");
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            res.redirect("/");
        }
    };
}

function isOwner(){
    return async(req, res, next) => {
        const userId = req.user._id;
        const hotelId = req.params.id;

        const hotel = await getHotelById(hotelId)

        if(userId.toString() == hotel.owner.toString()){
            req.user.isOwner = true;
            next();
        } else {
            req.user.isOwner = false;
            next();
        }

    }
}

module.exports = {
    isUser,
    isGuest,
    isOwner
};
