'use strict';

const request = require('superagent');

function handleWitResponse(res) {
	return res.entities;
}

module.exports = function witClient(token) {
	const ask = function ask(message, cb) {

	//	console.log('ask: "' + message + '", token: "' + token + '"');

		request.get('https://api.wit.ai/message')
			.set('Authorization', 'Bearer ' + token)
			.query({v: '20170806'})
			.query({q: message})
			.end((err, res) => {
				if (err) return cb(err);
				if (res.statusCode != 200)
					return cb('Expected status 200, got ' + res.statusCode);
				const witResponse = handleWitResponse(res.body);
				return cb(null, witResponse);
			})
	}

	return {
		ask: ask
	}
} 
