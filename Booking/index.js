const express = require('express');

const {PORT} = require('./config');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

// --------------          import just for the test below
// const authMiddleware = require('./middlewares/auth');

start();

async function start(){
    const app = express(); 
    
    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(PORT, () => {
        // testAuth();
        console.log(`Application started at hhtp://localhost:${PORT}`);
    });

}

// --------------         test function
// async function testAuth(){
//     const reqMock = {};
//     const resMock = {
//         cookie() {
//             console.log('Set cookie', arguments);
//         }
//     };
//     const nextMock = () => {};
//     try{
//         const auth = authMiddleware();
//         auth(reqMock, resMock, nextMock)

//         await reqMock.auth.login('peter', '123asd');
//     }catch(err){
//         console.log('Error:', err.message)
//     }
// }
