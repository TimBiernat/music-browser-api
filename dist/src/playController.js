"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datastore = require("./metadata");
const player = require("./player");
function play(req, res) {
    const id = parseInt(req.params.id);
    const path = datastore.getTune(id).path;
    // log("info", "playing %s", path);
    player.play(path);
    res.status(200).send();
}
exports.play = play;
function playing(req, res) {
    const path = player.playing();
    const id = datastore.getTuneFromPath(path);
    // log("info", "playing %s %d", path, id);
    res.json(id);
}
exports.playing = playing;
function pause(req, res) {
    player.pause();
    res.status(200).send();
}
exports.pause = pause;
function resume(req, res) {
    player.resume();
    res.status(200).send();
}
exports.resume = resume;
function stop(req, res) {
    player.stop();
    res.status(200).send();
}
exports.stop = stop;
function mute(req, res) {
    player.mute();
    res.status(200).send();
}
exports.mute = mute;
function volume(req, res) {
    const level = parseInt(req.params.level);
    player.volume(level);
    res.status(200).send();
}
exports.volume = volume;
//# sourceMappingURL=playController.js.map