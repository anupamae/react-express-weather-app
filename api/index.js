const fs = require('fs');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

// NOTE: Create a file named .env and define OPEN_WEATHER_MAP_API_KEY variable
// You can get free API Key at https://home.openweathermap.org/api_keys
dotenv.config();

const app = express();
const port = process.env.PORT || 3001

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/weather', async (req, res) => {

  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=${req.query.city}`);
    const data = await response.json();
    // console.log(data);
    res.json({
      temp: data.main.temp.toFixed(0),
      feelsLike: data.main.feels_like.toFixed(0),
      minTemp: data.main.temp_min.toFixed(0),
      maxTemp: data.main.temp_max.toFixed(0),
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
      desc: data.weather[0].main
    });
  } catch (ex) {
    res.status(500).json({
      message: ex.message
    });
  }
});

app.get('/*', (_, res) => {
  const indexHtml = path.join(__dirname, 'build', 'index.html');
  fs.access(indexHtml, fs.constants.R_OK, (err) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendFile(indexHtml);
    }
  });
});

module.exports.app = app;

// See http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
if (!module.parent) {
  app.listen(port, () => console.log(`Server is listening on ${port}`))
}