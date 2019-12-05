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
const express = require("express");
const winston_1 = require("winston");
const config = require("./config");
const datastore = require("./metadata");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield config.env();
            yield config.logger();
            yield datastore.load(process.env.MUSIC_DIR);
            const app = express();
            yield config.express(app);
            app.listen(getPort(), () => {
                winston_1.log("info", process.env.NODE_ENV + " server listening on port %s", getPort());
            });
        }
        catch (err) {
            winston_1.log("error", "Shutting down: %s", err);
            process.exit(1);
        }
    });
}
function getPort() {
    let port = process.env.PORT;
    if (port === undefined) {
        port = "3001";
    }
    return port;
}
run();
//# sourceMappingURL=server.js.map