class InvalidTwitchConfigError extends Error {
  name = 'InvalidTwitchConfigError';

  constructor(errorMessage) {
    super();
    this.message = errorMessage;
  }
}

class NoTwitchResponseError extends Error {
  name = 'NoTwitchResponseError';

  constructor(errorMessage) {
    super();
    this.message = errorMessage;
  }
}

class InvalidTwitchResponseError extends Error {
  name = 'InvalidTwitchResponseError';

  constructor(errorMessage) {
    super();
    this.message = errorMessage;
  }
}

class TwitchResponseError extends Error {
  name = 'TwitchResponseError';

  constructor(errorMessage) {
    super();
    this.message = JSON.stringify(errorMessage);
  }
}

class MalformedTwitchRequestError extends Error {
  name = 'MalformedTwitchRequestError';

  constructor(errorMessage) {
    super();
    this.message = errorMessage;
  }
}

module.exports = {
  InvalidTwitchConfigError,
  NoTwitchResponseError,
  InvalidTwitchResponseError,
  TwitchResponseError,
  MalformedTwitchRequestError,
};
