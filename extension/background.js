var b;
if (typeof chrome != 'undefined') b = chrome;
else b = browser;

var tabID;

b.tabs.onUpdated.addListener((id, change, tab) => {
  tabID = id;
  requestUpdate();
});

b.tabs.onRemoved.addListener((id) => {
  if (id == tabID) deletePresence();
});

function requestUpdate() {
  b.tabs.sendMessage(tabID, { type: 'song', message: 'send' });
}

setInterval(() => {
  requestUpdate();
}, 10000);

b.runtime.onMessage.addListener(async (req, sender, response) => {
  if (req.type == 'song') updatePresence(req.paused, req.song, req.artist, req.time);
});


function deletePresence() {
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:8720/',
    method: 'DELETE',
  };

  $.ajax(settings);
}

function updatePresence(paused, song, artist, time) {
  const data = {
    paused: paused,
    song: song,
    artist: artist,
    'time-left': time,
  };
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:8720/update',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    processData: false,
    data: JSON.stringify(data),
  };

  $.ajax(settings);
}
