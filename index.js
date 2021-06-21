require('dotenv').config();
const Express = require('express');
const app = Express();
const cors = require('cors');

app.use(Express.json());
app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, true);
    },
  })
);

const client = require('discord-rich-presence')(process.env.APPLICATION_ID);

app.post('/update', (req, res) => {
  const body = req.body;
  if (body?.song && body?.artist && body?.['time-left']) {
    update(
      `${body.paused ? 'Paused on' : 'Listening to'} "${body.song}"`,
      `by ${body.artist}`,
      body.paused ? null : body['time-left'],
      body.paused ? 'paused' : 'playing',
      body.paused ? 'Paused' : 'Playing'
    );
    res.send();
    return;
  } else res.send('Invalid json sent');
});

app.delete('/', (req, res) => {
  deleteStatus();
});

function update(details, state, timeLeft, smallImageKey, smallImageText, instance = true) {
  var obj = {
    largeImageKey: 'logo',
    instance,
  };
  if (details) {
    obj.details = details;
    obj.largeImageText = details;
  }
  if (state) {
    obj.state = state;
  }
  if (smallImageKey) {
    obj.smallImageKey = smallImageKey;
  }
  if (smallImageText) {
    obj.smallImageText = smallImageText;
  }
  if (timeLeft) {
    obj.startTimestamp = Date.now();
    obj.endTimestamp = Date.now() + timeLeft;
  }
  client.updatePresence(obj);
}

function deleteStatus() {
  client.updatePresence();
}

client.on('connected', () => {
  console.info('Connected to discord rpc');
});

client.on('error', (err) => {
  console.warn(err);
});

client.on('joinRequest', (user) => {
  console.info(`${user} has requested to join`);
});

client.on('join', (secret) => {
  console.info(`New join, secret is: ${secret}`);
});

client.on('spectate', (secret) => {
  console.info(`New spectator, secret is: ${secret}`);
});

app.listen(8720, () => {
  console.info(`Listening on http://localhost:8720`);
});
