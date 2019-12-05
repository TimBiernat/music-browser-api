import * as meta from "music-metadata";
import * as sortArray from "sort-array";
import * as walker from "walk-sync";
import { log } from "winston";

interface Tune {
    genre: string;
    artist: string;
    album: string;
    title: string;
    path: string;
}

interface MusicNode {
    type: string; // genre, artist, album, title
    name: string;
    id?: number;
    children?: MusicNode[];
}

const tunes: Tune[] = [];
const tree: MusicNode[] = [];

export async function load(path: string) {
    let paths = walker(path, { globs: ["**/*.mp3"], directories: false });
    let i = 0;
    while (i < paths.length) {
        try {
            const fullPath = path + "/" + paths[i];
            const data = await meta.parseFile(fullPath);
            tunes.push({
                genre: data.common.genre[0], artist: data.common.artist,
                album: data.common.album, title: data.common.title, path: fullPath,
            });
        } catch (err) {
            log("debug", "trouble parsing: %s", paths[i]);
        } finally {
            i++;
        }
    }
    paths = null;
    log("info", "loaded %d songs", i);

    buildTree();
    log("info", "tree built");
}

export function getTune(i: number) {
    return tunes[i];
}

export function getTuneFromPath(path: string): number {
    for (let i = 0; i < tunes.length; i++) {
        if (tunes[i].path === path) {
            return i;
        }
    }
}

export function getTree() {
    return tree;
}

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

function hasGenre(genre: string): MusicNode {
    for (const genreNode of tree) {
        if (genreNode.name === genre) {
            return genreNode;
        }
    }
    return null;
}

function addArtist(tune: Tune) {
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

function addAlbum(tune: Tune) {
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

function addTitle(tune: Tune, i: number) {
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
