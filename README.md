# music-browser-api
## Web-based music player backend
---
Backend that loads and parses tunes from local filesystem, and plays via remote web-based control.

Supports intuitive browsing, playing (start/pause/resume) and volume control. Leverages local os player and controls (tested on MacOS, but should be easily extensible).

Presents tunes in tree hierarchy: genre/artist/album/title.

Built with node.js using TypeScript and Express.

Deployment:
* npm install
* (setup corresponding music-browser ui project)
* npm start
* point your mobile web browser to to http://{host}:{port}