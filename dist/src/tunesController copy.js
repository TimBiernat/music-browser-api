"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datastore = require("./datastore");
function getTunes(req, res) {
    const tunes = datastore.getTunes();
    res.json(tunes);
}
exports.getTunes = getTunes;
//# sourceMappingURL=tunesController copy.js.map