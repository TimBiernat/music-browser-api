import { ChildProcess, exec } from "child_process";
import { log } from "winston";

let proc: ChildProcess;
let songPlaying = "";

export function play(path: string) {
    songPlaying = path;
    proc = exec(process.env.PLAYER_EXEC + " \"" + path + "\"", () => {
        songPlaying = "";
        log("debug", "song %s stopped", path);
    });
}

export function playing(): string {
    return songPlaying;
}

export function pause() {
    proc.kill(17);
}

export function resume() {
    proc.kill(19);
}

export function stop() {
    proc.kill(3);
}

export function volume(level: number) {
    exec('osascript -e "set Volume "' + level);  // 0-10
}

export function mute() {
    exec('osascript -e "set Volume "' + 0);  // 0-10
}
