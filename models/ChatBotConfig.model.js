export class ChatBotConfig {
  twitchTokenEndpoint;
  twitchUser;
  twitchClientId;
  twitchClientSecret;
  twitchAuthorizationCode;
  twitchChannel;

  constructor(
    twitchTokenEndpoint,
    twitchUsername,
    twitchClientId,
    twitchClientSecret,
    twitchAuthorizationCode,
    twitchChannel
  ) {
    this.twitchTokenEndpoint = twitchTokenEndpoint;
    this.twitchUser = twitchUsername;
    this.twitchClientSecret = twitchClientSecret;
    this.twitchChannel = twitchChannel;
    this.twitchClientId = twitchClientId;
    this.twitchAuthorizationCode = twitchAuthorizationCode;
  }
}
