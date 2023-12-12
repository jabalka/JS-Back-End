const router = require("express").Router();

const {isUser} = require('../middlewares/guards');

router.get('/', isUser(), async (req, res) => {
    const user = req.user;
    const bookedHotels = await req.storage.findAllReservationsByUser(user._id);

    const ctx = {
        user,
        reservations: bookedHotels.map(h => h = h.name).join(', ')
    }
    res.render('user/profile', ctx);
    
})

module.exports = router;
