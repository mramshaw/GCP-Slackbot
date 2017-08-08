'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, sreg, cb) {

	if (intentData.intent[0].value !== 'weather')
		return cb(new Error(`Expected "weather" intent, got "${intentData.intent[0].value}"`));

	if (!intentData.location) {
		return cb(false, `Sorry, I do not recognize the location you are asking about.`);
	}

	const service = sreg.get('weather');
	if (!service) return cb(false, 'Sorry, no "weather" service is available right now.');

	request.get(`http://${service.address}:${service.port}/service/${intentData.location[0].value}`, (err, res) => {

		if (err || res.statusCode != 200 || !res.body.result) {
			console.log('Error: "' + err + '"');
			return cb(false, `Sorry, I couldn't get the weather in ${intentData.location[0].value}.`);
		}

		return cb(false, `In ${intentData.location[0].value}, it is now ${res.body.result}.`);
	});
}
