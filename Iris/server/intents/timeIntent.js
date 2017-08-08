'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, sreg, cb) {

	if (intentData.intent[0].value !== 'time')
		return cb(new Error(`Expected "time" intent, got "${intentData.intent[0].value}"`));

	if (!intentData.location) {
		return cb(false, `Sorry, I do not recognize the location you are asking about.`);
	}

	const service = sreg.get('time');
	if (!service) return cb(false, 'Sorry, no "time" service is available right now.');

	request.get(`http://${service.address}:${service.port}/service/${intentData.location[0].value}`, (err, res) => {

		if (err || res.statusCode != 200 || !res.body.result) {
			console.log('Error: "' + err + '"');
			return cb(false, `Sorry, I couldn't get the time in ${intentData.location[0].value}.`);
		}

		return cb(false, `In ${intentData.location[0].value}, it is now ${res.body.result}.`);
	});
}
