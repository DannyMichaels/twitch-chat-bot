const {
  MalformedTwitchRequestError,
  NoTwitchResponseError,
  TwitchResponseError,
} = require('./Error');
const TwitchTokenResponseValidator = require('./TwitchTokenResponseValidator');
const say = require('say');

class TwitchChatBot {
  tmi = require('tmi.js');
  config = require('../config').twitch;

  twitchClient;
  tokenDetails;

  constructor() {}

  async launch() {
    this.tokenDetails = await this.fetchAccessToken();
    this.twitchClient = new this.tmi.Client(
      this.buildConnectionConfig(
        this.config.channel,
        this.config.username,
        this.tokenDetails.access_token
      )
    );
    this.setupBotBehavior();
    this.twitchClient.connect();
  }

  async fetchAccessToken() {
    const axios = require('axios');
    console.log('Fetching Twitch OAuth Token');
    return axios({
      method: 'post',
      url: this.config.token_endpoint,

      params: {
        client_id: this.config.client_id,
        client_secret: this.config.client_secret,
        code: this.config.authorization_code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost',
      },
      responseType: 'json',
    })
      .then(async function (response) {
        // handle success
        return await TwitchTokenResponseValidator.parseResponse(response.data);
      })
      .catch(function (error) {
        console.log('Failed to get Twitch OAuth Token');
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          throw new TwitchResponseError(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          throw new NoTwitchResponseError(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new MalformedTwitchRequestError(error.request);
        }
      });
  }

  refreshTokenIfNeeded() {
    //TODO if needed - twitch apparently only requires the token on login so it is good enough for now to just get a token on start-up.
  }

  setupBotBehavior() {
    this.twitchClient.on('message', (channel, tags, message, self) => {
      const array = message.split(' ');
      const command = array.splice(0, 1).join('');
      const restOfMessage = array.join(' ');

      // Ignore messages from itself.
      if (self) {
        return console.log('ERR:: Bot will ignore messages from itself!');
      }

      if (command.startsWith('!')) {
        switch (command) {
          case '!say': {
            this.textToSpeech(channel, tags, restOfMessage);
            break;
          }

          case '!hello': {
            this.sayHelloToUser(channel, tags);
            break;
          }
          case '!repeat': {
            this.repeatMessage(channel, restOfMessage);
            break;
          }
          case '!reverse': {
            this.repeatMessage(
              channel,
              restOfMessage.split('').reverse().join('')
            );
            break;
          }
          default:
            break;
        }
      }
    });
  }

  textToSpeech(channel, { username }, message) {
    if (!message) {
      return this.twitchClient.say(channel, 'Error, message is empty!');
    }

    return say.speak(`${username} says ${message}`);
  }

  sayHelloToUser(channel, tags) {
    this.twitchClient.say(
      channel,
      `Hello, ${tags.username}! Welcome to the channel.`
    );
  }

  repeatMessage(channel, message) {
    if (!message) {
      this.twitchClient.say(channel, 'Error, message is empty!');
    }

    this.twitchClient.say(channel, message);
  }

  buildConnectionConfig(channel, username, accessToken) {
    return {
      options: { debug: true },
      connection: {
        secure: true,
        reconnect: true,
      },
      identity: {
        username: `${username}`,
        password: `oauth:${accessToken}`, // https://twitchapps.com/tmi to get accessCode
      },
      channels: [`${channel}`],
    };
  }
}

module.exports = TwitchChatBot;
