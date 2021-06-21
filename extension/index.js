var b;
if (typeof chrome != 'undefined') b = chrome;
else b = browser;
b.runtime.onMessage.addListener((request, sender, response) => {
  console.log(request);
  if (request.type == 'song') {
    response({ response: 'Received' });
    if (document.getElementsByClassName('title style-scope ytmusic-player-bar')?.[0]) updateSong();
  }
});

function updateSong() {
  var name = document.getElementsByClassName('title style-scope ytmusic-player-bar')[0].title;
  var artist = document.getElementsByClassName(
    'byline style-scope ytmusic-player-bar complex-string'
  )?.[0].title;
  var times = document
    .getElementsByClassName('time-info style-scope ytmusic-player-bar')[0]
    .innerHTML.replace(' ', '')
    .split('/');
  var paused = document.getElementById('play-pause-button').title == 'Play';

  var currentTimeMs = getTime(times[0].split(':'));
  var totalTimeMS = getTime(times[1].split(':'));
  var timeLeft = totalTimeMS - currentTimeMs;

  b.runtime.sendMessage({
    type: 'song',
    paused: paused,
    song: name,
    artist: artist,
    time: timeLeft,
  });
}

function getTime(array) {
  for (var i = 0; i < array.length; i++) array[i] = parseInt(array[i]);
  for (var i = 0; i < array.length; i++) {
    if (!array[i + 1]) return array[i] * 1000;
    array[i + 1] += array[i] * 60;
  }
}
