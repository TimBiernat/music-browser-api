
import { Router } from "express";
import * as playController from "./playController";
import * as tunesController from "./tunesController";

const router = Router();

router.get("/tree", (req, res) => tunesController.getTree(req, res));

router.get("/playing", (req, res) => playController.playing(req, res));
router.post("/play/:id", (req, res) => playController.play(req, res));
router.post("/pause", (req, res) => playController.pause(req, res));
router.post("/resume", (req, res) => playController.resume(req, res));
router.post("/stop", (req, res) => playController.stop(req, res));
router.post("/mute", (req, res) => playController.mute(req, res));
router.post("/volume/:level", (req, res) => playController.volume(req, res));

export default router;
