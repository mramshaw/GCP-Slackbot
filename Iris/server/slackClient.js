'use strict';

const RtmClient     = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS    = require('@slack/client').RTM_EVENTS;

let rc   = null;		// Real-time messaging client
let nlp  = null;		// Natural-language processor
let sreg = null;		// Service Registry

function handleOnAuthenticated(rtmStartData) {
	console.log(`Logged in as "${rtmStartData.self.name}" of team "${rtmStartData.team.name}", but not yet connected to a channel.`);
}

function handleOnMessage(message) {

	// Only process messages where iris is tagged
	if (message.text.toLowerCase().includes('iris')) {

		// Run the slack message by our natural-language processor
		nlp.ask(message.text, (err, res) => {

			if (err) {
				console.log(err);
				return;
			}

			try {
				if (!res.intent || !res.intent[0] || !res.intent[0].value)
					throw new Error('Could not extract "intent".');

				// Note that we will pattern-match the "intent" to determine the module
				const intent = require('./intents/' + res.intent[0].value + 'Intent');

				intent.process(res, sreg, function(error, response) {
					if (error) {
						console.log(error.message);
						return;
					}

					return rc.sendMessage(response, message.channel);
				});
			} catch(err) {
				console.log('Error caught: "' + err + '", result: "' + res + '"');
				return rc.sendMessage("Sorry, I'm not sure what you are asking.", message.channel);
			}
		});
	}
}

function addAuthenticatedHandler(rc, handler) {
	rc.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(token, logLevel, wc, sr) {
	rc = new RtmClient(token, {logLevel: logLevel});
	nlp = wc;
	sreg = sr;
	addAuthenticatedHandler(rc, handleOnAuthenticated);
	rc.on(RTM_EVENTS.MESSAGE, handleOnMessage);
	return rc;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;
