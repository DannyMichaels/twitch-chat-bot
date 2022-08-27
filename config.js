require('dotenv').config();

module.exports = {
  twitch: {
    token_endpoint: 'https://id.twitch.tv/oauth2/token',
    username: process.env.TWITCH_BOT_USERNAME,
    client_id: '<client id for the bot>',
    client_secret: process.env.TWITCH_BOT_CLIENT_SECRET,
    authorization_code: "<Authorization Code for the Chat Bot's account>",
    channel: '<Twitch Channel Name>',
  },
};
