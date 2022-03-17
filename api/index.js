const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

// NOTE: Create a file named .env and define OPEN_WEATHER_MAP_API_KEY variable
// You can get free API Key at https://home.openweathermap.org/api_keys
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/weather', (req, res) => {
  request({
    uri: 'http://api.openweathermap.org/data/2.5/weather',
    qs: {
      APPID: process.env.OPEN_WEATHER_MAP_API_KEY,
      units: 'metric',
      q: req.query.city
    },
    callback: (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const bodyJson = JSON.parse(body);
        res.json({
          temp: bodyJson.main.temp.toFixed(0),
          feelsLike: bodyJson.main.feels_like.toFixed(0),
          minTemp: bodyJson.main.temp_min.toFixed(0),
          maxTemp: bodyJson.main.temp_max.toFixed(0),
          pressure: bodyJson.main.pressure,
          humidity: bodyJson.main.humidity,
          icon: `https://openweathermap.org/img/wn/${bodyJson.weather[0].icon}@4x.png`,
          desc: bodyJson.weather[0].main
        });
      } else {
        res.status(response.statusCode).json(error);
      }
    }
  });
});

module.exports.app = app;

// See http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
if (!module.parent) {
  app.listen(3001);
}
