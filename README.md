# Building a Slack Bot with Node.js Microservices

This was a fun exercise, I learned a little bit about __Slack__ as well as quite a lot about __NLP__ (Natural-language processing).

![GCP Slackbot](./images/GCP_Slackbot.png)

## Index

The contents are as follows:

* [NLP](#nlp)
* [Requirements](#requirements)
* [Node.js](#nodejs)
* [Slack](#slack)
* [Wit](#wit)
    * [Time](#time)
    * [Weather](#weather)
* [Slack and Wit Secrets](#slack-and-wit-secrets)
* [Time Service](#time-service)
    * [Google Secrets](#google-secrets)
* [Weather Service](#weather-service)
    * [OpenWeatherMap Secrets](#openweathermap-secrets)
* [Privacy](#privacy)
* [To Do](#to-do)
* [Credits](#credits)

## NLP

Like a lot of people, I learned a certain amount of programming from the old text-based computer games.

I knew that I had learned some __Basic__ and __Fortran__ there, also some __GMAP__ (an obscure assembly language,
or - specifically - GCOS Macro Assembler Program). But I hadn't realized that I also learned about __NLP__:

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

[If anyone is interested, this exchange occurred in the text-based game [Colossal Cave Adventure](http://gitlab.com/esr/open-adventure).]

Things have changed in the many years that have elapsed since then, but I'm not sure they've changed all that much.
The slackbot we will implement here is very reminiscent of [__Eliza__](http://en.wikipedia.org/wiki/ELIZA) - which
was an early natural language processing program.

## Requirements

A __GitHub__ account will be needed, as well as a __Google Cloud Platform__ account.

## Node.js

The __Node.js__ modules will use the [@slack/client](http://github.com/slackapi/node-slack-sdk), [express](http://www.npmjs.com/package/express),
[superagent](http://www.npmjs.com/package/superagent) and [moment](http://www.npmjs.com/package/moment) frameworks.

## Slack

For the __Slack__ portion, we will create a real-time messaging (RTM) client which will use __websockets__.

We will also create a _bot user_ in Slack. This will create a Slack token.

## Wit

We will create and train a natural-language processing (NLP) client with __Wit.ai__.

In order to do this, it will be necessary to sign in with a __GitHub__ account.

We will need to train our client to recognize __Intents__ (I have been unable to find a good definition but broadly speaking the main concept of a question or statement.
 Intents will also be important for [AWS Alexa](http://github.com/mramshaw/Alexa-Stuff)).

Once our client has been trained, we will need to create a Wit token.

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

	http://developers.google.com/maps/documentation/geocoding/start

Google's Timezone documentation:

	http://developers.google.com/maps/documentation/timezone/start

The tutorial recommends creating two API keys, one for each service however we will use the same key for both.

We will also restrict our GCP project to __only__ these two APIs:

![Google APIs](./images/Google_APIs.png)

#### Google Secrets

We will embed our Google token in a __secrets.json__ file as follows:

	{
	    "googleToken" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	}

This file must be created in the __Iris-time__ directory. Note that this is not a valid token!

## Weather Service

To determine the requested weather, we will use the OpenWeatherMap API.

#### OpenWeatherMap Secrets

We will embed our OpenWeatherMap token in a __secrets.json__ file as follows:

	{
	    "openWeatherMapToken" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	}

This file must be created in the __Iris-weather__ directory. Note that this is not a valid token!

## Privacy

[Wit.ai](http://wit.ai/) was acquired by [Facebook](http://www.facebook.com) in 2016.

If you are at all concerned about Facebook and their concern for user privacy or the uses to which Facebook puts its data,
 this might be something to bear in mind.

Wit.ai publishes its [privacy policy](http://wit.ai/privacy) and also has a [BLOG](http://wit.ai/blog).

Facebook are the creators of [React](http://github.com/facebook/react) and [React native](http://github.com/facebook/react-native).

## To Do

- [x] Add a note about Wit.ai ownership and privacy policy
- [x] Add links for express, superagent and moment frameworks
- [ ] Replace console logging [`console.log("listening");`] with either __util__ logging or a package like [bunyan](http://www.npmjs.com/package/bunyan) or [winston](http://www.npmjs.com/package/winston).
- [ ] Check for duplicates from the Google Geocoding (Lat/Long) lookup and if found, request a more specific location.
- [ ] Update the Service Registry to allow for proxies (currently assumes all services are directly reachable).
- [ ] Update the Service Registry to more randomly return matching services for load-balancing purposes (rather than simply the first one that matches).
- [ ] Update the Weather API service call to either use City ID or Lat/Long (from Google) instead of City Name.

## Credits

Based upon:

	http://www.lynda.com/Node-js-tutorials/Building-Slack-Bot-Node-js-Microservices/509406-2.html

This tutorial is worth viewing for some great insight into how to structure the code in a __Node.js__ project.
