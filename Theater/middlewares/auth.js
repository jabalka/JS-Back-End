const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { TOKNE_SECRET, COOKIE_NAME } = require("../config");
const userService = require("../services/user");

module.exports = () => (req, res, next) => {
    if (parseToken(req, res)) {
        req.auth = {
            async register(username, password) {
                const token = await register(username, password);
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

async function register(username, password) {
    // TODO adapt parameters to project requirements
    // TODO extra validations
    const existing = await userService.getUserByUsername(username);

    if (existing) {
        throw new Error("Username is taken!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(username, hashedPassword);

    return generateToken(user);
}

async function login(username, password) {
    const user = await userService.getUserByUsername(username);

    if (!user) {
        const err = new Error("No such user!");
        err.type = 'credential';
        throw err;
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch) {
        const err = new Error("Incorrect password!");
        err.type = 'credential';
        throw err;
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
            // render context always has access to the res.locals = 
            // will not need to specify in the render ctx about the user
            res.locals.user = userData;
            return true;
        } catch (err) {
            res.clearCookie(COOKIE_NAME);
            res.redirect("/auth/login");

            return false;
        }
    }
    return true;
}
