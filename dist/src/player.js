"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const winston_1 = require("winston");
let proc;
let songPlaying = "";
function play(path) {
    songPlaying = path;
    proc = child_process_1.exec(process.env.PLAYER_EXEC + " \"" + path + "\"", () => {
        songPlaying = "";
        winston_1.log("debug", "song %s stopped", path);
    });
}
exports.play = play;
function playing() {
    return songPlaying;
}
exports.playing = playing;
function pause() {
    proc.kill(17);
}
exports.pause = pause;
function resume() {
    proc.kill(19);
}
exports.resume = resume;
function stop() {
    proc.kill(3);
}
exports.stop = stop;
function volume(level) {
    child_process_1.exec('osascript -e "set Volume "' + level); // 0-10
}
exports.volume = volume;
function mute() {
    child_process_1.exec('osascript -e "set Volume "' + 0); // 0-10
}
exports.mute = mute;
//# sourceMappingURL=player.js.map