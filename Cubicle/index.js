const express = require("express");
const hbs = require("express-handlebars");

// importing the middleware:
const { init: storage } = require("./models/storage.js");

const { catalog } = require("./controllers/catalog.js");
const notFound = require("./controllers/notFound.js");
const about = require("./controllers/about.js");
const { create, post: createPost } = require("./controllers/create.js");
const { details } = require("./controllers/details.js");
const { showEdit, postEdit } = require("./controllers/edit.js");

start();

async function start() {
    const port = 3003;
    const app = express();

    app.engine("hbs", hbs({ extname: ".hbs" }));

    app.set("view engine", "hbs");
    app.use("/static", express.static("static"));
    app.use(express.urlencoded({ extended: false }));
    // setting the middleware!
    app.use(await storage());
    app.use("/js", express.static("js"));

    app.get("/", catalog);
    app.get("/about", about);
    app.get("/create", create);
    app.post("/create", createPost);
    app.get("/details/:id", details);
    app.get("/edit/:id", showEdit);
    app.post("/edit/:id", postEdit);

    app.all("*", notFound);

    app.listen(port, () => console.log(`Server listening on port ${port}`));
}
