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
const winston_1 = require("winston");
const config = require("../src/config");
const player = require("../src/player");
const util = require("../src/util");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield config.env();
        yield config.logger("debug");
        let level = 1;
        player.volume(level);
        player.play("test1.mp3");
        winston_1.log("debug", "volume %d", level);
        winston_1.log("debug", "player.playing: %s", player.playing());
        util.wait(2000).then(() => {
            player.volume(level += 1);
            winston_1.log("debug", "volume %d", level);
            util.wait(2000).then(() => {
                player.mute();
                player.pause();
                winston_1.log("debug", "paused player.playing: %s", player.playing());
                player.volume(level);
                util.wait(2000).then(() => {
                    player.volume(level);
                    player.resume();
                    winston_1.log("debug", "resumed player.playing: %s", player.playing());
                    util.wait(2000).then(() => {
                        player.mute();
                        player.stop();
                        util.wait(1000).then(() => {
                            winston_1.log("debug", "after stopped player.playing: %s", player.playing());
                        });
                    });
                });
            });
        });
    });
}
run();
//# sourceMappingURL=testPlayer.js.map