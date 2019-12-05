# music-browser-api
## Web-based music player backend.
---
Backend that loads, parses and serves up tunes from local filesystem.

Supports intuitive browsing, playing (start/pause/resume) and volume control.

Presents tunes in tree hierarchy: genre/artist/album/title.

Built with node.js using TypeScript and Express.

Deployment:
* npm install
* (setup corresponding music-browser ui project)
* npm start
* point your mobile web browser to to http://{host}:{port}