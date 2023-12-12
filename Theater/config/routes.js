const authController = require('../controllers/authController.js');
const homeController = require('../controllers/homeController.js');
const playController = require('../controllers/playController.js');
const notFound = require('../controllers/404.js');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/play', playController);
    app.use('/404', notFound);
}