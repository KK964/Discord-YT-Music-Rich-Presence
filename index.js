require('dotenv').config();
const RPC = require('discord-rpc');
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

const rpc = new RPC.Client({ transport: typeof window !== 'undefined' ? 'websocket' : 'ipc' });

var connected = false;

var cache;

app.post('/update', (req, res) => {
  const body = req.body;
  if (body?.song && body?.artist && body?.['time-left']) {
    body.artist = body.artist.split(' • ')?.[0] ?? body.artist;
    update(
      body.song + (body.song.length < 2 ? '.' : ''),
      body.artist + (body.artist.length < 2 ? '.' : ''),
      body.paused ? null : body['time-left'],
      body.paused ? 'paused' : 'playing',
      body.paused ? 'Paused' : 'Playing',
      body.url
    );
    res.send();
    return;
  } else res.send('Invalid json sent');
});

app.delete('/', (req, res) => {
  deleteStatus();
});

function update(details, state, timeLeft, smallImageKey, smallImageText, url, instance = true) {
  var obj = {
    largeImageKey: 'logo',
    instance,
    buttons: [],
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
  if (url) {
    obj.buttons.push({
      label: 'Listen',
      url: url,
    });
  }
  obj.buttons.push({
    label: 'Extension',
    url: 'https://github.com/KK964/Discord-YT-Music-Rich-Presence',
  });

  cache = obj;
  if (!connected) return;
  rpc.setActivity(obj).catch(logErrors);
}

function logErrors(err) {
  console.log(err);
}

function login() {
  if (!connected)
    rpc
      .login({ clientId: process.env.APPLICATION_ID })
      .catch(logErrors)
      .then(() => {
        if (cache) {
          rpc.setActivity(cache).catch(logErrors);
          cache = null;
        }
      });
}

function deleteStatus() {
  if (connected)
    rpc
      .destroy()
      .catch(logErrors)
      .then(() => (connected = false));
}

rpc.on('ready', () => {
  console.info('RPC is ready');
});

rpc.on('connected', () => {
  console.info('Connected to discord rpc');
  connected = true;
});

rpc.on('disconnected', () => {
  console.info('Disconnected from discord rpc');
});

login();

app.listen(8720, () => {
  console.info(`Listening on http://localhost:8720`);
});
