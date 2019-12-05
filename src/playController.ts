import { Request, Response } from "express";
import { log } from "winston";
import * as datastore from "./metadata";
import * as player from "./player";

export function play(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const path = datastore.getTune(id).path;
    // log("info", "playing %s", path);
    player.play(path);
    res.status(200).send();
}

export function playing(req: Request, res: Response) {
    const path = player.playing();
    const id = datastore.getTuneFromPath(path);
    // log("info", "playing %s %d", path, id);
    res.json(id);
}

export function pause(req: Request, res: Response) {
    player.pause();
    res.status(200).send();
}

export function resume(req: Request, res: Response) {
    player.resume();
    res.status(200).send();
}

export function stop(req: Request, res: Response) {
    player.stop();
    res.status(200).send();
}

export function mute(req: Request, res: Response) {
    player.mute();
    res.status(200).send();
}

export function volume(req: Request, res: Response) {
    const level = parseInt(req.params.level);
    player.volume(level);
    res.status(200).send();
}
