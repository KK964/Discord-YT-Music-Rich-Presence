<div>
  <img width="180" height="180" align="left" src="https://raw.githubusercontent.com/KK964/Discord-YT-Music-Rich-Presence/master/assets/Logo.png" />
  <br>
  <h1>Discord Youtube Music Rich Presence</h1>
  <p>Show the song you are listening to as your status in Discord!</p>
  <br>
</div>

## Why
In discord, spotify users can show what song they are playing as their status. 

![Spotify Presence in Discord](https://cdn.discordapp.com/attachments/750139071233261699/856657626992869406/unknown.png)

Us [Youtube Music](https://music.youtube.com) users did not have a way to do this, so I decided to make my own alternative.

## Examples

![Playing Music](https://cdn.discordapp.com/attachments/750139071233261699/856654993938841630/unknown.png)

Listening to music

![Paused](https://cdn.discordapp.com/attachments/750139071233261699/856661086832033792/unknown.png)

Paused song

## Contributing

    $ git clone https://github.com/KK964/Discord-YT-Music-Rich-Presence
 
 A folder will be created called `Discord-YT-Music-Rich-Presence` with the source code inside. You can open this folder with your favourite IDE and begin editing.

## Using

### Setting up
There are a few ways to setup for your use.
 - [Without Application](#After)
 - [With Application](#With)

#### <a name="With"></a>With Application
1. Setup a Discord application
    1. Go to Discords [Developer Page](https://discord.com/developers/)
    2. Make a new application
    3. Set the App Icon to the [Youtube Music Icon][LOGO]
    4. Go to `Rich Presence -> Art Assets` set the Cover Image to [Logo.png][LOGO]
    5. Add [Playing.png][PLAYING], and [Paused.png][PAUSED]
2. Set the application id in your `.env` file

#### <a name="After"></a>After
After you have finished setting up your application, install the dependancies.

    $ npm i
    
#### Installing the Extension
The Extension instalation proccess may differ depending on what browser you are using. In the future this will be made easier.

 - [Chrome](https://www.google.com/chrome/)
 > 1. Go to `chrome://extensions/`
 > 2. Enable Developer mode
 > 3. Click Load unpacked
 > 4. Navigate to where the `Discord-YT-Music-Rich-Presence/extension` folder is located and click Select Folder
 - [Firefox](https://www.mozilla.org/)
 > 1. Go to `about:debugging#/runtime/this-firefox`
 > 2. Click Load Temporary Add-on
 > 3. Navigate to `Discord-YT-Music-Rich-Presence/extension/manifest.json`
 > 4. Click `manifest.json` and click Open
 > Due to the extension being a temparary extension, you may need to re-add the extension on restart

### Running the Server

    $ node .
    

## Todo

- [x] Make working
- [ ] Add to Webstores
  - [ ] Add to Chrome Webstore
  - [ ] Add to Firefox Extensions page
- [ ] Add toggle button
- [ ] Add Join button

## License
[The MIT License (MIT)](https://raw.githubusercontent.com/KK964/Discord-YT-Music-Rich-Presence/master/LICENSE)

[LOGO]: https://raw.githubusercontent.com/KK964/Discord-YT-Music-Rich-Presence/master/assets/Logo.png
[PLAYING]: https://raw.githubusercontent.com/KK964/Discord-YT-Music-Rich-Presence/master/extension/icons/Playing.png
[PAUSED]: https://raw.githubusercontent.com/KK964/Discord-YT-Music-Rich-Presence/master/extension/icons/Paused.png
