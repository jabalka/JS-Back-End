const express = require("express");
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");

const authMiddleware = require('../middlewares/auth');
const storageMiddleware = require('../middlewares/storage');

module.exports = (app) => {

    app.engine(
        "hbs",
        hbs({
            // extension name to be changed from 'handlebars' to 'hbs'
            extname: ".hbs",
            //--- to change the layout diection fold
            // layoutsDir:
            //--- usually is main but can be changed
            // defaultLayout:
        })
    );
    // not mandatory line but
    // if we dont put it after app.render(viewname) we should add .hbs
    app.set("view engine", "hbs"); // <- not mandatory but verry helpfull

    app.use("/static", express.static("static"));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(authMiddleware());
    app.use(storageMiddleware());

    app.use((req, res, next) => {
        if(!req.url.includes('favicon')){
            console.log('>>>', req.method, req.url);
    
            if(req.user){
                console.log('Known user', req.user.username)
            }
        }
        next();
    })

    // Add storage and auth middlewares
};
