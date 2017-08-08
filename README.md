# Building a Slack Bot with Node.js Microservices

This was a fun exercise, I learned a little bit about __Slack__ as well as quite a lot about __NLP__ (Natural-language processing) and __bots__.

![GCP Slackbot](./images/GCP Slackbot.png)

## NLP

Like a lot of people, I learned a certain amount of programming from the old text-based computer games.

I knew that I had learned some __Basic__ and __Fortran__ there, also some __GMAP__ (an obscure assembly language). But I hadn't realized that I also learned about __NLP__:

	A threatening little dwarf bars your way. He throws an axe at you, but misses.
	> kill dwarf
	I'm sorry, but I don't know how to do that. Perhaps there is a weapon nearby?
	> use axe
	You don't have an axe!
	> take axe
	OK
	> use axe
	I'm sorry, but I don't know how to do that.
	> throw axe
	You missed!
	> take axe
	OK
	> throw axe
	You missed!

Things have changed in the many years that have elapsed since then, but I'm not sure they've changed all that much. The slackbot we will implement here is very reminiscent of [__Eliza__]( https://en.wikipedia.org/wiki/ELIZA) - which was an early natural language processing program.

## Requirements

A __GitHub__ account will be needed, as well as a __Google Cloud Platform__ account.

## Node.js

The __Node.js__ modules will use the __@slack/client__, __Express__, __superagent__ and __moment__ frameworks.

## OAuth2

Apart from the Google API calls we will be using the __OAuth2__ framework for authentication, validation and verification.

To use __Wit.ai__ it will be necessary to sign in with a __GitHub__ account.

## Slack

For the __Slack__portion, we will create a real-time messaging (RTM) client which will use __websockets__.

We will also create a _bot user_ in Slack. This will create a Slack token.

## Wit

We will create and train a natural-language processing (NLP) client with __Wit.ai__. This will create a Wit token.

As noted above, it will be necessary to sign in with a __GitHub__ account.

#### Time

![Time intent](./images/Time.png)

Some sample questions to train the __time__ intent.

#### Weather

![Weather intent](./images/Weather.png)

Some sample questions to train the __weather__ intent.

## Slack and Wit Secrets

We will embed our Slack token and our Wit token in a __secrets.json__ file as follows:

	{
	    "slackToken" : "xoxb-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
	    "witToken"   : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	}

## Time Service

To determine the requested time, we will geolocate the location and then request its time offset.

To do this we will use Google's Geocoding API and Google's Timezone API.

It will be necessary to sign in with a __Google Cloud Platform__ account.

Google's Geocoding documentation:

	https://developers.google.com/maps/documentation/geocoding/start

Google's Timezone documentation:

	https://developers.google.com/maps/documentation/timezone/start

The tutorial recommends creating two API keys, one for each service however we will use the same key for both.

We will also restrict our GCP project to __only__ these two APIs:

![Google APIs](./images/Google APIs.png)

## Google Secrets

We will embed our Google token in a __secrets.json__ file as follows:

	{
	    "googleToken" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	}

This file must be created in the __Iris-time__ directory. Note that this is not a valid token!

## Weather Service

To determine the requested weather, we will use the OpenWeatherMap API.

## OpenWeatherMap Secrets

We will embed our OpenWeatherMap token in a __secrets.json__ file as follows:

	{
	    "openWeatherMapToken" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	}

This file must be created in the __Iris-weather__ directory. Note that this is not a valid token!

## To Do

- [ ] Replace the current logging [`console.log("listening");`] framework with a dedicated logging package like __Bunyan__ or __Winston__.
- [ ] Check for duplicates from the Google Geocoding (Lat/Long) lookup and if found, request a more specific location.
- [ ] Update the Service Registry to allow for proxies (currently assumes all services are directly reachable).
- [ ] Update the Service Registry to more randomly return matching services for load-balancing purposes (rather than simply the first one that matches).
- [ ] Update the Weather API service call to either use City ID or Lat/Long (from Google) instead of City Name.

## Credits

Based upon:

	https://www.lynda.com/Node-js-tutorials/Building-Slack-Bot-Node-js-Microservices/509406-2.html

This tutorial is worth viewing for some great insight into how to structure the code in a __Node.js__ project. The service discovery parts are very interesting.