# music-browser-api

## Web-based music player backend

---
Backend that loads and parses tunes from local filesystem, and plays via remote web-based control.

Supports intuitive browsing, playing (start/pause/resume) and volume control. Leverages local os player and controls (tested on MacOS, but should be easily extensible).

Presents tunes in tree hierarchy: genre/artist/album/title.

Built with node.js using TypeScript.

Deployment:

* npm install
* update MUSIC_DIR path (where mp3s live) in config.env
* sudo npm install -g typescript
* tsc
* (setup corresponding [music-browser-ui project](https://github.com/TimBiernat/music-browser-ui), copy generated dist files to local public dir)
* npm start
* point your mobile web browser to to deplouyment <http://{host}:{port}>
