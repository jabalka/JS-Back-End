const router = require("express").Router();

router.get('/', async (req, res) => {

    const plays = await req.storage.getAllPlays(req.query.orderBy);
    // res.locals.user replace the need of the line below and 
    // adding user into the context object in render(...{user, plays})
    
    // const user = req.user;
    res.render('home', {plays}); 
});

module.exports = router; 