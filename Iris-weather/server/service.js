'use strict';

const express = require('express');
const service = express();
const request = require('superagent');

const secrets = require('../secrets.json');

service.get('/service/:location', (req, res, next) => {

	// TODO: Update this to use Lat/Long instead of City Name
	request.get('http://api.openweathermap.org/data/2.5/weather?q=' + req.params.location +
			'&APPID=' + secrets.openWeatherMapToken +
			'&units=imperial', 
			(err, response) => {

		if (err) {
			console.log(err);
			return res.sendStatus(404);
		}

		res.json({result: `${response.body.weather[0].description} at ${response.body.main.temp} degrees`});
	});
});

module.exports = service;
