const mongoose = require("mongoose");

const { DB_CONNECTIONSTRING } = require("./index");

module.exports = (app) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_CONNECTIONSTRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;
        db.on("error", (err) => {
            console.error("connection error:", err);
            reject(err);
        });
        db.once("open", function () {
            // we are connected
            console.log("Database ready!");
            resolve();
        });
    });
};
