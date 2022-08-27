class TwitchTokenDetails {
  access_token;
  refresh_token;
  expires_in_secs;
  scope;
  token_type;

  constructor({
    access_token,
    refresh_token,
    expires_in_secs,
    scope,
    token_type,
  }) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.expires_in_secs = expires_in_secs;
    this.scope = scope;
    this.token_type = token_type;
  }
}

module.exports = TwitchTokenDetails;
