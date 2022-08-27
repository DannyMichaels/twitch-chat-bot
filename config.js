require('dotenv').config();

module.exports = {
  port: 8000,
  twitch: {
    token_endpoint: 'https://id.twitch.tv/oauth2/token',
    username: process.env.TWITCH_BOT_USERNAME,
    client_id: process.env.TWITCH_BOT_CLIENT_ID,
    client_secret: process.env.TWITCH_BOT_CLIENT_SECRET,
    authorization_code: process.env.TWITCH_BOT_AUTHORIZATION_CODE,
    channel: process.env.TWITCH_BOT_CHANNEL_NAME,
    redirect_uri: process.env.TWITCH_REDIRECT_URI,
  },
};

/* 
How to get authorization_code:
https://id.twitch.tv/oauth2/authorize?client_id=<client_id>&redirect_uri=http://localhost&response_type=code&scope=chat:read chat:edit
OR https://twitchapps.com/tmi
*/
