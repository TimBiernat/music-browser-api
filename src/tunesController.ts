import { Request, Response } from "express";
import * as datastore from "./metadata";

export function getTree(req: Request, res: Response) {
    const tunes = datastore.getTree();
    res.json(tunes);
}
