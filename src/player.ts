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
    const cmd = process.env.VOLUME_EXEC + level;
    exec(cmd);  // 0-10 on MacOS
}

export function mute() {
    const cmd = process.env.VOLUME_EXEC + 0;
    exec(cmd);
}
