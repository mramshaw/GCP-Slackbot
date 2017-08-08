'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const moment  = require('moment');

const secrets = require('../secrets.json');

service.get('/service/:location', (req, res, next) => {

	// call Google Geocoding API to look up Lat/Long for specified location
	// TODO: Check for duplicates in the returned results, and if found request a more specific location
	request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.location +
			'&key=' + secrets.googleToken, (err, response) => {

		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}

		const latLong   = response.body.results[0].geometry.location;	// Lat/Long tuple
		const timeStamp = +moment().format('X');			// Unix timestamp as Integer

		// Now call Google Timezone API to look up Time for specified Lat/Long
		request.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + latLong.lat + ',' + latLong.lng +
				'&timestamp=' + timeStamp +
				'&key='       + secrets.googleToken, (err, response) => {

			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}

			const result = response.body;

			const timeString = moment.unix(timeStamp + result.dstOffset + result.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm A');
 
			res.json({result: timeString});
		});
	});
});

module.exports = service;
