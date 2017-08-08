'use strict';

const express = require('express');
const service = express();

const ServiceRegistry = require('./serviceRegistry');
const serviceRegistry = new ServiceRegistry();

service.set('serviceRegistry', serviceRegistry);

service.put('/service/:intent/:port', (req, res, next) => {

	const serviceIntent = req.params.intent;
	const servicePort   = req.params.port;

	// Handle IPv6 addresses, if present
	var serviceAddress = null;
	// '::ffff:' has been designated the IPv4 to IPv6 subnet prefix
	if (req.connection.remoteAddress.includes('::')) {
		// Possibly IPv6 - NASTY HACK FOLLOWS
		if (req.connection.remoteAddress.substr(0, 7) == '::ffff:') {
			// Really IPv4 - ANOTHER NASTY HACK
			serviceAddress = req.connection.remoteAddress.substr(7);
		} else {
			// Actually IPv6
			serviceAddress = `[${req.connection.remoteAddress}]`;
		}
	} else {
		// IPv4
		serviceAddress = req.connection.remoteAddress;
	}

	serviceRegistry.add(serviceIntent, serviceAddress, servicePort);

	res.json({result: `${serviceIntent} at ${serviceAddress}:${servicePort}`});
});

module.exports = service;
