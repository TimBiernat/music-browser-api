import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as expserver from "express";
import * as morgan from "morgan";
import * as winston from "winston";
import { log } from "winston";
import router from "./routes";

export function env() {
    return new Promise((resolve, reject) => {
        const result = dotenv.config({ path: "config.env" });
        if (result.error) {
            reject(result.error);
        }
        resolve(result);
    });
}

export function logger(level?: string) {
    return new Promise((resolve, reject) => {
        if (!level) {
            level = process.env.LOG_LEVEL;
        }
        if (!level) {
            level = "info";
        }
        winston.configure({
            transports: [
                new winston.transports.Console({
                    colorize: true,
                    level: (level),
                    timestamp: true,
                })],
        });
        log("info", "logger configured: %s", level);
        resolve();
    });
}

export function express(app: any) {
    return new Promise((resolve, reject) => {
        try {
            app.use(expserver.static("public"));
            app.use(compression());
            app.use(cors());
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(morgan(":date[iso] - :method :url :status :response-time[0] :remote-addr"));
            app.use("/api/" + process.env.VERSION, router);
            log("info", "express configured");
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}
