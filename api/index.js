const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

dotenv.config();
// process.env.OPEN_WEATHER_MAP_API_KEY

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



module.exports.app = app;

// See http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
if (!module.parent) {
    app.listen(3001);
}
