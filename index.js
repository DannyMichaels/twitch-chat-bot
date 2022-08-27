const WebSocketClient = require('websocket').client;

const client = new WebSocketClient();

client.connect();

client.on('connected', onConnected);
client.on('message', onMessage);

// Called every time the bot connects to Twitch chat
function onConnected(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

function onMessage(target, context, msg, self) {
  // psuedo-code
  // const ttsProgram = new TTSThing();
  // ttsProgram.say(msg);
}
