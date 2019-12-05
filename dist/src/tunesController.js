"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datastore = require("./metadata");
function getTree(req, res) {
    const tunes = datastore.getTree();
    res.json(tunes);
}
exports.getTree = getTree;
//# sourceMappingURL=tunesController.js.map