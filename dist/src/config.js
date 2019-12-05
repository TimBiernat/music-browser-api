"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const dotenv = require("dotenv");
const expserver = require("express");
const morgan = require("morgan");
const winston = require("winston");
const winston_1 = require("winston");
const routes_1 = require("./routes");
function env() {
    return new Promise((resolve, reject) => {
        const result = dotenv.config({ path: "config.env" });
        if (result.error) {
            reject(result.error);
        }
        resolve(result);
    });
}
exports.env = env;
function logger(level) {
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
                })
            ],
        });
        winston_1.log("info", "logger configured: %s", level);
        resolve();
    });
}
exports.logger = logger;
function express(app) {
    return new Promise((resolve, reject) => {
        try {
            app.use(expserver.static("public"));
            app.use(compression());
            app.use(cors());
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(morgan(":date[iso] - :method :url :status :response-time[0] :remote-addr"));
            app.use("/api/" + process.env.VERSION, routes_1.default);
            winston_1.log("info", "express configured");
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.express = express;
//# sourceMappingURL=config.js.map