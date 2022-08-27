const TwitchTokenDetails = require('./TwitchTokenDetails');
const { validate } = require('class-validator');
const { InvalidTwitchResponseError } = require('./Error');

class TwitchTokenResponseValidator {
  static async parseResponse(responseBody) {
    const tokenResponse = JSON.parse(JSON.stringify(responseBody));

    try {
      console.info('Validating Twitch Response');

      let tokenDetails = new TwitchTokenDetails(tokenResponse);
      let completeConfigErrors = await validate(tokenDetails);

      if (completeConfigErrors.length > 0)
        throw new InvalidTwitchResponseError(`The answer from twitch token endpoint is not valid, 
                here are the issues: ${completeConfigErrors.join()}`);

      console.info('Twitch Response is valid.');
      return tokenDetails;
    } catch (err) {
      if (err instanceof InvalidTwitchResponseError) console.log(err.message);
      throw err;
    }
  }
}

module.exports = TwitchTokenResponseValidator;
