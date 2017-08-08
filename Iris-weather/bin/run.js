'use strict';

const request = require('superagent');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);
server.listen();	// No port is specified, which means assign one dynamically

server.on('listening', function() {

	console.log(`IRIS-Weather is listening on ${server.address().port} in ${service.get('env')} mode.`);

	const announce = () => {
		request.put(`http://127.0.0.1:3000/service/weather/${server.address().port}`, (err, res) => {

			if (err) {
				console.log('Error connecting to Iris, err = "' + err + '"');
				return;
			}

			console.log('Successfully connected to Iris: ' + res.text);
		});
	};

	// Now announce ourselves to Iris
	announce();

	// And repeat the announcement every 15 seconds
	setInterval(announce, 15 * 1000);
});
