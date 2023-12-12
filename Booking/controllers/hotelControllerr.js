const router = require("express").Router();

const {isUser, isOwner} = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('hotel/create');
});

router.post('/create', isUser(), async (req, res) => {
    const hotelData = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: req.body.rooms,
        bookedBy: [],
        owner: req.user._id
    };
    
        try{
            await req.storage.createHotel(hotelData);
    
            res.redirect('/');
        } catch(err){
            let errors;
            if(err.errors){
                errors = Object.values(err.errors).map(e => e.properties.message)         
            } else {
                errors = [err.message];
            }
            const ctx = {
                errors,
                hotelData: {
                    name: req.body.name,
                    city: req.body.city,
                    imageUrl: req.body.imageUrl,
                    rooms: req.body.rooms,
                }
            }
            res.render('hotel/create', ctx);
        }
});

router.get('/details/:id', isOwner(), isUser(), async (req, res) => {
    const hotelId = req.params.id;
    const userId = req.user._id;

    try{
        const hotelData = await req.storage.getHotelById(hotelId);
        let isBooked = hotelData.bookedBy.map(id => id.toString()).includes(userId.toString());

        const ctx = {
            hotelData,
            isOwner: req.user.isOwner,
            isBooked
        }; 

        return res.render('hotel/details', ctx);

    } catch (err){
    }
})

router.post('/delete/:id', isUser(), async (req, res) => {
    const hotelId = req.params.id;
    try{
        await req.storage.deleteHotel(hotelId);

        res.redirect('/');
    } catch(err){
    }
})

router.post('/book/:id', isUser(), isOwner(), async (req, res) => {
    const userId = req.user._id;
    const hotelId = req.params.id;
    try{
        await req.storage.bookHotel(hotelId, userId);

        const hotelData = await req.storage.getHotelById(hotelId);

        // const isOwner = userId == hotelData.owner;
        let isBooked = hotelData.bookedBy.map(id => id.toString()).includes(userId.toString());

        const ctx = {
            hotelData,
            isOwner: req.user.isOwner,
            isBooked
        }; 
        return res.render('hotel/details', ctx);
    } catch(err){

    }
})

router.get('/edit/:id', isUser(), async (req, res) => {
    const hotel = await req.storage.getHotelById(req.params.id);
    ctx = {
        hotel,
    }
    res.render('hotel/edit', ctx);
})

router.post('/edit/:id', isUser(), async(req, res) => {
    
    const hotelId = req.params.id;
    const hotel = {
        _id: hotelId,
        name: (req.body.name).trim(),
        city: (req.body.city).trim(),
        imageUrl: (req.body.imageUrl).trim(),
        rooms: (req.body.rooms).trim(),
    };
    try{
        await req.storage.updateHotel(hotelId, hotel);

        return res.redirect(`/hotels/details/${hotelId}`);
    }catch(err){
        let errors;
            if(err.errors){
                errors = Object.values(err.errors).map(e => e.properties.message);
            } else {
                errors = [err.message];
            }
        const ctx = {
            errors,
            hotel
        }
        return res.render(`hotel/edit`, ctx);
    }

})

module.exports = router;