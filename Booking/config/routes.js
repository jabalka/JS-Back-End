const authController = require('../controllers/authController.js');
const homeController = require('../controllers/homeController.js');
const hotelController = require('../controllers/hotelControllerr.js');
const profileController = require('../controllers/profileController.js');



module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/hotels', hotelController);
    app.use('/user', profileController);
};