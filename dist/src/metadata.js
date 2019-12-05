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
const meta = require("music-metadata");
const sortArray = require("sort-array");
const walker = require("walk-sync");
const winston_1 = require("winston");
const tunes = [];
const tree = [];
function load(path) {
    return __awaiter(this, void 0, void 0, function* () {
        let paths = walker(path, { globs: ["**/*.mp3"], directories: false });
        let i = 0;
        while (i < paths.length) {
            try {
                const fullPath = path + "/" + paths[i];
                const data = yield meta.parseFile(fullPath);
                tunes.push({
                    genre: data.common.genre[0], artist: data.common.artist,
                    album: data.common.album, title: data.common.title, path: fullPath,
                });
            }
            catch (err) {
                winston_1.log("debug", "trouble parsing: %s", paths[i]);
            }
            finally {
                i++;
            }
        }
        paths = null;
        winston_1.log("info", "loaded %d songs", i);
        buildTree();
        winston_1.log("info", "tree built");
    });
}
exports.load = load;
function getTune(i) {
    return tunes[i];
}
exports.getTune = getTune;
function getTuneFromPath(path) {
    for (let i = 0; i < tunes.length; i++) {
        if (tunes[i].path === path) {
            return i;
        }
    }
}
exports.getTuneFromPath = getTuneFromPath;
function getTree() {
    return tree;
}
exports.getTree = getTree;
function buildTree() {
    populateGenres();
    populateArtists();
    populateAlbums();
    populateTitles();
    sort();
}
function populateGenres() {
    for (const tune of tunes) {
        if (!hasGenre(tune.genre)) {
            tree.push({ type: "genre", name: tune.genre, children: [] });
        }
    }
}
function sort() {
    sortArray(tree, {
        by: ["name"],
    });
    for (const genreNode of tree) {
        sortArray(genreNode.children, {
            by: ["name"],
        });
        for (const albumNode of genreNode.children) {
            sortArray(albumNode.children, {
                by: ["name"],
            });
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
    for (let i = 0; i < tunes.length; i++) {
        addTitle(tunes[i], i);
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
function addTitle(tune, i) {
    for (const genreNode of tree) {
        if (genreNode.name === tune.genre) {
            for (const artistNode of genreNode.children) {
                if (artistNode.name === tune.artist) {
                    for (const albumNode of artistNode.children) {
                        if (albumNode.name === tune.album) {
                            albumNode.children.push({ type: "title", name: tune.title, id: i });
                        }
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=metadata.js.map