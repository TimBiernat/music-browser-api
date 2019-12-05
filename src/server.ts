
import * as express from "express";
import { log } from "winston";
import * as config from "./config";
import * as datastore from "./metadata";

async function run() {
    try {
        await config.env();
        await config.logger();
        await datastore.load(process.env.MUSIC_DIR);
        const app = express();
        await config.express(app);
        app.listen(getPort(), () => {
            log("info", process.env.NODE_ENV + " server listening on port %s", getPort());
        });
    } catch (err) {
        log("error", "Shutting down: %s", err);
        process.exit(1);
    }
}

function getPort(): string {
    let port = process.env.PORT;
    if (port === undefined) {
        port = "3001";
    }
    return port;
}

run();
