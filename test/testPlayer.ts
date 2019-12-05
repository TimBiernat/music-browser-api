import { log } from "winston";
import * as config from "../src/config";
import * as player from "../src/player";
import * as util from "../src/util";

async function run() {
    await config.env();
    await config.logger("debug");
    let level = 1;
    player.volume(level);
    player.play("test1.mp3");
    log("debug", "volume %d", level);
    log("debug", "player.playing: %s", player.playing());
    util.wait(2000).then(() => {
        player.volume(level += 1);
        log("debug", "volume %d", level);
        util.wait(2000).then(() => {
            player.mute();
            player.pause();
            log("debug", "paused player.playing: %s", player.playing());
            player.volume(level);
            util.wait(2000).then(() => {
                player.volume(level);
                player.resume();
                log("debug", "resumed player.playing: %s", player.playing());
                util.wait(2000).then(() => {
                    player.mute();
                    player.stop();
                    util.wait(1000).then(() => {
                        log("debug", "after stopped player.playing: %s", player.playing());
                    });
                });
            });
        });
    });
}

run();
