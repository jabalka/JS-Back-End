const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { TOKNE_SECRET, COOKIE_NAME } = require("../config");
const userService = require("../services/user");

module.exports = () => (req, res, next) => {
    if (parseToken(req, res)) {
        req.auth = {
            async register(username, email, password) {
                const token = await register(username, email, password);
                res.cookie(COOKIE_NAME, token);
            },
            async login(username, password) {
                const token = await login(username, password);
                res.cookie(COOKIE_NAME, token);
            },
            logout() {
                res.clearCookie(COOKIE_NAME);
            },
        };

        next();
    }
};

async function register(username, email, password) {
    // TODO adapt parameters to project requirements
    // TODO extra validations
    const existUsername = await userService.getUserByUsername(username);
    const existEmail = await userService.getUserByEmail(email);


    if (existUsername) {
        throw new Error("Username is taken!");
    }else if (existEmail) {
        throw new Error("Email is taken!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(username, email, hashedPassword);

    return generateToken(user);
}

async function login(username, password) {
    const user = await userService.getUserByUsername(username);

    if (!user) {
        throw new Error("No such user!");
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error("Incorrect password!");
    }
    // generate token and attach token to the session ---
    // no need to attach to session as it will redirect to new page with token attached

    return generateToken(user);
}

function generateToken(userData) {
    return jwt.sign(
        {
            _id: userData._id,
            username: userData.username,
            email: userData.email
        },
        TOKNE_SECRET
    );
}

function parseToken(req, res) {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try {
            const userData = jwt.verify(token, TOKNE_SECRET);
            req.user = userData;
            // req.locals is a property which is visible for the layout
            res.locals.user = userData
            return true;
        } catch (err) {
            res.clearCookie(COOKIE_NAME);
            res.redirect("/auth/login");

            return false;
        }
    }
    return true;
}
