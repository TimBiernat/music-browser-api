"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const format = require("json-format");
const winston_1 = require("winston");
const config = require("../src/config");
const tunes = [
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "In My Tribe",
        "title": "What's the Matter Here? [Child abuse]",
        "path": "/Users/tim/music-collection/10,000 Maniacs/In My Tribe/01-What's the Matter Here- [Child abuse]-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "In My Tribe",
        "title": "Hey Jack Kerouac [Jack Kerouac and the Beat Generation]",
        "path": "/Users/tim/music-collection/10,000 Maniacs/In My Tribe/02-Hey Jack Kerouac [Jack Kerouac and the Beat Generation]-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "In My Tribe",
        "title": "Like the Weather",
        "path": "/Users/tim/music-collection/10,000 Maniacs/In My Tribe/03-Like the Weather-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "In My Tribe",
        "title": "Cherry Tree [Illiteracy]",
        "path": "/Users/tim/music-collection/10,000 Maniacs/In My Tribe/04-Cherry Tree [Illiteracy]-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "In My Tribe",
        "title": "The Painted Desert",
        "path": "/Users/tim/music-collection/10,000 Maniacs/In My Tribe/05-The Painted Desert-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "In My Tribe",
        "title": "Don't Talk",
        "path": "/Users/tim/music-collection/10,000 Maniacs/In My Tribe/06-Don't Talk-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "In My Tribe",
        "title": "Peace Train",
        "path": "/Users/tim/music-collection/10,000 Maniacs/In My Tribe/07-Peace Train-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "In My Tribe",
        "title": "Gun Shy",
        "path": "/Users/tim/music-collection/10,000 Maniacs/In My Tribe/08-Gun Shy-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "In My Tribe",
        "title": "My Sister Rose [Sister's wedding]",
        "path": "/Users/tim/music-collection/10,000 Maniacs/In My Tribe/09-My Sister Rose [Sister's wedding]-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "In My Tribe",
        "title": "A Campfire Song",
        "path": "/Users/tim/music-collection/10,000 Maniacs/In My Tribe/10-A Campfire Song-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "In My Tribe",
        "title": "City of Angels",
        "path": "/Users/tim/music-collection/10,000 Maniacs/In My Tribe/11-City of Angels-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "Love Among the Ruins",
        "title": "Rainy Day",
        "path": "/Users/tim/music-collection/10,000 Maniacs/Love Among the Ruins/01-Rainy Day-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "Love Among the Ruins",
        "title": "Love Among the Ruins",
        "path": "/Users/tim/music-collection/10,000 Maniacs/Love Among the Ruins/02-Love Among the Ruins-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "Love Among the Ruins",
        "title": "Even With My Eyes Closed",
        "path": "/Users/tim/music-collection/10,000 Maniacs/Love Among the Ruins/03-Even With My Eyes Closed-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "Love Among the Ruins",
        "title": "Girl on a Train",
        "path": "/Users/tim/music-collection/10,000 Maniacs/Love Among the Ruins/04-Girl on a Train-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "Love Among the Ruins",
        "title": "Green Children",
        "path": "/Users/tim/music-collection/10,000 Maniacs/Love Among the Ruins/05-Green Children-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "Love Among the Ruins",
        "title": "A Room for Everything",
        "path": "/Users/tim/music-collection/10,000 Maniacs/Love Among the Ruins/06-A Room for Everything-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "Love Among the Ruins",
        "title": "More Than This",
        "path": "/Users/tim/music-collection/10,000 Maniacs/Love Among the Ruins/07-More Than This-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "Love Among the Ruins",
        "title": "Big Star",
        "path": "/Users/tim/music-collection/10,000 Maniacs/Love Among the Ruins/08-Big Star-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "Love Among the Ruins",
        "title": "You Won't Find Me There",
        "path": "/Users/tim/music-collection/10,000 Maniacs/Love Among the Ruins/09-You Won't Find Me There-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "Love Among the Ruins",
        "title": "All That Never Happens",
        "path": "/Users/tim/music-collection/10,000 Maniacs/Love Among the Ruins/10-All That Never Happens-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "Love Among the Ruins",
        "title": "Shining Light",
        "path": "/Users/tim/music-collection/10,000 Maniacs/Love Among the Ruins/11-Shining Light-320kbps.mp3"
    },
    {
        "genre": "Rock",
        "artist": "10,000 Maniacs",
        "album": "Love Among the Ruins",
        "title": "Across the Fields",
        "path": "/Users/tim/music-collection/10,000 Maniacs/Love Among the Ruins/12-Across the Fields-320kbps.mp3"
    }
];
// const tunes: Tune[] = [
//     { genre: "Blues", artist: "Ray Charles", album: "Best of Ray Charles", title: "Louisiana Blues" },
//     { genre: "Rock", artist: "Beatles", album: "Abbey Road", title: "Come Together" },
//     { genre: "Rock", artist: "Beatles", album: "Abbey Road", title: "Something" },
//     { genre: "Rock", artist: "Beatles", album: "White Album", title: "Rocky Raccoon" },
//     { genre: "R & B", artist: "Al Green", album: "High and Mighty", title: "Tired of Being Alone" },
// ];
const tree = [];
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield config.env();
        yield config.logger("debug");
        populateGenres();
        populateArtists();
        populateAlbums();
        populateTitles();
        winston_1.log("debug", "%s", format(tree, { type: "space", size: 2 }));
    });
}
run();
function populateGenres() {
    for (const tune of tunes) {
        if (!hasGenre(tune.genre)) {
            tree.push({ type: "genre", name: tune.genre, children: [] });
        }
    }
}
function populateArtists() {
    for (const tune of tunes) {
        addArtist(tune);
    }
}
function populateAlbums() {
    for (const tune of tunes) {
        addAlbum(tune);
    }
}
function populateTitles() {
    for (const tune of tunes) {
        addTitle(tune);
    }
}
function hasGenre(genre) {
    for (const genreNode of tree) {
        if (genreNode.name === genre) {
            return genreNode;
        }
    }
    return null;
}
function addArtist(tune) {
    for (const genreNode of tree) {
        if (genreNode.name === tune.genre) {
            if (genreNode.children.length === 0) {
                genreNode.children.push({ type: "artist", name: tune.artist, children: [] });
                return;
            }
            let found = false;
            for (const artistNode of genreNode.children) {
                if (artistNode.name === tune.artist) {
                    found = true;
                }
            }
            if (!found) {
                genreNode.children.push({ type: "artist", name: tune.artist, children: [] });
                return;
            }
        }
    }
}
function addAlbum(tune) {
    for (const genreNode of tree) {
        if (genreNode.name === tune.genre) {
            for (const artistNode of genreNode.children) {
                if (artistNode.name === tune.artist) {
                    if (artistNode.children.length === 0) {
                        artistNode.children.push({ type: "album", name: tune.album, children: [] });
                        return;
                    }
                    let found = false;
                    for (const albumNode of artistNode.children) {
                        if (albumNode.name === tune.album) {
                            found = true;
                        }
                    }
                    if (!found) {
                        artistNode.children.push({ type: "album", name: tune.album, children: [] });
                        return;
                    }
                }
            }
        }
    }
}
function addTitle(tune) {
    for (const genreNode of tree) {
        if (genreNode.name === tune.genre) {
            for (const artistNode of genreNode.children) {
                if (artistNode.name === tune.artist) {
                    for (const albumNode of artistNode.children) {
                        if (albumNode.name === tune.album) {
                            albumNode.children.push({ type: "title", name: tune.title });
                        }
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=testTree.js.map