'use strict';

const slackClient = require('../server/slackClient');
const service     = require('../server/service');
const http        = require('http');

const server = http.createServer(service);

const secrets = require('../secrets.json');

const slackLogLevel = 'verbose';

const wc = require('../server/witClient')(secrets.witToken);

const sr = service.get('serviceRegistry');

const rc = slackClient.init(secrets.slackToken, slackLogLevel, wc, sr);
rc.start();

// Do not start the express server until we are authenticated by slack
slackClient.addAuthenticatedHandler(rc, () => server.listen(3000));

server.on('listening', function() {
	console.log(`IRIS is listening on port ${server.address().port} in ${service.get('env')} mode.`);
});
