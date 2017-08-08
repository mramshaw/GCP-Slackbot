'use strict';

class ServiceRegistry {

	constructor() {

		this._services = [];
		this._timeout  = 30;
	}

	add(intent, address, port) {

		const key = intent+address+port;

		if (!this._services[key]) {
			this._services[key] = {};
			this._services[key].intent    = intent;
			this._services[key].address   = address;
			this._services[key].port      = port;
			this._services[key].timestamp = Math.floor(new Date() / 1000);	// Unix timstamp in ms

			console.log(`Added service for intent "${intent}" on ${address}:${port}`);
			this._cleanup();
			return;
		}

		// Service has already been registered, update timestamp
		this._services[key].timestamp = Math.floor(new Date() / 1000);		// Unix timestamp in ms
		console.log(`Updated service for intent "${intent}" on ${address}:${port}`);
		this._cleanup();
	}

	remove(intent, address, port) {

		const key = intent + address + port;
		delete this._services[key];
		this._cleanup();
	}

	get(intent) {

		this._cleanup();

		for (let key in this._services) {

			// Returns the first service that matches
			// TODO: Make this a little more random
			if (this._services[key].intent == intent)
				return this._services[key];
		}

		// Not found
		return null;
	}

	_cleanup() {

		const now = Math.floor(new Date() / 1000);
		
		for (let key in this._services) {

			if (this._services[key].timestamp + this._timeout < now) {

				console.log(`Removed service for intent "${this._services[key].intent}"`);
				delete this._services[key];
			}
		}
	}
}

module.exports = ServiceRegistry;
